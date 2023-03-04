function getComputerChoice() {
    let number = Math.floor((Math.random() * 3) + 1);
    let result = computerChoices[number];
    return result;
}

const computerChoices = {
    1: "ROCK",
    2: "SCISSORS",
    3: "PAPER"
}
const computerImages = {
    "ROCK" : "./images/rock.png",
    "SCISSORS": "./images/scissors.png",
    "PAPER": "./images/paper.png"
}

let gameState = {
    playerScore: 0,
    computerScore: 0,

}



//functionality to get computer choice of which option to play, and also computerImages works as the dictionary which pulls the correct image bassed on what the computer chooses 

function evaluateWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return "draw"
    }
    else if (playerChoice === "ROCK") {
        if (computerChoice === 'SCISSORS') {
            return "winner: player";
        }
        else if (computerChoice === 'PAPER') {
            return "winner: computer";
        }
    }
    else if (playerChoice === "PAPER") {
        if (computerChoice === "ROCK") {
            return "winner: player";
        }
        else if (computerChoice === "SCISSORS") {
            return "winner: computer";
        }
    }
    else if (playerChoice === "SCISSORS") {
        if (computerChoice === "PAPER") {
            return 'winner: player';
        }
        else if (computerChoice === "ROCK") {
            return "winner: computer";
        }
    }
}
//function called which is used to evaluate whether computer or player won, or whether it was a draw 

const topHalf = document.querySelector('.container')
const choicesContainer = document.querySelector('.choices-container')
const startPlayerHeader = document.querySelector(".player-header")

const startComputerHeader = document.querySelector(".computer-header")

const bottomHalf = document.querySelector('.bottom');
const paperImage = document.createElement('img');
const computerText = document.querySelector('.computer-choice');
//query selectors to select information in bottom half of page, which will give details of computer choice and also insert proper images
const choice = document.querySelector('.instructions');
//query selector for initial instruction, which will then be changed to selection text based on player choice 
const winnerText = document.createElement('div');
winnerText.classList.add('winner-text')

const button = document.createElement('button');
button.textContent = "RESET"
button.classList.add('button')
// const playerScoreText = document.querySelector('.player-score')
const playerHeadingText = document.querySelector('.player-header')
// const computerScoreText = document.querySelector('.computer-score')
const computerHeadingText = document.querySelector('.computer-header')

function insertImage(computerImageChoice) {
    paperImage.src = computerImages[computerImageChoice];
    bottomHalf.insertBefore(paperImage, computerText)
}
function insertWinnerText(winner) {
    winnerText.textContent = winner;
    bottomHalf.appendChild(winnerText)
}

function evaluate(playerChoice) {
    const playerScoreText = document.querySelector('.player-score')
    const computerScoreText = document.querySelector('.computer-score')

    if (gameState['playerScore'] === 5|| gameState['computerScore'] === 5) {
        return
    }
    const computerChoice = getComputerChoice();
    insertImage(computerChoice);
    computerText.textContent = computerChoice;
    const winner = evaluateWinner(playerChoice, computerChoice)
    insertWinnerText(winner)
    if (winner === 'winner: player') {
        gameState['playerScore'] += 1;
        
    }
    else if (winner === 'winner: computer') {
        gameState['computerScore']+= 1;
        
    }
    playerScoreText.textContent = gameState['playerScore']
    
    computerScoreText.textContent = gameState['computerScore']
    

    if (gameState['playerScore'] === 5) {
        playerHeadingText.innerHTML = 'player wins<span class="player-score"></span>'
        topHalf.appendChild(button)
        // playerScoreText.textContent = "Player Wins";
    }
    else if (gameState['computerScore'] === 5) {
        computerHeadingText.innerHTML = 'computer wins<span class="computer-score></span>'
        topHalf.appendChild(button)
        // computerScoreText.textContent = "Computer Wins";
    }

}



const rock = document.querySelectorAll('[data-key="rock"]')

rock.forEach((element) => {
    element.addEventListener('click', (e) => {
    const playerChoice = "ROCK";
    if (gameState['playerScore'] < 5 && gameState['computerScore'] < 5) {
    choice.textContent = 'ROCK';
    }

    evaluate(playerChoice);
    
})})

const scissors = document.querySelectorAll('[data-key="scissors"]')

scissors.forEach((element) => {
    element.addEventListener('click', (e) => {
    const playerChoice = "SCISSORS";
    if (gameState['playerScore'] < 5 && gameState['computerScore'] < 5) {
        choice.textContent = 'SCISSORS';
        }
    
    evaluate(playerChoice);
})})

const paper = document.querySelectorAll('[data-key="paper"]')

paper.forEach((element) => {
    element.addEventListener('click', (e) => { 
    const playerChoice = "PAPER";
    if (gameState['playerScore'] < 5 && gameState['computerScore'] < 5) {
        choice.textContent = 'PAPER';
        }
  
    evaluate(playerChoice);    
})})

button.addEventListener('click', () => {
    gameState = {
        playerScore: 0,
        computerScore: 0,
    }
    topHalf.removeChild(button);
    bottomHalf.removeChild(paperImage);
    playerHeadingText.innerHTML = "Player: <span class='player-score'>0</span>"
    computerHeadingText.innerHTML = "Computer: <span class='computer-score'>0</span>"

    
    
    choice.textContent = "Please click choice";
    computerText.textContent = "What will the Computer Choose?"
    bottomHalf.removeChild(winnerText)
})

