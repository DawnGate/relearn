document.addEventListener("DOMContentLoaded", () => {
  // because we put the js file in bottom of body
  // HTML will render done first after that js run
  // So all function will work and not need calling it in here
});

const LaptopBreakPoints = 1166;

const navbarVertical = document.getElementById("nav-vertical");
const bodyElement = document.getElementsByTagName("body")[0];

const setUpNavVertical = () => {
  const btnBurger = document.getElementById("lnm-burger-button");
  btnBurger.addEventListener("click", () => {
    toggleVerticalNavMenu();
  });

  const overlayNavVertical = document.getElementById("nav-vertical-overlay");
  overlayNavVertical.addEventListener("click", () => {
    toggleVerticalNavMenu();
  });

  const closeButtonNavVertical = document.getElementById("nvc-close-button");
  closeButtonNavVertical.addEventListener("click", () => {
    toggleVerticalNavMenu();
  });
};

const toggleVerticalNavMenu = () => {
  const isOpen = navbarVertical.classList.contains("open");
  if (isOpen) {
    navbarVertical.classList.remove("open");
    bodyElement.classList.remove("no-scroll");
  } else {
    navbarVertical.classList.add("open");
    bodyElement.classList.add("no-scroll");
  }
};

const closeVerticalNavMenu = () => {
  navbarVertical.classList.remove("open");
  bodyElement.classList.remove("no-scroll");
};

setUpNavVertical();

window.addEventListener("resize", () => {
  const windowWidth = window.innerWidth;
  if (windowWidth >= LaptopBreakPoints) {
    closeVerticalNavMenu();
  }
});
