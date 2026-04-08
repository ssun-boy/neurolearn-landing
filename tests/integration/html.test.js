/**
 * Integration test: Verify HTML structure and configuration
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../..');
const htmlContent = fs.readFileSync(path.join(root, 'index.html'), 'utf-8');

describe('SEO meta tags', () => {
    test('has canonical URL', () => {
        expect(htmlContent).toContain('rel="canonical"');
    });

    test('has meta description', () => {
        expect(htmlContent).toContain('name="description"');
    });

    test('has OG title', () => {
        expect(htmlContent).toContain('property="og:title"');
    });

    test('has OG image referencing og-image.png', () => {
        expect(htmlContent).toContain('/assets/images/og-image.png');
    });

    test('has Twitter card meta', () => {
        expect(htmlContent).toContain('name="twitter:card"');
    });
});

describe('Favicon references', () => {
    test('references favicon.svg', () => {
        expect(htmlContent).toContain('favicon.svg');
    });

    test('references favicon-32x32.png', () => {
        expect(htmlContent).toContain('favicon-32x32.png');
    });

    test('references favicon-16x16.png', () => {
        expect(htmlContent).toContain('favicon-16x16.png');
    });

    test('references apple-touch-icon.png', () => {
        expect(htmlContent).toContain('apple-touch-icon.png');
    });
});

describe('Google Analytics 4', () => {
    test('has GA4 gtag.js script tag', () => {
        expect(htmlContent).toContain('googletagmanager.com/gtag/js');
    });

    test('has gtag config call', () => {
        expect(htmlContent).toContain("gtag('config'");
    });

    test('uses placeholder measurement ID', () => {
        expect(htmlContent).toContain('G-XXXXXXXXXX');
    });
});

describe('Structured data', () => {
    test('has JSON-LD structured data', () => {
        expect(htmlContent).toContain('application/ld+json');
    });

    test('has SoftwareApplication schema', () => {
        expect(htmlContent).toContain('"@type": "SoftwareApplication"');
    });
});

describe('Accessibility', () => {
    test('has lang attribute on html tag', () => {
        expect(htmlContent).toMatch(/<html\s+lang="/);
    });

    test('has main landmark', () => {
        expect(htmlContent).toContain('<main');
    });

    test('has skip navigation link', () => {
        expect(htmlContent).toContain('skip-link');
    });

    test('toast has aria-live attribute', () => {
        expect(htmlContent).toContain('aria-live="polite"');
    });

    test('Google Forms link has rel="noopener noreferrer"', () => {
        expect(htmlContent).toMatch(/docs\.google\.com.*rel="noopener noreferrer"/s);
    });

    test('logo images have width and height', () => {
        expect(htmlContent).toMatch(/logo-image.*width="160".*height="48"/);
    });
});

describe('PWA manifest', () => {
    test('references site.webmanifest', () => {
        expect(htmlContent).toContain('site.webmanifest');
    });

    test('has theme-color meta tag', () => {
        expect(htmlContent).toContain('name="theme-color"');
    });
});

describe('vercel.json configuration', () => {
    const vercelConfig = JSON.parse(
        fs.readFileSync(path.join(root, 'vercel.json'), 'utf-8')
    );

    test('catch-all rule has security headers, not immutable cache', () => {
        const catchAll = vercelConfig.headers.find(h => h.source === '/(.*)');
        expect(catchAll).toBeDefined();
        const headerKeys = catchAll.headers.map(h => h.key);
        expect(headerKeys).toContain('X-Frame-Options');
        expect(headerKeys).toContain('X-Content-Type-Options');
        expect(headerKeys).not.toContain('Cache-Control');
    });

    test('has index.html with must-revalidate', () => {
        const indexRule = vercelConfig.headers.find(h => h.source === '/index.html');
        expect(indexRule).toBeDefined();
        expect(indexRule.headers[0].value).toContain('must-revalidate');
    });

    test('has style.css with 1-day cache', () => {
        const cssRule = vercelConfig.headers.find(h => h.source === '/style.css');
        expect(cssRule).toBeDefined();
        expect(cssRule.headers[0].value).toContain('max-age=86400');
    });

    test('has script.js with 1-day cache', () => {
        const jsRule = vercelConfig.headers.find(h => h.source === '/script.js');
        expect(jsRule).toBeDefined();
        expect(jsRule.headers[0].value).toContain('max-age=86400');
    });
});

describe('.vercelignore configuration', () => {
    const vercelignore = fs.readFileSync(
        path.join(root, '.vercelignore'),
        'utf-8'
    );

    test('excludes ZIP archives', () => {
        expect(vercelignore).toContain('.zip');
    });

    test('excludes brand source images', () => {
        expect(vercelignore).toContain('NeuroLearn_standard.jpg');
    });

    test('excludes node_modules', () => {
        expect(vercelignore).toContain('node_modules');
    });

    test('excludes scripts directory', () => {
        expect(vercelignore).toContain('scripts/');
    });
});
