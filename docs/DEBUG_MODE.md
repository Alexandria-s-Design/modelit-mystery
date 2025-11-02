# Debug Mode Configuration

## Overview

ModelIt Mystery now includes a configuration system that allows you to enable debug mode and customize various game settings.

## Enabling Debug Mode

### Method 1: Edit the Configuration File

1. Open `src/config.js`
2. Find the line: `DEBUG_MODE: false,`
3. Change it to: `DEBUG_MODE: true,`
4. Save the file and reload the game

### Method 2: Browser Console (Temporary)

Open the browser console (F12) and run:
```javascript
window.GAME_CONFIG.DEBUG_MODE = true;
```

This will enable debug mode for the current session only.

## What DEBUG_MODE Does

When `DEBUG_MODE` is enabled:

- **Error Logging**: All errors are logged to the browser console with full details
- **Stack Traces**: Complete error stack traces are displayed
- **Context Information**: Additional debugging context is shown
- **Development Info**: Internal game state information is logged

When `DEBUG_MODE` is disabled (default):

- Only user-friendly error notifications are shown
- Errors are logged internally but not displayed in console
- Game continues smoothly without technical details

## Other Configuration Options

The `src/config.js` file also contains many other customizable settings:

### Audio Settings
- `VOICE_ENABLED_BY_DEFAULT` - Enable/disable voice narration on start
- `MUSIC_ENABLED_BY_DEFAULT` - Enable/disable background music on start
- `MUSIC_VOLUME` - Background music volume (0.0 to 1.0)
- `VOICE_VOLUME` - Voice narration volume (0.0 to 1.0)

### Accessibility
- `KEYBOARD_SHORTCUTS_ENABLED` - Enable keyboard shortcuts
- `HIGH_CONTRAST_MODE` - High contrast display mode
- `REDUCED_MOTION` - Reduce animations for accessibility

### Development
- `SKIP_INTRO` - Skip directly to a chapter (for testing)
- `PRELOAD_NEXT_SCENES` - Number of scenes to preload

## Testing Configuration

To verify that configuration is working:

1. Open `test-config.html` in your browser to see all configuration values
2. Open `test-error-handler.html` to test the error handler with DEBUG_MODE

## Example: Enable Debug Mode for Development

```javascript
// In src/config.js
const CONFIG = {
    // ... other settings ...
    
    // Development
    DEBUG_MODE: true, // ← Change this to true
    SKIP_INTRO: false
};
```

After enabling, open the browser console and you'll see detailed debug information as the game runs.

## See Also

- `src/config.js` - Main configuration file (edit this to change settings)
- `src/config.example.js` - Reference template
- `src/error-handler.js` - Error handling implementation

**Note:** The `src/config.js` file contains the complete set of configuration options. The `config.example.js` is a reference template that may not include all options.
