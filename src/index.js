import "./style.scss";

document.addEventListener("DOMContentLoaded", () => {
  seeMenu();
  onMobileMenuElementClicked();
  mailHandler();

  const mybutton = document.querySelector("#btn-back-to-top");
  window.onscroll = () => {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  };

  mybutton.addEventListener("click", () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
});

function seeMenu() {
  const hamburger = document.querySelector("#see-menu");
  const menu = document.querySelector("#menu-content");

  function toggleMenu() {
    hamburger.classList.toggle("active");
    menu.classList.toggle("d-none");
  }

  hamburger.addEventListener("click", toggleMenu);
}

function onMobileMenuElementClicked() {
  const menu = document.querySelector("#menu-content");
  const menuElements = document.querySelectorAll("#menu li");
  const hamburger = document.querySelector("#see-menu");

  menuElements.forEach((element) => {
    element.addEventListener("click", () => {
      document.querySelector(".animated-icon").classList.remove("open");
      hamburger.classList.remove("active");
      menu.classList.add("d-none");
    });
  });
}

function mailHandler() {
  document.querySelector("#form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const noticeElement = document.querySelector("#notice");

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
        showMailSuccess(noticeElement);
      } else {
        showMailError(noticeElement);
      }
    } catch (error) {
      showMailError(noticeElement);
    }
  });
}

function showMailError(noticeElement) {
  noticeElement.innerHTML =
    "Wystąpił błąd!<br><br>Wiadomość nie została wysłana.";
  noticeElement.style.display = "block";
  setTimeout(() => {
    noticeElement.style.display = "none";
  }, 2000);
}

function showMailSuccess(noticeElement) {
  noticeElement.style.display = "block";
  setTimeout(() => {
    noticeElement.style.display = "none";
  }, 1500);
}
