const DATA_hero = "./src/data/hero.json";

export const loadHero = async () => {
  try {
    const response = await fetch(DATA_hero);

    if (!response.ok) {
      throw new Error("Failed to fetch hero data");
    }

    const data = await response.json();
    renderHero(data);

  } catch (error) {
    console.error("Hero Error:", error);
  }
};