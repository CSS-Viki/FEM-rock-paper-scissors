const scoreCount = document.getElementById("score");
const rulesBtn = document.getElementById("rules");
const reset = document.querySelector(".reset");
const modal = document.querySelector(".modal__rules");
const closeModal = document.getElementById("close-rules");
const paper = document.querySelector(".icon__paper img");
const scissors = document.querySelector(".icon__scissors img");
const rock = document.querySelector(".icon__rock img");
const lizard = document.querySelector(".icon__lizard img");
const spock = document.querySelector(".icon__spock img");
const resultStatus = document.querySelector("#results");
const yourMove = document.querySelector("#your-move");
const houseMove = document.querySelector("#house-move");
const play = document.querySelector("#play-again");
const gameResults = document.querySelector(".game__results");
const gameMoves = document.querySelector(".game__moves");
const outcome = document.querySelector("#outcome");
const back = document.querySelector(".game__rules button:last-child");

back.addEventListener("click", () => {
  window.location.href = "index.html";
});

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

// Close modal when you click outside it
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

const playerPicks = {
  paper: "./images/icon-paper.svg",
  scissors: "./images/icon-scissors.svg",
  rock: "./images/icon-rock.svg",
  lizard: "./images/icon-lizard.svg",
  spock: "./images/icon-spock.svg",
};

// Computer move
function pickComputerMove() {
  const computerMoveOptions = ["paper", "rock", "scissors", "lizard", "spock"];
  let computerMovePicked =
    computerMoveOptions[Math.floor(Math.random() * computerMoveOptions.length)];

  return computerMovePicked;
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = ""; // output message of loss/win

  if (playerMove === "paper") {
    if (computerMove === "paper") {
      result = "Tie";
    } else if (computerMove === "rock") {
      result = "You Win";
      score += 1;
    } else if (computerMove === "scissors") {
      result = "You Lose";
    } else if (computerMove === "lizard") {
      result = "You Lose";
    } else if (computerMove === "spock") {
      result = "You Win";
      score += 1;
    }
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie";
    } else if (computerMove === "paper") {
      result = "You Lose";
    } else if (computerMove === "scissors") {
      result = "You Win";
      score += 1;
    } else if (computerMove === "lizard") {
      result = "You Win";
    } else if (computerMove === "spock") {
      result = "You Win";
      score += 1;
    }
  } else if (playerMove === "scissors") {
    if (computerMove === "scissors") {
      result = "Tie";
    } else if (computerMove === "rock") {
      result = "You Lose";
    } else if (computerMove === "paper") {
      result = "You Win";
      score += 1;
    } else if (computerMove === "lizard") {
      result = "You Lose";
    } else if (computerMove === "spock") {
      result = "You Lose";
    }
  } else if (playerMove === "lizard") {
    if (computerMove === "lizard") {
      result = "Tie";
    } else if (computerMove === "rock") {
      result = "You Lose";
    } else if (computerMove === "paper") {
      result = "You Lose";
    } else if (computerMove === "scissors") {
      result = "You Lose";
    } else if (computerMove === "spock") {
      result = "You Win";
      score += 1;
    }
  } else if (playerMove === "spock") {
    if (computerMove === "spock") {
      result = "Tie";
    } else if (computerMove === "rock") {
      result = "You Win";
      score += 1;
    } else if (computerMove === "paper") {
      result = "You Lose";
    } else if (computerMove === "scissors") {
      result = "You Win";
      score += 1;
    } else if (computerMove === "lizard") {
      result = "You Lose";
    }
  }

  // localStorage only supports strings => JSON.stringify does that
  localStorage.setItem("score", JSON.stringify(score));

  resultStatus.innerHTML = result;

  yourMove.innerHTML = `<div class="game__moves">
  <div class="icon__${playerMove}">
  <img src=${playerPicks[playerMove]} />
  </div>
  </div>`;

  houseMove.innerHTML = `<div class="game__moves">
  <div class="icon__${computerMove} animate">
  <img src=${playerPicks[computerMove]} />
  </div>
  </div>`;

  updateScoreElement();
}

function updateScoreElement() {
  scoreCount.innerHTML = score;
}

function resetScore() {
  score = 0; // Set the score to 0
  localStorage.setItem("score", JSON.stringify(score)); // Save the updated score to local storage
  updateScoreElement(); // Update the score element in the UI
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
lizard.addEventListener("click", () => {
  playGame("lizard");
  playModes();
  play.addEventListener("click", playAgain);
});
spock.addEventListener("click", () => {
  playGame("spock");
  playModes();
  play.addEventListener("click", playAgain);
});
reset.addEventListener("click", resetScore);
