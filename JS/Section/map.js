const DATA_map = "./src/data/map.json";

// ✅ LOAD
export const loadMap = async () => {
  try {
    const res = await fetch(DATA_map);
    if (!res.ok) throw new Error("Failed to load Map");

    const data = await res.json();
    renderMap(data);

  } catch (err) {
    console.error("Map Error:", err);
  }
};

// 🎨 RENDER
const renderMap = (data) => {
  const container = document.getElementById(data.id);
  if (!container) return;

  const { iframe } = data;

  container.innerHTML = `
    <iframe 
      src="${iframe.src}"
      class="${iframe.class}"
      loading="${iframe.loading}"
      referrerpolicy="${iframe.referrerpolicy}">
    </iframe>
  `;
};

// 🚀 INIT
loadMap();