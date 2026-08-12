// mobile menu
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
document.querySelectorAll('.mobile-menu a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

// active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 140;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });
  navLinks.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + current);
  });
});

// typing animation
const roles = ["Software Engineer","Web Developer","UI/UX Enthusiast","Problem Solver","Technology Enthusiast"];
const typedEl = document.getElementById('typedRole');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let ri = 0, ci = 0, deleting = false;
function typeLoop(){
  if(reduceMotion){ typedEl.textContent = roles[0]; return; }
  const word = roles[ri];
  if(!deleting){
    ci++;
    typedEl.textContent = word.slice(0,ci);
    if(ci === word.length){ deleting = true; setTimeout(typeLoop, 1400); return; }
  } else {
    ci--;
    typedEl.textContent = word.slice(0,ci);
    if(ci === 0){ deleting = false; ri = (ri+1) % roles.length; }
  }
  setTimeout(typeLoop, deleting ? 40 : 80);
}
typeLoop();

// scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// contact form -> mailto (UI only, no backend)
document.getElementById('contactForm').addEventListener('submit', function(e){
  e.preventDefault();
  const fd = new FormData(this);
  const name = fd.get('name'), email = fd.get('email'), subject = fd.get('subject') || 'Portfolio inquiry', message = fd.get('message');
  const to = "riznaag2003@gmail.com";
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  if(to){
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${body}`;
  } else {
    alert("This form isn't connected to an email address yet — add one in the code (search for [Add Email]) to enable sending.");
  }
});
