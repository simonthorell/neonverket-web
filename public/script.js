/* Neonverket – lite liv i sajten. Inget ramverk, inga beroenden. */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Fäst boka-knapp ----
     Sajten har ingen meny. Knappen visas när heron är förbi och göms igen
     när kontaktsektionen syns – där finns ju redan mejl och telefon. */
  var book = document.getElementById('book');
  var hero = document.getElementById('top');
  var contact = document.getElementById('kontakt');

  if (book && hero && contact && 'IntersectionObserver' in window) {
    var pastHero = false;
    var atContact = false;

    function sync() {
      book.classList.toggle('is-visible', pastHero && !atContact);
    }

    new IntersectionObserver(function (entries) {
      pastHero = !entries[0].isIntersecting;
      sync();
    }, { threshold: 0 }).observe(hero);

    new IntersectionObserver(function (entries) {
      atContact = entries[0].isIntersecting;
      sync();
    }, { threshold: 0.15 }).observe(contact);
  } else if (book) {
    book.classList.add('is-visible');
  }

  /* ---- Innehåll som tonar in när det scrollas fram ---- */
  var targets = document.querySelectorAll('[data-reveal]');

  if (reduced || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (!entry.isIntersecting) return;
        // Liten förskjutning så kort i samma rad inte poppar in exakt samtidigt
        entry.target.style.transitionDelay = (i * 70) + 'ms';
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

    targets.forEach(function (el) { io.observe(el); });
  }

  /* ---- FAQ: bara en öppen åt gången ---- */
  var faqs = document.querySelectorAll('.faq details');
  faqs.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (!d.open) return;
      faqs.forEach(function (other) { if (other !== d) other.open = false; });
    });
  });
})();
