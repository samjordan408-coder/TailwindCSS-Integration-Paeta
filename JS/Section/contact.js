const DATA_contact = "./src/data/contact.json";

// ✅ LOAD
export const loadContact = async () => {
  try {
    const res = await fetch(DATA_contact);
    if (!res.ok) throw new Error("Failed to load Contact");

    const data = await res.json();
    renderContact(data);

  } catch (err) {
    console.error("Contact Error:", err);
  }
};

// 🎨 RENDER
const renderContact = (data) => {
  const container = document.getElementById(data.id);
  if (!container) return;

  container.innerHTML = `
    <section id="${data.id}" class="${data.wrapperClass}">

      <!-- HEADER -->
      <div class="${data.header.class}">
        ${data.header.title}
      </div>

      <div class="${data.layoutClass}">

        <!-- FORM -->
        <form class="flex-1">

          ${data.form.fields.map(field => `
            <input 
              type="${field.type}" 
              placeholder="${field.placeholder}"
              class="w-full p-3 mb-4 border-2 border-[#b2ebf2] rounded-xl bg-[#e0f7fa] text-black text-base"
            >
          `).join("")}

          <textarea 
            placeholder="${data.form.textarea.placeholder}"
            class="w-full p-3 mb-4 h-[200px] resize-none border-2 border-[#b2ebf2] rounded-xl bg-[#e0f7fa] text-black text-base">
          </textarea>

          <button type="submit"
            class="bg-[#00aeef] text-white px-8 py-3 rounded-lg font-bold text-base">
            ${data.form.button.text}
          </button>

        </form>

        <!-- INFO -->
        <div class="flex-[1.2] text-[#00aeef]">

          <h2 class="text-2xl mb-1">${data.info.title}</h2>

          <p class="text-sm text-[#4dd0e1] leading-relaxed mb-8">
            ${data.info.description}
          </p>

          <!-- GRID -->
          <div class="grid grid-cols-2 gap-8">

            ${data.info.items.map(item => `
              <div class="flex gap-4 items-start">
                <img src="${item.icon}" class="w-[45px]" />
                <div>
                  <h3 class="text-xl">${item.title}</h3>
                  <p class="text-sm text-[#4dd0e1]">${item.text}</p>
                </div>
              </div>
            `).join("")}

          </div>

          <!-- SOCIAL -->
          <div class="mt-8">
            <h3 class="text-lg mb-3">Follow Us On</h3>

            <div class="flex gap-4">
              ${data.info.social.map(s => `
                <a href="${s.url}">
                  <img src="${s.icon}" class="w-8" />
                </a>
              `).join("")}
            </div>
          </div>

        </div>

      </div>

    </section>
  `;
};

// 🚀 INIT
loadContact();