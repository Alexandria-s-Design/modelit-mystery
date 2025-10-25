const fs = require('fs');
const path = require('path');
const vm = require('vm');

const BASE_DIR = path.join(__dirname, '..');
const STORY_PATH = path.join(BASE_DIR, 'story-data.js');
const OUTPUT_DIR = path.join(BASE_DIR, 'images', 'generated');

const API_KEY = process.env.OPENROUTER_API_KEY;
if (!API_KEY) {
  console.error('OPENROUTER_API_KEY must be set.');
  process.exit(1);
}

const MODEL_ID = process.env.OPENROUTER_IMAGE_MODEL || 'google/gemini-2.5-flash-image';

const HEADERS = {
  Authorization: `Bearer ${API_KEY}`,
  'HTTP-Referer': 'https://modelit.local',
  'X-Title': 'ModelIt Image Regeneration',
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'User-Agent': 'ModelItImageGenerator/1.0',
};

const DR_MAYA_STYLE =
  'Dr. Maya is a friendly mid-30s Black female scientist with warm brown skin, curly hair in a high bun, expressive brown eyes, a teal blouse, and a white lab coat with a ModelIt! logo patch. Maintain a clean, bright sci-fi laboratory aesthetic suitable for middle school students.';

function loadStory() {
  const code = fs.readFileSync(STORY_PATH, 'utf8');
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(`${code}; this.STORY_DATA = STORY_DATA;`, sandbox);
  return sandbox.STORY_DATA;
}

function collectSceneContext(story) {
  const map = new Map();
  story.chapters.forEach((chapter) => {
    const chapterTitle = chapter.title;
    const concept = chapter.concept || '';
    chapter.scenes.forEach((scene, idx) => {
      const imagePath = scene.image || chapter.image;
      if (!imagePath) return;
      const key = path.basename(imagePath);
      map.set(key, {
        chapterTitle,
        concept,
        sceneIndex: idx,
        speaker: scene.speaker,
        text: scene.text || '',
        learning: scene.learning ? scene.learning.content || '' : '',
      });
    });
  });
  return map;
}

function buildPrompt(context, imageName) {
  const parts = [
    'Create a high-quality illustration for an educational science mystery scene.',
    DR_MAYA_STYLE,
    `Target audience: middle school students (ages 11-14).`,
    `Image filename: ${imageName}`,
    `Chapter: ${context.chapterTitle}`,
  ];

  if (context.concept) {
    parts.push(`Key modeling concept: ${context.concept}`);
  }

  if (context.speaker) {
    parts.push(`Narration focus: ${context.speaker}`);
  }

  parts.push(`Scene narration: ${context.text}`);

  if (context.learning) {
    parts.push(`Learning highlight: ${context.learning}`);
  }

  parts.push(
    'Artwork style: cinematic, vibrant, kid-friendly sci-fi illustration with readable storytelling detail. Avoid gore, fear, or anything inappropriate for classrooms.'
  );

  parts.push('Maintain consistent rendering of Dr. Maya across the entire series.');

  return parts.join('\n');
}

async function requestImage(prompt) {
  const payload = {
    model: MODEL_ID,
    prompt,
    size: '1024x1024',
  };

  const response = await fetch('https://openrouter.ai/api/v1/images', {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(payload),
  });

  const rawText = await response.text();

  if (!response.ok) {
    throw new Error(
      `Image generation failed (${response.status} ${response.statusText}): ${rawText.slice(
        0,
        200
      )}`
    );
  }

  let data;
  try {
    data = JSON.parse(rawText);
  } catch (err) {
    throw new Error(`Invalid JSON response: ${rawText.slice(0, 200)}`);
  }
  const base64Image = data.data?.[0]?.b64_json;
  if (!base64Image) {
    throw new Error('No image data returned from OpenRouter.');
  }
  return Buffer.from(base64Image, 'base64');
}

async function main() {
  const story = loadStory();
  const contextMap = collectSceneContext(story);
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  for (const [imageName, context] of contextMap.entries()) {
    const prompt = buildPrompt(context, imageName);
    console.log(`Generating ${imageName}...`);
    try {
      const imageBuffer = await requestImage(prompt);
      const outputPath = path.join(OUTPUT_DIR, imageName);
      fs.writeFileSync(outputPath, imageBuffer);
      console.log(`  Saved to ${outputPath}`);
    } catch (err) {
      console.error(`  Failed: ${err.message}`);
    }
  }
}

main().catch((err) => {
  console.error('Unexpected failure:', err);
  process.exit(1);
});
