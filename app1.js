const computerChoiceDisplay = document.getElementById('computer-choice')
const userChoiceDisplay = document.getElementById('user-choice')
const resultDisplay = document.getElementById('result')
const possibleChoices = document.querySelectorAll('button')
const accumulatedResult = document.getElementById('accumulated')

let userChoice
let computerChoice
let result
let win = 0
let lose = 0
let draw = 0

possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click' , (e) => {
    userChoice = e.target.id 
    userChoiceDisplay.innerHTML = userChoice
    generateComputerChoice()
    getResult()
}))

function generateComputerChoice() {
    const randomNumber = Math.floor(Math.random() * possibleChoices.length) + 1
    
    if (randomNumber === 1) {
        computerChoice = 'rock'
    }
    if (randomNumber === 2) {
        computerChoice = 'scissors'
    }
    if (randomNumber === 3) {
        computerChoice = 'paper'
    }  

    computerChoiceDisplay.innerHTML = computerChoice
}

function getResult() {
    if (computerChoice === userChoice) {
        result = 'It is a draw!'
        draw += 1
    }

    if (computerChoice === 'rock' && userChoice === 'paper'){
        result = 'You win!'
        win += 1
    }

    if (computerChoice === 'paper' && userChoice === 'scissors'){
        result = 'You win!'
        win += 1
    }

    if (computerChoice === 'scissors' && userChoice === 'rock'){
        result = 'You win!'
        win += 1
    }

    if (userChoice === 'rock' && computerChoice === 'paper'){
        result = 'You lose!'
        lose += 1
    }

    if (userChoice === 'paper' && computerChoice === 'scissors'){
        result = 'You lose!'
        lose += 1
    }

    if (userChoice === 'scissors' && computerChoice === 'rock'){
        result = 'You lose!'
        lose += 1
    }

    resultDisplay.innerHTML = result
    let accumulatedResultText = `You have won ${win} times; lost ${lose} times; and drawn ${draw} times.`
    accumulatedResult.innerHTML = accumulatedResultText

}