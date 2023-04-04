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
let firstClick;
let secondClick;
let firstCard;
let secondCard;
let clickCount;
let wrongGuess;
let getWinner;

/*----- cached elements  -----*/
const playAgainBtn = document.querySelector("button");
const boardMap = document.querySelector("section");
const messageEl = document.querySelector("h2");

const livesCount = document.querySelector("span");
livesCount.innerText = livesRemaining;

initialize();

/*----- event listeners -----*/

/*----- functions -----*/

function initialize() {
  randomizeCards(cardLookup);
  clickCount = 1;
  livesRemaining = 10;
  wrongGuess = false;
  render();
}

function render() {
  cardLookup.forEach((card) => {
    const cards = document.createElement("div");
    const front = document.createElement("img");
    const back = document.createElement("img");
    boardMap.appendChild(cards);
    cards.appendChild(front);
    cards.appendChild(back);
    front.setAttribute("src", card.imgsrc);
    back.setAttribute("src", frontCard.imgsrc);
    back.setAttribute("name", card.name);
    back.setAttribute("class", "back");
    back.setAttribute("height", "150px");
    front.setAttribute("height", "150px");
    front.setAttribute("class", "front");
    cards.setAttribute("class", "cards");

    // flip cards
    cards.addEventListener("click", handleClick);
    function handleClick(e) {
      console.log(clickCount);
      console.log(e.target.tagName);

      if (clickCount === 1) {
        cards.classList.toggle("flipCard");
        firstClick = e.target.getAttribute("name");
        console.log(firstClick);
        setTimeout(() => {
          cards.classList.toggle("flipCard");
        }, 2000);
        firstCard = e.currentTarget;
        console.log(firstCard);
        clickCount = 2;
      } else if (clickCount === 2) {
        cards.classList.toggle("flipCard");
        secondClick = e.target.getAttribute("name");
        setTimeout(() => {
          cards.classList.toggle("flipCard");
        }, 2000);
        secondCard = e.currentTarget;
        if (firstClick == secondClick) {
          secondCard.classList.toggle("unflipCard");
          firstCard.classList.toggle("unflipCard");
          secondCard.classList.toggle("preventClick");
          firstCard.classList.toggle("preventClick");

          console.log("matched");
          clickCount = 1;
        } else {
          clickCount = 1;
          console.log("not matched");
          minusOne();
        }
      }
    }
  });
}

function randomizeCards(arr) {
  return arr.sort(() => 0.5 - Math.random());
}
// found from https://www.webmound.com/shuffle-javascript-array/
function minusOne() {
  if (livesRemaining >= 1) {
    livesRemaining--;
    livesCount.innerText = livesRemaining;
  } else {
    messageEl.innerText = "Try again next time";
  }
}
