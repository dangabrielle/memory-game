/*----- constants -----*/
const cardLookup = [
  { imgsrc: "./images/spades_6.svg", name: "spade6" },
  { imgsrc: "./images/spades_7.svg", name: "spade7" },
  { imgsrc: "./images/spades_8.svg", name: "spade8" },
  { imgsrc: "./images/spades_9.svg", name: "spade9" },
  { imgsrc: "./images/spades_ace.svg", name: "ace" },
  { imgsrc: "./images/spades_jack.svg", name: "jack" },
  { imgsrc: "./images/spades_king.svg", name: "king" },
  { imgsrc: "./images/spades_queen.svg", name: "queen" },

  { imgsrc: "./images/spades_6.svg", name: "spade6" },
  { imgsrc: "./images/spades_7.svg", name: "spade7" },
  { imgsrc: "./images/spades_8.svg", name: "spade8" },
  { imgsrc: "./images/spades_9.svg", name: "spade9" },
  { imgsrc: "./images/spades_ace.svg", name: "ace" },
  { imgsrc: "./images/spades_jack.svg", name: "jack" },
  { imgsrc: "./images/spades_king.svg", name: "king" },
  { imgsrc: "./images/spades_queen.svg", name: "queen" },
];

const frontCard = {
  imgsrc: "./images/frog.svg",
  name: "frog front",
};

/*----- state variables -----*/
let livesRemaining = 10;
let winner;

/*----- cached elements  -----*/
const playAgainBtn = document.querySelector("button");
const boardMap = document.querySelector("section");

const livesCount = document.querySelector("span");
livesCount.innerText = livesRemaining;

initialize();

/*----- event listeners -----*/

/*----- functions -----*/

function initialize() {
  randomizeCards(cardLookup);

  cardLookup.forEach((card) => {
    const cards = document.createElement("div");
    const front = document.createElement("img");
    const back = document.createElement("img");
    boardMap.appendChild(cards);
    cards.appendChild(front);
    cards.appendChild(back);
    front.setAttribute("src", card.imgsrc);
    back.setAttribute("class", "back");
    back.setAttribute("height", "150px");
    front.setAttribute("height", "150px");
    back.setAttribute("src", frontCard.imgsrc);
    front.setAttribute("class", "front");
    cards.setAttribute("class", "cards");

    cards.addEventListener("click", handleClick);
    function handleClick(e) {
      cards.classList.toggle("flipCard");
    }
  });
}

function randomizeCards(arr) {
  return arr.sort(() => 0.5 - Math.random());
}
// found from https://www.webmound.com/shuffle-javascript-array/
