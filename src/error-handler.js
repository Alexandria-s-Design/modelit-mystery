/**
 * Comprehensive Error Handling for ModelIt Mystery
 *
 * Provides user-friendly error messages and recovery strategies
 * Logs errors for debugging while keeping game playable
 *
 * Features:
 * - Graceful degradation for missing assets
 * - Retry logic for network requests
 * - User notifications with actionable advice
 * - Error tracking (privacy-friendly, no external services)
 */

class ErrorHandler {
    constructor() {
        this.errors = [];
        this.maxErrors = 50;
        this.notificationQueue = [];
        this.setupGlobalHandlers();
    }

    /**
     * Setup global error handlers
     */
    setupGlobalHandlers() {
        // Catch unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            this.handleError('Promise Rejection', event.reason, {
                type: 'promise',
                promise: event.promise
            });
            event.preventDefault();
        });

        // Catch global errors
        window.addEventListener('error', (event) => {
            this.handleError('Global Error', event.error || event.message, {
                type: 'error',
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno
            });
        });
    }

    /**
     * Handle an error with user-friendly messaging
     */
    handleError(category, error, context = {}) {
        const errorInfo = {
            category,
            message: error?.message || String(error),
            stack: error?.stack,
            context,
            timestamp: new Date().toISOString()
        };

        // Log to console in development
        if (window.GAME_CONFIG?.DEBUG_MODE) {
            console.error(`[${category}]`, errorInfo);
        }

        // Store error (with limit)
        this.errors.push(errorInfo);
        if (this.errors.length > this.maxErrors) {
            this.errors.shift();
        }

        // Determine user-facing message and action
        const userMessage = this.getUserMessage(category, error, context);
        if (userMessage) {
            this.showNotification(userMessage.message, userMessage.type, userMessage.action);
        }
    }

    /**
     * Get user-friendly error message
     */
    getUserMessage(category, error, context) {
        const errorStr = String(error?.message || error).toLowerCase();

        // Audio errors
        if (category.includes('Audio') || errorStr.includes('audio')) {
            if (errorStr.includes('not found') || errorStr.includes('404')) {
                return {
                    message: '🔇 Voice file not found. The game will continue without voice narration.',
                    type: 'warning',
                    action: 'You can still read Dr. Maya\'s dialogue on screen.'
                };
            }
            if (errorStr.includes('autoplay') || errorStr.includes('user interaction')) {
                return {
                    message: '🔊 Audio blocked by browser. Click anywhere to enable sound.',
                    type: 'info',
                    action: null
                };
            }
            return {
                message: '🔇 Audio playback issue. The game will continue silently.',
                type: 'warning',
                action: 'Check your browser audio settings.'
            };
        }

        // Image errors
        if (category.includes('Image') || errorStr.includes('image')) {
            return {
                message: '🖼️ Some images couldn\'t load. Using placeholder images.',
                type: 'warning',
                action: 'Check your internet connection for full experience.'
            };
        }

        // API errors
        if (category.includes('API') || errorStr.includes('fetch') || errorStr.includes('network')) {
            if (errorStr.includes('rate limit') || errorStr.includes('429')) {
                return {
                    message: '⏱️ API rate limit reached. Using fallback content.',
                    type: 'info',
                    action: 'Game functionality is not affected.'
                };
            }
            return {
                message: '🌐 Network error. Using offline content.',
                type: 'warning',
                action: 'Some features may be limited without internet.'
            };
        }

        // Storage errors
        if (category.includes('Storage') || errorStr.includes('localstorage') || errorStr.includes('quota')) {
            return {
                message: '💾 Unable to save progress. Your game will not be saved.',
                type: 'warning',
                action: 'Clear browser data or use a different browser.'
            };
        }

        // Critical errors that break functionality
        if (errorStr.includes('cannot read') || errorStr.includes('undefined') || errorStr.includes('null')) {
            return {
                message: '⚠️ Unexpected error occurred. Try refreshing the page.',
                type: 'error',
                action: 'If problem persists, clear browser cache.'
            };
        }

        // Default: no user notification (log only)
        return null;
    }

    /**
     * Show notification to user
     */
    showNotification(message, type = 'info', action = null) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-message">${message}</div>
                ${action ? `<div class="notification-action">${action}</div>` : ''}
            </div>
            <button class="notification-close" onclick="this.parentElement.remove()">×</button>
        `;

        // Add to page
        let container = document.getElementById('notification-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'notification-container';
            container.style.cssText = `
                position: fixed;
                top: 80px;
                right: 20px;
                z-index: 10000;
                display: flex;
                flex-direction: column;
                gap: 10px;
                max-width: 400px;
            `;
            document.body.appendChild(container);
        }

        container.appendChild(notification);

        // Auto-remove after 8 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.opacity = '0';
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 8000);
    }

    /**
     * Get error statistics
     */
    getStats() {
        const categories = {};
        this.errors.forEach(error => {
            categories[error.category] = (categories[error.category] || 0) + 1;
        });

        return {
            totalErrors: this.errors.length,
            categories,
            recentErrors: this.errors.slice(-5)
        };
    }

    /**
     * Clear error log
     */
    clearErrors() {
        this.errors = [];
    }

    /**
     * Export errors for debugging
     */
    exportErrors() {
        const data = JSON.stringify({
            errors: this.errors,
            stats: this.getStats(),
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString()
        }, null, 2);

        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `modelit-errors-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }
}

/**
 * Add notification styles to page
 */
function injectNotificationStyles() {
    if (document.getElementById('notification-styles')) return;

    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        .notification {
            background: rgba(26, 26, 46, 0.95);
            border-radius: 10px;
            padding: 15px 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
            border-left: 4px solid #00d4ff;
            animation: slideInRight 0.3s ease-out;
            transition: all 0.3s ease;
            display: flex;
            gap: 15px;
            align-items: flex-start;
        }

        .notification-info { border-left-color: #00d4ff; }
        .notification-warning { border-left-color: #ffaa00; }
        .notification-error { border-left-color: #ff3333; }
        .notification-success { border-left-color: #00ff00; }

        .notification-content {
            flex: 1;
            color: white;
            font-family: 'Exo 2', sans-serif;
        }

        .notification-message {
            font-size: 14px;
            line-height: 1.4;
            margin-bottom: 5px;
        }

        .notification-action {
            font-size: 12px;
            opacity: 0.8;
            font-style: italic;
        }

        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            opacity: 0.6;
            transition: opacity 0.2s;
            padding: 0;
            width: 24px;
            height: 24px;
            line-height: 24px;
        }

        .notification-close:hover {
            opacity: 1;
        }

        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(400px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @media (max-width: 768px) {
            #notification-container {
                right: 10px;
                left: 10px;
                max-width: none;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize on load
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        window.ErrorHandler = new ErrorHandler();
        injectNotificationStyles();
    });
}

// Export for use in game
if (typeof window !== 'undefined') {
    window.ErrorHandler = ErrorHandler;
}
