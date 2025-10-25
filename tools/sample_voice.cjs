const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..');
const envPath = path.join(baseDir, '.env');

function loadApiKey() {
  if (process.env.GOOGLE_TTS_API_KEY) {
    return process.env.GOOGLE_TTS_API_KEY;
  }
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
    for (const line of lines) {
      if (line.startsWith('GOOGLE_TTS_API_KEY=')) {
        return line.split('=')[1].trim();
      }
    }
  }
  throw new Error('GOOGLE_TTS_API_KEY not found');
}

async function listVoices(apiKey) {
  const response = await fetch(
    `https://texttospeech.googleapis.com/v1/voices?languageCode=en-US&key=${apiKey}`
  );
  if (!response.ok) {
    throw new Error(`Failed to list voices: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  return data.voices || [];
}

async function synthesizeSample(apiKey, voiceName, outputFile, text) {
  const response = await fetch(
    `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: { text },
        voice: {
          languageCode: 'en-US',
          name: voiceName,
        },
        audioConfig: {
          audioEncoding: 'MP3',
          speakingRate: 1.0,
        },
      }),
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(
      `Synthesis failed (${response.status} ${response.statusText}): ${errText}`
    );
  }

  const data = await response.json();
  if (!data.audioContent) {
    throw new Error('Response missing audioContent');
  }

  const buffer = Buffer.from(data.audioContent, 'base64');
  fs.writeFileSync(outputFile, buffer);
  console.log(`Sample saved to ${outputFile}`);
}

async function main() {
  const apiKey = loadApiKey();
  const voices = await listVoices(apiKey);

  const candidates = voices.filter(
    (voice) =>
      voice.ssmlGender === 'FEMALE' &&
      voice.name.startsWith('en-US-Studio') &&
      !voice.name.includes('Multilingual')
  );

  if (candidates.length === 0) {
    console.log('No Studio female voices found; falling back to Neural2.');
    const neuralCandidates = voices.filter(
      (voice) => voice.ssmlGender === 'FEMALE' && voice.name.startsWith('en-US-Neural2')
    );
    if (neuralCandidates.length === 0) {
      throw new Error('No suitable female voices available.');
    }
    const voice = neuralCandidates[0];
    await synthesizeSample(
      apiKey,
      voice.name,
      path.join(baseDir, 'audio', 'voice', `${voice.name}_sample.mp3`),
      "Hi there! I'm your Neural voice for ModelIt Mystery. Let's tackle the next chapter together."
    );
    console.log(`Voice used: ${voice.name}`);
    return;
  }

  const selected = candidates[0];
  const samplePath = path.join(
    baseDir,
    'audio',
    'voice',
    `${selected.name}_sample.mp3`
  );

  await synthesizeSample(
    apiKey,
    selected.name,
    samplePath,
    "Hi there! I'm your Studio narrator for ModelIt Mystery. Ready to solve the mystery together?"
  );

  console.log('Selected Studio voice:', selected.name);
  console.log('Description:', selected);
}

main().catch((error) => {
  console.error('Voice sampling failed:', error);
  process.exit(1);
});
