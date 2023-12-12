const scoreCount = document.getElementById("score");
const rulesBtn = document.getElementById("rules");
const modal = document.querySelector(".modal__rules");
const closeModal = document.getElementById("close-rules");
const paper = document.querySelector(".icon__paper img");
const scissors = document.querySelector(".icon__scissors img");
const rock = document.querySelector(".icon__rock img");
const resultStatus = document.querySelector("#results");
const yourMove = document.querySelector("#your-move");
const houseMove = document.querySelector("#house-move");
const play = document.querySelector("#play-again");
const gameResults = document.querySelector(".game__results");
const gameMoves = document.querySelector(".game__moves");

// Opening rules modal
rulesBtn.addEventListener("click", () => {
  modal.classList.add("open-popup");
  document.querySelector("section").style.opacity = 0.2;
});
// closing rules modal
closeModal.addEventListener("click", () => {
  modal.classList.remove("open-popup");
  document.querySelector("section").style.opacity = 1;
});

// Close modal when you click outside
window.addEventListener("click", (e) => {
  // Check if click was outside modal and not on modal or button
  if (!e.target.closest(".modal") && !e.target.closest("#rules")) {
    // Hide modal
    modal.classList.remove("open-popup");

    // Reset opacity
    document.querySelector("section").style.opacity = 1;
  }
});

let score = JSON.parse(localStorage.getItem("score")) || 0;
updateScoreElement();

// Computer move
function pickComputerMove() {
  let randomNumber = Math.random();

  let computerMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "scissors";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "paper";
  }

  return computerMove;
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = ""; // output message of loss/win

  if (playerMove === "paper") {
    if (computerMove === "paper") {
      result = "Tie";
    } else if (computerMove === "rock") {
      result = "You Win";
    } else if (computerMove === "scissors") {
      result = "You Lose";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie";
    } else if (computerMove === "paper") {
      result = "You Lose";
    } else if (computerMove === "scissors") {
      result = "You Win";
    }
  } else if (playerMove === "scissors") {
    if (computerMove === "scissors") {
      result = "Tie";
    } else if (computerMove === "rock") {
      result = "You Lose";
    } else if (computerMove === "paper") {
      result = "You Win";
    }
  }

  if (result === "You Win") {
    score += 1;
  } else if (result === "You Lose") {
    score -= 1;
  } else if (result === "Tie") {
    score += 0;
  }

  // localStorage only supports strings => JSON.stringify does that
  localStorage.setItem("score", JSON.stringify(score));

  resultStatus.innerHTML = result;
  yourMove.innerHTML = `<div class="game__moves">
  <div class="icon__${playerMove}">
  <img src="./images/icon-${playerMove}.svg" />
  </div>
  </div>`;
  houseMove.innerHTML = `<div class="game__moves">
  <div class="icon__${computerMove}">
  <img src="./images/icon-${computerMove}.svg" />
  </div>
  </div>`;

  updateScoreElement();
}
function updateScoreElement() {
  scoreCount.innerHTML = score;
}
function playModes() {
  gameResults.classList.add("active");
  gameMoves.classList.add("inactive");
}
function playAgain() {
  gameResults.classList.remove("active");
  gameMoves.classList.remove("inactive");
}

paper.addEventListener("click", () => {
  playGame("paper");
  playModes();
  play.addEventListener("click", playAgain);
});
scissors.addEventListener("click", () => {
  playGame("scissors");
  playModes();
  play.addEventListener("click", playAgain);
});
rock.addEventListener("click", () => {
  playGame("rock");
  playModes();
  play.addEventListener("click", playAgain);
});
