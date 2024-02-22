const footerSubNavs = document.querySelectorAll(
  ".footer-navlist-sub .footer-navlist-title"
);

for (elem of footerSubNavs) {
  elem.addEventListener("click", () => {
    const parent = elem.parentNode;
    if (parent.className.includes("open")) {
      parent.classList.remove("open");
    } else {
      parent.classList.add("open");
    }
  });
}
