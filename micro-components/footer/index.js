// utils function
let debounceTimeOut;
const debounce = (func, timeOut) => {
  if (debounceTimeOut) {
    clearTimeout(debounceTimeOut);
  }
  debounceTimeOut = setTimeout(() => {
    func();
  }, timeOut ?? 500);
};

//
const footerSubNavs = document.querySelectorAll(
  ".footer-navlist-sub .footer-navlist-title"
);

for (let elem of footerSubNavs) {
  elem.addEventListener("click", () => {
    const parent = elem.parentNode;
    if (parent.className.includes("open")) {
      parent.classList.remove("open");
    } else {
      parent.classList.add("open");
    }
  });
}

const bodyElem = document.querySelector("body");
const lngAndCurrencyDrawer = document.querySelector(
  ".mobile-setting-drawer.draw-mask"
);
const btnCloseLngAndCurrencyDrawer = document.getElementById(
  "lngAndCurrent-drawer-close-btn"
);
const settingLanguageBtn = document.getElementById("setting-language");
const settingCurrencyBtn = document.getElementById("setting-currency");

const showLngAndCurrencyDrawer = () => {
  bodyElem.classList.add("open-drawer");
  lngAndCurrencyDrawer.classList.add("open");
};

const hideLngAndCurrencyDrawer = () => {
  document.querySelector("body").classList.remove("open-drawer");
  lngAndCurrencyDrawer.classList.remove("open");
};

const eventShowLngAndCurrencyDrawer = () => {
  showLngAndCurrencyDrawer();
};

const invokeSettingForMobile = () => {
  settingCurrencyBtn.addEventListener("click", eventShowLngAndCurrencyDrawer);

  settingLanguageBtn.addEventListener("click", eventShowLngAndCurrencyDrawer);
};

const cleanInvokeSettingForMobile = () => {
  settingCurrencyBtn.removeEventListener(
    "click",
    eventShowLngAndCurrencyDrawer
  );

  settingLanguageBtn.removeEventListener(
    "click",
    eventShowLngAndCurrencyDrawer
  );
};

btnCloseLngAndCurrencyDrawer.addEventListener("click", () => {
  hideLngAndCurrencyDrawer();
});

const eventAddActiveForCurrencyParent = () => {
  settingCurrencyBtn.parentNode.classList.add("active");
};

const eventRemoveActiveForCurrencyParent = () => {
  settingCurrencyBtn.parentNode.classList.remove("active");
};

const eventAddActiveForLanguageParent = () => {
  settingLanguageBtn.parentNode.classList.add("active");
};

const eventRemoveActiveForLanguageParent = () => {
  settingLanguageBtn.parentNode.classList.remove("active");
};

const invokeSettingForLaptop = () => {
  settingCurrencyBtn.addEventListener(
    "mouseenter",
    eventAddActiveForCurrencyParent
  );

  settingCurrencyBtn.parentNode.addEventListener(
    "mouseleave",
    eventRemoveActiveForCurrencyParent
  );

  settingLanguageBtn.addEventListener(
    "mouseenter",
    eventAddActiveForLanguageParent
  );

  settingLanguageBtn.parentNode.addEventListener(
    "mouseleave",
    eventRemoveActiveForLanguageParent
  );
};

const cleanInvokeSettingForLaptop = () => {
  settingCurrencyBtn.removeEventListener(
    "mouseenter",
    eventAddActiveForCurrencyParent
  );

  settingCurrencyBtn.parentNode.removeEventListener(
    "mouseleave",
    eventRemoveActiveForCurrencyParent
  );

  settingLanguageBtn.removeEventListener(
    "mouseenter",
    eventAddActiveForLanguageParent
  );

  settingLanguageBtn.parentNode.removeEventListener(
    "mouseleave",
    eventRemoveActiveForLanguageParent
  );
};

const addSettingsAction = () => {
  cleanInvokeSettingForMobile();
  cleanInvokeSettingForLaptop();
  if (window.innerWidth < 768) {
    invokeSettingForMobile();
  } else {
    hideLngAndCurrencyDrawer();
    invokeSettingForLaptop();
  }
};

addSettingsAction();

window.addEventListener("resize", () => {
  debounce(() => {
    addSettingsAction();
  }, 500);
});

/* Toggle theme - get theme with system color*/
const themeSettingButton = document.getElementById("theme-setting");

const toggleTheme = () => {
  if (bodyElem.className.includes("dark")) {
    bodyElem.classList.remove("dark");
  } else {
    bodyElem.classList.add("dark");
  }
};
themeSettingButton.addEventListener("click", toggleTheme);

if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  // dark mode
  bodyElem.classList.add("dark");
}
