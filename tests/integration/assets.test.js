/**
 * Integration test: Verify all referenced assets exist on disk
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../..');

const requiredFiles = [
    'index.html',
    'style.css',
    'script.js',
    'favicon.svg',
    'favicon-16x16.png',
    'favicon-32x32.png',
    'apple-touch-icon.png',
    'site.webmanifest',
    'robots.txt',
    'sitemap.xml',
    'assets/images/og-image.png',
    'assets/images/neurolearn-logo.png',
    'assets/images/neurolearn-logo-dark.jpg',
];

describe('Asset file existence', () => {
    requiredFiles.forEach(file => {
        test(`File exists: ${file}`, () => {
            const filePath = path.join(root, file);
            expect(fs.existsSync(filePath)).toBe(true);
        });
    });
});

describe('Image file sizes', () => {
    test('favicon-16x16.png is reasonable size (< 10KB)', () => {
        const filePath = path.join(root, 'favicon-16x16.png');
        if (fs.existsSync(filePath)) {
            const stats = fs.statSync(filePath);
            expect(stats.size).toBeLessThan(10 * 1024);
            expect(stats.size).toBeGreaterThan(0);
        }
    });

    test('favicon-32x32.png is reasonable size (< 20KB)', () => {
        const filePath = path.join(root, 'favicon-32x32.png');
        if (fs.existsSync(filePath)) {
            const stats = fs.statSync(filePath);
            expect(stats.size).toBeLessThan(20 * 1024);
            expect(stats.size).toBeGreaterThan(0);
        }
    });

    test('apple-touch-icon.png is reasonable size (< 100KB)', () => {
        const filePath = path.join(root, 'apple-touch-icon.png');
        if (fs.existsSync(filePath)) {
            const stats = fs.statSync(filePath);
            expect(stats.size).toBeLessThan(100 * 1024);
            expect(stats.size).toBeGreaterThan(0);
        }
    });

    test('og-image.png is reasonable size (< 500KB)', () => {
        const filePath = path.join(root, 'assets/images/og-image.png');
        if (fs.existsSync(filePath)) {
            const stats = fs.statSync(filePath);
            expect(stats.size).toBeLessThan(500 * 1024);
            expect(stats.size).toBeGreaterThan(0);
        }
    });
});
