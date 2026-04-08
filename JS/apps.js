import { loadAccountTypes } from "./Section/account_types.js";
import { loadHeader } from "./Section/header.js";
import { loadWhatWeOffer } from "./Section/whatweoffer.js";
import { loadHero } from "./Section/hero.js";
import { loadAbout } from "./Section/about.js";
import { loadTeam } from "./Section/team.js";

document.addEventListener("DOMContentLoaded", () => {
  loadHeader();        // load header section
  loadAccountTypes();  // load account types section
  loadHero();
  loadWhatWeOffer();
  loadAbout();
  loadTeam();


document.addEventListener("DOMContentLoaded", () => {
  loadAccountTypes();
  loadHero();
  loadWhatWeOffer();
  loadAbout();
  loadTeam();
});
});