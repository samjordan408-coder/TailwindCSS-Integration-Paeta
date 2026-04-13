const DATA_whyUs = "./src/data/whyUs.json";

// ✅ LOAD
export const loadWhyUs = async () => {
  try {
    const res = await fetch(DATA_whyUs);
    if (!res.ok) throw new Error("Failed to load Why Us");

    const data = await res.json();
    renderWhyUs(data);

  } catch (err) {
    console.error("WhyUs Error:", err);
  }
};

// 🎨 RENDER
const renderWhyUs = (data) => {
  const container = document.getElementById(data.id);
  if (!container) return;

  container.innerHTML = `
    <section id="${data.id}" class="${data.wrapperClass}">

      <!-- BADGE -->
      <div class="${data.badge.class}">
        ${data.badge.text}
      </div>

      <!-- CARDS -->
      <div class="flex justify-center gap-[25px] flex-wrap max-w-[1200px] mx-auto">

        ${data.cards.map(card => `
          <div class="${data.cardClass}">

            <img src="${card.image}" class="w-[120px] h-auto mb-[20px]">

            <p class="text-[#333] text-[18px] font-semibold leading-[1.3] m-0 text-center">
              ${card.text}
            </p>

          </div>
        `).join("")}

      </div>

    </section>
  `;
};

// 🚀 INIT
loadWhyUs();