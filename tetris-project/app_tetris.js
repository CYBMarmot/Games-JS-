
// Basic Tetris
// freeCodeCamp Tutorial (needs personalization)
//Kaden Muckey
// July 17, 2020 at 9:10 PM




document.addEventListener('DOMContentLoaded', () => {
  const grid =  document.querySelector('.grid')
  let squares = Array.from(document.querySelectorAll('.grid div'))
  const ScoreDisplay = document.querySelector('#score')
  const StartBtn = document.querySelector('#start-button')
  const width = 10
  let nextRandom = 0 //Move to top
  let timerID
  let score = 0
  const colors = [
    'orange',
    'red',
    'purple',
    'green',
    'blue'
  ]
//Tetrominos
const lTetramino = [
  [1, width+1, width*2+1, 2],
  [width, width+1, width+2, width*2+2],
  [1, width+1, width*2+1, width*2],
  [width, width*2, width*2+1,width*2+2]
]

const zTetramino = [
  [0,width, width+1, width*2+1],
  [width+1,width+2,width*2,width*2+1],
  [0, width, width+1, width*2+1],
  [width+1,width+2,width*2,width*2+1]
]

const tTetromino = [
  [1, width, width+1,width+2],
  [1, width+1, width+2, width*2+1],
  [width, width+1, width+2,width*2+1],
  [1, width,width+1, width*2+1]
]

const oTetramino = [
  [0,1,width,width+1],
  [0,1,width,width+1],
  [0,1,width,width+1],
  [0,1,width,width+1]
]

const iTetramino = [
  [1, width+1, width*2+1,width*3+1],
  [width, width+1, width+2, width+3],
  [1, width+1, width*2+1,width*3+1],
  [width, width+1, width+2, width+3]
]

const totalTetros = [lTetramino, zTetramino, tTetromino, oTetramino, iTetramino]

let currentPosition = 4
let currentRotation = 0
let random = Math.floor(Math.random()*totalTetros.length)
//console.log(random)
let current = totalTetros[random][currentRotation]

function draw() {
  current.forEach(index => {
    squares[currentPosition + index].classList.add('tetromino')
    squares[currentPosition + index].style.backgroundColor = colors[random]
  })
}

//draw()

function undraw() {
  current.forEach(index => {
    squares[currentPosition+index].classList.remove('tetromino')
    squares[currentPosition + index].style.backgroundColor = ''

  })
}


//timerID = setInterval(moveDown, 1000)

function control(e){
  if(e.keyCode === 37){
    moveLeft()
  } else if (e.keyCode === 38){
    rotate()
  } else if (e.keyCode === 39) {
    moveRight()
  } else if (e.keyCode === 40) {
    moveDown()
  }
}
document.addEventListener('keyup', control)

function moveDown(){
  undraw()
  currentPosition+=width
  draw()
  freeze()
}

function freeze() {
  if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
    current.forEach(index => squares[currentPosition + index].classList.add('taken'))
    random = nextRandom
    nextRandom = Math.floor(Math.random()*totalTetros.length)
    current = totalTetros[random][currentRotation]
    currentPosition = 4
    draw()
    displayShape()
    addScore()
    gameOver()
  }
}

function moveLeft(){
  undraw()
  const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
  if (!isAtLeftEdge) currentPosition -=1
  if (current.some(index => squares[currentPosition+index].classList.contains('taken'))){
    currentPosition +=1
  }
  draw()
}

function moveRight () {
  undraw()
  const isAtRightEdge = current.some(index => (currentPosition + index) % width === width-1)
  if (!isAtRightEdge) currentPosition +=1
  if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
    currentPosition -= 1
  }
  draw()
}

function rotate() {
  undraw()
  currentRotation ++
  if (currentRotation === current.length){
    currentRotation = 0
  }
  current = totalTetros[random][currentRotation]
  draw()
}

const displaySquares = document.querySelectorAll('.mini-grid div')
const displayWidth = 4
const displayIndex = 0


const upNextTetrominos = [
  [1, displayWidth+1, displayWidth*2+1, 2],
  [0, displayWidth, displayWidth+1, displayWidth*2+1],
  [1, displayWidth, displayWidth+1, displayWidth+2],
  [0,1, displayWidth, displayWidth+1],
  [1,displayWidth+1,displayWidth*2+1,displayWidth*3+1]
]

function displayShape() {
  displaySquares.forEach(square => {
    square.classList.remove('tetromino')
    square.style.backgroundColor = ''
  })
  upNextTetrominos[nextRandom].forEach(index => {
    displaySquares[displayIndex + index].classList.add('tetromino')
    displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
  })
}

StartBtn.addEventListener('click', () => {
  if (timerID){
    clearInterval(timerID)
    timerID = null
  } else {
    draw()
    timerID = setInterval(moveDown, 1000)
    nextRandom = Math.floor(Math.random()*totalTetros.length)
    displayShape()
  }
})


function addScore() {
  for (let i = 0; i < 199 ; i+=width) {
    const row = [i, i+2,i+3,i+4,i+5,i+6,i+7,i+8,i+9]
    if (row.every(index => squares[index].classList.contains('taken'))){
      score += 10
      ScoreDisplay.innerHTML = score
      row.forEach(index => {
        squares[index].classList.remove('taken')
        squares[index].classList.remove('tetromino')
        squares[index].style.backgroundColor = ''
      })
      const squaresRemoved = squares.splice(i, width)
      squares=squaresRemoved.concat(squares)
      squares.forEach(cell => grid.appendChild(cell))
    }

  }
}

function gameOver() {
  if (current.some(index => squares[currentPosition + index].classList.contains('taken'))){
    ScoreDisplay.innerHTML = 'end'
    clearInterval(timerID)
  }
}





















})
