// Sticky burger nav — appears after header/nav scrolls out of view
export const initNavBehavior = () => {
  // Select your Tailwind Elements
  var siteHeader   = document.querySelector('.site-header');
  var scrollNav    = document.getElementById('scroll-nav');
  var scrollMenu   = document.getElementById('side-menu');
  // We'll use the button inside scrollNav as the burger
  var scrollBurger = scrollNav ? scrollNav.querySelector('button') : null;

  if (!scrollNav) return;

  function handleScroll() {
    var y = window.scrollY || window.pageYOffset;
    var threshold = siteHeader ? (siteHeader.offsetTop + siteHeader.offsetHeight) : 80;

    var shouldShow = y >= threshold;

    // TAILWIND TOGGLE: instead of .scroll-nav--visible, we swap Tailwind utility classes
    if (shouldShow) {
      scrollNav.classList.remove('-translate-y-full', 'opacity-0', 'pointer-events-none');
      scrollNav.classList.add('translate-y-0', 'opacity-100', 'pointer-events-auto');
    } else {
      scrollNav.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
      scrollNav.classList.add('-translate-y-full', 'opacity-0', 'pointer-events-none');
      closeMenu();
    }
  }

  function openMenu() {
    if (!scrollMenu) return;
    // TAILWIND SLIDE IN: Remove the hide class
    scrollMenu.classList.remove('translate-x-full');
    scrollMenu.classList.add('translate-x-0');
    if (scrollBurger) scrollBurger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!scrollMenu) return;
    // TAILWIND SLIDE OUT: Add the hide class
    scrollMenu.classList.remove('translate-x-0');
    scrollMenu.classList.add('translate-x-full');
    if (scrollBurger) scrollBurger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  // Define global toggle for the onclick="toggleMenu()" in your HTML
  window.toggleMenu = function() {
    if (scrollMenu.classList.contains('translate-x-full')) {
      openMenu();
    } else {
      closeMenu();
    }
  };

  // Event Listeners
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleScroll);

  if (scrollMenu) {
    scrollMenu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') closeMenu();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  handleScroll(); // Run once on load
};

// --- KEEP YOUR ZOOM RESET LOGIC UNCHANGED BELOW ---
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

// ... rest of your wheel/keydown/touch listeners ...


  // Get the elements by the IDs we added above
  const track = document.getElementById('cardTrack');
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');

  // Function to calculate how far to scroll (one card width + gap)
  const getScrollAmount = () => {
    const card = track.querySelector('article');
    const cardWidth = card.getBoundingClientRect().width;
    const gap = 20; // Matches your 'gap-5' class (5 * 4px)
    return cardWidth + gap;
  };

  // Scroll right on Next click
  nextBtn.addEventListener('click', () => {
    track.scrollBy({
      left: getScrollAmount(),
      behavior: 'smooth'
    });
  });

  // Scroll left on Prev click
  prevBtn.addEventListener('click', () => {
    track.scrollBy({
      left: -getScrollAmount(),
      behavior: 'smooth'
    });
  });