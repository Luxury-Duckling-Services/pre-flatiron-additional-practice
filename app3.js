const squares = document.querySelectorAll('.square')
const earnMoney = document.querySelector('.earnMoney')
const loseMoney = document.querySelector('.loseMoney')
const timeLeft = document.querySelector('#time-left')
const score = document.querySelector('#score')
const history = document.querySelector('#history')
const start = document.querySelector('#start')

let result = 10000
let hitPosition = 5
let currentTime = 30
let timerId = null
let countDownTimerId = null
let historyArray = [10000]
let randomColorDecision = 0

function traceHistory() {
    historyArray.push(result)
    history.textContent = historyArray.join(', ')
}

function randomSquare() { 
    squares.forEach(square => {
        square.classList.remove('earnMoney')
        square.classList.remove('loseMoney')
        square.textContent = ``
    })

    randomColorDecision = Math.floor( Math.random() * 10)
    let randomSquare = squares[ Math.floor( Math.random() * 9 )]
    
    if (randomColorDecision <= 6){
        randomSquare.classList.add('earnMoney')
    } else {
        randomSquare.classList.add('loseMoney')
    }

    hitPosition = randomSquare.id
    traceHistory()
}

function setup() {
    squares.forEach(square => {
        square.addEventListener('mousedown', () =>{
            if (square.id == hitPosition) {
                if (randomColorDecision <= 6){
                    square.textContent = `hit and earned 20%`
                    result = Math.round( result * 1.2 * 100 ) / 100
                } else {
                    square.textContent = `hit and lost 50%`
                    result = Math.round(result * 100 / 2 ) / 100
                }
                score.textContent = result
                hitPosition = null
            } else {
                square.textContent = `missed`
            }
        })
    })
}

function moveToNextSquare() {
    timerId = setInterval(randomSquare, 1000)
}

function countDown(){
    currentTime -= 0.1
    timeLeft.textContent = Math.round(currentTime * 10) / 10

    if (currentTime <= 0) {
        clearInterval(countDownTimerId)
        clearInterval(timerId)
        alert(`Your final money is ${result}.`)
    }

}

start.addEventListener('click' , () => {
    setup()
    moveToNextSquare()
    let countDownTimerId = setInterval(countDown , 100)
})