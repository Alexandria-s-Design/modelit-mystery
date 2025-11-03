// Dialogue System with Image Support
// Click-to-continue narrative system

const DialogueSystem = {
    currentScene: 0,
    currentDialogue: 0,
    scenes: {},
    imageCache: {},

    // Define all dialogue scenes
    init() {
        this.scenes = {
            intro: [
                {
                    speaker: 'Dr. Elena Rodriguez',
                    text: "Hey there! I'm Dr. Elena, and I need YOUR help! Something weird is happening in my lab...",
                    image: 'drElena',
                    action: null,
                },
                {
                    speaker: 'Dr. Elena Rodriguez',
                    text: "My cells are acting super strange! We need to build a model to figure out what's going on!",
                    image: 'labCrisis',
                    action: null,
                },
                {
                    speaker: 'Dr. Elena Rodriguez',
                    text: "Ready to be a scientist and solve this mystery with me? Let's do this!",
                    image: 'drElena',
                    action: 'startStage1',
                },
            ],

            stage1Start: [
                {
                    speaker: 'Dr. Elena Rodriguez',
                    text: 'First step: Find the important pieces! Drag the right parts onto the board!',
                    image: 'modelBuilding',
                    action: 'showStage1Interface',
                },
            ],

            stage1Complete: [
                {
                    speaker: 'Dr. Elena Rodriguez',
                    text: "YES! You found them all - Signal, Receptor, and Enzyme! You're a natural scientist!",
                    image: 'drElena',
                    action: null,
                },
                {
                    speaker: 'Dr. Elena Rodriguez',
                    text: "Now the cool part - let's see how they talk to each other!",
                    image: 'cellSignaling',
                    action: 'startStage2',
                },
            ],

            stage2Start: [
                {
                    speaker: 'Dr. Elena Rodriguez',
                    text: 'Click to connect! Show me how the signal travels from piece to piece!',
                    image: 'modelBuilding',
                    action: 'showStage2Interface',
                },
            ],

            stage2Complete: [
                {
                    speaker: 'Dr. Elena Rodriguez',
                    text: 'AMAZING! You mapped the pathway perfectly!',
                    image: 'drElena',
                    action: null,
                },
                {
                    speaker: 'Dr. Elena Rodriguez',
                    text: "Last challenge: What's ON or OFF at the start? You decide!",
                    image: 'modelBuilding',
                    action: 'startStage3',
                },
            ],

            stage3Start: [
                {
                    speaker: 'Dr. Elena Rodriguez',
                    text: 'Click each piece to turn it ON (green) or OFF (red). What makes sense?',
                    image: 'cellSignaling',
                    action: 'showStage3Interface',
                },
            ],

            finale: [
                {
                    speaker: 'Dr. Elena Rodriguez',
                    text: "YOU DID IT! You're officially a computational biologist!",
                    image: 'celebration',
                    action: null,
                },
                {
                    speaker: 'Dr. Elena Rodriguez',
                    text: 'You just learned 3 super important modeling skills! High five! 🎉',
                    image: 'celebration',
                    action: 'showCompletionScreen',
                },
            ],
        };
    },

    // Show a dialogue scene
    showScene(sceneName) {
        this.currentScene = sceneName;
        this.currentDialogue = 0;
        this.showNextDialogue();
    },

    // Show next dialogue in current scene
    showNextDialogue() {
        const scene = this.scenes[this.currentScene];
        if (!scene || this.currentDialogue >= scene.length) {
            console.log('Scene complete');
            return;
        }

        const dialogue = scene[this.currentDialogue];
        this.renderDialogue(dialogue);

        // Set up click handler for next dialogue
        const storyPanel = document.getElementById('story-panel');
        storyPanel.style.cursor = 'pointer';

        // Remove old click handler and add new one
        const clickHandler = () => {
            this.currentDialogue++;
            if (this.currentDialogue < scene.length) {
                this.showNextDialogue();
            } else {
                // Scene complete, trigger action if any
                if (dialogue.action) {
                    this.triggerAction(dialogue.action);
                }
                storyPanel.style.cursor = 'default';
                storyPanel.removeEventListener('click', clickHandler);
            }
        };

        storyPanel.onclick = clickHandler;
    },

    // Render dialogue with image
    renderDialogue(dialogue) {
        const storyPanel = document.getElementById('story-panel');

        // Get image URL from cache or use placeholder
        const imageUrl = this.imageCache[dialogue.image] || this.getPlaceholderImage(dialogue.image);

        storyPanel.innerHTML = `
            <div class="scene-container">
                <div class="scene-image" style="
                    width: 100%;
                    height: 300px;
                    background-image: url('${imageUrl}');
                    background-size: cover;
                    background-position: center;
                    border-radius: 10px;
                    margin-bottom: 20px;
                    box-shadow: 0 4px 20px rgba(0, 212, 255, 0.3);
                    border: 2px solid #00d4ff;
                "></div>

                <div class="dialogue-container" style="
                    background: rgba(0, 212, 255, 0.1);
                    padding: 20px;
                    border-radius: 10px;
                    border-left: 4px solid #00d4ff;
                    animation: fadeIn 0.5s ease;
                ">
                    <div class="speaker-name" style="
                        font-weight: bold;
                        color: #00d4ff;
                        margin-bottom: 10px;
                        font-size: 18px;
                    ">${dialogue.speaker}</div>

                    <div class="dialogue-text" style="
                        line-height: 1.8;
                        color: #e0e0e0;
                        font-size: 16px;
                    ">${dialogue.text}</div>
                </div>

                <div class="continue-hint" style="
                    text-align: center;
                    margin-top: 20px;
                    color: #00d4ff;
                    font-size: 14px;
                    opacity: 0.7;
                    animation: pulse 2s infinite;
                ">
                    ▼ Click anywhere to continue ▼
                </div>
            </div>
        `;
    },

    // Get placeholder image based on type
    getPlaceholderImage(imageType) {
        // Use the beautiful SVG images we created
        if (window.SVGImages && window.SVGImages[imageType]) {
            return window.SVGImages[imageType];
        }

        // Fallback to simple placeholders
        const placeholders = {
            drElena: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect fill="%23193a52" width="400" height="300"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%2300d4ff" font-size="24" font-family="Arial">👩‍🔬 Dr. Elena Rodriguez</text></svg>',
            labCrisis: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect fill="%23193a52" width="400" height="300"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%2300d4ff" font-size="24" font-family="Arial">⚗️ Laboratory Scene</text></svg>',
            cellSignaling: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect fill="%23193a52" width="400" height="300"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%2300d4ff" font-size="24" font-family="Arial">🧬 Cell Signaling</text></svg>',
            modelBuilding: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect fill="%23193a52" width="400" height="300"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%2300d4ff" font-size="24" font-family="Arial">🔬 Model Building</text></svg>',
            celebration: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect fill="%23193a52" width="400" height="300"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%2300d4ff" font-size="36" font-family="Arial">🎉</text></svg>',
        };

        return placeholders[imageType] || placeholders.drElena;
    },

    // Load AI-generated image
    async loadImage(imageKey, imageUrl) {
        this.imageCache[imageKey] = imageUrl;
    },

    // Trigger action after dialogue complete
    triggerAction(actionName) {
        console.log(`Triggering action: ${actionName}`);

        const actions = {
            startStage1: () => window.gameActions?.startStage1(),
            showStage1Interface: () => window.gameActions?.showStage1Interface(),
            startStage2: () => window.gameActions?.startStage2(),
            showStage2Interface: () => window.gameActions?.showStage2Interface(),
            startStage3: () => window.gameActions?.startStage3(),
            showStage3Interface: () => window.gameActions?.showStage3Interface(),
            showCompletionScreen: () => window.gameActions?.showCompletionScreen(),
        };

        if (actions[actionName]) {
            setTimeout(actions[actionName], 500);
        }
    },
};

// Add pulse animation for continue hint
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { opacity: 0.5; }
        50% { opacity: 1; }
    }
`;
document.head.appendChild(style);

// Initialize on load
if (typeof window !== 'undefined') {
    window.DialogueSystem = DialogueSystem;
}
