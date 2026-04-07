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
    document.querySelectorAll('.logo-img').forEach(img => {
        img.src = isDark
            ? 'assets/images/neurolearn-logo-dark.jpg'
            : 'assets/images/neurolearn-logo.png';
    });
}

// ========================================
// Trial Modal
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

    const card = e.target.closest('.modal-box');
    const badge = card.querySelector('.modal-badge-pill');
    const title = card.querySelector('h3');
    const desc = card.querySelector('p');
    const form = card.querySelector('.modal-form');
    const note = card.querySelector('.modal-small');

    if (badge) { badge.textContent = '예약 완료!'; badge.style.background = 'linear-gradient(135deg, #22C55E, #34D399)'; }
    if (title) title.textContent = '감사합니다!';
    if (desc) desc.innerHTML = '오픈 시 <strong>' + escapeHtml(email) + '</strong>으로<br>가장 먼저 초대해 드리겠습니다.';
    if (form) form.style.display = 'none';
    if (note) note.textContent = '2026년 7월, 기대해 주세요!';

    if (typeof gtag === 'function') {
        gtag('event', 'reservation', { event_category: 'signup', event_label: email });
    }
}

function escapeHtml(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
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
function showToast(msg, dur) {
    dur = dur || 2500;
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), dur);
}

// ========================================
// Modal close
// ========================================
window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-overlay')) {
        closeTrialModal();
        closeContactModal();
    }
});
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') { closeTrialModal(); closeContactModal(); }
});

// ========================================
// Result Tabs
// ========================================
function initTabs() {
    var tabs = document.querySelectorAll('.tab');
    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            var target = this.getAttribute('data-tab');
            // Deactivate all
            document.querySelectorAll('.tab').forEach(function(t) { t.classList.remove('active'); });
            document.querySelectorAll('.tab-panel').forEach(function(p) { p.classList.remove('active'); });
            // Activate
            this.classList.add('active');
            var panel = document.getElementById('panel-' + target);
            if (panel) panel.classList.add('active');
        });
    });
}

// ========================================
// Scroll Reveal
// ========================================
var revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

// ========================================
// Init
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initTabs();

    document.querySelectorAll('.reveal').forEach(function(el) {
        revealObserver.observe(el);
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(function(a) {
        a.addEventListener('click', function(e) {
            e.preventDefault();
            var t = document.querySelector(this.getAttribute('href'));
            if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Header shadow
    var header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        header.style.boxShadow = window.pageYOffset > 50
            ? '0 1px 12px rgba(0,0,0,0.06)'
            : 'none';
    });
});
