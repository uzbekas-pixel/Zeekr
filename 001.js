 window.onscroll = () => {
        const bosh = document.querySelector(".header1");
        if (scrollY > 1) {
          bosh.style.background = "rgba(28, 28, 28, 0.90)";
        } else {
          bosh.style.background = "transparent";
        }
      };
   // Har bir rang uchun matn va rasm
    const variants = {
      black:  { uz: "Qora",     en: "Phantom Black", img: "img/exterior-color-phantom-black@2x.png" },
      gray:   { uz: "Kulrang",  en: "Tech Gray",    img: "img/exterior-color-tech-grey@2x.png" },
      white:  { uz: "Oq",       en: "Crystal White",   img: "img/exterior-color-crystal-white@2x.png" },
      blue:   { uz: "Moviy",     en: "Electric Blue",    img: "img/exterior-color-electric-blue@2x.png" },
      orange: { uz: "Qizg'ish",    en: "Energy Orange",    img: "img/exterior-color-energy-orange@2x.png" }
    };

    const colorUz  = document.getElementById("colorUz");
    const colorEn  = document.getElementById("colorEn");
    const carImage = document.getElementById("carImage");
    const swatches = document.getElementById("swatches");

    function setVariant(key){
      const v = variants[key];
      if(!v) return;

// text update
      colorUz.textContent = v.uz;
      colorEn.textContent = v.en;

      // image update
      carImage.src = v.img;

      // active button UI
      [...swatches.querySelectorAll(".swatch")].forEach(btn => {
        btn.setAttribute("aria-pressed", btn.dataset.key === key ? "true" : "false");
      });
    }

    // event delegation
    swatches.addEventListener("click", (e) => {
      const btn = e.target.closest(".swatch");
      if(!btn) return;
      setVariant(btn.dataset.key);
    });
const loader = document.getElementById("loader");

function setVariant(key){
  const v = variants[key];
  if(!v) return;

  // text update можно сразу
  colorUz.textContent = v.uz;
  colorEn.textContent = v.en;

  // 1) сразу скрываем старую картинку
  carImage.classList.add("is-hidden");
  loader.classList.add("show");

  // 2) создаём временную картинку, чтобы показать новую только после загрузки
  const temp = new Image();
  temp.onload = () => {
    carImage.src = v.img;              // меняем src только когда новая загрузилась
    requestAnimationFrame(() => {
      loader.classList.remove("show");
      carImage.classList.remove("is-hidden"); // показываем новую
    });
  };
  temp.onerror = () => {
    loader.classList.remove("show");
    // оставим скрытой или вернём обратно — выбери что надо
    // carImage.classList.remove("is-hidden");
    console.warn("Image failed to load:", v.img);
  };
  temp.src = v.img;

  // активная кнопка
  [...swatches.querySelectorAll(".swatch")].forEach(btn => {
    btn.setAttribute("aria-pressed", btn.dataset.key === key ? "true" : "false");
  });
}
class FeatureTabs {
        constructor() {
          this.tabs = document.querySelectorAll(".feature-tab");
          this.image = document.querySelector("[data-feature-image]");
          this.current = document.querySelector(".feature-tab.is-active");

          this.init();
        }

        init() {
          this.tabs.forEach((tab) => {
            tab.addEventListener("click", () => this.activate(tab));
          });
        }

        activate(tab) {
          if (tab === this.current) return;

          this.current.classList.remove("is-active");
          this.current.setAttribute("aria-selected", "false");

          tab.classList.add("is-active");
          tab.setAttribute("aria-selected", "true");
          this.current = tab;

          this.swapImage(tab.dataset.image);
        }

        swapImage(src) {
          this.image.style.opacity = "0";

          setTimeout(() => {
            this.image.src = src;
            this.image.style.animation = "none";
            void this.image.offsetWidth; // reflow
            this.image.style.animation = "";
            this.image.style.opacity = "1";
          }, 200);
        }
      }

      new FeatureTabs();
      function changeInterior(color) {
  // Tugmalarni yangilash
  const buttons = document.querySelectorAll('.color-btn');
  buttons.forEach(btn => btn.classList.remove('color-btn-active'));
  event.currentTarget.classList.add('color-btn-active');
  
  // Rang nomlarini yangilash
  document.getElementById('name-charcoal').classList.remove('color-name-active');
  document.getElementById('name-stone').classList.remove('color-name-active');
  document.getElementById('name-' + color).classList.add('color-name-active');
  
  // Rasmlarni yangilash
  document.getElementById('img-charcoal').classList.remove('interior-img-active');
  document.getElementById('img-stone').classList.remove('interior-img-active');
  document.getElementById('img-' + color).classList.add('interior-img-active');
}
class TechShowcase {
  constructor() {
    this.cards = document.querySelectorAll(".tech-card");
    this.displayImg = document.getElementById("mainFeatureImg");
    this.activeCard = document.querySelector(".tech-card.active-tech");
    
    // Birinchi yuklanish animatsiyasi
    this.displayImg.classList.add('first-load');
    
    this.init();
  }

  init() {
    this.cards.forEach((card) => {
      card.addEventListener("click", () => this.switchCard(card));
    });
  }

  switchCard(card) {
    if (card === this.activeCard) return;

    // Eski kartadan active olib tashlash
    this.activeCard.classList.remove("active-tech");
    this.activeCard.setAttribute("aria-selected", "false");

    // Yangi kartaga active qo'shish
    card.classList.add("active-tech");
    card.setAttribute("aria-selected", "true");
    this.activeCard = card;

    // Rasmni almashtirish
    this.changeImage(card.dataset.imgSrc);
  }

  changeImage(newSrc) {
    // Fade out
    this.displayImg.style.opacity = "0";

    setTimeout(() => {
      // Rasmni o'zgartirish
      this.displayImg.src = newSrc;
      // Birinchi yuklanish klassini olib tashlash
      this.displayImg.classList.remove('first-load');
      // Fade in
      this.displayImg.style.opacity = "1";
    }, 300);
  }
}

// Sahifa yuklangandan keyin ishga tushirish
document.addEventListener('DOMContentLoaded', () => {
  new TechShowcase();
});