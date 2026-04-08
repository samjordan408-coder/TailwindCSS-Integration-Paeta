const DATA_loans = "./src/data/loan.json";

// ✅ LOAD
export const loadLoans = async () => {
  try {
    const res = await fetch(DATA_loans);
    if (!res.ok) throw new Error("Failed to load Loans");

    const data = await res.json();
    renderLoans(data);

  } catch (err) {
    console.error("Loans Error:", err);
  }
};

// 🎨 RENDER
const renderLoans = (data) => {
  const container = document.getElementById(data.id);
  if (!container) return;

  container.innerHTML = `
    <section id="${data.id}" class="${data.class}" style="background-image:url('${data.background}')">

      <div class="max-w-[1200px] mx-auto px-6">

        <!-- TITLE -->
        <h2 class="${data.title.class}">
          ${data.title.text}
        </h2>

        <!-- GRID -->
        <div class="grid grid-cols-1 md:grid-cols-[1fr_2px_1fr] gap-8 md:gap-12 items-center">

          <!-- IMAGE -->
          <div class="flex items-center justify-center">
            <img src="${data.image}" class="w-full max-h-[460px] object-contain">
          </div>

          <!-- DIVIDER -->
          <div class="hidden md:block w-[2px] h-full bg-blue-900 rounded-full"></div>

          <!-- CONTENT -->
          <div class="text-[#0d3f78]">

            <h3 class="text-xl font-bold mb-4 leading-tight">
              ${data.content.heading}
            </h3>

            <!-- FEATURES -->
            <ul class="mb-6 space-y-2">
              ${data.content.features.map(item => `
                <li class="text-sm font-medium flex items-center gap-2">
                  <span class="text-[#00aeef] text-lg">•</span>
                  ${item}
                </li>
              `).join("")}
            </ul>

            <!-- BUTTONS -->
            <div class="flex flex-col gap-3 max-w-[280px] mx-auto md:mx-0">
              ${data.content.buttons.map(btn => `
                <a href="${btn.link}"
                   class="${btn.class} text-center py-2.5 px-5 rounded-full text-[0.88rem] font-bold transition-all">
                  ${btn.text}
                </a>
              `).join("")}
            </div>

          </div>

        </div>

      </div>

    </section>
  `;
};

// 🚀 INIT
loadLoans();