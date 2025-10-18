document.addEventListener('DOMContentLoaded', function(){
  // Set year
  document.querySelectorAll('[id^="year"]').forEach(el => el.textContent = new Date().getFullYear());
  // mark active nav link
  const path = location.pathname.split('/').pop();
  document.querySelectorAll('.navbar .nav-link').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });
});
