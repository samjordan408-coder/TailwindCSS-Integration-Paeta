const DATA_TEST = "./src/data/testimonials.json";

export const loadTestimonials = async () => {
  try {
    const res = await fetch(DATA_TEST);
    if (!res.ok) throw new Error("Failed to load testimonials");

    const data = await res.json();

    renderTestimonials(data);

  } catch (err) {
    console.error("Testimonials Error:", err);
  }
};

const renderTestimonials = (data) => {
  const section = document.getElementById(data.id);
  if (!section) return;

  section.innerHTML = `
  <section class="py-[80px] px-[20px] text-center bg-white font-[Arial]">

    <!-- Badge -->
    <div class="bg-[#00aeef] text-white inline-block 
                py-[12px] w-full max-w-[1200px] 
                rounded-[10px] text-[32px] font-extrabold 
                mb-[100px] shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
      ${data.title}
    </div>

    <!-- Wrapper -->
    <div class="flex justify-center gap-[30px] flex-wrap max-w-[1200px] mx-auto">

      ${data.cards.map((card, index) => `
        <div class="bg-white w-[320px] rounded-[20px] relative 
                    shadow-[0_0_25px_rgba(0,174,239,0.2)] 
                    border border-[rgba(0,174,239,0.1)] 
                    pt-[60px] pb-[30px] px-[20px]
                    hover:-translate-y-[10px]
                    hover:shadow-[0_15px_40px_rgba(0,174,239,0.35)]
                    hover:scale-[1.02]">

          <!-- Avatar -->
          <div class="w-[100px] h-[100px] rounded-full bg-[#89cff0] 
                      border-[3px] border-[#0d3f78]
                      absolute top-[-50px] left-1/2 -translate-x-1/2
                      overflow-hidden flex items-center justify-center">
            <img src="${card.image}" class="w-full">
          </div>

          <h3 class="text-[#0d3f78] text-[24px] font-extrabold mt-[10px] mb-[5px]">
            ${card.name}
          </h3>

          <span class="text-[#888] text-[16px] block mb-[8px]">
            ${card.role}
          </span>

          <!-- Rating -->
          <div class="rating-box flex items-center justify-center gap-[10px] mb-[15px]">
            <div class="star-rating flex flex-row-reverse">

              ${[5,4,3,2,1].map(num => `
                <input type="radio" id="c${index}-s${num}" name="rating${index}" 
                  ${card.rating === num ? "checked" : ""} class="hidden">
                <label for="c${index}-s${num}" class="text-[24px] text-gray-300 cursor-pointer">★</label>
              `).join("")}

            </div>

            <span class="rating-num inline-block min-w-[30px] font-bold text-[#777]">
              ${card.rating}.0
            </span>
          </div>

          <p class="text-[#444] text-[15px] leading-[1.6]">
            ${card.text}
          </p>
        </div>
      `).join("")}

    </div>
  </section>
  `;
};