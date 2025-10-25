const fs = require('fs');
const path = require('path');
const vm = require('vm');

const baseDir = path.join(__dirname, '..');
const storyCode = fs.readFileSync(path.join(baseDir, 'story-data.js'), 'utf8');
const sandbox = {};

vm.createContext(sandbox);
vm.runInContext(`${storyCode}; this.STORY_DATA = STORY_DATA;`, sandbox);

const story = sandbox.STORY_DATA;
const voiceDir = path.join(baseDir, 'audio', 'voice');
const imageDir = path.join(baseDir, 'images', 'scenes');

const voiceSet = new Set(fs.readdirSync(voiceDir));
const imageSet = new Set(fs.readdirSync(imageDir));

const missingVoices = new Set();
const missingImages = new Set();
const pathTaken = [];

let chapterIndex = 0;

while (true) {
  const chapter = story.chapters[chapterIndex];
  if (!chapter) break;

  pathTaken.push(`${chapter.id}: ${chapter.title}`);

  chapter.scenes.forEach((scene, sceneIdx) => {
    const voiceFile = `ch${chapter.id}_scene${sceneIdx}.mp3`;
    if (!voiceSet.has(voiceFile)) {
      missingVoices.add(voiceFile);
    }

    if (scene.image) {
      const fileName = path.basename(scene.image);
      if (!imageSet.has(fileName)) {
        missingImages.add(`${chapter.id}:${sceneIdx}:${fileName}`);
      }
    }
  });

  if (!chapter.choice) break;

  const choiceVoice = `ch${chapter.id}_choice.mp3`;
  if (!voiceSet.has(choiceVoice)) {
    missingVoices.add(choiceVoice);
  }

  const winningOption = chapter.choice.options.find((option) => !option.gameOver);
  if (!winningOption) {
    break;
  }

  const winningIndex = chapter.choice.options.indexOf(winningOption);

  let feedbackFile;
  if (winningOption.voiceKey) {
    feedbackFile = `ch${chapter.id}_${winningOption.voiceKey}.mp3`;
  } else if (chapter.title.includes('BOSS')) {
    feedbackFile = `ch${chapter.id}_correct.mp3`;
  } else {
    feedbackFile = `ch${chapter.id}_feedback${winningIndex + 1}.mp3`;
  }

  if (!voiceSet.has(feedbackFile)) {
    missingVoices.add(feedbackFile);
  }

  chapterIndex = winningOption.next;
}

console.log('Visited chapters in winning path:');
pathTaken.forEach((entry) => console.log(` - ${entry}`));
console.log('\nMissing voice files:', Array.from(missingVoices));
console.log('Missing image references:', Array.from(missingImages));
