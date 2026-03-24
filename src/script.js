// Sticky burger nav — appears after header/nav scrolls out of view
document.addEventListener('DOMContentLoaded', function () {
  var siteHeader   = document.querySelector('.site-header');
  var mainNav      = document.querySelector('.main-nav');
  var scrollNav    = document.querySelector('.scroll-nav');
  var scrollBurger = document.querySelector('.scroll-nav-burger');
  var scrollMenu   = document.querySelector('.scroll-nav-menu');
  var scrollClose  = document.querySelector('.scroll-nav-close');
  var overlay      = document.querySelector('.scroll-nav-overlay');

  if (!scrollNav) return;

  function handleScroll() {
    var y = window.scrollY || window.pageYOffset;

    // Use site-header bottom as threshold on ALL screen sizes
    // Sticky nav only appears after the site-header is fully scrolled out of view
    var threshold = siteHeader ? (siteHeader.offsetTop + siteHeader.offsetHeight) : 80;

    var shouldShow = y >= threshold;
    scrollNav.classList.toggle('scroll-nav--visible', shouldShow);

    if (!shouldShow) closeMenu();
  }

  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleScroll);

  function openMenu() {
    if (!scrollMenu) return;
    scrollMenu.classList.add('open');
    if (scrollBurger) scrollBurger.setAttribute('aria-expanded', 'true');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!scrollMenu) return;
    scrollMenu.classList.remove('open');
    if (scrollBurger) scrollBurger.setAttribute('aria-expanded', 'false');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (scrollBurger) {
    scrollBurger.addEventListener('click', function () {
      scrollMenu.classList.contains('open') ? closeMenu() : openMenu();
    });
  }

  if (scrollMenu) {
    scrollMenu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') closeMenu();
    });
  }

  if (scrollClose) scrollClose.addEventListener('click', closeMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });
});

// Reset zoom
function resetZoom() {
  document.body.style.zoom = '1';
  var metaViewport = document.querySelector('meta[name="viewport"]');
  if (metaViewport) {
    metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0');
    setTimeout(function () {
      metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
    }, 300);
  }
}

var wheelZoomTimeout;
document.addEventListener('wheel', function (e) {
  if (e.ctrlKey) {
    clearTimeout(wheelZoomTimeout);
    wheelZoomTimeout = setTimeout(function () { resetZoom(); }, 200);
  }
}, { passive: true });

var zoomKeyPressed = false;
document.addEventListener('keydown', function (e) {
  if (e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '=' || e.key === '_' || e.key === '0')) {
    zoomKeyPressed = true;
  }
});
document.addEventListener('keyup', function (e) {
  if (zoomKeyPressed) { zoomKeyPressed = false; resetZoom(); }
});

document.addEventListener('touchend', function (e) {
  if (e.touches.length === 0) setTimeout(function () { resetZoom(); }, 100);
}, { passive: true });

document.addEventListener('gestureend', function (e) {
  setTimeout(function () { resetZoom(); }, 100);
});

const track = document.getElementById('cardTrack');
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');

  const getScrollAmount = () => {
    const card = track.querySelector('article');
    const style = window.getComputedStyle(track);
    const gap = parseInt(style.columnGap) || 20;
    return card.offsetWidth + gap;
  };

  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
  });

  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
  });

  // Updates button appearance based on scroll position
  track.addEventListener('scroll', () => {
    const isAtStart = track.scrollLeft <= 5;
    const isAtEnd = track.scrollLeft + track.offsetWidth >= track.scrollWidth - 5;
    
    prevBtn.disabled = isAtStart;
    nextBtn.disabled = isAtEnd;
  });