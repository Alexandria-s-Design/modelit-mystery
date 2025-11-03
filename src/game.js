// Cell Collective: The Modeling Mystery - Act 1
// Game Logic and AI Integration

// Sound Effects - Web Audio API
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playClickSound() {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(1200, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);

    oscillator.type = 'sine';
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.15);
}

function playDropSound() {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.2);

    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

    oscillator.type = 'triangle';
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
}

function playSuccessSound() {
    [800, 1000, 1200].forEach((freq, index) => {
        setTimeout(() => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = freq;
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

            oscillator.type = 'triangle';
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        }, index * 100);
    });
}

function playErrorSound() {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(200, audioContext.currentTime);

    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

    oscillator.type = 'sawtooth';
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
}

// Configuration
const CONFIG = {
    OPENROUTER_API_KEY: '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',
    OPENROUTER_API_URL: 'https://openrouter.ai/api/v1/chat/completions',
    AI_MODEL: 'google/gemini-2.0-flash-exp:free', // Free Gemini model
    REQUIRED_COMPONENTS: ['Receptor', 'Signal', 'Enzyme'], // Correct answer for Act 1
};

// Game State
const gameState = {
    placedComponents: [],
    completedFundamentals: [],
    currentStage: 1, // Stage 1: Identify Components
    attempts: 0,
    hintsUsed: 0,
};

// DOM Elements
const modelCanvas = document.getElementById('model-canvas');
const componentPalette = document.querySelector('.component-list');
const checkBtn = document.getElementById('check-btn');
const hintBtn = document.getElementById('hint-btn');
const aiFeedback = document.getElementById('ai-feedback');
const fundamentalBadges = document.querySelectorAll('.fundamental-badge');

// Initialize the game
function initGame() {
    setupDragAndDrop();
    setupEventListeners();
    console.log('🎮 Game initialized! Ready to build models.');
}

// Setup drag and drop functionality
function setupDragAndDrop() {
    const componentItems = document.querySelectorAll('.component-item');

    componentItems.forEach((item) => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
    });

    modelCanvas.addEventListener('dragover', handleDragOver);
    modelCanvas.addEventListener('drop', handleDrop);
}

// Drag event handlers
let draggedComponent = null;

function handleDragStart(e) {
    if (this.classList.contains('used')) {
        return;
    }

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

    if (!draggedComponent) {
        return;
    }

    // Get drop position relative to canvas
    const rect = modelCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left - 40; // Center the component
    const y = e.clientY - rect.top - 40;

    // Check if position is valid (not too close to edges)
    if (x < 10 || y < 10 || x > rect.width - 90 || y > rect.height - 90) {
        showFeedback('⚠️ Try placing components away from the edges!', 'warning');
        return;
    }

    // Create placed component
    placeComponent(draggedComponent, x, y);

    // Play drop sound
    playDropSound();

    // Mark component as used in palette
    const paletteItem = document.querySelector(`[data-component="${draggedComponent}"]`);
    paletteItem.classList.add('used');

    draggedComponent = null;

    // Enable check button if enough components placed
    if (gameState.placedComponents.length >= 2) {
        checkBtn.disabled = false;
    }

    // Play placement sound (if we add audio later)
    playSound('place');
}

function placeComponent(componentName, x, y) {
    const component = document.createElement('div');
    component.className = 'placed-component';
    component.textContent = componentName;
    component.style.left = x + 'px';
    component.style.top = y + 'px';
    component.dataset.component = componentName;

    // Make it draggable to reposition
    component.draggable = true;
    component.addEventListener('dragstart', handlePlacedDragStart);
    component.addEventListener('dragend', handlePlacedDragEnd);

    // Double-click to remove
    component.addEventListener('dblclick', () => removeComponent(component));

    modelCanvas.appendChild(component);

    gameState.placedComponents.push({
        name: componentName,
        x: x,
        y: y,
        element: component,
    });

    console.log(`✅ Placed component: ${componentName}`);
}

function handlePlacedDragStart(e) {
    e.dataTransfer.effectAllowed = 'move';
    this.style.opacity = '0.5';
    draggedComponent = this;
}

function handlePlacedDragEnd(e) {
    this.style.opacity = '1';
}

function removeComponent(componentElement) {
    const componentName = componentElement.dataset.component;

    // Remove from canvas
    componentElement.remove();

    // Remove from game state
    gameState.placedComponents = gameState.placedComponents.filter(
        (c) => c.element !== componentElement
    );

    // Re-enable in palette
    const paletteItem = document.querySelector(
        `.component-item[data-component="${componentName}"]`
    );
    if (paletteItem) {
        paletteItem.classList.remove('used');
    }

    // Disable check button if too few components
    if (gameState.placedComponents.length < 2) {
        checkBtn.disabled = true;
    }

    console.log(`❌ Removed component: ${componentName}`);
}

// Setup event listeners for buttons
function setupEventListeners() {
    checkBtn.addEventListener('click', checkModel);
    hintBtn.addEventListener('click', getAIHint);
}

// Check if the model is correct
async function checkModel() {
    gameState.attempts++;

    const placedNames = gameState.placedComponents.map((c) => c.name);
    const isCorrect = CONFIG.REQUIRED_COMPONENTS.every((comp) => placedNames.includes(comp));

    showFeedback('🤖 Analyzing your model...', 'loading');

    // Get AI feedback on the model
    const feedback = await getAIFeedback(placedNames, isCorrect);

    if (isCorrect && placedNames.length === CONFIG.REQUIRED_COMPONENTS.length) {
        playSuccessSound();
        showFeedback(feedback, 'success');
        completeFundamental(1);

        // Progress to next stage after a delay
        setTimeout(() => {
            progressToStage2();
        }, 3000);
    } else if (isCorrect && placedNames.length > CONFIG.REQUIRED_COMPONENTS.length) {
        playClickSound();
        showFeedback(
            '🤔 You have the right components, but you added some extras! ' + feedback,
            'warning'
        );
    } else {
        playErrorSound();
        showFeedback(feedback, 'error');
    }
}

// Get AI-powered hint
async function getAIHint() {
    playClickSound();
    gameState.hintsUsed++;
    hintBtn.disabled = true;

    showFeedback('🤖 Thinking...', 'loading');

    const placedNames = gameState.placedComponents.map((c) => c.name);
    const hint = await getAIHintFromModel(placedNames, gameState.hintsUsed);

    showFeedback('💡 ' + hint, 'hint');

    setTimeout(() => {
        hintBtn.disabled = false;
    }, 5000); // Cooldown on hints
}

// AI Integration Functions
async function getAIFeedback(placedComponents, isCorrect) {
    const prompt = `You are Dr. Elena Rodriguez, a friendly scientist helping a student learn computational modeling.

The student just tried to identify components in a biological signaling system.
They placed: ${placedComponents.join(', ')}
The correct components are: Receptor, Signal, Enzyme

Was their answer correct? ${isCorrect ? 'YES' : 'NO'}

${
    isCorrect
        ? 'Give them enthusiastic praise, explain why these components are important in cellular signaling, AND provide a REAL-WORLD EXAMPLE of this system in action (like insulin signaling, immune response, neurotransmitter signaling, etc.). Keep it to 3-4 sentences.'
        : 'Give them encouraging feedback about what they got right (if anything), a gentle hint about what they might be missing, AND a simple real-world example to help them understand. Keep it to 3-4 sentences. Be supportive!'
}

Stay in character as Dr. Elena. Use scientific language but keep it accessible.`;

    try {
        const response = await callOpenRouter(prompt);
        return response;
    } catch (error) {
        console.error('AI Feedback Error:', error);
        return isCorrect
            ? '🎉 Excellent work! You identified the key components correctly!'
            : '🤔 Not quite right. Think about what receives signals, what the signal is, and what processes it.';
    }
}

async function getAIHintFromModel(currentComponents, hintNumber) {
    const prompt = `You are Dr. Elena Rodriguez, a helpful scientist. A student is learning to identify components in a biological system.

They've currently placed: ${currentComponents.length > 0 ? currentComponents.join(', ') : 'nothing yet'}
The correct answer includes: Receptor, Signal, Enzyme

This is hint #${hintNumber}. Give them a ${hintNumber === 1 ? 'gentle' : 'more direct'} hint about what they should look for.
Include a brief EXAMPLE from real biology to help them understand (like how a cell phone receives calls, or how a doorbell works).
Keep it to 2-3 sentences. Be encouraging and stay in character as Dr. Elena.`;

    try {
        const response = await callOpenRouter(prompt);
        return response;
    } catch (error) {
        console.error('AI Hint Error:', error);
        const hints = [
            'Think about the journey of a signal: what receives it, what is it, and what processes it?',
            'In cellular signaling, we need something to receive messages, the message itself, and something to act on it!',
            'Look for: a Receptor (receives), a Signal (the message), and an Enzyme (processes)!',
        ];
        return hints[Math.min(hintNumber - 1, hints.length - 1)];
    }
}

async function callOpenRouter(prompt) {
    const response = await fetch(CONFIG.OPENROUTER_API_URL, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${CONFIG.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://cellcollective.org',
            'X-Title': 'Cell Collective Modeling Game',
        },
        body: JSON.stringify({
            model: CONFIG.AI_MODEL,
            messages: [
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            temperature: 0.7,
            max_tokens: 150,
        }),
    });

    if (!response.ok) {
        throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
}

// Format AI response text to HTML
function formatAIResponse(text) {
    // Convert **text** to <strong>text</strong>
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    // Convert *text* to <em>text</em>
    text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');

    // Convert line breaks to <br>
    text = text.replace(/\n/g, '<br>');

    // Add spacing around colons for better readability
    text = text.replace(/: /g, ':<br>');

    return text;
}

// UI Helper Functions
function showFeedback(message, type = 'info') {
    aiFeedback.className = 'visible';

    const icons = {
        loading: '<div class="spinner"></div>',
        success: '✅',
        error: '❌',
        warning: '⚠️',
        hint: '💡',
        info: '🤖',
    };

    // Format the message for better display
    const formattedMessage = formatAIResponse(message);

    aiFeedback.innerHTML = `
        <span class="ai-icon">${icons[type] || icons.info}</span>
        <span style="line-height: 1.6;">${formattedMessage}</span>
    `;

    // Auto-hide after 10 seconds (except for success)
    if (type !== 'success' && type !== 'loading') {
        setTimeout(() => {
            aiFeedback.className = '';
        }, 10000);
    }
}

function completeFundamental(number) {
    if (!gameState.completedFundamentals.includes(number)) {
        gameState.completedFundamentals.push(number);
        fundamentalBadges[number - 1].classList.add('completed');

        // Celebration animation
        celebrateSuccess();
    }
}

function celebrateSuccess() {
    // Add visual celebration (confetti or particle effect could go here)
    console.log('🎉 Fundamental completed!');
}

// Progress to Stage 2: Define Relationships
function progressToStage2() {
    gameState.currentStage = 2;

    // Update story panel
    const storyPanel = document.getElementById('story-panel');
    storyPanel.innerHTML = `
        <div class="character-container">
            <div class="character-avatar">👩‍🔬</div>
            <div class="dialogue-box">
                <div class="character-name">Dr. Elena Rodriguez</div>
                <div class="dialogue-text">
                    Fantastic work! You've identified the key components: Receptor, Signal, and Enzyme.
                    Now comes the exciting part - how do they interact with each other?
                </div>
            </div>
        </div>

        <div class="character-container">
            <div class="character-avatar">👩‍🔬</div>
            <div class="dialogue-box">
                <div class="character-name">Dr. Elena Rodriguez</div>
                <div class="dialogue-text">
                    In computational modeling, we call these interactions "relationships" or "edges."
                    Let's define how these components influence each other!
                </div>
            </div>
        </div>

        <div class="instruction-text">
            <strong>🎯 Your Mission:</strong><br>
            Draw connections between components to show how they interact.
            Think about: Does the Signal activate the Receptor? Does the Receptor activate the Enzyme?
        </div>
    `;

    // Update panel title
    document.querySelector('.panel-title').textContent = '🔗 Define Relationships';

    // Enable connection drawing
    enableConnectionDrawing();

    // Update buttons
    checkBtn.textContent = '✓ Check Relationships';
    checkBtn.disabled = true;

    showFeedback(
        "🎉 Great job identifying components! Now let's see how they interact...",
        'success'
    );
}

function enableConnectionDrawing() {
    let selectedComponent = null;
    const connections = [];

    const components = document.querySelectorAll('.placed-component');

    components.forEach((comp) => {
        comp.style.cursor = 'pointer';

        comp.addEventListener('click', function () {
            if (!selectedComponent) {
                // First click - select source
                selectedComponent = this;
                this.style.border = '4px solid #ffff00';
                this.style.boxShadow = '0 0 30px rgba(255, 255, 0, 0.8)';
            } else if (selectedComponent === this) {
                // Click same component - deselect
                this.style.border = '3px solid #ffffff';
                this.style.boxShadow = '0 4px 15px rgba(0, 212, 255, 0.6)';
                selectedComponent = null;
            } else {
                // Second click - create connection
                drawConnection(selectedComponent, this);
                connections.push({
                    from: selectedComponent.dataset.component,
                    to: this.dataset.component,
                });

                // Reset selection
                selectedComponent.style.border = '3px solid #ffffff';
                selectedComponent.style.boxShadow = '0 4px 15px rgba(0, 212, 255, 0.6)';
                selectedComponent = null;

                // Enable check button if we have connections
                if (connections.length >= 2) {
                    checkBtn.disabled = false;
                }
            }
        });
    });

    // Update check button to verify connections
    checkBtn.onclick = () => checkConnections(connections);
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
    const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;

    const line = document.createElement('div');
    line.className = 'connection-line';
    line.style.width = length + 'px';
    line.style.left = x1 + 'px';
    line.style.top = y1 + 'px';
    line.style.transform = `rotate(${angle}deg)`;

    modelCanvas.appendChild(line);
}

async function checkConnections(connections) {
    const correctConnections = [
        { from: 'Signal', to: 'Receptor' },
        { from: 'Receptor', to: 'Enzyme' },
    ];

    const isCorrect = correctConnections.every((correct) =>
        connections.some((conn) => conn.from === correct.from && conn.to === correct.to)
    );

    showFeedback('🤖 Analyzing your connections...', 'loading');

    const feedback = await getConnectionFeedback(connections, isCorrect);

    if (isCorrect) {
        showFeedback(feedback, 'success');
        completeFundamental(2);

        setTimeout(() => {
            progressToStage3();
        }, 3000);
    } else {
        showFeedback(feedback, 'error');
    }
}

async function getConnectionFeedback(connections, isCorrect) {
    const prompt = `You are Dr. Elena Rodriguez. The student drew these connections in their model:
${connections.map((c) => `${c.from} → ${c.to}`).join(', ')}

The correct relationships are: Signal → Receptor, Receptor → Enzyme

Is it correct? ${isCorrect ? 'YES' : 'NO'}

${
    isCorrect
        ? 'Give enthusiastic praise and explain why this pathway is important. Provide a REAL-WORLD EXAMPLE from biology (like how adrenaline signals work, or neurotransmitters in the brain). 3-4 sentences.'
        : 'Give encouraging feedback with a hint about the correct pathway. Include a simple EXAMPLE or analogy to help them understand (like a relay race or chain reaction). 3-4 sentences.'
}

Stay in character as Dr. Elena.`;

    try {
        return await callOpenRouter(prompt);
    } catch (error) {
        return isCorrect
            ? '🎉 Perfect! You understand how signals flow through the system!'
            : "🤔 Think about the signal's journey: it reaches the receptor first, then the receptor activates the enzyme.";
    }
}

function progressToStage3() {
    gameState.currentStage = 3;

    const storyPanel = document.getElementById('story-panel');
    storyPanel.innerHTML = `
        <div class="character-container">
            <div class="character-avatar">👩‍🔬</div>
            <div class="dialogue-box">
                <div class="character-name">Dr. Elena Rodriguez</div>
                <div class="dialogue-text">
                    Excellent! You've mapped the relationships beautifully. Now for the final piece of Act 1:
                    we need to set the initial conditions. What state is everything in at the start?
                </div>
            </div>
        </div>

        <div class="instruction-text">
            <strong>🎯 Your Mission:</strong><br>
            Set the starting state for each component. In Boolean models, components are either ON (1) or OFF (0).
            What do you think the initial state should be for this system?
        </div>
    `;

    document.querySelector('.panel-title').textContent = '⚙️ Set Initial Conditions';

    // Update interaction for setting states
    enableStateSelection();

    showFeedback(
        "🎉 You mapped the relationships! Now let's set the starting conditions...",
        'success'
    );
}

function enableStateSelection() {
    const components = document.querySelectorAll('.placed-component');
    const states = {};

    components.forEach((comp) => {
        const componentName = comp.dataset.component;
        states[componentName] = 0; // Default to OFF

        // Add state indicator
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

        // Toggle state on click
        comp.onclick = function () {
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

    checkBtn.textContent = '✓ Confirm Initial State';
    checkBtn.onclick = () => checkInitialStates(states);
}

async function checkInitialStates(states) {
    // For this scenario, Signal should be ON, others OFF
    const isCorrect = states['Signal'] === 1 && states['Receptor'] === 0 && states['Enzyme'] === 0;

    showFeedback('🤖 Evaluating initial conditions...', 'loading');

    const feedback = await getInitialStateFeedback(states, isCorrect);

    if (isCorrect) {
        showFeedback(feedback, 'success');
        completeFundamental(3);

        setTimeout(() => {
            completeAct1();
        }, 3000);
    } else {
        showFeedback(feedback + ' Think about what starts the signaling cascade!', 'warning');
    }
}

async function getInitialStateFeedback(states, isCorrect) {
    const stateDescription = Object.entries(states)
        .map(([comp, state]) => `${comp}: ${state === 1 ? 'ON' : 'OFF'}`)
        .join(', ');

    const prompt = `You are Dr. Elena. The student set these initial states: ${stateDescription}

The correct initial state is: Signal ON, Receptor OFF, Enzyme OFF (because the signal arrives first and triggers the cascade).

Is it correct? ${isCorrect ? 'YES' : 'NO'}

${
    isCorrect
        ? 'Give enthusiastic praise about completing Act 1! Explain why initial conditions matter in modeling and provide a brief REAL-WORLD EXAMPLE (like how a light switch starts OFF until you flip it, or how cells respond to hormones). 3-4 sentences.'
        : 'Give a helpful hint about which component should start ON. Include a simple EXAMPLE or analogy to help them understand (like how you need to ring a doorbell for someone to answer). 2-3 sentences.'
}

Stay in character as Dr. Elena.`;

    try {
        return await callOpenRouter(prompt);
    } catch (error) {
        return isCorrect
            ? '🎉 Perfect! You understand initial conditions! Act 1 complete!'
            : '🤔 Remember, the signal arrives from outside to start the cascade.';
    }
}

function completeAct1() {
    const storyPanel = document.getElementById('story-panel');
    storyPanel.innerHTML = `
        <div class="character-container">
            <div class="character-avatar">👩‍🔬</div>
            <div class="dialogue-box">
                <div class="character-name">Dr. Elena Rodriguez</div>
                <div class="dialogue-text">
                    🎉 Outstanding work! You've completed Act 1 of The Modeling Mystery!
                </div>
            </div>
        </div>

        <div class="character-container">
            <div class="character-avatar">👩‍🔬</div>
            <div class="dialogue-box">
                <div class="character-name">Dr. Elena Rodriguez</div>
                <div class="dialogue-text">
                    You've mastered the first three fundamentals of computational modeling:
                    <br>✅ Identifying Components
                    <br>✅ Defining Relationships
                    <br>✅ Setting Initial Conditions
                </div>
            </div>
        </div>

        <div style="background: linear-gradient(135deg, rgba(0, 212, 255, 0.3) 0%, rgba(0, 153, 204, 0.3) 100%);
                    border: 3px solid #00d4ff;
                    border-radius: 15px;
                    padding: 30px;
                    margin-top: 30px;
                    text-align: center;">
            <h2 style="color: #00d4ff; margin-bottom: 20px;">🏆 Act 1 Complete!</h2>
            <p style="font-size: 18px; line-height: 1.8;">
                You've taken your first steps into the world of computational modeling!<br>
                In Act 2, we'll explore Boolean logic, feedback loops, and simulation.<br><br>
                <strong>Stay tuned for the next chapter...</strong>
            </p>
            <div style="margin-top: 30px;">
                <strong>Your Stats:</strong><br>
                Attempts: ${gameState.attempts}<br>
                Hints Used: ${gameState.hintsUsed}<br>
                Fundamentals Mastered: ${gameState.completedFundamentals.length}/3
            </div>
        </div>
    `;

    document.querySelector('.panel-title').innerHTML = '🎉 Congratulations!';
    document.getElementById('interactive-panel').innerHTML = `
        <div class="panel-title">🎉 Congratulations!</div>
        <div style="background: rgba(26, 26, 46, 0.8);
                    border-radius: 15px;
                    padding: 40px;
                    text-align: center;
                    border: 2px solid #00d4ff;">
            <h2 style="color: #00d4ff; font-size: 48px; margin-bottom: 20px;">🏆</h2>
            <h3 style="color: #00d4ff; margin-bottom: 30px;">You've Completed Act 1!</h3>
            <p style="font-size: 18px; line-height: 1.6; margin-bottom: 30px;">
                You've learned the fundamental building blocks of computational modeling.
                These skills form the foundation for understanding complex biological systems!
            </p>
            <div style="background: rgba(0, 212, 255, 0.1);
                        border-radius: 10px;
                        padding: 20px;
                        margin: 20px 0;">
                <h4 style="color: #00d4ff; margin-bottom: 15px;">Skills Unlocked:</h4>
                <p style="text-align: left; line-height: 2;">
                    ✅ Component Identification<br>
                    ✅ Relationship Mapping<br>
                    ✅ Initial State Configuration<br>
                </p>
            </div>
            <p style="margin-top: 30px; font-size: 14px; opacity: 0.8;">
                Ready for Act 2? That's where things get really interesting...<br>
                We'll explore Boolean logic, feedback loops, and running simulations!
            </p>
        </div>
    `;
}

// Sound effects (placeholder for future)
function playSound(soundName) {
    // Implement sound effects here if desired
    console.log(`🔊 Sound: ${soundName}`);
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', initGame);

console.log('🧬 Cell Collective: The Modeling Mystery loaded!');
