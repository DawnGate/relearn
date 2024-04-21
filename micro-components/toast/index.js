const toastContainer = document.querySelector(".toast-container ol.toast-list");
const toastTemplate = document.querySelector("#toast-item-template");

let currentStack = 0;

const toast = () => {
  renderToast();
};

const renderToast = () => {
  if ("content" in document.createElement("template")) {
    currentStack++;

    const currentToasts = toastContainer.querySelectorAll(".toast-item");
    currentToasts.forEach((toastItem, index) => {
      let stackIndex = currentStack - index;
      toastItem.style = `--z-index: ${index + 1};--offset: -${
        (stackIndex - 1) * (70 + 8)
      }px`;
    });

    const clone = toastTemplate.content.cloneNode(true);
    const toastItem = clone.querySelector(".toast-item");
    toastItem.style = `--z-index: ${currentStack}`;
    toastContainer.appendChild(clone);
  }
};
