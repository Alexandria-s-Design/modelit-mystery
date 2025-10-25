const fs = require('fs');
const path = require('path');
const vm = require('vm');

const baseDir = path.join(__dirname, '..');
const voiceDir = path.join(baseDir, 'audio', 'voice');
const storyFile = path.join(baseDir, 'story-data.js');
const envFile = path.join(baseDir, '.env');

function loadApiKey() {
  if (process.env.GOOGLE_TTS_API_KEY) {
    return process.env.GOOGLE_TTS_API_KEY;
  }

  if (fs.existsSync(envFile)) {
    const lines = fs.readFileSync(envFile, 'utf8').split(/\r?\n/);
    for (const line of lines) {
      if (line.startsWith('GOOGLE_TTS_API_KEY=')) {
        return line.split('=')[1].trim();
      }
    }
  }

  throw new Error('GOOGLE_TTS_API_KEY not found. Set env var or add to .env');
}

function stripHtml(text) {
  return text.replace(/<[^>]+>/g, '');
}

function cleanText(text) {
  return stripHtml(text)
    .replace(/[\u{1F300}-\u{1FAFF}\u{1F1E6}-\u{1F1FF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function loadStory() {
  const code = fs.readFileSync(storyFile, 'utf8');
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(`${code}; this.STORY_DATA = STORY_DATA;`, sandbox);
  return sandbox.STORY_DATA;
}

function buildTasks(story) {
  const tasks = new Map();

  story.chapters.forEach((chapter) => {
    const chapterId = chapter.id;

    chapter.scenes.forEach((scene, sceneIdx) => {
      const text = cleanText(scene.text);
      const sceneVoiceId = `ch${chapterId}_scene${sceneIdx}`;
      tasks.set(sceneVoiceId, text);

      if (scene.learning) {
        const learningVoiceId =
          chapterId === 10 && sceneIdx === 3
            ? `ch${chapterId}_learning_final`
            : `ch${chapterId}_learning`;
        tasks.set(learningVoiceId, text);
      }
    });

    if (chapter.choice) {
      tasks.set(`ch${chapterId}_choice`, cleanText(chapter.choice.question));

      chapter.choice.options.forEach((option, optionIdx) => {
        const feedbackText = cleanText(option.feedback);

        let voiceId;
        if (option.voiceKey) {
          voiceId = `ch${chapterId}_${option.voiceKey}`;
        } else if (option.gameOver) {
          voiceId = `ch${chapterId}_gameover${optionIdx + 1}`;
        } else if (chapter.title && chapter.title.includes('BOSS')) {
          voiceId = `ch${chapterId}_correct`;
        } else {
          voiceId = `ch${chapterId}_feedback${optionIdx + 1}`;
        }

        tasks.set(voiceId, feedbackText);
      });
    }
  });

  return tasks;
}

async function synthesize(apiKey, text) {
  const response = await fetch(
    `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: { text },
        voice: {
          languageCode: 'en-US',
          name: 'en-US-Neural2-F',
        },
        audioConfig: {
          audioEncoding: 'MP3',
          speakingRate: 1.0,
          pitch: 0,
        },
      }),
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(
      `TTS request failed (${response.status} ${response.statusText}): ${errText}`
    );
  }

  const data = await response.json();
  if (!data.audioContent) {
    throw new Error('TTS response missing audioContent');
  }

  return Buffer.from(data.audioContent, 'base64');
}

async function main() {
  const apiKey = loadApiKey();
  const story = loadStory();
  const tasks = buildTasks(story);

  if (!fs.existsSync(voiceDir)) {
    fs.mkdirSync(voiceDir, { recursive: true });
  }

  let index = 1;
  for (const [voiceId, text] of tasks.entries()) {
    const filePath = path.join(voiceDir, `${voiceId}.mp3`);
    console.log(`[${index}/${tasks.size}] Generating ${voiceId}...`);

    try {
      const audioBuffer = await synthesize(apiKey, text);
      fs.writeFileSync(filePath, audioBuffer);
    } catch (error) {
      console.error(`  Error generating ${voiceId}: ${error.message}`);
      throw error;
    }

    index += 1;
  }

  console.log('\nAll voice files regenerated successfully.');
}

main().catch((error) => {
  console.error('\nGeneration failed:', error);
  process.exit(1);
});
