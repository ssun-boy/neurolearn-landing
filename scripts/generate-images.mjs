/**
 * Generate favicon PNGs and OG image from favicon.svg
 * Usage: node scripts/generate-images.mjs
 * Requires: npm install --save-dev sharp
 */
import sharp from 'sharp';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const svgBuffer = readFileSync(resolve(root, 'favicon.svg'));

// Favicon PNGs
const sizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'apple-touch-icon.png', size: 180 },
];

for (const { name, size } of sizes) {
    await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(resolve(root, name));
    console.log(`Generated ${name} (${size}x${size})`);
}

// OG Image (1200x630)
const ogSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#F0F4FF;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#FAFBFF;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="brand" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#0066FF;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#8B5CF6;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="iconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0066FF;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#8B5CF6;stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Brand accent bar -->
  <rect x="0" y="0" width="8" height="630" fill="url(#brand)"/>

  <!-- Decorative circles -->
  <circle cx="1100" cy="100" r="200" fill="#0066FF" opacity="0.04"/>
  <circle cx="1000" cy="500" r="150" fill="#8B5CF6" opacity="0.04"/>

  <!-- Favicon icon (scaled) -->
  <g transform="translate(80, 180) scale(1.2)">
    <circle cx="50" cy="50" r="45" fill="url(#iconGrad)"/>
    <circle cx="35" cy="35" r="6" fill="white" opacity="0.9"/>
    <circle cx="65" cy="35" r="6" fill="white" opacity="0.9"/>
    <circle cx="50" cy="55" r="8" fill="white" opacity="0.9"/>
    <circle cx="30" cy="60" r="5" fill="white" opacity="0.7"/>
    <circle cx="70" cy="60" r="5" fill="white" opacity="0.7"/>
    <line x1="35" y1="35" x2="50" y2="55" stroke="white" stroke-width="2" opacity="0.6"/>
    <line x1="65" y1="35" x2="50" y2="55" stroke="white" stroke-width="2" opacity="0.6"/>
    <line x1="30" y1="60" x2="50" y2="55" stroke="white" stroke-width="2" opacity="0.5"/>
    <line x1="70" y1="60" x2="50" y2="55" stroke="white" stroke-width="2" opacity="0.5"/>
    <line x1="35" y1="35" x2="65" y2="35" stroke="white" stroke-width="2" opacity="0.4"/>
  </g>

  <!-- Title -->
  <text x="240" y="260" font-family="sans-serif" font-weight="800" font-size="72" fill="#0066FF">NeuroLearn</text>

  <!-- Subtitle -->
  <text x="240" y="320" font-family="sans-serif" font-weight="500" font-size="32" fill="#374151">AI와 뇌과학으로 합격하세요</text>

  <!-- Description -->
  <text x="240" y="380" font-family="sans-serif" font-weight="400" font-size="22" fill="#6B7280">AI와 뇌과학 기반의 스마트 자격증 학습 플랫폼</text>

  <!-- URL -->
  <text x="240" y="540" font-family="sans-serif" font-weight="400" font-size="18" fill="#9CA3AF">www.neurolearn.co.kr</text>
</svg>`;

await sharp(Buffer.from(ogSvg))
    .resize(1200, 630)
    .png()
    .toFile(resolve(root, 'assets', 'images', 'og-image.png'));
console.log('Generated assets/images/og-image.png (1200x630)');

console.log('\nAll images generated successfully!');
