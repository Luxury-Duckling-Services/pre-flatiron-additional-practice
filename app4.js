const start = document.querySelector('#start')
const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')

const blockWidth = 100
const blockHeight = 20
const boardWidth = 560
const boardHeight = 300

const ballDiameter = 20

let timerId = null
let xDirection = 3
let yDirection = 3

const userStart = [230 , 10]
let currentPosition = userStart

const ballStart = [270 , 40]
let ballCurrentPosition = ballStart

let trajectory = [0]

// create block

class Block {
    constructor(xAxis , yAxis) {
        this.bottomLeft = [xAxis , yAxis]
        this.bottomRight = [xAxis + blockWidth , yAxis]
        this.topLeft = [xAxis , yAxis + blockHeight]
        this.topRight = [xAxis + blockWidth , yAxis + blockHeight]
    }
}

// all my blocks

let blocks = []

for (let i = 0 ; i < 5 ; i ++) {
    for (let j = 0 ; j < 3 ; j ++ ) {
        blocks.push(new Block(10 + i * 110 , 270 - j * 30))
    }
}

// draw my block

function addBlocks() {
    for (let i = 0 ; i < blocks.length ; i++) {
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        grid.appendChild(block)
    }
}

addBlocks()

// add user

const user = document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)

// draw user 

function drawUser() {
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
}

// draw ball

function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px'
    ball.style.bottom = ballCurrentPosition[1] + 'px'
}

// move user

function moveUser(e) {
    switch(e.key){
        case 'ArrowLeft':
            if (currentPosition[0] > 0) {
                currentPosition[0] -= 10
                drawUser()
                trajectory.push(-1)
            }
            break;
        
        case 'ArrowRight':
            if (currentPosition[0] < boardWidth - blockWidth){
                currentPosition[0] += 10
                drawUser()
                trajectory.push(1)
            }
            break;
            
    }
}

function sumTrajectory(trajectory) {
    let sum = 0
    for (let i = 0 ; i<trajectory.length ; i ++ ){
        sum += trajectory[i]
    }
    return sum
}

document.addEventListener('keydown' , moveUser)

// add ball

const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)

// move ball

function moveBall() {
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    drawBall()
    checkForCollisons()
    trajectory = [0]
}

// check for collisions

function checkForCollisons() {
    // check for block collisions

    for(let i = 0 ; i < blocks.length ; i ++) {
        if (
            ballCurrentPosition[0] > blocks[i].bottomLeft[0] &&
            ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
            ballCurrentPosition[1] + ballDiameter > blocks[i].bottomLeft[1]
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i, 1)
            collideWithBlock()
        }
    }
    
    // check for side wall collisions

    if (
        ballCurrentPosition[0] >= (boardWidth - ballDiameter) ||
        ballCurrentPosition[0] <= 0
        ) {
        collideWithSideWall()
    }

    // check for top wall collisions

    if (
        ballCurrentPosition[1] > boardHeight - ballDiameter
    ) {
        collideWithTopWall()
    }

    // check for user collisions

    let userLeftNumbers = user.style.left.replace("px", "")
    let userLeft = parseInt(userLeftNumbers, 10)
    let userRight = userLeft + blockWidth
    let userTop = userStart[1] + blockHeight

    if (
        ballCurrentPosition[0] > userLeft &&
        ballCurrentPosition[0] < userRight &&
        ballCurrentPosition[1] <= userTop + 2
    ) {
        collideWithUser(trajectory)
    }

    //check for game over

    if (ballCurrentPosition[1] <= 0) {
        clearInterval(timerId)
        alert('Game over!')
        document.removeEventListener('keydown' , moveUser)
    }
}

function collideWithBlock() {
    yDirection = - yDirection
}

function collideWithSideWall() {
    xDirection = - xDirection
}

function collideWithTopWall() {
    yDirection = - yDirection
}

function collideWithUser(trajectory) {
    yDirection = - yDirection
    xDirection = xDirection + sumTrajectory(trajectory)
}

// button to start the game

start.addEventListener('click' , () => {
    timerId = setInterval(moveBall , 100)
})