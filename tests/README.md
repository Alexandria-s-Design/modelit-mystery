# ModelIt Mystery - Tests

This directory contains test files for verifying the configuration system and error handling.

## Test Files

### Node.js Tests

1. **test-config.js**
   - Tests basic configuration loading
   - Verifies all expected properties exist
   - Checks default values
   - Run: `node tests/test-config.js`

2. **integration-test.js**
   - Tests config + error handler integration
   - Simulates browser environment
   - Verifies DEBUG_MODE accessibility
   - Run: `node tests/integration-test.js`

### Browser Tests

1. **test-config.html**
   - Visual test of configuration in browser
   - Shows all config values
   - Displays DEBUG_MODE status
   - Open in browser after starting server

2. **test-error-handler.html**
   - Interactive error handler testing
   - Test different error types
   - Toggle DEBUG_MODE at runtime
   - See notifications and console output
   - Open in browser after starting server

## Running Tests

### Quick Test (Node.js)
```bash
# Run all Node.js tests
node tests/test-config.js
node tests/integration-test.js
```

### Browser Tests
```bash
# Start local server
python3 -m http.server 8888

# Then open in browser:
# http://localhost:8888/tests/test-config.html
# http://localhost:8888/tests/test-error-handler.html
```

## What's Being Tested

### Configuration Loading
- ✅ Config file loads in Node.js environment
- ✅ Config file loads in browser environment
- ✅ window.GAME_CONFIG is properly exported
- ✅ All expected properties are present

### DEBUG_MODE Functionality
- ✅ DEBUG_MODE defaults to false
- ✅ DEBUG_MODE can be changed at runtime
- ✅ Error handler can access DEBUG_MODE
- ✅ Optional chaining (window.GAME_CONFIG?.DEBUG_MODE) works

### Integration
- ✅ Config loads before error handler
- ✅ Error handler can check DEBUG_MODE
- ✅ Console logging respects DEBUG_MODE setting

## Expected Output

### Node.js Tests
All tests should show green checkmarks (✅) and "All tests passed!" message.

### Browser Tests
- test-config.html should show "Configuration loaded successfully!" with all values
- test-error-handler.html should show interactive buttons and working notifications

## Troubleshooting

If tests fail:

1. **Config not loading**
   - Check that `src/config.js` exists
   - Verify script tag in HTML files: `<script src="src/config.js"></script>`

2. **DEBUG_MODE undefined**
   - Ensure config loads before error handler
   - Check browser console for errors

3. **Browser tests not working**
   - Make sure server is running
   - Check that you're accessing via http://localhost (not file://)
   - Open browser console to see any errors
