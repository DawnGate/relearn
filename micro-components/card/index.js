let listCards;

let debounceTimeOut;

const debounce = (func, timeOut) => {
  if (debounceTimeOut) {
    clearTimeout(debounceTimeOut);
  }
  debounceTimeOut = setTimeout(() => {
    func();
  }, timeOut ?? 500);
};

const appendCards = () => {
  const cardItemTemplate = document.getElementById("card-item");

  const createListCards = listCards.map((cardElem, index) => {
    const clone = cardItemTemplate.content.cloneNode(true);

    if (index === 0) {
      clone.querySelector(".card-link").classList.add("active");
    }

    let topIndex = clone.querySelectorAll("p.top-index");
    topIndex.forEach((elem) => {
      elem.textContent = (index + 1).toString();
    });

    let titles = clone.querySelectorAll("p.title");
    titles.forEach((elem) => {
      elem.textContent = cardElem.title;
    });

    let searchCounts = clone.querySelectorAll("span.search-count");
    searchCounts.forEach((elem) => {
      elem.textContent = cardElem.searchIndexCount;
    });

    let cardBannerImg = clone.querySelector("img.card-banner");
    cardBannerImg.src = cardElem.imageLink;
    cardBannerImg.addEventListener("error", () => {
      cardBannerImg.src = "./assets/banner.webp";
    });

    let categories = clone.querySelector("p.categories");
    categories.textContent = cardElem.categories;

    let imgIcons = clone.querySelectorAll("img.search-rank-icon");

    let srcRankIcon = `./assets/icon-${cardElem.searchStatus}.png`;
    imgIcons.forEach((elem) => {
      elem.src = srcRankIcon;
    });

    return clone;
  });

  const cardLists = document.getElementById("card-lists");
  cardLists.append(...createListCards);

  cardListenerAction();
};

const cardListenerAction = () => {
  const listOfCards = document.querySelectorAll(".card-lists .card-link");

  listOfCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      debounce(() => {
        // reset card status
        listOfCards.forEach((oldCard) => {
          oldCard.classList.remove("active");
        });
        // change current card status to active
        card.classList.add("active");
      }, 200);
    });
  });

  const container = document.querySelector(".container");
  container.addEventListener("mouseleave", () => {
    debounce(() => {
      // reset card status
      listOfCards.forEach((oldCard) => {
        oldCard.classList.remove("active");
      });
      // top 1 card, will receive active status
      listOfCards[0].classList.add("active");
    }, 200);
  });
};

fetch("./data.json")
  .then((res) => res.json())
  .then((json) => {
    listCards = json;
    appendCards();
  });
