const DATA_footer = "./src/data/footer.json";

// LOAD FOOTER
export const loadFooter = async () => {
  try {
    const res = await fetch(DATA_footer);

    if (!res.ok) throw new Error("Failed to load Footer section");

    const data = await res.json();
    renderFooter(data);

  } catch (err) {
    console.error("Footer Error:", err);
  }
};

// RENDER COLUMN HELPER
const renderColumn = (col) => {
  return `
    <div class="flex-1 min-w-[150px] ${col.hiddenOnMobile ? "hidden md:block" : ""}">
      <h3 class="text-[22px] font-bold mb-[20px]">${col.title}</h3>
      <ul class="list-none p-0 m-0">
        ${col.links
          .map(
            (link) => `
          <li class="mb-[12px]">
            <a href="${link.href}" class="text-white text-[16px] hover:opacity-70">
              ${link.label}
            </a>
          </li>
        `
          )
          .join("")}
      </ul>
    </div>
  `;
};

// RENDER FOOTER
const renderFooter = (data) => {
  const footer = document.createElement("footer");

  footer.className =
    "bg-[#00aeef] text-white py-[60px] px-[5%] font-sans";

  footer.innerHTML = `
    <div class="${data.containerClass}">

      <!-- BRAND + FEEDBACK -->
      <div class="flex-[2.5] min-w-[150px]">

        <h2 class="text-[32px] font-extrabold m-0">
          ${data.brand.title}
        </h2>

        <p class="text-[18px] mt-[5px] mb-[30px] opacity-90">
          ${data.brand.tagline}
        </p>

        <!-- FEEDBACK -->
        <div class="max-w-[800px]">
          <h3 class="text-[24px] font-bold mb-[15px]">
            ${data.feedback.title}
          </h3>

          <form class="flex gap-[15px]">

            <div class="flex flex-col gap-[12px] flex-1">
              ${data.feedback.inputs
                .map(
                  (input) => `
                <input 
                  type="${input.type}"
                  placeholder="${input.placeholder}"
                  class="w-[380px] h-[50px] px-[20px] py-[15px] rounded-[10px] text-[16px] outline-none text-gray-800 bg-white"
                />
              `
                )
                .join("")}
            </div>

            <div class="relative flex-[1.6]">
              <textarea
                placeholder="${data.feedback.textarea.placeholder}"
                class="w-[380px] h-[112px] px-[20px] py-[15px] rounded-[10px] text-[16px] outline-none text-gray-800 bg-white"
              ></textarea>

              <button
                type="submit"
                class="absolute bottom-[10px] right-[10px] bg-[#00aeef] text-white px-[25px] py-[8px] rounded-[12px] font-bold text-[14px] transition hover:bg-[#008dba] hover:scale-105"
              >
                ${data.feedback.button}
              </button>
            </div>

          </form>
        </div>
      </div>

      <!-- COLUMNS -->
      ${data.columns.map(renderColumn).join("")}

    </div>
  `;

  document.body.appendChild(footer);
};