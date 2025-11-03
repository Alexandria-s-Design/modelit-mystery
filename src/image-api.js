/**
 * Dynamic Image API Integration for ModelIt Mystery
 *
 * Fetches high-quality images from Unsplash or Pexels APIs
 * Falls back to local images if APIs fail or are not configured
 *
 * Features:
 * - Automatic fallback to local images
 * - Image caching to reduce API calls
 * - Error handling and retry logic
 * - Bandwidth-friendly (only loads when needed)
 */

class ImageAPIManager {
    constructor(config) {
        this.config = config || window.GAME_CONFIG || {};
        this.cache = new Map();
        this.loading = new Set();
        this.apiCallCount = { unsplash: 0, pexels: 0 };
        this.maxApiCalls = { unsplash: 45, pexels: 190 }; // Per hour, with buffer
    }

    /**
     * Get image URL for a scene
     * @param {string} sceneId - Scene identifier (e.g., 'ch0_scene1')
     * @param {string} keywords - Search keywords for API
     * @param {string} localFallback - Local image path as fallback
     * @returns {Promise<string>} Image URL
     */
    async getSceneImage(sceneId, keywords, localFallback) {
        // Check cache first
        if (this.cache.has(sceneId)) {
            return this.cache.get(sceneId);
        }

        // If dynamic images disabled, use local
        if (!this.config.ENABLE_DYNAMIC_IMAGES) {
            return localFallback;
        }

        // Try APIs in order
        let imageUrl = await this.tryUnsplash(keywords);
        if (!imageUrl) {
            imageUrl = await this.tryPexels(keywords);
        }
        if (!imageUrl) {
            imageUrl = localFallback;
        }

        // Cache the result
        this.cache.set(sceneId, imageUrl);
        return imageUrl;
    }

    /**
     * Fetch image from Unsplash API
     */
    async tryUnsplash(keywords) {
        if (!this.config.UNSPLASH_ACCESS_KEY) {return null;}
        if (this.apiCallCount.unsplash >= this.maxApiCalls.unsplash) {
            console.warn('[ImageAPI] Unsplash rate limit reached, using fallback');
            return null;
        }

        try {
            const query = encodeURIComponent(keywords);
            const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=1&orientation=landscape`;

            const response = await fetch(url, {
                headers: {
                    'Authorization': `Client-ID ${this.config.UNSPLASH_ACCESS_KEY}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Unsplash API error: ${response.status}`);
            }

            const data = await response.json();
            this.apiCallCount.unsplash++;

            if (data.results && data.results.length > 0) {
                const photo = data.results[0];

                // Trigger download tracking (required by Unsplash API terms)
                if (photo.links?.download_location) {
                    fetch(photo.links.download_location, {
                        headers: {
                            'Authorization': `Client-ID ${this.config.UNSPLASH_ACCESS_KEY}`,
                        },
                    }).catch(() => {}); // Silent fail for tracking
                }

                return photo.urls.regular || photo.urls.small;
            }

            return null;
        } catch (error) {
            console.warn('[ImageAPI] Unsplash fetch failed:', error.message);
            return null;
        }
    }

    /**
     * Fetch image from Pexels API
     */
    async tryPexels(keywords) {
        if (!this.config.PEXELS_API_KEY) {return null;}
        if (this.apiCallCount.pexels >= this.maxApiCalls.pexels) {
            console.warn('[ImageAPI] Pexels rate limit reached, using fallback');
            return null;
        }

        try {
            const query = encodeURIComponent(keywords);
            const url = `https://api.pexels.com/v1/search?query=${query}&per_page=1&orientation=landscape`;

            const response = await fetch(url, {
                headers: {
                    'Authorization': this.config.PEXELS_API_KEY,
                },
            });

            if (!response.ok) {
                throw new Error(`Pexels API error: ${response.status}`);
            }

            const data = await response.json();
            this.apiCallCount.pexels++;

            if (data.photos && data.photos.length > 0) {
                const photo = data.photos[0];
                return photo.src.large || photo.src.medium;
            }

            return null;
        } catch (error) {
            console.warn('[ImageAPI] Pexels fetch failed:', error.message);
            return null;
        }
    }

    /**
     * Preload images for upcoming scenes
     */
    async preloadImages(scenes) {
        const promises = scenes.map(scene => {
            if (scene.image && !this.cache.has(scene.id)) {
                return this.getSceneImage(
                    scene.id,
                    scene.imageKeywords || 'science laboratory',
                    scene.image,
                );
            }
        });

        await Promise.allSettled(promises);
    }

    /**
     * Get API usage statistics
     */
    getStats() {
        return {
            cacheSize: this.cache.size,
            unsplashCalls: this.apiCallCount.unsplash,
            pexelsCalls: this.apiCallCount.pexels,
            unsplashRemaining: this.maxApiCalls.unsplash - this.apiCallCount.unsplash,
            pexelsRemaining: this.maxApiCalls.pexels - this.apiCallCount.pexels,
        };
    }

    /**
     * Clear cache and reset counters
     */
    reset() {
        this.cache.clear();
        this.loading.clear();
        this.apiCallCount = { unsplash: 0, pexels: 0 };
    }
}

// Scene keyword mappings for better image results
const SCENE_KEYWORDS = {
    // Chapter 0: The Discovery
    'ch0_scene1': 'african american female scientist portrait',
    'ch0_scene2': 'glowing blue cells microscope petri dish',
    'ch0_scene3': 'biological model blueprint diagram',

    // Chapter 1: Components
    'ch1_scene1': 'microscope close up laboratory',
    'ch1_scene2': 'protein receptor enzyme cell biology',
    'ch1_scene3': 'mysterious signal communication',

    // Chapter 2: Relationships
    'ch2_scene1': 'network connections nodes diagram',
    'ch2_scene2': 'logic gates circuit diagram',
    'ch2_scene3': 'pattern changing transformation',

    // Chapter 3: Boss Level
    'ch3_scene1': 'warning alert mutation danger',
    'ch3_scene2': 'initial state diagram flowchart',
    'ch3_scene3': 'different results comparison',

    // Chapter 4: Logic Functions
    'ch4_scene1': 'logic gates AND OR NOT',
    'ch4_scene2': 'network diagram connections',
    'ch4_scene3': 'cells spreading multiplication',

    // Chapter 5: State Space
    'ch5_scene1': 'state space map diagram',
    'ch5_scene2': 'cycling states loop',
    'ch5_scene3': 'final stable state attractor',

    // Chapter 6: Feedback Loops
    'ch6_scene1': 'feedback loop discovery',
    'ch6_scene2': 'negative feedback control system',
    'ch6_scene3': 'encrypted message code',

    // Chapter 7: Prediction
    'ch7_scene1': 'simulation screen computer',
    'ch7_scene2': 'prediction models forecast',
    'ch7_scene3': 'ventilation laboratory safety',

    // Chapter 8: Perturbations
    'ch8_scene1': 'experiment setup laboratory',
    'ch8_scene2': 'treatment options medicine',
    'ch8_scene3': 'power outage emergency',

    // Chapter 9: Final Boss
    'ch9_scene1': 'validation comparison data',
    'ch9_scene2': 'bistable system two states',
    'ch9_scene3': 'alert warning intruder',

    // Chapter 10: Solution
    'ch10_scene1': 'final iteration completion',
    'ch10_scene2': 'solution found success',
    'ch10_scene3': 'cells healing recovery',
    'ch10_scene4': 'mysterious note letter',
    'ch10_scene5': 'celebration success victory',
};

/**
 * Get keywords for a scene
 */
function getSceneKeywords(sceneId) {
    return SCENE_KEYWORDS[sceneId] || 'science laboratory research';
}

// Export for use in game
if (typeof window !== 'undefined') {
    window.ImageAPIManager = ImageAPIManager;
    window.getSceneKeywords = getSceneKeywords;
}
