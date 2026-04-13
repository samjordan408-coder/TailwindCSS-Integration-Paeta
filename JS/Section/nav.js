const DATA_NAV = "./src/data/nav.json";

const initNav = async () => {
  try {
    const res = await fetch(DATA_NAV);
    if (!res.ok) throw new Error("Failed to load nav data");

    const data = await res.json();

    renderSecondaryNav(data.secondaryNav);
    renderStickyNav(data);

    // ✅ RUN AFTER RENDER
    initNavBehavior();

  } catch (err) {
    console.error("Nav Error:", err);
  }
};

// 🔹 Secondary Nav
const renderSecondaryNav = (items) => {
  const container = document.querySelector("#secondary-nav");
  if (!container) return;

  container.innerHTML = `
    <ul class="list-none flex flex-wrap justify-center gap-x-6 gap-y-2">
      ${items.map(item => `
        <li>
          <a href="${item.link}" class="text-[#0d3b66] no-underline font-medium text-[0.95rem] hover:opacity-90 transition-opacity">
            ${item.label}
          </a>
        </li>
      `).join("")}
    </ul>
  `;
};

// 🔹 Sticky Nav + Side Menu
const renderStickyNav = (data) => {
  const container = document.querySelector("#scroll-nav");
  if (!container) return;

  container.innerHTML = `
    <div class="max-w-[1200px] mx-auto px-6 py-2 flex items-center justify-between gap-3">
      
      <a href="#hero" class="flex items-center gap-2">
        <img src="${data.brand.logo}" alt="${data.brand.alt}" class="h-10 w-10 rounded-full object-contain bg-blue-400/10">
        <div class="flex flex-col leading-tight">
          <span class="font-bold text-[0.75rem] text-[#0d3b66]">${data.brand.title1}</span>
          <span class="font-bold text-[0.85rem] text-[#0d3b66]">${data.brand.title2}</span>
        </div>
      </a>

      <button onclick="toggleMenu()" class="w-10 h-10 rounded-full border-[1.5px] border-[#0d3b66]/70 flex flex-col items-center justify-center gap-1.5 hover:bg-slate-50">
        <span class="w-5 h-[2px] bg-[#0d3b66]"></span>
        <span class="w-5 h-[2px] bg-[#0d3b66]"></span>
        <span class="w-5 h-[2px] bg-[#0d3b66]"></span>
      </button>
    </div>

    <ul id="side-menu" class="fixed top-0 right-0 h-screen w-80 max-w-[80vw] p-6 pt-20 bg-white shadow-2xl flex flex-col gap-4 translate-x-full transition-transform duration-300 z-[201]">
      
      <li class="absolute top-6 right-6 list-none">
        <button onclick="toggleMenu()" class="w-10 h-10 rounded-full bg-slate-100 text-[#0d3b66] text-3xl">&times;</button>
      </li>

      ${data.sideMenu.map(item => `
        <li class="border-b border-slate-100 pb-2">
          <a href="${item.link}" class="text-[#0d3b66] font-bold text-lg" onclick="toggleMenu()">
            ${item.label}
          </a>
        </li>
      `).join("")}
    </ul>
  `;
};

// 🔹 NAV BEHAVIOR (your old script)
const initNavBehavior = () => {
  const siteHeader = document.querySelector('.site-header');
  const scrollNav = document.getElementById('scroll-nav');
  const scrollMenu = document.getElementById('side-menu');

  if (!scrollNav) return;

  function handleScroll() {
    const y = window.scrollY;
    const threshold = siteHeader
      ? siteHeader.offsetTop + siteHeader.offsetHeight
      : 80;

    if (y >= threshold) {
      scrollNav.classList.remove('-translate-y-full', 'opacity-0', 'pointer-events-none');
      scrollNav.classList.add('translate-y-0', 'opacity-100', 'pointer-events-auto');
    } else {
      scrollNav.classList.add('-translate-y-full', 'opacity-0', 'pointer-events-none');
      scrollNav.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
      closeMenu();
    }
  }

  function openMenu() {
    if (!scrollMenu) return;
    scrollMenu.classList.remove('translate-x-full');
    scrollMenu.classList.add('translate-x-0');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!scrollMenu) return;
    scrollMenu.classList.remove('translate-x-0');
    scrollMenu.classList.add('translate-x-full');
    document.body.style.overflow = '';
  }

  // GLOBAL toggle
  window.toggleMenu = function () {
    if (scrollMenu.classList.contains('translate-x-full')) {
      openMenu();
    } else {
      closeMenu();
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleScroll);

  if (scrollMenu) {
    scrollMenu.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') closeMenu();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  handleScroll();
};

export default initNav;