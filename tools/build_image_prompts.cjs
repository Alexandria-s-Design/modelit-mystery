const fs = require('fs');
const path = require('path');
const vm = require('vm');

const BASE_DIR = path.join(__dirname, '..');
const STORY_PATH = path.join(BASE_DIR, 'story-data.js');
const OUTPUT_PATH = path.join(BASE_DIR, 'images', 'image_prompts.json');

const DR_MAYA_STYLE =
  'Dr. Maya is a friendly mid-30s Black female scientist with warm brown skin, curly hair styled in a high bun, expressive brown eyes, a teal blouse, and a white lab coat with a ModelIt! patch. The tone must remain upbeat, educational, and appropriate for middle school students.';

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
    'Generate a cinematic illustration for an educational science mystery.',
    DR_MAYA_STYLE,
    `Image filename: ${imageName}`,
    `Chapter: ${context.chapterTitle}`,
  ];

  if (context.concept) {
    parts.push(`Key modeling concept: ${context.concept}`);
  }

  if (context.speaker) {
    parts.push(`Dialogue focus: ${context.speaker}`);
  }

  parts.push(`Scene narration: ${context.text}`);

  if (context.learning) {
    parts.push(`Learning highlight to visualize: ${context.learning}`);
  }

  parts.push(
    'Style guidance: vibrant sci-fi laboratory lighting, clear character emotions, approachable composition, no gore or frightening elements, maintain continuity with previous illustrations.'
  );

  return parts.join('\n');
}

function main() {
  const story = loadStory();
  const contextMap = collectSceneContext(story);

  const promptEntries = [];
  for (const [imageName, context] of contextMap.entries()) {
    const prompt = buildPrompt(context, imageName);
    promptEntries.push({
      image: imageName,
      prompt,
    });
  }

  promptEntries.sort((a, b) => a.image.localeCompare(b.image));

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(promptEntries, null, 2), 'utf8');

  console.log(`Saved ${promptEntries.length} prompts to ${OUTPUT_PATH}`);
}

main();
