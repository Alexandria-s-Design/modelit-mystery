/**
 * Configuration Template for ModelIt Mystery
 *
 * INSTRUCTIONS:
 * 1. Copy this file to 'config.js' (do NOT commit config.js to git)
 * 2. Fill in your API keys below
 * 3. All keys are optional - the game works without them
 *
 * FREE API KEYS:
 * - Unsplash: https://unsplash.com/developers (50 requests/hour)
 * - Pexels: https://www.pexels.com/api/ (200 requests/hour)
 * - OpenRouter: https://openrouter.ai/ (optional, for AI feedback)
 */

const CONFIG = {
    // Image APIs (optional - falls back to local images)
    UNSPLASH_ACCESS_KEY: '', // Get free key at unsplash.com/developers
    PEXELS_API_KEY: '', // Get free key at pexels.com/api

    // AI Features (optional - basic feedback works without this)
    OPENROUTER_API_KEY: '', // Get key at openrouter.ai
    OPENROUTER_MODEL: 'google/gemini-2.0-flash-exp:free',
    OPENROUTER_API_URL: 'https://openrouter.ai/api/v1/chat/completions',

    // Feature Flags
    ENABLE_DYNAMIC_IMAGES: false, // Enable Unsplash/Pexels image loading
    ENABLE_AI_FEEDBACK: false, // Enable AI-powered hints and feedback
    ENABLE_ANALYTICS: false, // Enable usage analytics (privacy-friendly)

    // Game Settings
    VOICE_ENABLED_BY_DEFAULT: true,
    MUSIC_ENABLED_BY_DEFAULT: true,
    MUSIC_VOLUME: 0.054, // 0.0 to 1.0
    VOICE_VOLUME: 1.0,

    // Performance Settings
    PRELOAD_NEXT_SCENES: 3, // Number of scenes to preload
    IMAGE_CACHE_SIZE: 20, // Max images in cache
    LAZY_LOAD_IMAGES: true,

    // Accessibility
    KEYBOARD_SHORTCUTS_ENABLED: true,
    HIGH_CONTRAST_MODE: false,
    REDUCED_MOTION: false,

    // Development
    DEBUG_MODE: false, // Show console logs
    SKIP_INTRO: false, // Skip to specific chapter (for testing)
};

// Export for use in game
if (typeof window !== 'undefined') {
    window.GAME_CONFIG = CONFIG;
}

// For Node.js environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
