# ModelIt Mystery - Technical Architecture

This document describes the technical architecture and code organization of the ModelIt Mystery educational game.

## 🏗️ System Overview

ModelIt Mystery is a client-side web application built with pure HTML5, CSS3, and JavaScript. It requires no backend server and works completely offline after initial load.

```
┌─────────────────────────────────────────────────────────┐
│                    Browser (Client)                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────┐  ┌─────────────┐  ┌──────────────┐  │
│  │   HTML UI    │  │  Game Logic │  │ Asset Loading│  │
│  │  (index.html)│  │  (game.js)  │  │  (audio/img) │  │
│  └──────────────┘  └─────────────┘  └──────────────┘  │
│                                                         │
│  ┌──────────────┐  ┌─────────────┐  ┌──────────────┐  │
│  │  Dialogue    │  │   Error     │  │    Image     │  │
│  │   System     │  │  Handler    │  │  API (opt)   │  │
│  └──────────────┘  └─────────────┘  └──────────────┘  │
│                                                         │
│  ┌─────────────────────────────────────────────────┐  │
│  │     Web Audio API  │  LocalStorage  │  Fetch    │  │
│  └─────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## 📁 File Structure

```
modelit-mystery/
├── index.html              # Main game HTML (Act 1)
├── modelit-story.html      # Story-based game (10 chapters)
├── story-data.js           # Chapter data and narrative
├── src/
│   ├── game.js            # Act 1 game engine
│   ├── game-v2.js         # Enhanced game engine
│   ├── dialogue-system.js # Voice/text narration
│   ├── error-handler.js   # Error management
│   ├── image-api.js       # Dynamic image loading
│   ├── image-generator.js # AI image generation
│   ├── svg-images.js      # SVG icon system
│   └── config.example.js  # Configuration template
├── audio/
│   ├── voice/             # 79 MP3 voice narrations
│   ├── background_music.mp3
│   └── voice_map.js       # Voice file mapping
├── images/
│   └── scenes/            # 49 AI-generated images
├── docs/                  # Documentation
├── __tests__/             # Test files
└── Configuration files    # package.json, eslint, etc.
```

## 🎮 Core Components

### 1. Game Engine (`src/game.js`, `src/game-v2.js`)

**Responsibilities:**
- Game state management
- User interaction handling
- Choice navigation
- Boss level logic
- Progress tracking

**Key Functions:**
```javascript
// Initialize game
function initGame()

// Navigate between scenes
function showScene(sceneId)

// Handle player choices
function handleChoice(choiceIndex)

// Validate answers in boss levels
function checkAnswer(answer)

// Manage game state
const gameState = {
    currentChapter: 0,
    currentScene: 0,
    completedChapters: [],
    playerChoices: []
}
```

### 2. Dialogue System (`src/dialogue-system.js`)

**Responsibilities:**
- Display story text
- Manage voice narration
- Animate dialogue
- Handle "Continue" button clicks

**Architecture:**
```javascript
const DialogueSystem = {
    currentVoice: null,
    
    // Show scene with text and voice
    showScene(sceneId) {
        this.displayText(sceneId);
        this.playVoice(sceneId);
    },
    
    // Play voice narration
    playVoice(sceneId) {
        const audio = new Audio(`audio/voice/${sceneId}.mp3`);
        audio.play();
    },
    
    // Stop current voice
    stopVoice() {
        if (this.currentVoice) {
            this.currentVoice.pause();
        }
    }
}
```

### 3. Story Data (`story-data.js`)

**Structure:**
```javascript
const STORY_DATA = {
    chapters: [
        {
            id: 0,
            title: "The Discovery",
            concept: "What is a Model?",
            scenes: [
                {
                    speaker: "Dr. Maya",
                    text: "...",
                    learning: {
                        title: "Concept",
                        content: "Explanation..."
                    },
                    image: "path/to/image.png"
                }
            ],
            choice: {
                question: "What next?",
                options: [
                    { text: "...", next: 1, feedback: "..." }
                ]
            }
        }
    ]
}
```

**Features:**
- 10 chapters covering Boolean modeling
- 3 boss levels with game-over mechanics
- Branching narrative paths
- Educational content integration

### 4. Error Handler (`src/error-handler.js`)

**Responsibilities:**
- Catch and handle errors
- Display user-friendly messages
- Log errors for debugging
- Graceful degradation

**Error Types Handled:**
```javascript
- Asset loading failures (images, audio)
- API call failures (OpenRouter, image APIs)
- JavaScript runtime errors
- Network connectivity issues
- Browser compatibility issues
```

**User Notification System:**
```javascript
showError(title, message, actionable) {
    // Display friendly error to user
    // Suggest recovery actions
    // Allow game to continue
}
```

### 5. Image API Integration (`src/image-api.js`)

**Responsibilities:**
- Fetch high-quality images from Unsplash/Pexels
- Cache images locally
- Fallback to local images
- Rate limit protection

**Flow:**
```
User opens scene
    ↓
Check cache → Found? → Use cached image
    ↓ Not found
Try Unsplash API → Success? → Cache and display
    ↓ Failed
Try Pexels API → Success? → Cache and display
    ↓ Failed
Use local fallback image
```

## 🔊 Audio System

### Voice Narration

**Technology:** HTML5 Audio API + Pre-recorded MP3s

**Voice Files:**
- 79 pre-recorded narration files
- Generated using Microsoft Edge TTS (AriaNeural voice)
- Mapped to scenes via `audio/voice_map.js`

**Loading Strategy:**
```javascript
// Preload next 3 scenes for smooth playback
function preloadAudio(sceneIds) {
    sceneIds.forEach(id => {
        const audio = new Audio(`audio/voice/${id}.mp3`);
        audio.load();
    });
}
```

### Sound Effects

**Technology:** Web Audio API

**Effects:**
- Click sounds (buttons, choices)
- Drop sounds (drag-and-drop)
- Success sounds (correct answers)
- Error sounds (incorrect answers)

**Generation:**
```javascript
// Procedurally generated using oscillators
function playClickSound() {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.frequency.value = 1200;
    gainNode.gain.value = 0.3;
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.15);
}
```

### Background Music

**Technology:** HTML5 Audio with loop

**Music:**
- "Eternal Hope" by Kevin MacLeod (CC-BY licensed)
- 11 MB MP3 file
- Loops continuously at low volume (0.054)

## 🖼️ Image System

### Static Images

**Source:** AI-generated using OpenRouter API (Gemini 2.5 Flash)

**Characteristics:**
- 49 unique scene images
- Consistent Dr. Maya character design
- Sci-fi themed color palette
- PNG format, optimized for web

### Dynamic Images (Optional)

**APIs Used:**
1. **Unsplash** (50 requests/hour free)
2. **Pexels** (200 requests/hour free)

**Features:**
- Scene-specific keyword mapping
- Smart caching to reduce API calls
- Automatic fallback chain
- Rate limit protection

**Caching Strategy:**
```javascript
const imageCache = new Map();

async function getImage(sceneId, keywords) {
    // Check cache
    if (imageCache.has(sceneId)) {
        return imageCache.get(sceneId);
    }
    
    // Fetch from API
    const url = await fetchFromAPI(keywords);
    
    // Cache result
    imageCache.set(sceneId, url);
    
    return url;
}
```

## 💾 Data Persistence

### LocalStorage Usage

**What's Stored:**
```javascript
{
    // Progress
    'modelit_current_chapter': 3,
    'modelit_completed_chapters': [0, 1, 2],
    
    // Settings
    'modelit_voice_enabled': true,
    'modelit_music_enabled': true,
    'modelit_music_volume': 0.054,
    
    // Statistics
    'modelit_total_playtime': 1234567,
    'modelit_hints_used': 5,
    'modelit_attempts': 12
}
```

**Privacy:**
- All data stored locally only
- No server transmission
- No tracking or analytics
- User can clear anytime

## 🎨 UI/UX Architecture

### Layout System

**Design:** Side-by-side split layout
- 48% left: Image panel
- 48% right: Text/choices panel
- 4% center: Divider
- No scrolling needed

**Responsive Breakpoints:**
```css
/* Desktop: side-by-side */
@media (min-width: 768px) {
    display: flex;
    flex-direction: row;
}

/* Mobile: stacked */
@media (max-width: 767px) {
    display: flex;
    flex-direction: column;
}
```

### Animation System

**CSS Transitions:**
```css
/* Smooth fade-ins */
.scene-content {
    animation: fadeIn 0.5s ease-in;
}

/* Button hover effects */
.choice-button:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.8);
}

/* Progress badges glow */
.badge.completed {
    animation: glow 1.5s ease-in-out infinite;
}
```

### State Management

**Centralized Game State:**
```javascript
const gameState = {
    // Current position
    currentChapter: 0,
    currentScene: 0,
    
    // Player progress
    completedChapters: [],
    playerChoices: [],
    
    // Statistics
    attempts: 0,
    hintsUsed: 0,
    startTime: Date.now(),
    
    // Settings
    voiceEnabled: true,
    musicEnabled: true,
    musicVolume: 0.054
};
```

## 🔒 Security Architecture

### API Key Management

**Problem:** Originally had hardcoded API key in client code
**Solution:** Implemented secure configuration system

**Approach:**
```javascript
// config.js (gitignored)
const CONFIG = {
    OPENROUTER_API_KEY: 'actual-key-here',
    // ... other keys
};

// config.example.js (template in repo)
const CONFIG = {
    OPENROUTER_API_KEY: '', // Empty template
    // ... with instructions
};
```

### Input Validation

**User Inputs:**
- All player choices are predefined (no free-form input)
- Answer validation uses strict comparison
- No eval() or dangerous functions used

### Error Handling

**Principles:**
1. Never expose internal errors to users
2. Provide actionable error messages
3. Log details for debugging
4. Graceful degradation always

## 🧪 Testing Architecture

### Test Framework

**Technology:** Jest with jsdom

**Test Categories:**
1. **Unit Tests** - Individual functions
2. **Integration Tests** - Component interactions
3. **Asset Tests** - File existence validation
4. **Accessibility Tests** - WCAG compliance

**Mock System:**
```javascript
// Mock Web Audio API
global.AudioContext = jest.fn()...

// Mock Image loading
global.Image = jest.fn()...

// Mock LocalStorage
global.localStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn()
};
```

### Validation Scripts

**Python validation (`validate_assets.py`):**
```python
# Verify all voice files exist
voice_files = glob.glob('audio/voice/*.mp3')
assert len(voice_files) == 79

# Verify all images exist
images = glob.glob('images/scenes/*.png')
assert len(images) == 49

# Verify file sizes are reasonable
for file in voice_files:
    size = os.path.getsize(file)
    assert size < 5 * 1024 * 1024  # < 5MB
```

## 🚀 Performance Considerations

### Loading Strategy

**Initial Load:**
1. HTML + inline CSS (instant)
2. Critical JavaScript (game engine)
3. First scene image
4. First voice file
5. Background music (low priority)

**Lazy Loading:**
```javascript
// Load images only when needed
function loadSceneImage(sceneId) {
    const img = new Image();
    img.src = `images/scenes/${sceneId}.png`;
    return img;
}

// Preload next N scenes
function preloadUpcoming(currentScene, count = 3) {
    for (let i = 1; i <= count; i++) {
        loadSceneImage(currentScene + i);
    }
}
```

### Memory Management

**Strategies:**
1. Limit audio cache to 5 files
2. Unload images when not visible
3. Clear old voice instances
4. Throttle resize events

### Bundle Size

**Current:**
- HTML + CSS: ~35 KB
- JavaScript (total): ~150 KB
- Images (49 files): ~40 MB
- Audio (79 + music): ~27 MB

**Optimization Opportunities:**
- Minify JavaScript: ~50% reduction
- Compress images: ~30% reduction
- Lazy load audio: Faster initial load

## 🔄 Build and Development

### Development Workflow

```bash
# 1. Start local server
npm start

# 2. Run tests in watch mode
npm run test:watch

# 3. Lint code
npm run lint

# 4. Format code
npm run format

# 5. Validate assets
npm run validate:assets
```

### No Build Step Required

The game runs directly without compilation:
- No transpilation needed
- No bundling required
- No CSS preprocessing
- Direct file serving

**Benefits:**
- Fast development iteration
- Easy debugging (no source maps needed)
- Simple deployment
- Works offline immediately

## 📊 Monitoring and Analytics

### Built-in Metrics

**Tracked Locally:**
```javascript
{
    totalPlaytime: Date.now() - startTime,
    chaptersCompleted: completedChapters.length,
    hintsUsed: hintsUsed,
    attempts: attempts,
    errorCount: errorHandler.errorCount
}
```

**Display:**
- Progress badges in header
- Completion screen with stats
- Error log (developer mode)

### Privacy-First Approach

**NOT collected:**
- Personal information
- IP addresses
- Device identifiers
- Usage patterns
- External analytics

**Data stays:**
- In browser's LocalStorage
- Never sent to servers
- User-controllable
- Cleared with browser data

## 🔧 Extension Points

### Adding New Chapters

1. Add chapter data to `story-data.js`
2. Create scene images in `images/scenes/`
3. Record voice narration
4. Add voice mapping in `audio/voice_map.js`
5. Update total chapter count in UI

### Adding New Features

**Modular design allows:**
- New game modes (time trials, challenges)
- Achievement system
- Multiplayer components
- Custom scenario editor
- Additional educational content

### Integration Points

**External systems can:**
- Load custom story data via JSON
- Integrate with LMS via iframe
- Export progress data
- Import student rosters
- Track learning outcomes

## 📝 Code Standards

### JavaScript Style

**Conventions:**
- Use `const` for immutable values
- Use `let` for mutable values
- Avoid `var`
- Use arrow functions for callbacks
- Prefer template literals
- Always use semicolons

### Documentation

**Requirements:**
- JSDoc comments for all functions
- Inline comments for complex logic
- README for each major component
- Architecture decisions documented

### Error Handling

**Patterns:**
```javascript
// Always catch promises
async function fetchData() {
    try {
        const data = await fetch(url);
        return data.json();
    } catch (error) {
        errorHandler.handle('Fetch failed', error);
        return fallbackData;
    }
}

// Provide fallbacks
const config = loadConfig() || DEFAULT_CONFIG;
```

## 🎓 Educational Architecture

### Learning Objectives Mapping

Each chapter maps to specific Boolean modeling concepts:

1. **Chapter 0:** Introduction to Models
2. **Chapter 1:** Components (Species)
3. **Chapter 2:** Relationships (Regulators)
4. **Chapter 3:** Initial Conditions
5. **Chapter 4:** Logic Functions
6. **Chapter 5:** State Space
7. **Chapter 6:** Feedback Loops
8. **Chapter 7:** Predictions
9. **Chapter 8:** Perturbations
10. **Chapter 9:** Validation

### Progressive Difficulty

**Scaffolding:**
- Early chapters: Simple concepts, clear examples
- Middle chapters: Complex interactions, multiple components
- Later chapters: System-level thinking, predictions
- Boss levels: Test comprehensive understanding

### Feedback System

**Types:**
1. **Immediate:** Button click sounds, visual feedback
2. **Formative:** Hints, partial credit, guidance
3. **Summative:** Boss level results, completion stats
4. **Adaptive:** Difficulty adjusts based on performance

---

**This architecture supports:**
- ✅ Offline operation
- ✅ Fast performance
- ✅ Easy maintenance
- ✅ Extensibility
- ✅ Educational effectiveness
- ✅ Accessibility
- ✅ Privacy protection

For implementation details, see source code comments and CONTRIBUTING.md.
