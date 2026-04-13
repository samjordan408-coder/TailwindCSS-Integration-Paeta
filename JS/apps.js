
import { loadHeader } from "./Section/header.js";
import { loadWhatWeOffer } from "./Section/whatweoffer.js";
import { loadHero } from "./Section/hero.js";
import { loadAbout } from "./Section/about.js";
import { loadTeam } from "./Section/team.js";
import { loadLoans } from "./Section/loan.js";
import { loadNews } from "./Section/news.js";
import { loadWhyUs } from "./Section/whyus.js";
import { loadContact } from "./Section/contact.js";
import { loadMap } from "./Section/map.js";
import initNav from "./Section/nav.js"; // ✅ FIXED (default import)
import { initCarousel } from "./Section/account_types.js";
import{loadMobileBanking} from"./Section/mobile_banking.js"
import { loadSecurityTrust } from "./Section/security_trust.js";
import { loadTestimonials } from "./Section/testimonials.js";
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // 🔥 Run nav FIRST (it uses fetch + async)
    await initNav();
     await initCarousel(); 
     await loadTestimonials();

    // 🔥 Then render other sections
    loadHeader();
    loadHero();
    loadMap();
    loadWhatWeOffer();
    loadAbout();
    loadTeam();
    loadLoans();
    loadNews();
    loadWhyUs();
    loadMobileBanking();
    loadSecurityTrust();
    loadContact();
  } catch (err) {
    console.error("Main JS Error:", err);
  }
});