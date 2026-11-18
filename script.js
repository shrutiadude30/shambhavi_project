const loader = document.querySelector('.loader');
window.addEventListener('load', () => setTimeout(() => loader.classList.add('hide'), 450));

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.navigation');
menuToggle.addEventListener('click', () => nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));

// Reveal sections as they enter the viewport.
const revealTargets = document.querySelectorAll('.intro, .feature, .projects, .services, .contact, .project-card, .feature-caption');
revealTargets.forEach(el => el.classList.add('reveal'));
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealTargets.forEach(el => observer.observe(el));

// Subtle pointer parallax on the hero artwork.
const hero = document.querySelector('.hero');
const art = document.querySelector('.hero-art');
hero.addEventListener('pointermove', event => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const bounds = hero.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width - 0.5;
  const y = (event.clientY - bounds.top) / bounds.height - 0.5;
  art.style.transform = `translate(${x * 13}px, ${y * 10}px)`;
});
hero.addEventListener('pointerleave', () => art.style.transform = 'translate(0,0)');

// Add a small scroll progress indicator to the top edge.
const progress = document.createElement('div');
progress.className = 'scroll-progress';
document.body.appendChild(progress);
Object.assign(progress.style, {position:'fixed',top:'0',left:'0',height:'3px',width:'0%',background:'#e95d3f',zIndex:'99'});
window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? window.scrollY / max * 100 : 0}%`;
}, {passive:true});
