// Image Generation using Gemini 2.5 Flash Image (Nano Banana)
// This generates images for the game scenes

const IMAGE_CONFIG = {
    API_KEY: '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',
    API_URL: 'https://openrouter.ai/api/v1/chat/completions',
    MODEL: 'google/gemini-2.5-flash-image-preview:free',
};

// Image prompts for different scenes
const IMAGE_PROMPTS = {
    drElena: `Professional portrait of Dr. Elena Rodriguez, a friendly Hispanic female scientist in her 30s,
              wearing a white lab coat, with warm brown eyes and dark hair in a ponytail,
              standing in a modern molecular biology laboratory with microscopes and screens in the background,
              photorealistic style, bright professional lighting, welcoming smile`,

    labCrisis: `Wide shot of a modern molecular biology research laboratory in slight disarray,
                computer screens showing unexpected data patterns in blue and green,
                petri dishes and lab equipment on benches,
                dramatic lighting suggesting urgency but not chaos,
                photorealistic, cinematic composition`,

    cellSignaling: `Scientific illustration of cellular signaling pathway,
                    showing a receptor protein on cell membrane receiving a signal molecule,
                    activating enzyme inside the cell,
                    clean modern medical illustration style,
                    blue and cyan color scheme matching Cell Collective branding,
                    educational diagram quality`,

    modelBuilding: `Scientist working at a large touchscreen display showing a network diagram,
                    nodes and connections in glowing blue and cyan,
                    modern lab environment,
                    view from over the shoulder,
                    photorealistic, futuristic but grounded aesthetic`,

    celebration: `Dr. Elena Rodriguez celebrating with raised fists in excitement,
                  big smile, lab coat,
                  background shows successful simulation results on screens,
                  confetti-like particle effects in blue and cyan,
                  photorealistic, joyful atmosphere`,
};

async function generateImage(promptKey) {
    const prompt = IMAGE_PROMPTS[promptKey];

    console.log(`🎨 Generating image: ${promptKey}...`);

    try {
        const response = await fetch(IMAGE_CONFIG.API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${IMAGE_CONFIG.API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://cellcollective.org',
                'X-Title': 'Cell Collective Modeling Game',
            },
            body: JSON.stringify({
                model: IMAGE_CONFIG.MODEL,
                messages: [
                    {
                        role: 'user',
                        content: prompt,
                    },
                ],
            }),
        });

        if (!response.ok) {
            throw new Error(`Image generation failed: ${response.status}`);
        }

        const data = await response.json();

        // Gemini returns the image URL in the response
        // Extract and return the image URL
        console.log('✅ Image generated successfully!', data);
        return data;

    } catch (error) {
        console.error(`❌ Failed to generate image for ${promptKey}:`, error);
        return null;
    }
}

// Generate all images for the game
async function generateAllImages() {
    console.log('🎨 Starting image generation for all scenes...');

    const images = {};

    for (const [key, prompt] of Object.entries(IMAGE_PROMPTS)) {
        const imageData = await generateImage(key);
        if (imageData) {
            images[key] = imageData;
        }
        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    console.log('✅ All images generated!', images);
    return images;
}

// Export for use in main game (CommonJS for Node.js compatibility)
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = { generateImage, generateAllImages, IMAGE_PROMPTS };
}
