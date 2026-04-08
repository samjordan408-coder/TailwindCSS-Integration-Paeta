const DATA_nav = "./src/data/navbar.json";

export const loadNav = async () => {
  try {
    const response = await fetch(DATA_nav);

    if (!response.ok) {
      throw new Error("Failed to fetch nav data");
    }

    const data = await response.json();
    renderNav(data);

  } catch (error) {
    console.error("Nav Error:", error);
  }
};