const DATA_SEC = "./src/data/security_trust.json";

export const loadSecurityTrust = async () => {
  try {
    const res = await fetch(DATA_SEC);
    if (!res.ok) throw new Error("Failed to load security data");

    const data = await res.json();

    renderSecurityTrust(data);

  } catch (err) {
    console.error("Security Error:", err);
  }
};

const renderSecurityTrust = (data) => {
  const section = document.getElementById(data.id);
  if (!section) return;

  section.innerHTML = `
  <section class="py-[60px] font-[Arial] relative mx-auto">

    <!-- Divider -->
    <div class="flex items-center w-screen relative left-1/2 right-1/2 
                -ml-[50vw] -mr-[50vw] mb-[100px] mt-[-20px]">

      <div class="flex-1 h-[20px] bg-[#0d3f78]"></div>

      <div class="flex items-center px-[30px] gap-[15px]">
        <img src="${data.header.icon}" class="w-[50px] h-auto">
        <span class="text-[#0d3f78] text-[36px] font-black whitespace-nowrap">
          ${data.header.title}
        </span>
      </div>

      <div class="flex-1 h-[20px] bg-[#0d3f78]"></div>
    </div>

    <!-- Main Content -->
    <div class="flex justify-between items-center gap-[40px] px-[20px]">

      <!-- Left Column -->
      <div class="flex-1">
        <h2 class="text-[#0d3f78] text-[25px] font-extrabold mb-[35px] ml-[80px] whitespace-nowrap">
          ${data.left.heading}
        </h2>

        <ul class="ml-[120px] mb-[40px] space-y-[15px]">
          ${data.left.items.map(item => `
            <li class="flex items-center text-[#0d3f78] text-[24px] font-bold">
              <img src="${data.left.icon}" class="w-[45px] h-[45px] mr-[10px]">
              ${item}
            </li>
          `).join("")}
        </ul>

        <a href="${data.left.button.link}"
           class="inline-block bg-[#0d3f78] text-white px-[35px] py-[12px] 
                  rounded-[8px] text-[18px] font-semibold 
                  shadow-[0_4px_10px_rgba(0,0,0,0.15)] 
                  ml-[180px] transition-transform duration-200 hover:-translate-y-[2px] hover:bg-[#124d91]">
          ${data.left.button.text}
        </a>
      </div>

      <!-- Right Column -->
      <div class="flex-[1.2] flex justify-end">
        <img src="${data.right.image}"
             class="w-[700px] h-auto mr-[70px]">
      </div>

    </div>
  </section>
  `;
};