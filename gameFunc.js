const choiceButtons = document.querySelectorAll(".choice");
const matchContainer = document.querySelector(".matchContainer");
const choiceContainer = document.querySelector(".choiceContainer");
const outcomeText = document.querySelector(".outcomeText");
const retryBtn = document.querySelector(".retryButton");
const scoreElement = document.querySelector(".score");
const chosenOption = document.querySelector(".chosenOption");
const opponentChoice = document.querySelector(".opponentChoice");
const choices = ["rock", "paper", "scissors"];

let score = 0;

// ---> Project's Function Logics

// 1. Game Logic to determine the winner

function determineWinner(playerChoice, systemChoice) {
  if (playerChoice === systemChoice) return "IT'S A TIE";

  if (
    (playerChoice === "rock" && systemChoice === "scissors") ||
    (playerChoice === "paper" && systemChoice === "rock") ||
    (playerChoice === "scissors" && systemChoice === "paper")
  ) {
    return "YOU WIN";
  }
  return "YOU LOSE";
}

// 2. Logic to create a choice button element

function createChoice(choice) {
  const button = document.createElement("button");

  button.className = `choice ${choice}`;
  button.dataset.choice = choice;

  const img = document.createElement("img");
  img.src = `./assets/images/icon-${choice}.svg`;

  button.appendChild(img);
  return button;
}

// 3. Logic to handle player and system choice

function handleChoice(event) {
  const playerChoice = event.currentTarget.dataset.choice;
  const systemChoice = choices[Math.floor(Math.random() * choices.length)];

  // Hide choice container and show match container
  choiceContainer.style.display = "none";
  matchContainer.style.display = "grid";

  // View the players' choices
  chosenOption.appendChild(createChoice(playerChoice));

  // Animate opponent choice after a delay
  setTimeout(() => {
    opponentChoice.innerHTML = "";
    opponentChoice.appendChild(createChoice(systemChoice));

    // View result after players' choices
    const result = determineWinner(playerChoice, systemChoice);
    outcomeText.textContent = result;

    // This update score
    if (result === "YOU WIN") {
      score += 1;
      scoreElement.textContent = score;
    }
  }, 1000);
}

// 4. Logic to reset game

function resetGame() {
  matchContainer.style.display = "none";
  choiceContainer.style.display = "flex";
  chosenOption.innerHTML = "";
  opponentChoice.innerHTML = '<div class="waitingCircle"></div>';
  outcomeText.textContent = "";
}

// ----> Event Listeners

choiceButtons.forEach((button) => {
  button.addEventListener("click", handleChoice);
});

retryBtn.addEventListener("click", resetGame);
