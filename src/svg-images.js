// SVG Placeholder Images
// Consistent style with Cell Collective colors and character design

const SVGImages = {
    drElena: `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="bg1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:%230a4f6e;stop-opacity:1" />
      <stop offset="100%" style="stop-color:%231a1a2e;stop-opacity:1" />
    </linearGradient>
    <radialGradient id="glow1" cx="50%" cy="50%">
      <stop offset="0%" style="stop-color:%2300d4ff;stop-opacity:0.3" />
      <stop offset="100%" style="stop-color:%2300d4ff;stop-opacity:0" />
    </radialGradient>
  </defs>
  <rect fill="url(%23bg1)" width="800" height="600"/>
  <circle cx="400" cy="300" r="200" fill="url(%23glow1)"/>
  <circle cx="400" cy="240" r="100" fill="%23d4a574"/>
  <ellipse cx="400" cy="400" rx="140" ry="180" fill="%23ffffff"/>
  <rect x="260" y="380" width="280" height="220" fill="%23ffffff" rx="10"/>
  <circle cx="370" cy="220" r="12" fill="%23000"/>
  <circle cx="430" cy="220" r="12" fill="%23000"/>
  <path d="M 360 260 Q 400 275 440 260" stroke="%23000" stroke-width="2" fill="none"/>
  <ellipse cx="400" cy="180" rx="110" ry="80" fill="%23000"/>
  <circle cx="380" cy="460" r="8" fill="%2300d4ff"/>
  <circle cx="420" cy="460" r="8" fill="%2300d4ff"/>
  <text x="400" y="560" font-family="Arial" font-size="28" fill="%2300d4ff" text-anchor="middle" font-weight="bold">Dr. Elena</text>
</svg>`,

    labCrisis: `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:%230a4f6e;stop-opacity:1" />
      <stop offset="100%" style="stop-color:%231a1a2e;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect fill="url(%23bg2)" width="800" height="600"/>
  <rect x="100" y="180" width="600" height="320" fill="%23193a52" rx="15"/>
  <rect x="120" y="200" width="560" height="280" fill="%231a1a2e" rx="10"/>
  <rect x="150" y="240" width="220" height="160" fill="%2300d4ff" opacity="0.2" rx="8"/>
  <rect x="430" y="240" width="220" height="160" fill="%2300d4ff" opacity="0.2" rx="8"/>
  <text x="260" y="310" font-family="monospace" font-size="14" fill="%2300d4ff">CELL_DATA</text>
  <text x="540" y="310" font-family="monospace" font-size="14" fill="%2300d4ff">UNEXPECTED!</text>
  <circle cx="260" cy="350" r="20" fill="%2300d4ff" opacity="0.6"/>
  <circle cx="540" cy="350" r="20" fill="%23ff8800" opacity="0.6"/>
  <path d="M 260 350 L 280 330 L 300 350 L 280 370 Z" fill="%2300d4ff" opacity="0.4"/>
  <path d="M 540 350 L 560 330 L 580 350 L 560 370 Z" fill="%23ff8800" opacity="0.4"/>
  <text x="400" y="560" font-family="Arial" font-size="28" fill="%2300d4ff" text-anchor="middle" font-weight="bold">⚗️ The Mystery Lab</text>
</svg>`,

    cellSignaling: `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="bg3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:%230a4f6e;stop-opacity:1" />
      <stop offset="100%" style="stop-color:%231a1a2e;stop-opacity:1" />
    </linearGradient>
    <radialGradient id="glow3" cx="50%" cy="50%">
      <stop offset="0%" style="stop-color:%2300d4ff;stop-opacity:0.2" />
      <stop offset="100%" style="stop-color:%2300d4ff;stop-opacity:0" />
    </radialGradient>
  </defs>
  <rect fill="url(%23bg3)" width="800" height="600"/>
  <circle cx="200" cy="250" r="80" fill="url(%23glow3)"/>
  <circle cx="400" cy="300" r="80" fill="url(%23glow3)"/>
  <circle cx="600" cy="350" r="80" fill="url(%23glow3)"/>
  <circle cx="200" cy="250" r="55" fill="%2300d4ff" opacity="0.9"/>
  <circle cx="400" cy="300" r="60" fill="%2300d4ff" opacity="0.9"/>
  <circle cx="600" cy="350" r="55" fill="%2300d4ff" opacity="0.9"/>
  <line x1="255" y1="250" x2="340" y2="290" stroke="%2300d4ff" stroke-width="5"/>
  <polygon points="340,290 330,285 330,295" fill="%2300d4ff"/>
  <line x1="460" y1="310" x2="545" y2="340" stroke="%2300d4ff" stroke-width="5"/>
  <polygon points="545,340 535,335 535,345" fill="%2300d4ff"/>
  <text x="200" y="260" font-family="Arial" font-size="20" fill="%23fff" text-anchor="middle" font-weight="bold">📡</text>
  <text x="400" y="310" font-family="Arial" font-size="20" fill="%23fff" text-anchor="middle" font-weight="bold">🎯</text>
  <text x="600" y="360" font-family="Arial" font-size="20" fill="%23fff" text-anchor="middle" font-weight="bold">⚗️</text>
  <text x="400" y="560" font-family="Arial" font-size="28" fill="%2300d4ff" text-anchor="middle" font-weight="bold">🧬 How Cells Talk</text>
</svg>`,

    modelBuilding: `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="bg4" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:%230a4f6e;stop-opacity:1" />
      <stop offset="100%" style="stop-color:%231a1a2e;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect fill="url(%23bg4)" width="800" height="600"/>
  <rect x="150" y="120" width="500" height="350" fill="%23193a52" opacity="0.8" rx="15"/>
  <rect x="170" y="140" width="460" height="310" fill="%231a1a2e" opacity="0.9" rx="10"/>
  <g opacity="0.3">
    <line x1="170" y1="190" x2="630" y2="190" stroke="%2300d4ff" stroke-width="1" stroke-dasharray="5,5"/>
    <line x1="170" y1="250" x2="630" y2="250" stroke="%2300d4ff" stroke-width="1" stroke-dasharray="5,5"/>
    <line x1="170" y1="310" x2="630" y2="310" stroke="%2300d4ff" stroke-width="1" stroke-dasharray="5,5"/>
    <line x1="250" y1="140" x2="250" y2="450" stroke="%2300d4ff" stroke-width="1" stroke-dasharray="5,5"/>
    <line x1="400" y1="140" x2="400" y2="450" stroke="%2300d4ff" stroke-width="1" stroke-dasharray="5,5"/>
    <line x1="550" y1="140" x2="550" y2="450" stroke="%2300d4ff" stroke-width="1" stroke-dasharray="5,5"/>
  </g>
  <circle cx="300" cy="220" r="45" fill="%2300d4ff" opacity="0.9"/>
  <circle cx="500" cy="300" r="45" fill="%2300d4ff" opacity="0.9"/>
  <circle cx="400" cy="380" r="45" fill="%2300d4ff" opacity="0.9"/>
  <line x1="340" y1="235" x2="460" y2="285" stroke="%2300d4ff" stroke-width="4"/>
  <polygon points="460,285 450,280 450,290" fill="%2300d4ff"/>
  <line x1="475" y1="335" x2="430" y2="355" stroke="%2300d4ff" stroke-width="4"/>
  <polygon points="430,355 435,345 425,345" fill="%2300d4ff"/>
  <text x="400" y="560" font-family="Arial" font-size="28" fill="%2300d4ff" text-anchor="middle" font-weight="bold">🔬 Let's Build!</text>
</svg>`,

    celebration: `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="bg5" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:%230a4f6e;stop-opacity:1" />
      <stop offset="100%" style="stop-color:%231a1a2e;stop-opacity:1" />
    </linearGradient>
    <radialGradient id="glow5" cx="50%" cy="40%">
      <stop offset="0%" style="stop-color:%2300d4ff;stop-opacity:0.4" />
      <stop offset="100%" style="stop-color:%2300d4ff;stop-opacity:0" />
    </radialGradient>
  </defs>
  <rect fill="url(%23bg5)" width="800" height="600"/>
  <circle cx="400" cy="250" r="250" fill="url(%23glow5)"/>
  <text x="400" y="220" font-family="Arial" font-size="140" text-anchor="middle">🎉</text>
  <circle cx="200" cy="150" r="18" fill="%2300d4ff" opacity="0.8">
    <animate attributeName="cy" values="150;130;150" dur="2s" repeatCount="indefinite"/>
  </circle>
  <circle cx="600" cy="180" r="22" fill="%2300d4ff" opacity="0.8">
    <animate attributeName="cy" values="180;160;180" dur="2.5s" repeatCount="indefinite"/>
  </circle>
  <circle cx="150" cy="350" r="20" fill="%2300d4ff" opacity="0.8">
    <animate attributeName="cy" values="350;330;350" dur="3s" repeatCount="indefinite"/>
  </circle>
  <circle cx="650" cy="380" r="24" fill="%2300d4ff" opacity="0.8">
    <animate attributeName="cy" values="380;360;380" dur="2.2s" repeatCount="indefinite"/>
  </circle>
  <circle cx="300" cy="450" r="18" fill="%2300d4ff" opacity="0.8">
    <animate attributeName="cy" values="450;430;450" dur="2.8s" repeatCount="indefinite"/>
  </circle>
  <circle cx="500" cy="480" r="21" fill="%2300d4ff" opacity="0.8">
    <animate attributeName="cy" values="480;460;480" dur="2.4s" repeatCount="indefinite"/>
  </circle>
  <text x="400" y="360" font-family="Arial" font-size="48" fill="%2300d4ff" text-anchor="middle" font-weight="bold">YOU DID IT!</text>
  <text x="400" y="560" font-family="Arial" font-size="24" fill="%2300d4ff" text-anchor="middle">⭐ Science Champion ⭐</text>
</svg>`
};

// Export for use
if (typeof window !== 'undefined') {
    window.SVGImages = SVGImages;
}
