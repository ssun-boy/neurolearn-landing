// ========================================
// Toast Notification
// ========================================
function showToast(message, duration = 2500) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    const toastMessage = toast.querySelector('.toast-message');
    if (toastMessage) {
        toastMessage.textContent = message;
    }

    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

// ========================================
// Scroll Progress Bar
// ========================================
function updateScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    if (!scrollProgress) return;

    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;

    scrollProgress.style.width = `${Math.min(100, Math.max(0, progress))}%`;
}

// ========================================
// Navigation Active State
// ========================================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';
    const scrollPosition = window.pageYOffset + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ========================================
// Theme Functions
// ========================================
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-mode');

    // Save preference
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    // Update Logo
    updateLogo(isDark);
}

// Initialize Theme
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

    if (isDark) {
        document.body.classList.add('dark-mode');
    }

    // Update Logo
    updateLogo(isDark);
}

function updateLogo(isDark) {
    const logoImages = document.querySelectorAll('.logo-image');
    logoImages.forEach(img => {
        if (isDark) {
            img.src = 'assets/images/neurolearn-logo-dark.jpg';
        } else {
            img.src = 'assets/images/neurolearn-logo.png';
        }
    });
}

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
    const contactModal = document.getElementById('contactModal');
    if (contactModal) {
        contactModal.classList.add('active');
        document.body.style.overflow = 'hidden';
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
        // Show toast notification
        showToast('이메일이 복사되었습니다!');

        // Also update button temporarily
        const button = event.target.closest('.modal-button');
        if (button) {
            const originalText = button.innerHTML;
            button.innerHTML = '<span aria-hidden="true">✓</span> 복사 완료!';
            button.style.background = 'linear-gradient(135deg, #10B981 0%, #34D399 100%)';

            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = '';
            }, 2000);
        }
    }).catch(err => {
        console.error('Failed to copy email:', err);
        showToast('복사 실패 - 이메일: ai.nomad@neurolearn.co.kr');
    });
}

// Close modal when clicking outside
window.onclick = function (event) {
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
document.addEventListener('keydown', function (event) {
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
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add visible class for CSS animations
            entry.target.classList.add('visible');

            // Counter animation for stats
            if (entry.target.classList.contains('stat-number')) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                if (!isNaN(target)) {
                    animateCounter(entry.target, target);
                }
            }

            // Optionally unobserve after animation
            // animationObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// ========================================
// Smooth Parallax for Hero
// ========================================
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroOrbs = document.querySelectorAll('.hero-orb');
    
    if (heroContent && scrolled < window.innerHeight) {
        const opacity = Math.max(0, 1 - (scrolled / 500));
        const translateY = scrolled * 0.3;
        heroContent.style.transform = `translateY(${translateY}px)`;
        heroContent.style.opacity = opacity;
    }

    // Parallax for orbs
    heroOrbs.forEach((orb, index) => {
        const speed = 0.1 + (index * 0.05);
        orb.style.transform = `translate(${Math.sin(scrolled * 0.001 + index) * 20}px, ${scrolled * speed}px)`;
    });

    ticking = false;
}

// ========================================
// Initialize on DOM Load
// ========================================
document.addEventListener('DOMContentLoaded', function () {
    // Initialize Theme
    initTheme();

    // Observe all animate-on-scroll elements
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        animationObserver.observe(el);
    });

    // Observe stat numbers separately (they might not have animate-on-scroll class)
    document.querySelectorAll('.stat-number[data-count]').forEach(el => {
        if (!el.classList.contains('animate-on-scroll')) {
            animationObserver.observe(el);
        }
    });

    // Header effects & scroll indicator
    const header = document.querySelector('.header');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Header shadow
        if (currentScroll > 50) {
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }

        // Hide scroll indicator on scroll
        if (currentScroll > 100 && scrollIndicator) {
            scrollIndicator.classList.add('hidden');
        } else if (scrollIndicator) {
            scrollIndicator.classList.remove('hidden');
        }

        // Update scroll progress bar
        updateScrollProgress();

        // Update active navigation link
        updateActiveNavLink();

        // Parallax effect (throttled)
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // Smooth scroll for anchor links
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

    // Add hover effect to glass cards
    document.querySelectorAll('.glass-card').forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            this.style.setProperty('--mouse-x', e.offsetX + 'px');
            this.style.setProperty('--mouse-y', e.offsetY + 'px');
        });

        card.addEventListener('mousemove', function(e) {
            this.style.setProperty('--mouse-x', e.offsetX + 'px');
            this.style.setProperty('--mouse-y', e.offsetY + 'px');
        });
    });

    // Console log
    console.log('%cNeuroLearn', 'font-size: 24px; font-weight: bold; color: #0066FF;');
    console.log('%c🧠 AI + Neuroscience = Smarter Learning', 'font-size: 14px; color: #8B5CF6;');
});

// ========================================
// Performance: Preload critical resources
// ========================================
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        if (img.dataset.src) {
            img.src = img.dataset.src;
        }
    });
}

// ========================================
// Analytics placeholder
// ========================================
function trackEvent(category, action, label) {
    console.log(`📊 Event: ${category} - ${action} - ${label}`);
    // gtag('event', action, { 'event_category': category, 'event_label': label });
}

// Track CTA clicks
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.cta-button-large, .modal-button').forEach(button => {
        button.addEventListener('click', () => {
            trackEvent('CTA', 'click', button.textContent.trim());
        });
    });
});

// ========================================
// Keyboard Navigation Enhancement
// ========================================
document.addEventListener('keydown', function(e) {
    // Focus trap for modals
    const modal = document.querySelector('.modal.active');
    if (modal) {
        const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }
});
