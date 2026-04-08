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

  const { background, container: layout, imageBlock, content } = data;

  container.innerHTML = `
    <section id="${data.id}" class="${data.class}">

      <!-- BACKGROUND -->
      <div 
        class="${background.class}"
        style="background-image: url('${background.image}');">
      </div>

      <!-- CONTAINER -->
      <div class="${layout.class}">

        <!-- IMAGE -->
        <div class="${imageBlock.class}">
          <img 
            src="${imageBlock.img.src}" 
            alt="${imageBlock.img.alt}" 
            class="${imageBlock.img.class}">
        </div>

        <!-- CONTENT -->
        <div class="${content.class}">

          <!-- TITLE -->
          <h1 class="text-white font-bold leading-[1.1] mb-6 text-[clamp(2rem,4vw,3rem)] drop-shadow-md">
            ${content.title}
          </h1>

          <!-- DESCRIPTION -->
          <p class="text-white/95 text-lg max-w-[520px] mb-6 leading-relaxed">
            ${content.description}
          </p>

          <!-- BADGE -->
          <div class="inline-block bg-[#ffca08] text-white font-extrabold text-[1rem] md:text-[1.1rem] px-8 py-3 rounded-full mb-8 shadow-md tracking-wide">
            ${content.badge}
          </div>

          <!-- FEATURES -->
          <ul class="flex flex-wrap md:flex-nowrap justify-center md:justify-start gap-3 mb-8 list-none p-0">
            ${content.features.map(item => `
              <li class="text-white font-semibold text-[0.9rem] flex items-center">
                <span class="text-[#ffca08] mr-2">✓</span>
                ${item}
              </li>
            `).join("")}
          </ul>

          <!-- BUTTON -->
          <a href="${content.button.url}" 
             class="inline-block bg-[#0d3f78] text-white px-10 py-4 rounded-lg font-bold border-2 border-white/20 transition-all duration-300 hover:bg-[#0a2e58] hover:scale-105 shadow-2xl">
            ${content.button.text}
          </a>

        </div>

      </div>
    </section>
  `;
};

// 🚀 INIT
loadHero();