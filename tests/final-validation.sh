#!/bin/bash

echo "================================================"
echo "🧪 ModelIt Mystery - Final Configuration Validation"
echo "================================================"
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

cd /home/runner/work/modelit-mystery/modelit-mystery

# Test 1: Check if config file exists
echo "Test 1: Configuration file exists"
if [ -f "src/config.js" ]; then
    echo -e "  ${GREEN}✅ src/config.js exists${NC}"
else
    echo -e "  ${RED}❌ src/config.js NOT found${NC}"
    exit 1
fi

# Test 2: Check if config contains DEBUG_MODE
echo "Test 2: DEBUG_MODE defined in config"
if grep -q "DEBUG_MODE:" src/config.js; then
    echo -e "  ${GREEN}✅ DEBUG_MODE property found${NC}"
else
    echo -e "  ${RED}❌ DEBUG_MODE property NOT found${NC}"
    exit 1
fi

# Test 3: Check if HTML files include config
echo "Test 3: HTML files include config script"
if grep -q 'src="src/config.js"' modelit-story.html && grep -q 'src="src/config.js"' index.html; then
    echo -e "  ${GREEN}✅ Both HTML files include config.js${NC}"
else
    echo -e "  ${RED}❌ HTML files missing config.js script tag${NC}"
    exit 1
fi

# Test 4: Run Node.js config test
echo "Test 4: Node.js configuration test"
if node tests/test-config.js > /tmp/config-test.log 2>&1; then
    echo -e "  ${GREEN}✅ Node.js test passed${NC}"
else
    echo -e "  ${RED}❌ Node.js test failed${NC}"
    cat /tmp/config-test.log
    exit 1
fi

# Test 5: Run integration test
echo "Test 5: Integration test (config + error handler)"
if node tests/integration-test.js > /tmp/integration-test.log 2>&1; then
    echo -e "  ${GREEN}✅ Integration test passed${NC}"
else
    echo -e "  ${RED}❌ Integration test failed${NC}"
    cat /tmp/integration-test.log
    exit 1
fi

# Test 6: Check if config is valid JavaScript
echo "Test 6: Configuration file syntax validation"
if node -c src/config.js 2>/dev/null; then
    echo -e "  ${GREEN}✅ config.js has valid JavaScript syntax${NC}"
else
    echo -e "  ${RED}❌ config.js has syntax errors${NC}"
    exit 1
fi

# Test 7: Verify HTTP accessibility (if server running)
echo "Test 7: HTTP accessibility check"
if curl -s -o /dev/null -w "%{http_code}" http://localhost:9000/src/config.js | grep -q "200"; then
    echo -e "  ${GREEN}✅ Config accessible via HTTP${NC}"
else
    echo -e "  ${YELLOW}⚠️  HTTP server not running (this is OK)${NC}"
fi

# Test 8: Check documentation
echo "Test 8: Documentation exists"
if [ -f "docs/DEBUG_MODE.md" ] && [ -f "tests/README.md" ]; then
    echo -e "  ${GREEN}✅ Documentation files exist${NC}"
else
    echo -e "  ${RED}❌ Documentation files missing${NC}"
    exit 1
fi

# Test 9: Verify README updated
echo "Test 9: README.md mentions configuration"
if grep -q "Configuration & Debug Mode" README.md; then
    echo -e "  ${GREEN}✅ README.md updated with configuration info${NC}"
else
    echo -e "  ${RED}❌ README.md not updated${NC}"
    exit 1
fi

echo ""
echo "================================================"
echo -e "${GREEN}✅ ALL VALIDATION TESTS PASSED!${NC}"
echo "================================================"
echo ""
echo "Summary:"
echo "  ✅ Configuration file created and valid"
echo "  ✅ HTML files load configuration"
echo "  ✅ DEBUG_MODE accessible via window.GAME_CONFIG"
echo "  ✅ Error handler integration works"
echo "  ✅ Documentation complete"
echo ""
echo "Users can now access DEBUG_MODE by:"
echo "  1. Edit src/config.js: DEBUG_MODE: true"
echo "  2. Browser console: window.GAME_CONFIG.DEBUG_MODE = true"
echo ""
