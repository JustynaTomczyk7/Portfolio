import "./style.scss";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";

document.addEventListener("DOMContentLoaded", () => {
  scrollToTop();
  onClickScrollElement();
  stickyMenu();
  selectMenuElements();
  seeMenu();
  hideMenu();
  onMobileMenuElementClicked();
  mailHandler();

  document.addEventListener("scroll", function () {
    scrollToTop();
    stickyMenu();
    selectMenuElements();
  });

  new Swiper(".swiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      600: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      980: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });
});

function scrollToTop() {
  const scrollElement = document.querySelector("#btn-back-to-top");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollElement.style.display = "block";
  } else {
    scrollElement.style.display = "none";
  }
}

function onClickScrollElement() {
  const scrollElement = document.querySelector("#btn-back-to-top");
  scrollElement.addEventListener("click", () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
}

function stickyMenu() {
  const nav = document.getElementById("menu");
  const startElement = document.getElementById("about-me");
  const startElementRect = startElement.getBoundingClientRect();

  if (startElementRect.top <= 0) {
    nav.classList.add("show");
  } else {
    nav.classList.remove("show");
  }
}

function selectMenuElements() {
  const navigationElements = document.querySelectorAll("#menu-navigation li a");
  const navigationHashArray = [...navigationElements].map(
    (element) => element.hash
  );
  const navigationTargets = navigationHashArray.map((hash) =>
    document.querySelector(hash)
  );

  navigationTargets.forEach((navigationTarget) => {
    if (isElementInViewport(navigationTarget)) {
      navigationElements.forEach((navigationElement) =>
        navigationElement.classList.remove("active")
      );
      document
        .querySelector(`[href*="${navigationTarget.id}"]`)
        .classList.add("active");
    }
  });
}

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  const halfScreen =
    (window.innerHeight || document.documentElement.clientHeight) / 2;

  return rect.top >= 0 && rect.top < halfScreen;
}

function seeMenu() {
  const hamburger = document.querySelector("#see-menu");
  const menu = document.querySelector("#menu-navigation");

  hamburger.addEventListener("click", () => {
    menu.classList.add("active");
  });
}

function hideMenu() {
  const closeIcon = document.querySelector("#close-menu");
  const menuHead = document.querySelector("#menu-navigation .menu-title");
  const menu = document.querySelector("#menu-navigation");

  function closeMenuElement() {
    menu.classList.remove("active");
  }

  closeIcon.addEventListener("click", closeMenuElement);
  menuHead.addEventListener("click", closeMenuElement);
}

function onMobileMenuElementClicked() {
  const menu = document.querySelector("#menu-navigation");
  const menuElements = document.querySelectorAll("#menu-navigation li");

  menuElements.forEach((element) => {
    element.addEventListener("click", () => {
      menu.classList.remove("active");
    });
  });
}

function mailHandler() {
  document.querySelector("#form").addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      const formProps = Object.fromEntries(formData);

      const response = await fetch("/mail", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formProps),
      });

      if (response.ok) {
        showMailSuccess();
      } else {
        showMailError();
      }
    } catch (error) {
      showMailError();
    }
  });
}

function showMailSuccess() {
  const noticeElement = document.querySelector(".modal.modal-success");
  const noticeElementBtn = document.querySelector(
    ".modal.modal-success button"
  );
  noticeElement.classList.add("open");

  noticeElementBtn.addEventListener("click", () => {
    noticeElement.classList.remove("open");
  });
}

function showMailError() {
  const noticeElement = document.querySelector(".modal.modal-error");
  const noticeElementBtn = document.querySelector(".modal.modal-error button");
  noticeElement.classList.add("open");

  noticeElementBtn.addEventListener("click", () => {
    noticeElement.classList.remove("open");
  });
}
