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
const playAgainBtnLose = document.querySelector(".play-again-l");
const playAgainBtnWin = document.querySelector(".play-again-w");
const boardMap = document.querySelector("section");
const livesCount = document.querySelector("span");
const startBtn = document.querySelector("#start");

/*----- event listeners -----*/

window.addEventListener("load", function () {
  document.querySelector(".start-popup").style.display = "block";
  boardMap.classList.toggle("preventClick");
  startBtn.style.visibility = "visible";
  // startBtn.disabled = false;
});

startBtn.addEventListener("click", function () {
  document.querySelector(".start-popup").style.display = "none";
  boardMap.classList.toggle("preventClick");
  sound.play();
});

/*----- functions -----*/
initialize();

function initialize() {
  boardMap.innerHTML = "";
  randomizeCards(cardLookup);
  sound = new Audio("./sounds/correctsound.mp3");
  clickCount = 1;
  livesRemaining = 10;
  matchTracker = 0;
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
    sound.play();
    cards.classList.toggle("flipCard");
    setTimeout(() => {
      cards.classList.toggle("flipCard");
    }, 20);

    cards.addEventListener("click", handleClick);

    function handleClick(e) {
      if (livesRemaining === 0 || matchTracker == 8) {
        return;
      }

      if (clickCount === 1) {
        cards.classList.toggle("flipCard");
        firstClick = e.target.getAttribute("name");
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

        if (firstClick == secondClick && firstCard !== secondCard) {
          secondCard.classList.toggle("unflipCard");
          firstCard.classList.toggle("unflipCard");
          secondCard.classList.toggle("preventClick");
          firstCard.classList.toggle("preventClick");

          trackMatch();

          if (matchTracker == 8) {
            document.querySelector(".win-popup").style.display = "block";
            sound = new Audio("./sounds/pop.mp3");
            sound.play();
            playAgainBtnWin.addEventListener("click", function () {
              document.querySelector(".win-popup").style.display = "none";
              playAgainBtnWin.style.visibility = "visible";
              initialize();
            });
          }
          clickCount = 1;
        } else {
          clickCount = 1;
          minusOne();
        }
      }
    }
  });
}

function randomizeCards(arr) {
  return arr.sort(() => 0.5 - Math.random());
}

function minusOne() {
  if (livesRemaining >= 1) {
    livesRemaining--;
    livesCount.innerText = livesRemaining;
  }
  if (livesRemaining === 0) {
    playAgainBtnLose.disabled = false;
    document.querySelector(".lose-popup").style.display = "block";
    sound = new Audio("./sounds/pop.mp3");
    sound.play();
    playAgainBtnLose.addEventListener("click", function () {
      document.querySelector(".lose-popup").style.display = "none";
      playAgainBtnLose.style.visibility = "visible";
      initialize();
    });
  }
  return;
}

function trackMatch() {
  if (matchTracker >= 0 && matchTracker < 8) {
    matchTracker++;
    return matchTracker;
  }
}
