// Automatically screenshot all images in a grid for quick visual review
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function autoReview() {
    console.log('🔍 AUTO-REVIEWING ALL DR. MAYA IMAGES\n');
    console.log('═'.repeat(60));

    const imagesDir = path.join(__dirname, 'images', 'scenes');
    const allImages = fs.readdirSync(imagesDir)
        .filter(f => f.endsWith('.png'))
        .sort();

    console.log(`Found ${allImages.length} images\n`);

    // Create composite view HTML
    const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Dr. Maya Images Review</title>
    <style>
        body {
            background: #0a1e28;
            color: white;
            font-family: Arial, sans-serif;
            padding: 20px;
            margin: 0;
        }
        .reference-section {
            background: #1a3a4a;
            padding: 20px;
            margin-bottom: 30px;
            border: 4px solid #00ff88;
            border-radius: 10px;
        }
        .reference-section h1 {
            color: #00ff88;
            margin: 0 0 15px 0;
            text-align: center;
        }
        .reference-image {
            display: block;
            max-width: 500px;
            margin: 0 auto;
            border: 3px solid #00ff88;
            border-radius: 8px;
        }
        .reference-notes {
            margin-top: 15px;
            padding: 15px;
            background: rgba(0, 255, 136, 0.1);
            border-radius: 8px;
        }
        .reference-notes h3 {
            color: #00ff88;
            margin-top: 0;
        }
        .reference-notes li {
            color: #00ff88;
            margin: 8px 0;
        }
        .grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 15px;
        }
        .image-card {
            background: #1a3a4a;
            padding: 10px;
            border-radius: 8px;
            border: 2px solid #00d4ff;
        }
        .image-card img {
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-radius: 5px;
            margin-bottom: 8px;
        }
        .image-name {
            color: #00d4ff;
            font-size: 11px;
            word-break: break-all;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="reference-section">
        <h1>✅ REFERENCE: This is the correct Dr. Maya!</h1>
        <img src="images/scenes/ch0_scene1_maya_intro.png" class="reference-image" alt="Reference Dr. Maya">
        <div class="reference-notes">
            <h3>Dr. Maya's Key Features (must be consistent):</h3>
            <ul>
                <li>✓ Natural curly/coily hair in a bun</li>
                <li>✓ Warm brown skin tone (African American)</li>
                <li>✓ Big, expressive brown eyes</li>
                <li>✓ Cyan/teal colored clothing (shirt/scrubs)</li>
                <li>✓ White lab coat</li>
                <li>✓ Friendly, welcoming expression</li>
                <li>✓ Cartoon anime art style</li>
            </ul>
        </div>
    </div>

    <h2 style="color: #00d4ff; text-align: center; margin-bottom: 20px;">All Generated Images (${allImages.length} total)</h2>

    <div class="grid">
        ${allImages.map(img => `
            <div class="image-card">
                <img src="images/scenes/${img}" alt="${img}">
                <div class="image-name">${img}</div>
            </div>
        `).join('')}
    </div>
</body>
</html>
    `;

    const reviewPath = path.join(__dirname, 'image-review-grid.html');
    fs.writeFileSync(reviewPath, html);
    console.log(`✅ Created review grid: ${reviewPath}\n`);

    // Take screenshots
    console.log('📸 Taking screenshots...\n');
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    await page.goto(`file://${reviewPath}`);
    await page.waitForTimeout(2000);

    // Screenshot the reference section
    await page.screenshot({
        path: 'test-screenshots/reference-maya.png',
        fullPage: false,
        clip: { x: 0, y: 0, width: 1920, height: 400 }
    });
    console.log('✅ Saved reference: test-screenshots/reference-maya.png');

    // Screenshot full grid
    await page.screenshot({
        path: 'test-screenshots/all-images-grid.png',
        fullPage: true
    });
    console.log('✅ Saved full grid: test-screenshots/all-images-grid.png\n');

    await browser.close();

    console.log('═'.repeat(60));
    console.log('✅ REVIEW COMPLETE!');
    console.log('   Check: test-screenshots/all-images-grid.png');
    console.log('   Compare each image to reference at top');
    console.log('═'.repeat(60));
}

autoReview().catch(console.error);
