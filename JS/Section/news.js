const DATA_news = "./src/data/news.json";

// ✅ LOAD
export const loadNews = async () => {
  try {
    const res = await fetch(DATA_news);
    if (!res.ok) throw new Error("Failed to load News");

    const data = await res.json();
    renderNews(data);

  } catch (err) {
    console.error("News Error:", err);
  }
};

// 🎨 RENDER
const renderNews = (data) => {
  const container = document.getElementById(data.id);
  if (!container) return;

  container.innerHTML = `
    <section id="${data.id}"
      class="${data.wrapperClass}"
      style="background-image:url('${data.background}')">

      <!-- TITLE -->
      <div class="${data.title.class}">
        ${data.title.text}
      </div>

      <!-- CARDS -->
      <div class="flex flex-wrap justify-center gap-[40px] lg:gap-[70px] max-w-[1200px] mx-auto px-6">

        ${data.cards.map(card => `
          
          <article class="group w-[300px] bg-white border-[2.5px] border-[#0d3f78] rounded-[20px] relative shadow-lg transition-transform duration-300 hover:-translate-y-2 flex flex-col overflow-visible">

            <!-- DATE -->
            <div class="absolute -left-[2.5px] top-0 bg-[#d32f2f] text-white w-[200px] md:w-[220px] py-1 px-5 rounded-br-[50px] rounded-tl-[17px] font-bold text-base z-20 text-left">
              ${card.date}
            </div>

            <!-- IMAGE -->
            <div class="h-[300px] flex items-center justify-center pt-[60px] px-5 pb-2">
              <img src="${card.image}" class="max-w-full max-h-full object-contain">
            </div>

            <!-- CONTENT -->
            <div class="bg-[#0d3f78] text-white p-5 text-center mt-auto relative">

              <p class="font-bold text-lg leading-tight">
                ${card.title}
              </p>

              <button class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-[#28a745] text-white px-6 py-2 rounded-[10px] font-bold shadow-md hover:bg-green-600 transition-colors whitespace-nowrap z-30">
                ${card.buttonText}
              </button>

            </div>

            <div class="h-10 bg-transparent"></div>

          </article>

        `).join("")}

      </div>

      <!-- VIEW ALL -->
      <button class="${data.viewAllButton.class}">
        ${data.viewAllButton.text}
      </button>

    </section>
  `;
};

// 🚀 INIT
loadNews();