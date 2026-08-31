(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var header = document.getElementById('c-header');
  var toTop = document.getElementById('c-totop');
  var headerScrim = 'linear-gradient(180deg, rgba(10,9,13,.92) 0%, rgba(10,9,13,.85) 55%, rgba(10,9,13,0) 100%)';

  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    if (header) {
      var on = y > 60;
      header.style.background = on ? 'rgba(10,9,13,.88)' : headerScrim;
      header.style.borderBottomColor = on ? 'rgba(255,255,255,.08)' : 'transparent';
      header.style.backdropFilter = on ? 'blur(10px)' : 'none';
    }
    if (toTop) {
      var show = y > window.innerHeight * 0.8;
      toTop.style.opacity = show ? '1' : '0';
      toTop.style.pointerEvents = show ? 'auto' : 'none';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (!reduced && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -12% 0px' });
    document.querySelectorAll('[data-reveal]').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('[data-reveal]').forEach(function (el) { el.classList.add('is-in'); });
  }

  function paintRail(id) {
    document.querySelectorAll('[data-topic]').forEach(function (b) { b.classList.toggle('rail-on', b.dataset.topic === id); });
    document.querySelectorAll('[data-panel]').forEach(function (p) { p.hidden = p.dataset.panel !== id; });
  }
  paintRail('world');

  document.addEventListener('click', function (ev) {
    var el = ev.target.closest('[data-act]');
    if (!el) return;
    var act = el.dataset.act;
    if (act === 'menu') {
      var m = document.getElementById('m-menu');
      if (m) m.hidden = !m.hidden;
    } else if (act === 'games') {
      var g = document.getElementById('games-menu');
      if (g) g.hidden = !g.hidden;
    } else if (act === 'dream') {
      el.style.animation = 'none';
      void el.offsetWidth;
      el.style.animation = 'tabFlash .9s ease';
    } else if (act === 'topic') {
      paintRail(el.dataset.topic);
    }
  });

  document.addEventListener('click', function (ev) {
    var g = document.getElementById('games-menu');
    if (g && !g.hidden && !ev.target.closest('#games-menu') && !ev.target.closest('[data-act="games"]')) g.hidden = true;
  });
})();
