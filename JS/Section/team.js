const DATA_team = "./src/data/team.json";

// ✅ LOAD
export const loadTeam = async () => {
  try {
    const res = await fetch(DATA_team);

    if (!res.ok) {
      throw new Error("Failed to load team section");
    }

    const data = await res.json();
    renderTeam(data);

  } catch (err) {
    console.error("Team Error:", err);
  }
};

// 🎨 RENDER
const renderTeam = (data) => {
  const container = document.getElementById(data.id);
  if (!container) return;

  container.innerHTML = `
    <section class="${data.wrapperClass}">
      
      <div class="${data.containerClass}">
        
        <div class="${data.imageWrapperClass}">
          <img 
            src="${data.image.src}" 
            alt="${data.image.alt}" 
            class="${data.image.class}">
        </div>

      </div>

    </section>
  `;
};

// 🚀 INIT
loadTeam();