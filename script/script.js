console.log("Hello");

document.addEventListener("DOMContentLoaded", () => {
  /* =======================
     📌 1. 햄버거 메뉴
  ======================= */
  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".mobile-nav");

  if (hamburger && mobileNav) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      mobileNav.classList.toggle("open");
    });
  }

  /* =======================
     📌 2. fade-up 애니메이션
  ======================= */
  const fadeElements = document.querySelectorAll(".fade-up, .fade-up-btn");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.15 }
  );

  fadeElements.forEach((el, index) => {
    el.style.transitionDelay = `${index * 0.15}s`;
    observer.observe(el);
  });

  /* =======================
     📌 3. 메뉴 active 자동 적용
  ======================= */
  const currentPage = location.pathname.split("/").pop(); // ex: "price.html"
  const menuLinks = document.querySelectorAll(".menu-item-text a");

  menuLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  /* =======================
     📌 4. Top-bar 스크롤 배경
  ======================= */
  const topBar = document.querySelector(".top-bar");

  if (topBar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 40) {
        topBar.classList.add("scrolled");
      } else {
        topBar.classList.remove("scrolled");
      }
    });
  }
});

/* =======================
   📌 Fade-Up Scroll Animation
======================= */
const fadeEls = document.querySelectorAll(".fade-up");

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.2 }
);

fadeEls.forEach((el) => fadeObserver.observe(el));

// FAQ 선택 기능
document.querySelectorAll(".faq-item").forEach((item) => {
  item.addEventListener("click", () => {
    document
      .querySelectorAll(".faq-item")
      .forEach((i) => i.classList.remove("active"));

    item.classList.add("active");

    const target = item.dataset.answer;

    document.querySelectorAll(".faq-answer").forEach((a) => {
      a.classList.remove("show");
    });

    document.getElementById(target).classList.add("show");
  });
});
