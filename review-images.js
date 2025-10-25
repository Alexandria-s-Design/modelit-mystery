// Review all generated images for Dr. Maya character consistency
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function reviewImages() {
    console.log('🔍 REVIEWING ALL DR. MAYA IMAGES FOR CONSISTENCY\n');
    console.log('═'.repeat(60));

    const imagesDir = path.join(__dirname, 'images', 'scenes');
    const allImages = fs.readdirSync(imagesDir).filter(f => f.endsWith('.png'));

    console.log(`Found ${allImages.length} images to review\n`);

    // Create HTML page to display all images in a grid
    const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Dr. Maya Image Consistency Review</title>
    <style>
        body {
            background: #0a1e28;
            color: white;
            font-family: Arial, sans-serif;
            padding: 20px;
        }
        h1 {
            color: #00d4ff;
            text-align: center;
            margin-bottom: 30px;
        }
        .reference {
            background: #1a3a4a;
            padding: 20px;
            margin-bottom: 40px;
            border: 3px solid #00ff88;
            border-radius: 10px;
            text-align: center;
        }
        .reference h2 {
            color: #00ff88;
            margin-top: 0;
        }
        .reference-image {
            max-width: 400px;
            border: 2px solid #00ff88;
            border-radius: 8px;
        }
        .reference-details {
            margin-top: 15px;
            text-align: left;
            display: inline-block;
        }
        .reference-details li {
            margin: 8px 0;
            color: #00ff88;
        }
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        .image-card {
            background: #1a3a4a;
            padding: 15px;
            border-radius: 10px;
            border: 2px solid #00d4ff;
        }
        .image-card img {
            width: 100%;
            border-radius: 8px;
            margin-bottom: 10px;
        }
        .image-name {
            color: #00d4ff;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .check-buttons {
            display: flex;
            gap: 10px;
            margin-top: 10px;
        }
        .btn {
            flex: 1;
            padding: 8px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
        }
        .btn-good {
            background: #00ff88;
            color: #0a1e28;
        }
        .btn-bad {
            background: #ff4444;
            color: white;
        }
        .card-good {
            border-color: #00ff88;
            background: #0a2e1a;
        }
        .card-bad {
            border-color: #ff4444;
            background: #2e0a0a;
        }
        .summary {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #1a3a4a;
            padding: 15px;
            border-radius: 10px;
            border: 2px solid #00d4ff;
            min-width: 200px;
        }
        .summary h3 {
            margin: 0 0 10px 0;
            color: #00d4ff;
        }
        .stat {
            margin: 5px 0;
        }
        .stat-good { color: #00ff88; }
        .stat-bad { color: #ff4444; }
    </style>
</head>
<body>
    <h1>🔍 Dr. Maya Character Consistency Review</h1>

    <div class="reference">
        <h2>✅ REFERENCE IMAGE - This is the correct Dr. Maya!</h2>
        <img src="images/scenes/ch0_scene1_maya_intro.png" class="reference-image" alt="Reference Dr. Maya">
        <div class="reference-details">
            <strong>Dr. Maya's Consistent Features:</strong>
            <ul>
                <li>✓ Natural curly hair pulled back in a bun</li>
                <li>✓ Warm brown skin tone</li>
                <li>✓ Big, expressive brown eyes</li>
                <li>✓ Cyan/teal colored shirt or scrubs</li>
                <li>✓ White lab coat</li>
                <li>✓ Friendly, approachable expression</li>
                <li>✓ Cartoon anime art style</li>
            </ul>
        </div>
    </div>

    <div class="summary">
        <h3>Review Progress</h3>
        <div class="stat">Total: <span id="total">0</span></div>
        <div class="stat stat-good">✅ Good: <span id="good">0</span></div>
        <div class="stat stat-bad">❌ Bad: <span id="bad">0</span></div>
        <div class="stat">Pending: <span id="pending">0</span></div>
    </div>

    <div class="grid" id="image-grid"></div>

    <script>
        const imageFiles = ${JSON.stringify(allImages)};
        const results = {};

        function updateSummary() {
            const total = imageFiles.length;
            const good = Object.values(results).filter(r => r === 'good').length;
            const bad = Object.values(results).filter(r => r === 'bad').length;
            const pending = total - good - bad;

            document.getElementById('total').textContent = total;
            document.getElementById('good').textContent = good;
            document.getElementById('bad').textContent = bad;
            document.getElementById('pending').textContent = pending;

            // Save results to localStorage
            localStorage.setItem('imageReview', JSON.stringify(results));
        }

        function markImage(filename, status) {
            results[filename] = status;
            const card = document.getElementById('card-' + filename);
            card.className = 'image-card card-' + status;
            updateSummary();
        }

        // Load previous results
        const saved = localStorage.getItem('imageReview');
        if (saved) {
            Object.assign(results, JSON.parse(saved));
        }

        // Create image cards
        const grid = document.getElementById('image-grid');
        imageFiles.forEach(filename => {
            const card = document.createElement('div');
            card.id = 'card-' + filename;
            card.className = 'image-card' + (results[filename] ? ' card-' + results[filename] : '');

            card.innerHTML = \`
                <div class="image-name">\${filename}</div>
                <img src="images/scenes/\${filename}" alt="\${filename}">
                <div class="check-buttons">
                    <button class="btn btn-good" onclick="markImage('\${filename}', 'good')">✅ Matches</button>
                    <button class="btn btn-bad" onclick="markImage('\${filename}', 'bad')">❌ Needs Regen</button>
                </div>
            \`;

            grid.appendChild(card);
        });

        updateSummary();

        // Export bad images list
        window.getBadImages = function() {
            const bad = Object.entries(results)
                .filter(([_, status]) => status === 'bad')
                .map(([filename, _]) => filename);
            console.log('Images needing regeneration:', bad);
            return bad;
        };
    </script>
</body>
</html>
    `;

    // Write the review HTML
    const reviewPath = path.join(__dirname, 'review-images.html');
    fs.writeFileSync(reviewPath, html);
    console.log(`✅ Created review page: ${reviewPath}\n`);

    // Launch browser to review
    console.log('🌐 Opening browser for image review...\n');
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(`file://${reviewPath}`);

    console.log('═'.repeat(60));
    console.log('📋 INSTRUCTIONS:');
    console.log('1. Compare each image to the reference (top of page)');
    console.log('2. Click ✅ if Dr. Maya looks consistent');
    console.log('3. Click ❌ if character is wrong/inconsistent');
    console.log('4. Check the summary box (top right) for progress');
    console.log('5. When done, run: node export-bad-images.js');
    console.log('═'.repeat(60));

    // Don't close browser - let user review
    console.log('\n⏳ Review the images in the browser...');
    console.log('   Press Ctrl+C in this terminal when finished\n');
}

reviewImages().catch(console.error);
