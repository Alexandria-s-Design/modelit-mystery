// Download images from Nano Banana and save them locally
const fs = require('fs');
const https = require('https');

const API_KEY = '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';
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const IMAGE_MODEL = 'google/gemini-2.5-flash-image';

const imagePrompts = {
    drElena: "Cartoon anime style illustration of Dr. Maya, a cheerful African American female scientist in her 30s, big expressive eyes, natural curly hair in bun, warm friendly smile, wearing white lab coat with ModelIt! logo patch, blue and cyan color scheme, standing in modern biology lab, bright and colorful, kid-friendly art style appropriate for middle school students, engaging and approachable character design",

    lab: "Colorful cartoon anime style illustration of modern biology research laboratory, cute stylized computer screens showing blue glowing cell diagrams and data, friendly-looking microscopes and lab equipment with rounded edges, bright blue and cyan lighting, inviting and educational atmosphere, kid-friendly illustration style for middle school, ModelIt! branding colors",

    cellSignaling: "Educational cartoon anime style diagram showing cellular signaling pathway, cute stylized characters representing signal molecule, receptor, and enzyme, arrows showing communication flow, bright blue and cyan color palette, clean simple design perfect for middle school students, ModelIt! branding, playful but scientifically accurate, engaging illustration",

    modelBuilding: "Cartoon anime style illustration showing scientist working at holographic touchscreen with glowing network diagram, nodes and connections in bright blue and cyan, futuristic but friendly laboratory setting, kid-appropriate art style for middle school, ModelIt! branding, inspiring and exciting visual",

    celebration: "Joyful cartoon anime style scene of Dr. Maya celebrating success with raised arms and big happy smile, lab coat, sparkles and confetti in blue and cyan colors, computer screens showing successful model results, uplifting and fun atmosphere, kid-friendly celebration art for middle school students, ModelIt! style"
};

async function generateImage(imageName, prompt) {
    console.log(`\n🎨 Generating ${imageName}...`);

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://cellcollective.org',
            'X-Title': 'Cell Collective Modeling Game'
        },
        body: JSON.stringify({
            model: IMAGE_MODEL,
            messages: [{
                role: 'user',
                content: prompt
            }]
        })
    });

    if (!response.ok) {
        console.error(`❌ Failed to generate ${imageName}: ${response.status}`);
        return null;
    }

    const data = await response.json();
    console.log(`📦 Response received for ${imageName}`);

    if (data.choices && data.choices[0] && data.choices[0].message) {
        const message = data.choices[0].message;

        // Check for images array (base64 format)
        if (message.images && message.images.length > 0) {
            const imageData = message.images[0].image_url.url;
            console.log(`✅ Found base64 image data (length: ${imageData.length})`);
            return imageData;
        } else {
            console.log('⚠️ No images found in response');
            console.log('Message keys:', Object.keys(message));
            console.log('Content:', message.content);
        }
    }

    return null;
}

async function saveBase64Image(base64Data, filename) {
    // Extract base64 string from data URL
    // Format: data:image/png;base64,iVBORw0KGgo...
    const base64String = base64Data.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64String, 'base64');

    fs.writeFileSync(filename, buffer);
    console.log(`💾 Saved to ${filename} (${buffer.length} bytes)`);
}

async function main() {
    console.log('🚀 Starting image generation with Nano Banana...\n');

    const imageUrls = {};

    // Create images directory if it doesn't exist
    if (!fs.existsSync('images')) {
        fs.mkdirSync('images');
    }

    for (const [imageName, prompt] of Object.entries(imagePrompts)) {
        try {
            const imageData = await generateImage(imageName, prompt);

            if (imageData) {
                imageUrls[imageName] = imageName + '.png';

                // Save the base64 image
                const filename = `images/${imageName}.png`;
                await saveBase64Image(imageData, filename);
            }

            // Wait 3 seconds between requests to avoid rate limiting
            if (Object.keys(imagePrompts).indexOf(imageName) < Object.keys(imagePrompts).length - 1) {
                console.log('⏳ Waiting 3 seconds...');
                await new Promise(r => setTimeout(r, 3000));
            }

        } catch (error) {
            console.error(`❌ Error with ${imageName}:`, error.message);
        }
    }

    // Save URLs to a JSON file
    fs.writeFileSync('image-urls.json', JSON.stringify(imageUrls, null, 2));
    console.log('\n✅ All done! URLs saved to image-urls.json');
    console.log(imageUrls);
}

main().catch(console.error);
