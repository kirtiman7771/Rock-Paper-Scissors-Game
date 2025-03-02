let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".player-choices .choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const resetBtn = document.querySelector("#reset-btn");
const userSelectedDisplay = document.querySelector("#user-selected .choice-display");
const compSelectedDisplay = document.querySelector("#comp-selected .choice-display");

// Generate computer choice
const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randomIdx = Math.floor(Math.random() * 3);
    return options[randomIdx];
};

// Display the selected choices
const displayChoices = (userChoice, compChoice) => {
    // Display user choice
    userSelectedDisplay.innerHTML = `<img src="./images/${userChoice}.png" alt="${userChoice}">`;
    userSelectedDisplay.classList.add("bounce");
    
    // Display computer choice after a small delay
    setTimeout(() => {
        compSelectedDisplay.innerHTML = `<img src="./images/${compChoice}.png" alt="${compChoice}">`;
        compSelectedDisplay.classList.add("bounce");
        
        // Remove animation classes after animation completes
        setTimeout(() => {
            userSelectedDisplay.classList.remove("bounce");
            compSelectedDisplay.classList.remove("bounce");
        }, 1000);
    }, 500);
};

// Handle draw game
const drawGame = () => {
    msg.innerText = "It's a Draw! Play again.";
    msg.style.backgroundColor = "#081b31";
};

// Show winner
const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    } else {
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = `You Lost! ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "red";
    }
};

// Play the game
const playGame = (userChoice) => {
    // Disable choices during animation
    setChoicesEnabled(false);
    
    // Show selected choice
    highlightChoice(userChoice);
    
    // Generate computer choice
    const compChoice = genCompChoice();
    
    // Display both choices
    displayChoices(userChoice, compChoice);
    
    // Determine winner after a delay (for animation to complete)
    setTimeout(() => {
        if (userChoice === compChoice) {
            drawGame();
        } else {
            let userWin = true;
            if (userChoice === "rock") {
                userWin = compChoice === "paper" ? false : true;
            } else if (userChoice === "paper") {
                userWin = compChoice === "scissors" ? false : true;
            } else {
                userWin = compChoice === "rock" ? false : true;
            }
            showWinner(userWin, userChoice, compChoice);
        }
        
        // Re-enable choices
        setChoicesEnabled(true);
    }, 1500);
};

// Highlight the selected choice
const highlightChoice = (choiceId) => {
    // Remove highlight from all choices
    choices.forEach(choice => {
        choice.classList.remove("highlight");
    });
    
    // Add highlight to selected choice
    document.querySelector(`#${choiceId}`).classList.add("highlight");
};

// Enable/disable choices
const setChoicesEnabled = (enabled) => {
    choices.forEach(choice => {
        if (enabled) {
            choice.style.pointerEvents = "auto";
        } else {
            choice.style.pointerEvents = "none";
        }
    });
};

// Reset the game
const resetGame = () => {
    userScore = 0;
    compScore = 0;
    userScorePara.innerText = "0";
    compScorePara.innerText = "0";
    msg.innerText = "Choose your move";
    msg.style.backgroundColor = "#081b31";
    userSelectedDisplay.innerHTML = "";
    compSelectedDisplay.innerHTML = "";
    choices.forEach(choice => {
        choice.classList.remove("highlight");
    });
};

// Event listeners
choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});

resetBtn.addEventListener("click", resetGame);

// Initialize the game (clear displays)
window.addEventListener("load", () => {
    userSelectedDisplay.innerHTML = "";
    compSelectedDisplay.innerHTML = "";
});