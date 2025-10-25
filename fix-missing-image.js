// Regenerate the one missing image
const fs = require('fs');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const API_KEY = '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';
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const IMAGE_MODEL = 'google/gemini-2.5-flash-image';

const CHARACTER_DESCRIPTION = `Dr. Maya, a warm and friendly African American female scientist with these EXACT features: natural curly/coily black hair styled in a neat bun, warm medium brown skin tone, large expressive brown eyes with long lashes, wearing a cyan/teal colored shirt or medical scrubs under a crisp white lab coat with "ModelIt!" logo patch, friendly welcoming smile, cartoon anime art style similar to educational games for middle school students, standing confidently in a modern biology laboratory`;

const sceneName = 'ch2_scene2_logic_gates';
const prompt = `${CHARACTER_DESCRIPTION}, standing next to a holographic display of AND/OR logic gate diagrams with colorful nodes and connections, pointing at the diagram with teaching gesture, blue laboratory setting`;

async function regenerateMissing() {
    console.log(`🔄 Regenerating missing image: ${sceneName}...\n`);

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://cellcollective.org',
                'X-Title': 'ModelIt! Story Game'
            },
            body: JSON.stringify({
                model: IMAGE_MODEL,
                messages: [{
                    role: 'user',
                    content: prompt
                }]
            })
        });

        const data = await response.json();

        if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.images) {
            const imageData = data.choices[0].message.images[0].image_url.url;
            const base64String = imageData.replace(/^data:image\/\w+;base64,/, '');
            const buffer = Buffer.from(base64String, 'base64');

            const filename = `images/scenes/${sceneName}.png`;
            fs.writeFileSync(filename, buffer);

            console.log(`✅ Saved: ${filename} (${(buffer.length / 1024).toFixed(0)}KB)`);
            console.log(`💰 Cost: $0.039`);
            console.log(`\n✅ All images now complete!`);
        } else {
            console.error(`❌ Error: Unexpected response`);
        }
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
    }
}

regenerateMissing().catch(console.error);
