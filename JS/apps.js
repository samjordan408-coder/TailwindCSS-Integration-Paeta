import { loadAccountTypes } from "./Section/account_types.js";
import { loadHeader } from "./Section/header.js";
import { loadWhatWeOffer } from "./Section/whatweoffer.js";
import { loadHero } from "./Section/hero.js";

document.addEventListener("DOMContentLoaded", () => {
  loadHeader();        // load header section
  loadAccountTypes();  // load account types section
  loadHero();
  loadWhatWeOffer();


document.addEventListener("DOMContentLoaded", () => {
  loadAccountTypes();
  loadHero();
  loadWhatWeOffer();
});
});