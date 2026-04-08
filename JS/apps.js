const DATA_header = "./src/data/header.json";

// ✅ EXPORT
export const loadHeader = async () => {
  try {
    const response = await fetch(DATA_header);

    if (!response.ok) {
      throw new Error("Failed to fetch header data");
    }

    const data = await response.json();
    renderHeader(data);

  } catch (error) {
    console.error("Header Error:", error);
  }
};

// 🎨 RENDER FUNCTION
const renderHeader = (data) => {
  const { logo, titleTop, titleBottom, links = [], search, login } = data;
  const container = document.getElementById("header");
  if (!container) return; // safety

  container.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">

      <!-- Logo -->
      <a href="index.html" class="flex items-center gap-3 shrink-0">
        <img src="${logo}" alt="Logo" class="h-10 w-auto">
        <div class="flex flex-col leading-tight">
          <span class="text-[10px] uppercase tracking-wider opacity-80 font-medium">${titleTop}</span>
          <span class="text-lg font-bold">${titleBottom}</span>
        </div>
      </a>

      <!-- Search Bar -->
      <div class="hidden md:flex relative flex-1 max-w-sm mx-8">
        <input 
          type="search" 
          placeholder="${search?.placeholder || 'Search...'}" 
          class="w-full bg-white border border-white/20 rounded-full py-1.5 pl-4 pr-10 text-sm focus:outline-none focus:bg-white focus:text-gray-900 transition-all placeholder-black"
          aria-label="Search"
        >
        <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-black hover:text-white" aria-label="Search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </button>
      </div>

      <!-- Navigation Links -->
      <div class="hidden sm:flex items-center gap-8 text-lg font-bold">
        ${
          links.map(({ url, name }) => `
            <a href="${url}" class="text-white hover:text-[#ffca08] transition-all duration-300 transform hover:scale-105">
              ${name}
            </a>
          `).join("")
        }
      </div>

      <!-- Login Button -->
      <a href="${login.url}" class="bg-white text-[#003366] px-5 py-2 rounded font-bold text-sm hover:bg-blue-50 transition-colors">
        ${login.text}
      </a>

    </div>
  `;
};

loadHeader();
