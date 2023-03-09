import './style.scss'

document.addEventListener('DOMContentLoaded', () => {

  seeMenu();
  onMobileMenuElementClicked();

  window.onscroll = () => {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }

  const mybutton = document.querySelector("#btn-back-to-top");
  mybutton.addEventListener("click", () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
});

function seeMenu() {
  const hamburger = document.querySelector('#see-menu');
  const menu = document.querySelector('#menu-content');

  function toggleMenu() {
    hamburger.classList.toggle('active');
    menu.classList.toggle('d-none');
  }

  hamburger.addEventListener('click', toggleMenu);
}

function onMobileMenuElementClicked() {
  const menu = document.querySelector('#menu-content');
  const menuElements = document.querySelectorAll('#menu li');
  const hamburger = document.querySelector('#see-menu');

  menuElements.forEach(element => {
    element.addEventListener('click', () => {
      document.querySelector('.animated-icon').classList.remove('open');
      hamburger.classList.remove('active');
      menu.classList.add('d-none');
    })
  })
}
