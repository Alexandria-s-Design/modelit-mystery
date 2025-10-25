// Cell Collective: The Modeling Mystery - Act 1 (Version 2)
// With Click-to-Continue Dialogue and Image Support

// Configuration
const CONFIG = {
    OPENROUTER_API_KEY: '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',
    OPENROUTER_API_URL: 'https://openrouter.ai/api/v1/chat/completions',
    AI_MODEL: 'google/gemini-2.0-flash-exp:free',
    IMAGE_MODEL: 'google/gemini-2.5-flash-image',
    REQUIRED_COMPONENTS: ['Receptor', 'Signal', 'Enzyme'],
};

// Game State
const gameState = {
    placedComponents: [],
    completedFundamentals: [],
    currentStage: 0,
    attempts: 0,
    hintsUsed: 0
};

// DOM Elements
let storyPanel, interactivePanel, modelCanvas, checkBtn, hintBtn, aiFeedback, instructionText;

// Initialize the game
function initGame() {
    // Get DOM elements
    storyPanel = document.getElementById('story-panel');
    interactivePanel = document.getElementById('interactive-panel');
    modelCanvas = document.getElementById('model-canvas');
    checkBtn = document.getElementById('check-btn');
    hintBtn = document.getElementById('hint-btn');
    aiFeedback = document.getElementById('ai-feedback');
    instructionText = document.getElementById('instruction-text');

    // Initialize dialogue system
    DialogueSystem.init();

    // Set up global game actions for dialogue system
    window.gameActions = {
        startStage1: () => showStage1(),
        showStage1Interface: () => showGameInterface(1),
        startStage2: () => showStage2(),
        showStage2Interface: () => showGameInterface(2),
        startStage3: () => showStage3(),
        showStage3Interface: () => showGameInterface(3),
        showCompletionScreen: () => showCompletion()
    };

    // Start with intro dialogue
    DialogueSystem.showScene('intro');

    console.log('🎮 Game v2 initialized with dialogue system!');
}

// Show game interface (hide story, show interactive panel)
function showGameInterface(stage) {
    storyPanel.style.width = '40%';
    interactivePanel.classList.add('active');

    gameState.currentStage = stage;

    if (stage === 1) {
        setupStage1();
    }
}

// Stage 1: Identify Components
function showStage1() {
    DialogueSystem.showScene('stage1Start');
}

function setupStage1() {
    instructionText.textContent = 'Drag THREE pieces onto the board: Signal (📡), Receptor (🎯), and Enzyme (⚗️)';
    setupDragAndDrop();
    checkBtn.onclick = checkStage1;
}

// Stage 2: Define Relationships
function showStage2() {
    DialogueSystem.showScene('stage2Start');
}

function setupStage2() {
    instructionText.textContent = 'Click one piece, then another to connect them! Signal → Receptor → Enzyme';
    enableConnectionDrawing();
}

// Stage 3: Set Initial Conditions
function showStage3() {
    DialogueSystem.showScene('stage3Start');
}

function setupStage3() {
    instructionText.textContent = 'Click each piece to flip it ON (green) or OFF (red). Which one starts the reaction?';
    enableStateSelection();
}

// Drag and Drop System
function setupDragAndDrop() {
    const componentItems = document.querySelectorAll('.component-item');

    componentItems.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
    });

    modelCanvas.addEventListener('dragover', handleDragOver);
    modelCanvas.addEventListener('drop', handleDrop);
}

let draggedComponent = null;

function handleDragStart(e) {
    if (this.classList.contains('used')) return;
    draggedComponent = this.dataset.component;
    this.style.opacity = '0.5';
}

function handleDragEnd(e) {
    this.style.opacity = '1';
}

function handleDragOver(e) {
    e.preventDefault();
    return false;
}

function handleDrop(e) {
    e.preventDefault();

    if (!draggedComponent) return;

    const rect = modelCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left - 40;
    const y = e.clientY - rect.top - 40;

    if (x < 10 || y < 10 || x > rect.width - 90 || y > rect.height - 90) {
        showFeedback('⚠️ Try placing components away from the edges!', 'warning');
        return;
    }

    placeComponent(draggedComponent, x, y);

    const paletteItem = document.querySelector(`[data-component="${draggedComponent}"]`);
    paletteItem.classList.add('used');

    draggedComponent = null;

    if (gameState.placedComponents.length >= 2) {
        checkBtn.disabled = false;
    }
}

function placeComponent(componentName, x, y) {
    const component = document.createElement('div');
    component.className = 'placed-component';
    component.textContent = componentName;
    component.style.left = x + 'px';
    component.style.top = y + 'px';
    component.dataset.component = componentName;

    component.addEventListener('dblclick', () => removeComponent(component));

    modelCanvas.appendChild(component);

    gameState.placedComponents.push({
        name: componentName,
        x: x,
        y: y,
        element: component
    });
}

function removeComponent(componentElement) {
    const componentName = componentElement.dataset.component;
    componentElement.remove();

    gameState.placedComponents = gameState.placedComponents.filter(
        c => c.element !== componentElement
    );

    const paletteItem = document.querySelector(`.component-item[data-component="${componentName}"]`);
    if (paletteItem) {
        paletteItem.classList.remove('used');
    }

    if (gameState.placedComponents.length < 2) {
        checkBtn.disabled = true;
    }
}

// Check Stage 1
async function checkStage1() {
    gameState.attempts++;

    const placedNames = gameState.placedComponents.map(c => c.name);
    const isCorrect = CONFIG.REQUIRED_COMPONENTS.every(comp => placedNames.includes(comp));

    showFeedback('🤖 Analyzing your model...', 'loading');

    const feedback = await getAIFeedback(placedNames, isCorrect);

    if (isCorrect && placedNames.length === CONFIG.REQUIRED_COMPONENTS.length) {
        showFeedback(feedback, 'success');
        completeFundamental(1);

        setTimeout(() => {
            // Hide interactive panel, show dialogue
            interactivePanel.classList.remove('active');
            storyPanel.style.width = '100%';
            DialogueSystem.showScene('stage1Complete');
        }, 3000);
    } else {
        showFeedback(feedback, 'error');
    }
}

// Connection Drawing (Stage 2)
function enableConnectionDrawing() {
    let selectedComponent = null;
    const connections = [];

    const components = document.querySelectorAll('.placed-component');

    components.forEach(comp => {
        comp.style.cursor = 'pointer';

        comp.onclick = function() {
            if (!selectedComponent) {
                selectedComponent = this;
                this.style.border = '4px solid #ffff00';
                this.style.boxShadow = '0 0 30px rgba(255, 255, 0, 0.8)';
            } else if (selectedComponent === this) {
                this.style.border = '3px solid #ffffff';
                this.style.boxShadow = '0 4px 15px rgba(0, 212, 255, 0.6)';
                selectedComponent = null;
            } else {
                drawConnection(selectedComponent, this);
                connections.push({
                    from: selectedComponent.dataset.component,
                    to: this.dataset.component
                });

                selectedComponent.style.border = '3px solid #ffffff';
                selectedComponent.style.boxShadow = '0 4px 15px rgba(0, 212, 255, 0.6)';
                selectedComponent = null;

                if (connections.length >= 2) {
                    checkBtn.disabled = false;
                }
            }
        };
    });

    checkBtn.onclick = () => checkStage2(connections);
}

function drawConnection(fromElement, toElement) {
    const fromRect = fromElement.getBoundingClientRect();
    const toRect = toElement.getBoundingClientRect();
    const canvasRect = modelCanvas.getBoundingClientRect();

    const x1 = fromRect.left + fromRect.width / 2 - canvasRect.left;
    const y1 = fromRect.top + fromRect.height / 2 - canvasRect.top;
    const x2 = toRect.left + toRect.width / 2 - canvasRect.left;
    const y2 = toRect.top + toRect.height / 2 - canvasRect.top;

    const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

    const line = document.createElement('div');
    line.className = 'connection-line';
    line.style.width = length + 'px';
    line.style.left = x1 + 'px';
    line.style.top = y1 + 'px';
    line.style.transform = `rotate(${angle}deg)`;

    modelCanvas.appendChild(line);
}

async function checkStage2(connections) {
    const correctConnections = [
        { from: 'Signal', to: 'Receptor' },
        { from: 'Receptor', to: 'Enzyme' }
    ];

    const isCorrect = correctConnections.every(correct =>
        connections.some(conn => conn.from === correct.from && conn.to === correct.to)
    );

    showFeedback('🤖 Analyzing connections...', 'loading');

    const feedback = await getConnectionFeedback(connections, isCorrect);

    if (isCorrect) {
        showFeedback(feedback, 'success');
        completeFundamental(2);

        setTimeout(() => {
            interactivePanel.classList.remove('active');
            storyPanel.style.width = '100%';
            DialogueSystem.showScene('stage2Complete');
        }, 3000);
    } else {
        showFeedback(feedback, 'error');
    }
}

// State Selection (Stage 3)
function enableStateSelection() {
    const components = document.querySelectorAll('.placed-component');
    const states = {};

    components.forEach(comp => {
        const componentName = comp.dataset.component;
        states[componentName] = 0;

        const stateIndicator = document.createElement('div');
        stateIndicator.style.cssText = `
            position: absolute;
            bottom: -25px;
            left: 50%;
            transform: translateX(-50%);
            background: #ff0000;
            color: white;
            padding: 2px 8px;
            border-radius: 10px;
            font-size: 10px;
            font-weight: bold;
        `;
        stateIndicator.textContent = 'OFF';
        comp.appendChild(stateIndicator);

        comp.onclick = function() {
            states[componentName] = states[componentName] === 0 ? 1 : 0;

            if (states[componentName] === 1) {
                stateIndicator.textContent = 'ON';
                stateIndicator.style.background = '#00ff00';
                this.style.background = 'linear-gradient(135deg, #00ff00 0%, #00cc00 100%)';
            } else {
                stateIndicator.textContent = 'OFF';
                stateIndicator.style.background = '#ff0000';
                this.style.background = 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)';
            }

            checkBtn.disabled = false;
        };
    });

    checkBtn.onclick = () => checkStage3(states);
}

async function checkStage3(states) {
    const isCorrect = states['Signal'] === 1 && states['Receptor'] === 0 && states['Enzyme'] === 0;

    showFeedback('🤖 Evaluating initial conditions...', 'loading');

    const feedback = await getInitialStateFeedback(states, isCorrect);

    if (isCorrect) {
        showFeedback(feedback, 'success');
        completeFundamental(3);

        setTimeout(() => {
            interactivePanel.classList.remove('active');
            storyPanel.style.width = '100%';
            DialogueSystem.showScene('finale');
        }, 3000);
    } else {
        showFeedback(feedback + ' Think about what starts the cascade!', 'warning');
    }
}

// AI Functions (same as before)
async function getAIFeedback(placedComponents, isCorrect) {
    const prompt = `You are Dr. Elena, a super enthusiastic scientist talking to a 10-year-old kid who's learning science.

The kid just tried to find components: ${placedComponents.join(', ')}
The correct answer is: Receptor, Signal, Enzyme

Was it correct? ${isCorrect ? 'YES' : 'NO'}

${isCorrect ?
    'Give them SUPER EXCITED praise! Use 2 SHORT sentences. Add a cool real-world example like "This is how your body knows when to feel hungry!" or "This is how your brain sends messages!" Keep it simple and FUN!' :
    'Give them a hint in a FUN way! Use 2 SHORT sentences. Be encouraging! Maybe use an analogy like "Think of it like a phone call - you need someone to call, a phone, and someone to answer!"'}

Talk like you're talking to a kid. Short sentences. Lots of energy!`;

    try {
        const response = await callOpenRouter(prompt);
        return response;
    } catch (error) {
        return isCorrect ?
            '🎉 Excellent work! You identified the key components correctly!' :
            '🤔 Not quite right. Think about what receives signals, what the signal is, and what processes it.';
    }
}

async function getConnectionFeedback(connections, isCorrect) {
    const prompt = `You're Dr. Elena talking to a kid. They connected: ${connections.map(c => `${c.from} → ${c.to}`).join(', ')}

Correct path: Signal → Receptor → Enzyme

Correct? ${isCorrect ? 'YES' : 'NO'}

${isCorrect ?
    'Give MEGA EXCITED praise in 2 SHORT sentences! Add a fun example like "Just like dominoes knocking each other down!" or "Like passing a note in class!"' :
    'Give a fun hint in 2 SHORT sentences! Use an analogy like "Think of a relay race - who starts, who's in the middle, who finishes?"'}

Talk to a kid. Be SUPER enthusiastic!`;

    try {
        return await callOpenRouter(prompt);
    } catch (error) {
        return isCorrect ?
            '🎉 Perfect! You understand how signals flow through the system!' :
            '🤔 Think about the signal\'s journey: it reaches the receptor first, then the receptor activates the enzyme.';
    }
}

async function getInitialStateFeedback(states, isCorrect) {
    const stateDescription = Object.entries(states)
        .map(([comp, state]) => `${comp}: ${state === 1 ? 'ON' : 'OFF'}`)
        .join(', ');

    const prompt = `You're Dr. Elena talking to a kid. They set: ${stateDescription}

Correct answer: Signal ON, Receptor OFF, Enzyme OFF (signal starts it!)

Correct? ${isCorrect ? 'YES' : 'NO'}

${isCorrect ?
    'CELEBRATE BIG TIME in 2 SHORT sentences! Say they completed Act 1! Add something like "You just solved the mystery!"' :
    'Give a fun hint in 2 SHORT sentences! Like "What arrives first to wake everything up?" or "Think of turning on a TV - what button do you press first?"'}

Be SUPER excited and fun!`;

    try {
        return await callOpenRouter(prompt);
    } catch (error) {
        return isCorrect ?
            '🎉 Perfect! You understand initial conditions! Act 1 complete!' :
            '🤔 Remember, the signal arrives from outside to start the cascade.';
    }
}

async function callOpenRouter(prompt) {
    const response = await fetch(CONFIG.OPENROUTER_API_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${CONFIG.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://cellcollective.org',
            'X-Title': 'Cell Collective Modeling Game'
        },
        body: JSON.stringify({
            model: CONFIG.AI_MODEL,
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
            max_tokens: 150
        })
    });

    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const data = await response.json();
    return data.choices[0].message.content.trim();
}

// UI Helpers
function formatAIResponse(text) {
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    text = text.replace(/\n/g, '<br>');
    return text;
}

function showFeedback(message, type = 'info') {
    aiFeedback.className = 'visible';

    const icons = {
        loading: '<div class="spinner"></div>',
        success: '✅',
        error: '❌',
        warning: '⚠️',
        hint: '💡',
        info: '🤖'
    };

    const formattedMessage = formatAIResponse(message);

    aiFeedback.innerHTML = `
        <span class="ai-icon">${icons[type] || icons.info}</span>
        <span style="line-height: 1.6;">${formattedMessage}</span>
    `;

    if (type !== 'success' && type !== 'loading') {
        setTimeout(() => { aiFeedback.className = ''; }, 10000);
    }
}

function completeFundamental(number) {
    if (!gameState.completedFundamentals.includes(number)) {
        gameState.completedFundamentals.push(number);
        document.querySelectorAll('.fundamental-badge')[number - 1].classList.add('completed');
    }
}

function showCompletion() {
    // Show final completion screen
    storyPanel.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <h1 style="font-size: 120px; margin-bottom: 20px; animation: pulse 1s infinite;">🎉</h1>
            <h2 style="color: #00d4ff; margin-bottom: 20px; font-size: 48px;">YOU'RE A SCIENTIST!</h2>
            <p style="font-size: 24px; line-height: 1.8; max-width: 600px; margin: 0 auto; color: #fff;">
                You just learned THREE super cool science skills!
                <br><br>
                <strong style="color: #00d4ff; font-size: 28px;">⭐ Your Science Badge ⭐</strong><br>
                <div style="background: linear-gradient(135deg, rgba(0, 212, 255, 0.3) 0%, rgba(0, 153, 204, 0.3) 100%);
                            padding: 30px;
                            border-radius: 20px;
                            margin-top: 20px;
                            border: 3px solid #00d4ff;">
                    <div style="font-size: 20px; margin: 10px 0;">✅ Find Important Pieces</div>
                    <div style="font-size: 20px; margin: 10px 0;">✅ Connect Them Together</div>
                    <div style="font-size: 20px; margin: 10px 0;">✅ Figure Out What Starts First</div>
                </div>
                <br>
                <p style="font-size: 18px; opacity: 0.8; margin-top: 20px;">
                    Attempts: ${gameState.attempts} | Hints: ${gameState.hintsUsed}
                </p>
            </p>
        </div>
    `;
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initGame);
console.log('🧬 Cell Collective v2 loaded!');
