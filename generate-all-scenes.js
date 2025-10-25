// Generate ALL unique scene images for ModelIt!
const fs = require('fs');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const API_KEY = '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';
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const IMAGE_MODEL = 'google/gemini-2.5-flash-image';

// Scene-specific image prompts for EVERY major scene
const scenePrompts = {
    // CHAPTER 0: The Discovery
    "ch0_scene1_maya_intro": "Cartoon anime style illustration of Dr. Maya, cheerful African American female scientist with big expressive eyes, natural curly hair in bun, wearing white lab coat with ModelIt! patch, standing confidently in modern biology lab, warm welcoming pose with hands gesturing invitation, bright blue and cyan laboratory lighting, colorful equipment in background, kid-friendly art for middle school, inviting and friendly atmosphere",

    "ch0_scene2_glowing_cells": "Cartoon anime style dramatic scene showing glowing blue cells in Petri dish under microscope, Dr. Maya leaning over microscope with surprised amazed expression, blue pulsing bioluminescent cells creating dramatic lighting on her face, modern laboratory at night with blue accent lights, mysterious but exciting atmosphere, kid-friendly illustration, ModelIt! aesthetic",

    "ch0_scene3_modeling_explanation": "Cartoon anime style educational illustration of Dr. Maya pointing at holographic display showing a simple biological model diagram, glowing blue network of connected nodes, her excited expression teaching, modern interactive lab screen, colorful and engaging, middle school appropriate, ModelIt! branding colors blue and cyan",

    // CHAPTER 1: Hunting for Clues
    "ch1_scene1_microscope_view": "Cartoon anime style close-up view through high-tech microscope showing three distinct biological components - glowing signal protein (blue sphere with sparkles), cell membrane receptor (purple docking station), and internal enzyme (green catalyst shape), clean educational diagram style, bright colors, kid-friendly scientific illustration, ModelIt! color scheme",

    "ch1_scene2_three_components": "Cartoon anime style diagram showing cellular signaling pathway with cute character-like representations - Signal (friendly blue messenger), Receptor (purple gate on cell wall), Enzyme (green helper inside cell), arrows showing communication between them, educational but fun, bright blue and cyan colors, perfect for middle school",

    "ch1_scene3_mysterious_signal": "Cartoon anime style dramatic scene of Dr. Maya looking concerned at computer screen showing data about unknown signal source, blue warning indicators on screen, mysterious atmosphere but not scary, laboratory background, kid-appropriate thriller mood, ModelIt! aesthetic",

    // CHAPTER 2: Connect the Dots
    "ch2_scene1_network_mapping": "Cartoon anime style scene of Dr. Maya working at large interactive touchscreen displaying glowing network diagram with animated connections between nodes, her hands touching screen creating ripple effects, futuristic but friendly lab environment, blue and cyan holographic interface, exciting scientific discovery moment",

    "ch2_scene2_chain_reaction": "Cartoon anime style animated sequence diagram showing Signal → Receptor → Enzyme → Glow pathway with motion lines and sparkle effects, domino effect visual metaphor, bright energetic colors, educational animation freeze-frame style, kid-friendly science illustration",

    "ch2_scene3_changing_pattern": "Cartoon anime style dramatic scene showing Dr. Maya at computer with multiple screens displaying rapidly changing cell data graphs, her surprised concerned expression, fast-paced data visualization in blue and cyan, exciting discovery moment, middle school appropriate",

    // CHAPTER 3: The Starting Point
    "ch3_scene1_lab_notes": "Cartoon anime style scene of Dr. Maya flipping through her lab notebook with detailed diagrams and notes visible, sitting at lab bench surrounded by equipment, studious focused expression, colorful organized laboratory, educational atmosphere, ModelIt! style",

    "ch3_scene2_initial_state_diagram": "Cartoon anime style educational diagram showing three components (Signal, Receptor, Enzyme) in their 'OFF' initial state with clear labels and status indicators (red OFF lights), clean technical illustration style perfect for kids, bright ModelIt! colors",

    "ch3_scene3_different_results": "Cartoon anime style split-screen comparison showing same experiment with different outcomes on two lab benches, Dr. Maya in center looking puzzled, identical setups but different glowing patterns, mystery visual, kid-friendly scientific investigation scene",

    // CHAPTER 4: Cracking the Code
    "ch4_scene1_logic_gates": "Cartoon anime style educational diagram of biological AND gate - showing IF (Receptor ON) AND (Signal present) THEN (Enzyme ON), logic circuit style with biological components, bright colors, easy to understand for middle school, ModelIt! educational design",

    "ch4_scene2_decoding_rules": "Cartoon anime style scene of Dr. Maya surrounded by floating holographic logic diagrams and equations, her triumphant 'aha!' expression, mathematical symbols mixed with biological icons, colorful exciting discovery moment, kid-appropriate complexity",

    "ch4_scene3_cells_spreading": "Cartoon anime style dramatic scene showing multiple Petri dishes with glowing cells multiplying and spreading, Dr. Maya's alarmed but determined expression, emergency red warning lights mixing with blue glow, exciting escalation moment, not scary but urgent feel",

    // CHAPTER 5: The Big Picture
    "ch5_scene1_state_space_map": "Cartoon anime style comprehensive diagram showing all 8 possible states of the system as interconnected nodes in a network, Dr. Maya pointing at the visualization on large screen, colorful state bubbles with arrows between them, educational complexity made kid-friendly",

    "ch5_scene2_cycling_states": "Cartoon anime style animated diagram showing system cycling through multiple states with motion trail effects, circular pathway visualization, bright energetic colors showing dynamic behavior, educational animation style for middle school",

    "ch5_scene3_final_state": "Cartoon anime style diagram emphasizing one glowing attractor state that all paths lead to, magnetic pull visual metaphor with arrows converging, Dr. Maya's concerned realization expression in corner, educational but dramatic, ModelIt! colors",

    // CHAPTER 6: The Hidden Loop
    "ch6_scene1_feedback_discovery": "Cartoon anime style dramatic revelation scene showing Dr. Maya discovering hidden feedback loop in the diagram, her shocked amazed expression, missing connection appearing as glowing line, 'eureka moment' visual, exciting scientific discovery for kids",

    "ch6_scene2_negative_feedback": "Cartoon anime style educational diagram of negative feedback loop - Enzyme inhibiting Receptor with circular arrow, thermostat analogy shown in side panel, clear educational illustration, bright colors, perfect for middle school understanding",

    "ch6_scene3_encrypted_message": "Cartoon anime style thrilling scene of Dr. Maya reading mysterious encrypted message on her computer screen, green text on dark screen, her startled expression, dramatic lighting but kid-appropriate thriller mood, ModelIt! aesthetic",

    // CHAPTER 7: What Happens Next?
    "ch7_scene1_simulation_screen": "Cartoon anime style scene of Dr. Maya running simulation on multiple holographic screens showing predicted outcomes, futuristic interface with graphs and timelines, her focused analytical expression, blue and cyan data visualizations",

    "ch7_scene2_prediction_diagram": "Cartoon anime style before-and-after diagram showing predicted system behavior when signal is cut - components shutting down in sequence, timeline arrows, clear cause-and-effect visual, educational prediction illustration",

    "ch7_scene3_ventilation_check": "Cartoon anime style scene of Dr. Maya looking up at laboratory ventilation system with glowing blue signal particles floating through air ducts, discovery moment, mysterious but not scary, kid-appropriate investigation scene",

    // CHAPTER 8: Shake Things Up
    "ch8_scene1_experiment_setup": "Cartoon anime style scene showing Dr. Maya setting up multiple test tubes and equipment for perturbation experiments, organized scientific setup, her determined scientist expression, colorful lab equipment, ModelIt! color scheme",

    "ch8_scene2_test_results": "Cartoon anime style three-panel results display showing different experimental outcomes - cells at 50% signal (slow pulse), 200% signal (fast pulse), no enzyme (stopped), clear visual comparison, educational results presentation",

    "ch8_scene3_power_outage": "Cartoon anime style dramatic scene of lights flickering and going out in laboratory, Dr. Maya illuminated by blue glow of still-glowing cells, her shocked realization, exciting plot twist moment, kid-appropriate drama",

    // CHAPTER 9: Reality Check
    "ch9_scene1_validation_comparison": "Cartoon anime style split screen showing model prediction on left side matching real cell behavior on right side, Dr. Maya comparing data with satisfied expression, graphs and diagrams aligning perfectly, educational validation concept",

    "ch9_scene2_evolved_feedback": "Cartoon anime style updated network diagram showing new evolved feedback loop appearing, glowing new connection forming, Dr. Maya's amazed expression, beautiful visual of system adaptation, ModelIt! educational design",

    "ch9_scene3_intruder_alert": "Cartoon anime style exciting scene showing laboratory door with red security alert, mysterious shadow at door, Dr. Maya in foreground looking alarmed at emergency message on screen, thriller moment appropriate for kids",

    // CHAPTER 10: The Final Model
    "ch10_scene1_final_iteration": "Cartoon anime style scene of Dr. Maya working intensely with multiple holographic model iterations floating around her, each iteration numbered 1-2-3, her determined problem-solving expression, dramatic but positive energy",

    "ch10_scene2_solution_found": "Cartoon anime style triumphant diagram showing dual-target solution - both Enzyme AND Receptor highlighted as targets, Dr. Maya's 'eureka!' victorious expression, clear winning strategy visualization, exciting success moment",

    "ch10_scene3_cells_healing": "Cartoon anime style beautiful scene of cells returning to normal healthy state, blue glow fading to natural color, Dr. Maya administering treatment, hopeful healing visual, positive resolution mood",

    "ch10_scene4_mysterious_note": "Cartoon anime style scene of Dr. Maya holding official-looking note with government seal, her surprised but proud expression, dramatic lighting suggesting important revelation, mysterious but positive ending mood",

    "ch10_scene5_celebration": "Cartoon anime style joyful celebration scene with Dr. Maya and player (viewer perspective) high-fiving in foreground, laboratory in background with successful results on screens, blue and cyan confetti-like particles, uplifting victorious atmosphere, ModelIt! celebration theme",

    "ch10_scene6_victory_badge": "Cartoon anime style design of official Computational Biologist achievement badge showing DNA helix, microscope, and network diagram symbols, gold and blue colors, kid-friendly certificate design, ModelIt! branding, pride and accomplishment visual"
};

let generatedCount = 0;
let totalCost = 0;

async function generateSceneImage(sceneName, prompt) {
    console.log(`\n🎨 [${generatedCount + 1}/50] Generating: ${sceneName}...`);

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

        if (!response.ok) {
            console.error(`❌ Failed: ${response.status}`);
            return null;
        }

        const data = await response.json();

        if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.images) {
            const imageData = data.choices[0].message.images[0].image_url.url;

            // Save image
            const base64String = imageData.replace(/^data:image\/\w+;base64,/, '');
            const buffer = Buffer.from(base64String, 'base64');

            const filename = `images/scenes/${sceneName}.png`;
            fs.writeFileSync(filename, buffer);

            generatedCount++;
            totalCost += 0.039;

            console.log(`✅ Saved: ${filename} (${(buffer.length / 1024).toFixed(0)}KB)`);
            console.log(`   💰 Cost so far: $${totalCost.toFixed(2)}`);

            return filename;
        } else {
            console.error('⚠️  No image in response');
            return null;
        }
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        return null;
    }
}

async function generateAllScenes() {
    console.log('🚀 ModelIt! Scene Image Generation');
    console.log(`📊 Total scenes to generate: ${Object.keys(scenePrompts).length}`);
    console.log(`💵 Estimated cost: $${(Object.keys(scenePrompts).length * 0.039).toFixed(2)}`);
    console.log('═'.repeat(50));

    // Create scenes directory
    if (!fs.existsSync('images/scenes')) {
        fs.mkdirSync('images/scenes', { recursive: true });
    }

    const sceneMapping = {};

    for (const [sceneName, prompt] of Object.entries(scenePrompts)) {
        const filename = await generateSceneImage(sceneName, prompt);

        if (filename) {
            sceneMapping[sceneName] = filename;
        }

        // Wait 2 seconds between requests
        if (Object.keys(scenePrompts).indexOf(sceneName) < Object.keys(scenePrompts).length - 1) {
            console.log('⏳ Waiting 2 seconds...');
            await new Promise(r => setTimeout(r, 2000));
        }
    }

    // Save mapping
    fs.writeFileSync('scene-image-mapping.json', JSON.stringify(sceneMapping, null, 2));

    console.log('\n' + '═'.repeat(50));
    console.log(`✅ COMPLETE! Generated ${generatedCount} images`);
    console.log(`💰 Total cost: $${totalCost.toFixed(2)}`);
    console.log(`📁 Mapping saved to: scene-image-mapping.json`);
}

generateAllScenes().catch(console.error);
