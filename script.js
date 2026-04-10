// Theme
(function(){
  var s=localStorage.getItem('theme'),p=window.matchMedia('(prefers-color-scheme:dark)').matches;
  if(s==='dark'||(!s&&p))document.body.classList.add('dark');
})();
function toggleTheme(){
  var d=document.body.classList.toggle('dark');
  localStorage.setItem('theme',d?'dark':'light');
}

// Trial Modal
function showTrialModal(){
  document.getElementById('trialModal').classList.add('active');
  document.body.style.overflow='hidden';
  setTimeout(function(){var e=document.getElementById('reserveEmail');if(e)e.focus()},120);
}
function closeTrialModal(){
  document.getElementById('trialModal').classList.remove('active');
  document.body.style.overflow='';
}
function submitReservation(e){
  e.preventDefault();
  var email=document.getElementById('reserveEmail').value;
  if(!email)return;
  var box=e.target.closest('.modal-box');
  var pill=box.querySelector('.modal-pill');
  var h3=box.querySelector('h3');
  var p=box.querySelector('p');
  var form=box.querySelector('.modal-form');
  var note=box.querySelector('.modal-note');
  if(pill){pill.textContent='예약 완료!';pill.style.background='var(--secondary)';}
  if(h3)h3.textContent='감사합니다!';
  if(p){var d=document.createElement('div');d.textContent=email;p.innerHTML='오픈 시 <strong>'+d.innerHTML+'</strong>으로<br>가장 먼저 초대해 드리겠습니다.';}
  if(form)form.style.display='none';
  if(note)note.textContent='2026년 7월, 기대해 주세요!';
  if(typeof gtag==='function')gtag('event','reservation',{event_category:'signup',event_label:email});
}

// Contact Modal
function showContactModal(){
  document.getElementById('contactModal').classList.add('active');
  document.body.style.overflow='hidden';
}
function closeContactModal(){
  document.getElementById('contactModal').classList.remove('active');
  document.body.style.overflow='';
}
function copyEmail(){
  navigator.clipboard.writeText('ai.nomad@neurolearn.co.kr').then(function(){showToast('이메일이 복사되었습니다!')}).catch(function(){showToast('복사 실패')});
}

// Toast
function showToast(m){
  var t=document.getElementById('toast');if(!t)return;
  t.textContent=m;t.classList.add('show');
  setTimeout(function(){t.classList.remove('show')},2500);
}

// Close modals
window.addEventListener('click',function(e){if(e.target.classList.contains('modal-bg')){closeTrialModal();closeContactModal()}});
document.addEventListener('keydown',function(e){if(e.key==='Escape'){closeTrialModal();closeContactModal();closeMobileMenu()}});

// Mobile menu
function toggleMobileMenu(){
  var m=document.getElementById('mobileMenu');
  m.classList.toggle('open');
}
function closeMobileMenu(){
  var m=document.getElementById('mobileMenu');
  if(m)m.classList.remove('open');
}

// Result Tabs
function initTabs(){
  document.querySelectorAll('.rtab').forEach(function(tab){
    tab.addEventListener('click',function(){
      var id=this.getAttribute('data-tab');
      document.querySelectorAll('.rtab').forEach(function(t){t.classList.remove('active')});
      document.querySelectorAll('.rtab-panel').forEach(function(p){p.classList.remove('active')});
      this.classList.add('active');
      var panel=document.getElementById('p-'+id);
      if(panel)panel.classList.add('active');
    });
  });
}

// Scroll Reveal with stagger delay
var io=new IntersectionObserver(function(entries){
  entries.forEach(function(entry){
    if(entry.isIntersecting){
      var d=parseFloat(entry.target.getAttribute('data-d'))||0;
      entry.target.style.transitionDelay=d+'s';
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
},{threshold:0.06,rootMargin:'0px 0px -60px 0px'});

// Floating CTA
function initFloatingCta(){
  var fc=document.getElementById('floatingCta');
  if(!fc)return;
  var hero=document.querySelector('.hero');
  if(!hero)return;
  var shown=false;
  window.addEventListener('scroll',function(){
    var heroBottom=hero.getBoundingClientRect().bottom;
    if(heroBottom<0&&!shown){shown=true;fc.classList.add('show')}
    else if(heroBottom>=0&&shown){shown=false;fc.classList.remove('show')}
  },{passive:true});
}

// Init
document.addEventListener('DOMContentLoaded',function(){
  initTabs();
  initFloatingCta();
  document.querySelectorAll('.sr').forEach(function(el){io.observe(el)});

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click',function(e){
      e.preventDefault();
      var t=document.querySelector(this.getAttribute('href'));
      if(t)t.scrollIntoView({behavior:'smooth',block:'start'});
      closeMobileMenu();
    });
  });

  // Header shadow
  var h=document.querySelector('.header');
  window.addEventListener('scroll',function(){
    h.style.boxShadow=window.pageYOffset>30?'0 1px 8px rgba(0,0,0,.06)':'none';
  },{passive:true});
});
