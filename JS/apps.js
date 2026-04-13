
import { loadHeader } from "./Section/header.js";
import { loadWhatWeOffer } from "./Section/whatweoffer.js";
import { loadHero } from "./Section/hero.js";
import { loadAbout } from "./Section/about.js";
import { loadTeam } from "./Section/team.js";
import { loadLoans } from "./Section/loan.js";
import { loadNews } from "./Section/news.js";
import { loadWhyUs } from "./Section/whyus.js";
import initNav from "./Section/nav.js"; // ✅ FIXED (default import)
import { initCarousel } from "./Section/account_types.js";
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // 🔥 Run nav FIRST (it uses fetch + async)
    await initNav();
     await initCarousel(); 

    // 🔥 Then render other sections
    loadHeader();
    loadHero();
    loadWhatWeOffer();
    loadAbout();
    loadTeam();
    loadLoans();
    loadNews();
    loadWhyUs
  } catch (err) {
    console.error("Main JS Error:", err);
  }
});