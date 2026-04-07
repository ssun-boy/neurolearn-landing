// ========================================
// Theme
// ========================================
function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateLogo(isDark);
}

function initTheme() {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved === 'dark' || (!saved && prefersDark);
    if (isDark) document.body.classList.add('dark-mode');
    updateLogo(isDark);
}

function updateLogo(isDark) {
    document.querySelectorAll('.logo-image').forEach(img => {
        img.src = isDark
            ? 'assets/images/neurolearn-logo-dark.jpg'
            : 'assets/images/neurolearn-logo.png';
    });
}

// ========================================
// Trial Modal (Coming Soon)
// ========================================
function showTrialModal() {
    document.getElementById('trialModal').classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
        const input = document.getElementById('reserveEmail');
        if (input) input.focus();
    }, 100);
}

function closeTrialModal() {
    document.getElementById('trialModal').classList.remove('active');
    document.body.style.overflow = '';
}

function submitReservation(e) {
    e.preventDefault();
    const email = document.getElementById('reserveEmail').value;
    if (!email) return;

    // Replace form with success message
    const card = e.target.closest('.modal-card');
    const badge = card.querySelector('.modal-badge');
    const title = card.querySelector('h3');
    const desc = card.querySelector('p');
    const form = card.querySelector('.modal-form');
    const note = card.querySelector('.modal-note');

    if (badge) badge.textContent = '예약 완료!';
    if (badge) badge.style.background = 'linear-gradient(135deg, #22C55E, #34D399)';
    if (title) title.textContent = '감사합니다!';
    if (desc) desc.innerHTML = '오픈 시 <strong>' + escapeHtml(email) + '</strong>으로<br>가장 먼저 초대해 드리겠습니다.';
    if (form) form.style.display = 'none';
    if (note) note.textContent = '2026년 7월, 기대해 주세요!';

    // Track event
    console.log('Reservation:', email);
    if (typeof gtag === 'function') {
        gtag('event', 'reservation', { event_category: 'signup', event_label: email });
    }
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// ========================================
// Contact Modal
// ========================================
function showContactModal() {
    document.getElementById('contactModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeContactModal() {
    document.getElementById('contactModal').classList.remove('active');
    document.body.style.overflow = '';
}

function copyEmail() {
    navigator.clipboard.writeText('ai.nomad@neurolearn.co.kr').then(() => {
        showToast('이메일이 복사되었습니다!');
    }).catch(() => {
        showToast('복사 실패 - ai.nomad@neurolearn.co.kr');
    });
}

// ========================================
// Toast
// ========================================
function showToast(msg, duration = 2500) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    const msgEl = toast.querySelector('.toast-msg');
    if (msgEl) msgEl.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), duration);
}

// ========================================
// Close modals
// ========================================
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        closeTrialModal();
        closeContactModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeTrialModal();
        closeContactModal();
    }
});

// ========================================
// Scroll Animations
// ========================================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

// ========================================
// Init
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Header shadow on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            header.style.boxShadow = '0 1px 12px rgba(0,0,0,0.06)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
});
