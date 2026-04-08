const DATA_about = "./src/data/about.json";

// LOAD ABOUT
export const loadAbout = async () => {
  try {
    const res = await fetch(DATA_about);
    if (!res.ok) throw new Error("Failed to load About section");

    const data = await res.json();
    renderAbout(data);

  } catch (err) {
    console.error("About Error:", err);
  }
};

// CARD RENDER HELPER
const renderCard = (card) => {
  return `
    <article class="${card.class}">
      <h3 class="text-base font-bold mb-2">${card.title}</h3>
      <p class="text-sm text-white/90 leading-relaxed">
        ${card.text}
      </p>
    </article>
  `;
};

// MISSION + VISION CARD
const renderMVCard = (item) => {
  return `
    <article class="bg-white rounded-2xl shadow-md text-center overflow-hidden flex flex-col">

      <div class="flex items-center justify-center py-4">
        <img src="${item.icon}" alt="${item.title}" class="w-[52px] h-[52px] object-contain">
      </div>

      <h3 class="bg-[#0d3f78] text-white text-[0.85rem] font-bold tracking-widest uppercase py-2">
        ${item.title}
      </h3>

      <p class="text-[0.82rem] text-slate-500 p-4 leading-relaxed">
        ${item.text}
      </p>

    </article>
  `;
};

// RENDER ABOUT
const renderAbout = (data) => {
  const container = document.getElementById(data.id);
  if (!container) return;

  container.innerHTML = `
    <section 
      id="${data.id}" 
      class="${data.wrapperClass}"
      style="background-image: url('${data.backgroundImage}')">

      <div class="${data.containerClass}">

        <!-- TITLE -->
        <h2 class="${data.header.class}">
          ${data.header.title}
        </h2>

        <!-- TOP SECTION -->
        <div class="${data.topSection.gridClass}">

          <!-- IMAGE -->
          <div class="bg-[#d1effa] rounded-2xl p-4 flex items-center justify-center">
            <img 
              src="${data.topSection.image.src}" 
              alt="${data.topSection.image.alt}" 
              class="${data.topSection.image.class}">
          </div>

          <!-- CARDS -->
          <div class="grid grid-cols-1 gap-4">
            ${data.topSection.cards.map(renderCard).join("")}
          </div>

        </div>

        <!-- BOTTOM SECTION -->
        <div class="${data.bottomSection.gridClass}">

          <!-- INTRO -->
          <article class="${data.bottomSection.missionVisionIntro.class}">
            <h3 class="text-base font-bold mb-2">
              ${data.bottomSection.missionVisionIntro.title}
            </h3>
            <p class="text-sm leading-relaxed">
              ${data.bottomSection.missionVisionIntro.text}
            </p>
          </article>

          <!-- MISSION + VISION -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

            ${renderMVCard(data.bottomSection.mission)}
            ${renderMVCard(data.bottomSection.vision)}

          </div>

        </div>

      </div>
    </section>
  `;
};

// INIT
loadAbout();