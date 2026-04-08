// account_types.js

const DATA_account = "./src/data/account_types.json"; // path to JSON
const cardTrack = document.getElementById("cardTrack");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

/**
 * Fetch and render account type cards
 */
export const loadAccountTypes = async () => {
  try {
    if (!cardTrack) {
      console.error("Card track container not found");
      return;
    }

    const response = await fetch(DATA_account);
    if (!response.ok) throw new Error("Failed to fetch account types data");

    const cards = await response.json();
    renderCards(cards);
    initScrollButtons(); // Initialize prev/next after cards are rendered
  } catch (error) {
    console.error("Account Types Error:", error);
  }
};

/**
 * Render cards in the card track container
 * @param {Array} cards
 */
const renderCards = (cards) => {
  cardTrack.innerHTML = ""; // Clear previous content

  cards.forEach((card) => {
    const article = document.createElement("article");
    article.className = `
      flex-1 min-w-[260px] md:min-w-[280px] bg-white snap-start rounded-xl p-4 
      flex flex-col min-h-[200px] border-[1.5px] border-sky-400/25 
      shadow-[0_8px_32px_rgba(8,179,229,0.18),0_2px_8px_rgba(0,0,0,0.1)] 
      transition-all duration-200 hover:-translate-y-1 hover:border-sky-400/60 
      hover:shadow-[0_12px_40px_rgba(8,179,229,0.35),0_4px_12px_rgba(0,0,0,0.12)]
    `;

    article.innerHTML = `
      <div class="w-12 h-12 mb-2.5 mx-auto flex items-center justify-center bg-sky-50 rounded-lg shrink-0">
        <img src="${card.icon}" alt="${card.alt}" class="w-full h-full object-contain p-1.5">
      </div>
      <h3 class="text-[0.95rem] font-bold text-sky-500 mb-1.5 text-center">${card.title}</h3>
      <p class="text-[0.78rem] text-slate-500 flex-1 leading-relaxed text-center">
        ${card.description}
      </p>
      <a href="${card.link}" class="block w-full mt-3 py-1.5 px-4 bg-sky-500 text-white text-[0.78rem] font-semibold text-center rounded-md hover:bg-slate-900 transition-colors">
        Learn more...
      </a>
    `;

    cardTrack.appendChild(article);
  });
};

/**
 * Initialize horizontal scroll for prev/next buttons
 */
const initScrollButtons = () => {
  if (!nextBtn || !prevBtn || !cardTrack) return;

  const getScrollAmount = () => {
    const card = cardTrack.querySelector("article");
    if (!card) return 0;
    const cardWidth = card.getBoundingClientRect().width;
    const gap = 20; // matches gap-5 in Tailwind (5 * 4px)
    return cardWidth + gap;
  };

  nextBtn.addEventListener("click", () => {
    cardTrack.scrollBy({
      left: getScrollAmount(),
      behavior: "smooth",
    });
  });

  prevBtn.addEventListener("click", () => {
    cardTrack.scrollBy({
      left: -getScrollAmount(),
      behavior: "smooth",
    });
  });
};