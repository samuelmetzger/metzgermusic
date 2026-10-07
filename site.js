/* metzgermusic.com — small enhancements; the site works without this file. */
(function () {
  // Reveal sections as they scroll into view
  var revealed = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -10% 0px' });
    revealed.forEach(function (el) { io.observe(el); });
  } else {
    revealed.forEach(function (el) { el.classList.add('in'); });
  }

  // Home tagline: hide the middle dot whenever the line wraps, so no line starts or ends with "·"
  var kicker = document.querySelector('.hero .kicker');
  if (kicker) {
    var parts = kicker.querySelectorAll('.kp');
    var sep = kicker.querySelector('.ks');
    var fitKicker = function () {
      if (parts.length < 2 || !sep) return;
      sep.style.display = '';
      parts.forEach(function (p) { p.style.display = ''; });
      if (getComputedStyle(sep).display === 'none') return; // phone layout already hides it
      if (parts[1].getBoundingClientRect().top - parts[0].getBoundingClientRect().top > 2) {
        sep.style.display = 'none';
        parts.forEach(function (p) { p.style.display = 'block'; });
      }
    };
    fitKicker();
    window.addEventListener('resize', fitKicker);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitKicker);
  }

  // If a local image is missing (e.g. previewing outside the repo), fall back to the live copy
  document.querySelectorAll('img[src^="images/"]').forEach(function (img) {
    var live = function () {
      if (img.dataset.live) return;
      img.dataset.live = '1';
      img.src = 'https://www.metzgermusic.com/' + img.getAttribute('src');
    };
    img.addEventListener('error', live);
    if (img.complete && img.naturalWidth === 0) live();
  });

  // Contact form (Formspree) — sends without leaving the page
  var form = document.getElementById('contact-form');
  var status = document.getElementById('cf-status');
  if (form && status) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      status.removeAttribute('data-state');
      status.textContent = 'Sending…';
      fetch(form.action, { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' } })
        .then(function (res) {
          if (res.ok) { form.reset(); status.setAttribute('data-state', 'ok'); status.textContent = 'Thank you — your message has been sent. Samuel will be in touch soon.'; }
          else { status.textContent = 'Sorry, something went wrong. Please email samuel@metzgermusic.com directly.'; }
        })
        .catch(function () { status.textContent = 'Sorry, something went wrong. Please email samuel@metzgermusic.com directly.'; });
    });
  }
})();
