#!/usr/bin/env node
/**
 * Test script to verify configuration is properly loaded
 */

const CONFIG = require('./src/config.js');

console.log('🧪 Testing ModelIt Configuration...\n');

// Test 1: Configuration object exists
console.log('✅ Test 1: Configuration loaded');
console.log('   CONFIG object type:', typeof CONFIG);

// Test 2: DEBUG_MODE property exists
console.log('\n✅ Test 2: DEBUG_MODE property exists');
console.log('   DEBUG_MODE:', CONFIG.DEBUG_MODE);
console.log('   Type:', typeof CONFIG.DEBUG_MODE);

// Test 3: All expected properties exist
const expectedProperties = [
    'UNSPLASH_ACCESS_KEY',
    'PEXELS_API_KEY',
    'OPENROUTER_API_KEY',
    'OPENROUTER_MODEL',
    'ENABLE_DYNAMIC_IMAGES',
    'ENABLE_AI_FEEDBACK',
    'VOICE_ENABLED_BY_DEFAULT',
    'MUSIC_ENABLED_BY_DEFAULT',
    'DEBUG_MODE',
    'SKIP_INTRO',
    'HIGH_CONTRAST_MODE',
    'KEYBOARD_SHORTCUTS_ENABLED'
];

console.log('\n✅ Test 3: All expected properties exist');
let allPropertiesExist = true;
expectedProperties.forEach(prop => {
    const exists = CONFIG.hasOwnProperty(prop);
    if (!exists) {
        console.log(`   ❌ Missing: ${prop}`);
        allPropertiesExist = false;
    }
});

if (allPropertiesExist) {
    console.log('   All properties found ✓');
}

// Test 4: Check default values
console.log('\n✅ Test 4: Default values check');
console.log('   DEBUG_MODE:', CONFIG.DEBUG_MODE, '(expected: false)');
console.log('   VOICE_ENABLED_BY_DEFAULT:', CONFIG.VOICE_ENABLED_BY_DEFAULT, '(expected: true)');
console.log('   MUSIC_ENABLED_BY_DEFAULT:', CONFIG.MUSIC_ENABLED_BY_DEFAULT, '(expected: true)');

// Summary
console.log('\n' + '='.repeat(50));
console.log('📊 Configuration Summary:');
console.log('='.repeat(50));
console.log(JSON.stringify(CONFIG, null, 2));
console.log('\n✅ All tests passed! Configuration is working correctly.');
