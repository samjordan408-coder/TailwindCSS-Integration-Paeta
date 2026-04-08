const DATA_whatWeOffer = "./src/data/whatWeOffer.json";

export const loadWhatWeOffer = async () => {
  try {
    const res = await fetch(DATA_whatWeOffer);
    if (!res.ok) throw new Error("Failed to load What We Offer");

    const data = await res.json();
    renderWhatWeOffer(data);

  } catch (err) {
    console.error("WhatWeOffer Error:", err);
  }
};

const renderList = (items) => {
  return items
    .map(
      (item) => `
      <li class="flex items-start gap-3 font-semibold text-sm">
        <span class="opacity-80">•</span>
        <span>${item}</span>
      </li>
    `
    )
    .join("");
};

const renderWhatWeOffer = (data) => {
  const container = document.getElementById(data.id);
  if (!container) return;

  const hero = data.heroSection;
  const bottom = data.bottomSection;

  container.innerHTML = `
    <div class="${data.wrapperClass}">

      <!-- HERO SECTION -->
      <section class="${hero.class}" id="${data.id}">
        <div class="${hero.containerClass}">

          <!-- TEXT -->
          <div class="space-y-6">

            <header>
              <h1 class="text-white font-bold leading-tight text-3xl md:text-5xl mb-4">
                ${hero.title}
              </h1>
              <p class="text-white/95 text-base md:text-lg max-w-lg leading-relaxed">
                ${hero.description}
              </p>
            </header>

            <div class="inline-block bg-white border border-sky-300/50 text-slate-900 font-bold text-xs uppercase tracking-widest px-5 py-2 rounded-full shadow-sm">
              ${hero.badge}
            </div>

            <!-- LOANS -->
            <div class="bg-white rounded-2xl p-6 md:p-8 max-w-lg border border-sky-200/50 shadow-xl">

              <h3 class="text-sky-900 font-bold text-base mb-4">
                ${hero.loans.title}
              </h3>

              <div class="grid grid-cols-2 gap-x-8 mb-6">
                ${hero.loans.groups
                  .map(
                    (group) => `
                  <ul class="space-y-2 text-[0.92rem] text-slate-700">
                    ${renderList(group)}
                  </ul>
                `
                  )
                  .join("")}
              </div>

              <div class="h-px bg-slate-100 w-full mb-6"></div>

              <h3 class="text-sky-900 font-bold text-base mb-3">
                ${hero.deposit.title}
              </h3>

              <ul class="space-y-2 text-[0.92rem] text-slate-700">
                ${renderList(hero.deposit.items)}
              </ul>

            </div>

          </div>

          <!-- IMAGE -->
          <div class="flex justify-center items-center order-first md:order-last">
            <img src="${hero.image.src}" alt="${hero.image.alt}" class="${hero.image.class}">
          </div>

        </div>

        <div class="${hero.blob}"></div>
      </section>

      <!-- BOTTOM SECTION -->
      <section class="${bottom.class}">
        <div class="${bottom.gridClass}">

          <!-- MEMBERS -->
          <div class="bg-sky-400 text-white p-8 rounded-2xl shadow-md border border-white/20">
            <h4 class="font-bold text-lg mb-4 border-b border-white/30 pb-2">
              ${bottom.members.title}
            </h4>
            <ul class="space-y-3">
              ${renderList(bottom.members.items)}
            </ul>
          </div>

          <!-- SERVICES -->
          <div class="bg-sky-400 text-white p-8 rounded-2xl shadow-md border border-white/20">
            <h4 class="font-bold text-lg mb-4 border-b border-white/30 pb-2">
              ${bottom.services.title}
            </h4>
            <ul class="space-y-3">
              ${renderList(bottom.services.items)}
            </ul>
          </div>

          <!-- CTA -->
          <div class="bg-sky-900 text-white p-8 rounded-2xl flex items-center justify-center text-center shadow-xl">
            <p class="font-bold text-lg leading-snug">
              ${bottom.cta.text1}<br>
              <span class="text-white">${bottom.cta.text2}</span>
            </p>
          </div>

        </div>
      </section>

    </div>
  `;
};

// INIT
loadWhatWeOffer();