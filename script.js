// ========================================
// Theme
// ========================================
function toggleTheme() {
    var isDark = document.body.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

(function initTheme() {
    var saved = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (saved === 'dark' || (!saved && prefersDark)) document.body.classList.add('dark');
})();

// ========================================
// Trial Modal
// ========================================
function showTrialModal() {
    document.getElementById('trialModal').classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(function () {
        var el = document.getElementById('reserveEmail');
        if (el) el.focus();
    }, 120);
}
function closeTrialModal() {
    document.getElementById('trialModal').classList.remove('active');
    document.body.style.overflow = '';
}

function submitReservation(e) {
    e.preventDefault();
    var email = document.getElementById('reserveEmail').value;
    if (!email) return;

    var box = e.target.closest('.modal-box');
    var pill = box.querySelector('.modal-pill');
    var h3 = box.querySelector('h3');
    var p = box.querySelector('p');
    var form = box.querySelector('.modal-form');
    var note = box.querySelector('.modal-note');

    if (pill) { pill.textContent = '예약 완료!'; pill.style.background = 'linear-gradient(135deg,#22C55E,#34D399)'; }
    if (h3) h3.textContent = '감사합니다!';
    if (p) p.innerHTML = '오픈 시 <strong>' + esc(email) + '</strong>으로<br>가장 먼저 초대해 드리겠습니다.';
    if (form) form.style.display = 'none';
    if (note) note.textContent = '2026년 7월, 기대해 주세요!';

    if (typeof gtag === 'function') gtag('event', 'reservation', { event_category: 'signup', event_label: email });
}

function esc(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

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
    navigator.clipboard.writeText('ai.nomad@neurolearn.co.kr').then(function () {
        showToast('이메일이 복사되었습니다!');
    }).catch(function () {
        showToast('복사 실패 - ai.nomad@neurolearn.co.kr');
    });
}

// ========================================
// Toast
// ========================================
function showToast(msg) {
    var t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(function () { t.classList.remove('show'); }, 2500);
}

// ========================================
// Close modals
// ========================================
window.addEventListener('click', function (e) {
    if (e.target.classList.contains('modal-overlay')) { closeTrialModal(); closeContactModal(); }
});
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeTrialModal(); closeContactModal(); }
});

// ========================================
// Result Tabs
// ========================================
function initTabs() {
    var tabs = document.querySelectorAll('.rtab');
    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            var id = this.getAttribute('data-tab');
            document.querySelectorAll('.rtab').forEach(function (t) { t.classList.remove('active'); });
            document.querySelectorAll('.rtab-panel').forEach(function (p) { p.classList.remove('active'); });
            this.classList.add('active');
            var panel = document.getElementById('p-' + id);
            if (panel) panel.classList.add('active');
        });
    });
}

// ========================================
// Scroll Reveal with stagger
// ========================================
var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            var delay = parseFloat(entry.target.getAttribute('data-delay')) || 0;
            entry.target.style.transitionDelay = delay + 's';
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

// ========================================
// Header scroll shadow
// ========================================
function initHeaderShadow() {
    var h = document.getElementById('header');
    window.addEventListener('scroll', function () {
        h.style.boxShadow = window.pageYOffset > 30 ? '0 1px 8px rgba(0,0,0,.06)' : 'none';
    }, { passive: true });
}

// ========================================
// Smooth scroll
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
        a.addEventListener('click', function (e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

// ========================================
// Init
// ========================================
document.addEventListener('DOMContentLoaded', function () {
    initTabs();
    initHeaderShadow();
    initSmoothScroll();

    // Observe all scroll-reveal elements
    document.querySelectorAll('.sr').forEach(function (el) { io.observe(el); });
});
