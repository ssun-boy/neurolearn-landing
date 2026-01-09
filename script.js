// ========================================
// Modal Functions
// ========================================
function showModal() {
    const modal = document.getElementById('modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Contact Modal Functions
function showContactModal() {
    console.log('showContactModal called');
    const contactModal = document.getElementById('contactModal');
    if (contactModal) {
        contactModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        console.error('contactModal element not found');
    }
}

function closeContactModal() {
    const contactModal = document.getElementById('contactModal');
    contactModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Copy email to clipboard
function copyEmail() {
    const email = 'ai.nomad@neurolearn.co.kr';
    navigator.clipboard.writeText(email).then(() => {
        // Show success message
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = '✅ 복사되었습니다!';
        button.style.background = 'var(--secondary)';

        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = 'var(--accent)';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy email:', err);
        alert('이메일 주소: ai.nomad@neurolearn.co.kr');
    });
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    const contactModal = document.getElementById('contactModal');

    if (event.target === modal) {
        closeModal();
    }
    if (event.target === contactModal) {
        closeContactModal();
    }
}

// Close modal with ESC key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
        closeContactModal();
    }
});

// ========================================
// Counter Animation
// ========================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;

        // Check if we've reached the target (works for both positive and negative)
        if ((increment > 0 && current >= target) || (increment < 0 && current <= target)) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// ========================================
// Intersection Observer for Animations
// ========================================
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Counter animation for stats
            if (entry.target.classList.contains('stat-number')) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }

            // Fade in animation for other elements
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// ========================================
// Initialize on DOM Load
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Observe stat numbers
    document.querySelectorAll('.stat-number').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });

    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // Observe process steps
    document.querySelectorAll('.process-step').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.15}s`;
        observer.observe(el);
    });

    // Header background on scroll & Hide scroll indicator
    let lastScroll = 0;
    const header = document.querySelector('.header');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Header shadow
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }

        // Hide scroll indicator on scroll
        if (currentScroll > 50 && scrollIndicator) {
            scrollIndicator.classList.add('hidden');
        }

        lastScroll = currentScroll;
    });

    // Smooth scroll for anchor links (if any added later)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add parallax effect to hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-content');
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            hero.style.opacity = 1 - (scrolled / 600);
        }
    });

    // Log page load
    console.log('NeuroLearn Landing Page Loaded ✨');
    console.log('Ready to transform learning with AI and neuroscience! 🧠🤖');
});

// ========================================
// Performance: Preload critical resources
// ========================================
if ('loading' in HTMLImageElement.prototype) {
    // Browser supports lazy loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ========================================
// Analytics placeholder (if needed later)
// ========================================
function trackEvent(category, action, label) {
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
    // Add Google Analytics or other tracking here
    // Example: gtag('event', action, { 'event_category': category, 'event_label': label });
}

// Track CTA clicks
document.querySelectorAll('.cta-button-large, .cta-button-header').forEach(button => {
    button.addEventListener('click', () => {
        trackEvent('CTA', 'click', 'Start Learning Button');
    });
});
