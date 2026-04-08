/**
 * Unit tests for script.js functions
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

// Load script.js into jsdom
const scriptContent = fs.readFileSync(
    path.resolve(__dirname, '../../script.js'),
    'utf-8'
);

// Setup minimal DOM before loading script
beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = `
        <div class="scroll-progress" id="scrollProgress"></div>
        <div class="toast" id="toast">
            <span class="toast-icon">✓</span>
            <span class="toast-message"></span>
        </div>
        <header class="header"></header>
        <div class="scroll-indicator"></div>
        <div id="modal" class="modal">
            <div class="modal-content">
                <button class="close-button" onclick="closeModal()">×</button>
            </div>
        </div>
        <div id="contactModal" class="modal">
            <div class="modal-content">
                <button class="close-button" onclick="closeContactModal()">×</button>
            </div>
        </div>
        <div class="stat-number" data-count="100">0</div>
        <img class="logo-image" src="assets/images/neurolearn-logo.png" alt="logo">
    `;

    // Reset globals
    delete global.gtag;
    localStorage.clear();

    // Suppress console.log from script
    jest.spyOn(console, 'log').mockImplementation(() => {});

    // Evaluate script in jsdom context
    eval(scriptContent);
});

afterEach(() => {
    jest.restoreAllMocks();
});

// ========================================
// trackEvent tests
// ========================================
describe('trackEvent', () => {
    test('does not throw when gtag is undefined', () => {
        expect(() => trackEvent('CTA', 'click', 'test')).not.toThrow();
    });

    test('calls gtag when available', () => {
        global.gtag = jest.fn();
        trackEvent('CTA', 'click', 'test-label');
        expect(global.gtag).toHaveBeenCalledWith('event', 'click', {
            event_category: 'CTA',
            event_label: 'test-label',
        });
    });
});

// ========================================
// showToast tests
// ========================================
describe('showToast', () => {
    test('adds show class to toast element', () => {
        showToast('Test message');
        const toast = document.getElementById('toast');
        expect(toast.classList.contains('show')).toBe(true);
    });

    test('sets toast message text', () => {
        showToast('Hello World');
        const msg = document.querySelector('.toast-message');
        expect(msg.textContent).toBe('Hello World');
    });

    test('does not throw when toast element is missing', () => {
        document.getElementById('toast').remove();
        expect(() => showToast('No toast')).not.toThrow();
    });
});

// ========================================
// Modal tests
// ========================================
describe('showModal / closeModal', () => {
    test('showModal adds active class', () => {
        showModal();
        const modal = document.getElementById('modal');
        expect(modal.classList.contains('active')).toBe(true);
    });

    test('showModal sets overflow hidden', () => {
        showModal();
        expect(document.body.style.overflow).toBe('hidden');
    });

    test('closeModal removes active class', () => {
        showModal();
        closeModal();
        const modal = document.getElementById('modal');
        expect(modal.classList.contains('active')).toBe(false);
    });

    test('closeModal restores overflow', () => {
        showModal();
        closeModal();
        expect(document.body.style.overflow).toBe('auto');
    });
});

describe('showContactModal / closeContactModal', () => {
    test('showContactModal adds active class', () => {
        showContactModal();
        const modal = document.getElementById('contactModal');
        expect(modal.classList.contains('active')).toBe(true);
    });

    test('closeContactModal removes active class', () => {
        showContactModal();
        closeContactModal();
        const modal = document.getElementById('contactModal');
        expect(modal.classList.contains('active')).toBe(false);
    });
});

// ========================================
// Theme tests
// ========================================
describe('toggleTheme', () => {
    test('toggles dark-mode class on body', () => {
        expect(document.body.classList.contains('dark-mode')).toBe(false);
        toggleTheme();
        expect(document.body.classList.contains('dark-mode')).toBe(true);
        toggleTheme();
        expect(document.body.classList.contains('dark-mode')).toBe(false);
    });

    test('saves theme preference to localStorage', () => {
        toggleTheme();
        expect(localStorage.getItem('theme')).toBe('dark');
        toggleTheme();
        expect(localStorage.getItem('theme')).toBe('light');
    });
});

describe('initTheme', () => {
    test('applies dark mode from localStorage', () => {
        localStorage.setItem('theme', 'dark');
        initTheme();
        expect(document.body.classList.contains('dark-mode')).toBe(true);
    });

    test('defaults to light mode without preference', () => {
        initTheme();
        expect(document.body.classList.contains('dark-mode')).toBe(false);
    });
});

// ========================================
// updateLogo tests
// ========================================
describe('updateLogo', () => {
    test('sets dark logo when isDark is true', () => {
        updateLogo(true);
        const img = document.querySelector('.logo-image');
        expect(img.src).toContain('neurolearn-logo-dark.jpg');
    });

    test('sets light logo when isDark is false', () => {
        updateLogo(false);
        const img = document.querySelector('.logo-image');
        expect(img.src).toContain('neurolearn-logo.png');
    });
});

// ========================================
// animateCounter tests
// ========================================
describe('animateCounter', () => {
    test('reaches target value', (done) => {
        const el = document.createElement('div');
        animateCounter(el, 50, 100); // fast duration
        setTimeout(() => {
            expect(el.textContent).toBe('50');
            done();
        }, 300);
    });
});
