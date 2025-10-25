const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..');
const voiceName = process.argv[2] || 'verse';
const outputFile = path.join(
  baseDir,
  'audio',
  'voice',
  `openai_${voiceName}_sample.mp3`
);

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.error('OPENAI_API_KEY not set. Please export it before running this script.');
  process.exit(1);
}

const text = `Hi there! I'm ${voiceName}, your OpenAI narrator for ModelIt Mystery. Ready to explore the science together?`;

async function synthesize() {
  const response = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini-tts',
      voice: voiceName,
      format: 'mp3',
      input: text,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `OpenAI TTS request failed (${response.status} ${response.statusText}): ${errorText}`
    );
  }

  const arrayBuffer = await response.arrayBuffer();
  fs.writeFileSync(outputFile, Buffer.from(arrayBuffer));
  console.log(`OpenAI voice sample saved to ${outputFile}`);
  console.log(`Voice used: ${voiceName}`);
}

synthesize().catch((error) => {
  console.error('Failed to generate OpenAI voice sample:', error);
  process.exit(1);
});
