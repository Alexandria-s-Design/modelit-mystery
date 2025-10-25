// Regenerate images with inconsistent Dr. Maya character
const fs = require('fs');

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const API_KEY = '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';
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const IMAGE_MODEL = 'google/gemini-2.5-flash-image';

// Images that need regeneration based on visual review
// These show wrong characters, different ethnicities, or inconsistent features
const BAD_IMAGES = [
    'ch0_scene2_maya_excited',        // Different character style
    'ch1_scene2_cell_diagram',        // No character visible (diagram only)
    'ch1_scene3_receptors',           // No character visible (diagram only)
    'ch2_scene2_logic_gates',         // Different art style, no clear Maya
    'ch3_scene1_mutation_warning',    // Different character appearance
    'ch4_scene2_network_diagram',     // Different character features
    'ch5_scene2_feedback_cycles',     // No character visible (diagram only)
    'ch5_scene3_positive_feedback',   // Diagram only
    'ch6_scene2_control_systems',     // Different character style
    'ch7_scene2_prediction_models',   // Different character appearance
    'ch8_scene2_treatment_options',   // Different character style
    'ch8_scene3_drug_testing',        // No clear Maya visible
    'ch9_scene2_bistable_system'      // Different character features
];

// Enhanced character description with more detail for consistency
const CHARACTER_DESCRIPTION = `Dr. Maya, a warm and friendly African American female scientist with these EXACT features: natural curly/coily black hair styled in a neat bun, warm medium brown skin tone, large expressive brown eyes with long lashes, wearing a cyan/teal colored shirt or medical scrubs under a crisp white lab coat with "ModelIt!" logo patch, friendly welcoming smile, cartoon anime art style similar to educational games for middle school students, standing confidently in a modern biology laboratory`;

// Scene-specific prompts (regenerating bad ones)
const SCENE_PROMPTS = {
    'ch0_scene2_maya_excited': `${CHARACTER_DESCRIPTION}, gesturing excitedly with both hands raised, eyes sparkling with enthusiasm, big smile, blue laboratory background with scientific equipment, vibrant colors, kid-friendly educational game art`,

    'ch1_scene2_cell_diagram': `${CHARACTER_DESCRIPTION}, pointing at a holographic display showing a simple cell diagram with labeled components (nucleus, membrane, receptors), Maya is in the foreground looking at viewer with encouraging expression, high-tech lab setting`,

    'ch1_scene3_receptors': `${CHARACTER_DESCRIPTION}, holding a tablet showing receptor proteins on cell surface, explaining with one hand gesturing, warm teaching expression, modern biology lab background with blue lighting`,

    'ch2_scene2_logic_gates': `${CHARACTER_DESCRIPTION}, standing next to a holographic display of AND/OR logic gate diagrams with colorful nodes and connections, pointing at the diagram with teaching gesture, blue laboratory setting`,

    'ch3_scene1_mutation_warning': `${CHARACTER_DESCRIPTION}, looking concerned but determined, holding up warning device showing red alert symbols, dramatic blue and red lighting in laboratory, serious but caring expression`,

    'ch4_scene2_network_diagram': `${CHARACTER_DESCRIPTION}, gesturing toward a beautiful glowing network visualization showing connected nodes and pathways, excited teaching expression, futuristic laboratory background with cyan lighting`,

    'ch5_scene2_feedback_cycles': `${CHARACTER_DESCRIPTION}, explaining with circular hand gesture, holographic display showing feedback loop arrows in background, engaging teaching pose, bright modern lab setting`,

    'ch5_scene3_positive_feedback': `${CHARACTER_DESCRIPTION}, enthusiastically pointing to holographic spiral diagram showing amplifying feedback loop with upward arrows, excited expression, colorful laboratory background`,

    'ch6_scene2_control_systems': `${CHARACTER_DESCRIPTION}, standing confidently with arms gesturing to explain, holographic display of temperature control system in background, professional but friendly expression, blue laboratory setting`,

    'ch7_scene2_prediction_models': `${CHARACTER_DESCRIPTION}, looking thoughtfully at holographic projection showing branching pathways and future states, hand on chin in thinking pose, futuristic laboratory background`,

    'ch8_scene2_treatment_options': `${CHARACTER_DESCRIPTION}, holding tablet showing treatment options and pathways, hopeful encouraging expression, pointing at screen, modern medical laboratory background with blue and white tones`,

    'ch8_scene3_drug_testing': `${CHARACTER_DESCRIPTION}, examining holographic molecule structure floating in air, focused scientific expression, wearing safety goggles pushed up on forehead, blue laboratory setting`,

    'ch9_scene2_bistable_system': `${CHARACTER_DESCRIPTION}, gesturing with both hands showing two states (on/off), holographic display of bistable switch diagram in background, teaching expression, futuristic laboratory setting with cyan and purple lighting`
};

let regeneratedCount = 0;
let totalCost = 0;

async function regenerateImage(sceneName, prompt) {
    console.log(`\n🔄 [${regeneratedCount + 1}/${BAD_IMAGES.length}] Regenerating: ${sceneName}...`);

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

            // Save image
            const base64String = imageData.replace(/^data:image\/\w+;base64,/, '');
            const buffer = Buffer.from(base64String, 'base64');

            const filename = `images/scenes/${sceneName}.png`;

            // Backup old image
            const backupFilename = `images/scenes/old_${sceneName}.png`;
            if (fs.existsSync(filename)) {
                fs.copyFileSync(filename, backupFilename);
                console.log(`   📦 Backed up old image to: old_${sceneName}.png`);
            }

            fs.writeFileSync(filename, buffer);

            regeneratedCount++;
            totalCost += 0.039;

            console.log(`   ✅ Saved: ${filename} (${(buffer.length / 1024).toFixed(0)}KB)`);
            console.log(`   💰 Cost so far: $${totalCost.toFixed(2)}`);

            return filename;
        } else {
            console.error(`   ❌ Error: Unexpected response structure`);
            console.log(JSON.stringify(data, null, 2));
            return null;
        }
    } catch (error) {
        console.error(`   ❌ Error: ${error.message}`);
        return null;
    }
}

async function regenerateAll() {
    console.log('🔄 REGENERATING INCONSISTENT DR. MAYA IMAGES\n');
    console.log('═'.repeat(60));
    console.log(`Found ${BAD_IMAGES.length} images needing regeneration\n`);
    console.log('Character reference: Dr. Maya - African American female');
    console.log('with curly hair in bun, brown skin, big eyes, cyan shirt,');
    console.log('white lab coat, cartoon anime style\n');
    console.log('═'.repeat(60));

    for (const sceneName of BAD_IMAGES) {
        const prompt = SCENE_PROMPTS[sceneName];
        if (!prompt) {
            console.log(`\n⚠️  No prompt found for ${sceneName}, skipping...`);
            continue;
        }

        await regenerateImage(sceneName, prompt);

        // Wait 2 seconds between requests
        if (regeneratedCount < BAD_IMAGES.length) {
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }

    console.log('\n' + '═'.repeat(60));
    console.log('✅ REGENERATION COMPLETE!');
    console.log(`   Regenerated: ${regeneratedCount} images`);
    console.log(`   Total cost: $${totalCost.toFixed(2)}`);
    console.log(`   Backups saved with "old_" prefix`);
    console.log('═'.repeat(60));
}

regenerateAll().catch(console.error);
