const DATA_copyright = "./src/data/copyright.json";

// LOAD COPYRIGHT
export const loadCopyright = async () => {
  try {
    const res = await fetch(DATA_copyright);

    if (!res.ok) throw new Error("Failed to load Copyright section");

    const data = await res.json();
    renderCopyright(data);

  } catch (err) {
    console.error("Copyright Error:", err);
  }
};

// RENDER COPYRIGHT
const renderCopyright = (data) => {
  const old = document.getElementById(data.id);
  if (old) old.remove();

  const wrapper = document.createElement("div");
  wrapper.id = data.id;
  wrapper.className = data.wrapperClass;

  wrapper.innerHTML = `
    <p class="${data.textClass}">
      ${data.text}
    </p>
  `;

  document.body.appendChild(wrapper);
};

// AUTO RUN
loadCopyright();