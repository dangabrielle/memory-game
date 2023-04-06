/*----- constants -----*/
const cardLookup = [
  { imgsrc: "./images/art.webp", name: "art" },
  { imgsrc: "./images/beans1.jpg", name: "beans1" },
  { imgsrc: "./images/coffee_beans.jpg", name: "beans2" },
  { imgsrc: "./images/cup.jpg", name: "cup" },
  { imgsrc: "./images/filter.jpg", name: "filter" },
  { imgsrc: "./images/ground_coffee.jpg", name: "ground_coffee" },
  { imgsrc: "./images/hot_coffee.webp", name: "hot_coffee" },
  { imgsrc: "./images/milk.webp", name: "milk" },

  { imgsrc: "./images/art.webp", name: "art" },
  { imgsrc: "./images/beans1.jpg", name: "beans1" },
  { imgsrc: "./images/coffee_beans.jpg", name: "beans2" },
  { imgsrc: "./images/cup.jpg", name: "cup" },
  { imgsrc: "./images/filter.jpg", name: "filter" },
  { imgsrc: "./images/ground_coffee.jpg", name: "ground_coffee" },
  { imgsrc: "./images/hot_coffee.webp", name: "hot_coffee" },
  { imgsrc: "./images/milk.webp", name: "milk" },
];

const frontCard = {
  imgsrc: "./images/coffeegif.gif",
  name: "coffee_gif",
};

/*----- state variables -----*/
let livesRemaining = 10;
let firstClick;
let secondClick;
let firstCard;
let secondCard;
let clickCount;
let matchTracker;
let sound;

/*----- cached elements  -----*/
const playAgainBtn = document.querySelector("button");
const boardMap = document.querySelector("section");
const messageEl = document.querySelector(".try-again");
const livesCount = document.querySelector("span");
const startBtn = document.querySelector("#start");
/*----- event listeners -----*/
playAgainBtn.addEventListener("click", initialize);
window.addEventListener("load", function () {
  document.querySelector(".start-popup").style.display = "block";
  playAgainBtn.style.visibility = "hidden";
  boardMap.classList.toggle("preventClick");
});
startBtn.addEventListener("click", function () {
  document.querySelector(".start-popup").style.display = "none";
  playAgainBtn.style.visibility = "visible";
  boardMap.classList.toggle("preventClick");
  sound.play();
});
/*----- functions -----*/
initialize();

function initialize() {
  boardMap.innerHTML = "";
  messageEl.innerText = "";
  randomizeCards(cardLookup);
  sound = new Audio("./images/correctsound.mp3");
  sound.play();
  clickCount = 1;
  livesRemaining = 10;
  matchTracker = 0;
  playAgainBtn.disabled = true;
  livesCount.innerText = livesRemaining;
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
    // sound.play();
    cards.classList.toggle("flipCard");
    setTimeout(() => {
      cards.classList.toggle("flipCard");
    }, 20);

    // flip cards
    cards.addEventListener("click", handleClick);
    function handleClick(e) {
      console.log(clickCount);
      console.log(e.target.tagName);

      if (livesRemaining === 0 || matchTracker == 8) {
        return;
      }

      if (clickCount === 1) {
        cards.classList.toggle("flipCard");
        firstClick = e.target.getAttribute("name");
        console.log(firstClick);
        setTimeout(() => {
          cards.classList.toggle("flipCard");
        }, 2000);
        firstCard = e.currentTarget;
        clickCount = 2;
      } else if (clickCount === 2) {
        cards.classList.toggle("flipCard");
        secondClick = e.target.getAttribute("name");
        setTimeout(() => {
          cards.classList.toggle("flipCard");
        }, 2000);
        secondCard = e.currentTarget;
        console.log(secondClick);
        if (firstClick == secondClick) {
          secondCard.classList.toggle("unflipCard");
          firstCard.classList.toggle("unflipCard");
          secondCard.classList.toggle("preventClick");
          firstCard.classList.toggle("preventClick");

          trackMatch();
          if (matchTracker == 8) {
            messageEl.innerText = "You're a genius!";
            playAgainBtn.disabled = false;
          }

          console.log(matchTracker);
          console.log("matched");
          clickCount = 1;
        } else {
          clickCount = 1;
          console.log("not matched");
          minusOne();
          console.log(livesRemaining);
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
  }
  if (livesRemaining === 0) {
    playAgainBtn.disabled = false;
    messageEl.innerText = "Try again next time";

    // document.querySelector(".start-popup").style.display = "block";
    // playAgainBtn.style.visibility = "hidden";
    // boardMap.classList.toggle("preventClick");

    // startBtn.addEventListener("click", function () {
    //   document.querySelector(".start-popup").style.display = "none";
    //   playAgainBtn.style.visibility = "visible";
    //   boardMap.classList.toggle("preventClick");
    // });
  }
  return;
}

function trackMatch() {
  if (matchTracker >= 0 && matchTracker < 8) {
    matchTracker++;
    return matchTracker;
  }
}
