const DATA_MB = "./src/data/mobile_banking.json";

export const loadMobileBanking = async () => {
  try {
    const res = await fetch(DATA_MB);
    if (!res.ok) throw new Error("Failed to load mobile banking data");

    const data = await res.json();

    renderMobileBanking(data);

  } catch (err) {
    console.error("Mobile Banking Error:", err);
  }
};

const renderMobileBanking = (data) => {
  const section = document.getElementById(data.id);

  if (!section) return;

  section.innerHTML = `
    <section 
  class="bg-cover bg-center text-white 
         py-[60px] px-[20px] pt-[60px] pb-0 
         flex justify-center overflow-hidden font-[Inter]"
  style="background-image: url('${data.background}');"
    >
      <div class="max-w-[1200px] w-full flex flex-col items-center">

        <!-- Header -->
        <div class="w-full flex justify-center mb-[50px]">
          <div class="bg-white text-[#0d3f78] px-[45px] py-[12px] rounded-full 
                      font-extrabold text-[24px] whitespace-nowrap
                      shadow-[0_4px_15px_rgba(0,0,0,0.2)]">
            ${data.header}
          </div>
        </div>

        <!-- Content -->
        <div class="flex items-center justify-center gap-[60px] w-full">

          <!-- Image -->
          <div class="flex-1 flex justify-end">
            <img 
              src="${data.image}" 
              alt="${data.imageAlt}"
              class="w-full max-w-[400px] 
                     drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] 
                     mb-[-270px]"
            >
          </div>

          <!-- Text -->
          <div class="flex-1 text-left">
            <h1 class="text-[68px] font-extrabold leading-[1.0] mb-[20px] tracking-[-1.5px]">
              ${data.title}
            </h1>

            <p class="text-[1.3rem] leading-[1.5] mb-[40px] max-w-[500px]">
              ${data.description}
            </p>

            <button class="bg-[#f04e3e] text-white text-[2rem] font-extrabold 
                           px-[50px] py-[15px] border-[5px] border-white 
                           rounded-full cursor-pointer
                           shadow-[0_10px_25px_rgba(0,0,0,0.3)]">
              ${data.button}
            </button>
          </div>

        </div>
      </div>
    </section>
  `;
};