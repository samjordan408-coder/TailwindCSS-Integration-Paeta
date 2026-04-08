const DATA_hero = "./src/data/hero.json";

// ✅ LOAD HERO
export const loadHero = async () => {
  try {
    const response = await fetch(DATA_hero);

    if (!response.ok) {
      throw new Error("Failed to fetch hero data");
    }

    const data = await response.json();
    renderHero(data);

  } catch (error) {
    console.error("Hero Error:", error);
  }
};

// 🎨 RENDER HERO
const renderHero = (data) => {
  const container = document.getElementById(data.id);
  if (!container) return;

  const { background, imageBlock, content } = data;

  container.innerHTML = `
    <section id="${data.id}" class="relative w-full h-screen overflow-hidden">

      <!-- BACKGROUND -->
      <div 
        class="absolute inset-0 bg-cover bg-center"
        style="background-image: url('${background.image}');">
      </div>

      <!-- OVERLAY -->
      <div class="absolute inset-0 bg-black/40"></div>

      <!-- CONTENT WRAPPER -->
      <div class="relative z-10 h-full max-w-6xl mx-auto px-6 flex items-center">

        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center w-full">

          <!-- LEFT: TEXT -->
          <div class="text-center md:text-left">

            <h1 class="text-white font-bold leading-tight mb-6 text-[clamp(2.2rem,4vw,3.5rem)]">
              ${content.title}
            </h1>

            <p class="text-white/90 text-lg max-w-[520px] mb-6 mx-auto md:mx-0 leading-relaxed">
              ${content.description}
            </p>

            <div class="inline-block bg-[#ffca08] text-white font-extrabold text-base px-8 py-3 rounded-full mb-8 shadow-md">
              ${content.badge}
            </div>

            <ul class="flex flex-wrap gap-3 mb-8 justify-center md:justify-start">
              ${content.features.map(item => `
                <li class="text-white font-semibold text-sm flex items-center">
                  <span class="text-[#ffca08] mr-2">✓</span>
                  ${item}
                </li>
              `).join("")}
            </ul>

            <a href="${content.button.url}" 
               class="inline-block bg-[#0d3f78] text-white px-10 py-4 rounded-lg font-bold border border-white/20 hover:bg-[#0a2e58] hover:scale-105 transition">
              ${content.button.text}
            </a>

          </div>

          <!-- RIGHT: IMAGE (ALWAYS RIGHT ON DESKTOP) -->
          <div class="flex justify-center md:justify-end order-first md:order-last">

            <img 
              src="${imageBlock.img.src}" 
              alt="${imageBlock.img.alt}" 
              class="max-w-full h-auto drop-shadow-2xl">

          </div>

        </div>

      </div>
    </section>
  `;
};

// 🚀 INIT
loadHero();