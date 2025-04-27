/*-------------------------------- Constants --------------------------------*/
const winConditions = [
// across
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
// vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
// diagonal
    [2, 4, 6],
    [0, 4, 8]
]

/*---------------------------- Variables (state) ----------------------------*/
let isXTurn = winner = tie = false
let squareIdx
let board = [
    '', '', '',
    '', '', '',
    '', '', ''
]
let playerX = []
let playerO = []

/*------------------------ Cached Element References ------------------------*/
const message = document.querySelector('#message')
const square = document.querySelectorAll('.sqr')
const reset = document.querySelector('#reset')

/*-------------------------------- Functions --------------------------------*/
// This checks if a winner/tie is true or if the square is occupied, before executing the functions
function handleClick(event) {
    squareIdx = event.target.id
    if (winner || tie) return
    if (board[squareIdx] !== '') return
    markPiece()
    checkWinner()
    checkTie()
    result()
}

// This checks the turn to see if it's X or O and displays the piece
function markPiece() {
    const displaySquare = document.getElementById(`${squareIdx}`)
    isXTurn = !isXTurn
    // x is 🐙
    if (isXTurn) {
        board[squareIdx] = 'X'
        playerX.push(Number(squareIdx)) 
        displaySquare.textContent = '🐙'
        message.textContent = `Your turn, Player 🪼`
    // o is 🪼
    } else { 
        board[squareIdx] = 'O'
        playerO.push(Number(squareIdx))
        displaySquare.textContent = '🪼'
        message.textContent = 'Your turn, Player 🐙'
    }
}

// This checks to see if someone has won and saves the winner to winner
function checkWinner() {
    // This checks the arr (array) with a targetArr to see if all targetArr values are included in arr
    const checkWins = (arr, targetArr) => targetArr.every(v => arr.includes(v))
    let playerXWins = []
    let playerOWins = []
    winConditions.forEach(winArray => {
        playerXWins.push(checkWins(playerX, winArray))
        playerOWins.push(checkWins(playerO, winArray))
    })
    if (playerXWins.includes(true)) winner = 'Player 🐙'
    else if (playerOWins.includes(true)) winner = 'Player 🪼'
}

const checkTie = () => {if (board.includes('') === false && !winner) tie = true}

// This displays based on if there's a winner or a tie
function result() {
    if (winner) message.textContent = `${winner} is the winner!`
    else if (tie) message.textContent = `It's a tie.`
}

function resetGame() {
    isXTurn = winner = tie = false
    playerX = []
    playerO = []
    for (let i = 0; i < board.length; i++) board[i] = ''
    square.forEach((sqr) => document.getElementById(`${sqr.id}`).textContent = '')
    message.textContent = 'Tap a square to start'
}

/*----------------------------- Event Listeners -----------------------------*/
square.forEach(sqr => sqr.addEventListener('click', handleClick))
reset.addEventListener('click', resetGame)



/* 
* Completed User Stories
As a user, I want to click on a square.
    - when i click on a square, it should show me X or O in that square
    - each square after alternates between O / X to keep turns

As a user, whoever gets 3-in-a-row should be the winner.
    - display the winner in the 'message' field
    - 'X' is the winner. 'O' is the winner.
    - If the game results in a tie,
    - display a message 

As a user, I should be able to reset the game when it finishes.
    - press a button
    - reset the board

* MVP Requirements
    - Display an empty tic-tac-toe board when the page is initially displayed.
    - A player can click on the nine cells to make a move.
    - Every click will alternate between marking an X and O.
    - Display whose turn it is (X or O).
    - The cell cannot be played again once occupied with an X or O.
    - Provide win logic and display a winning message.
    - Provide logic for a cat’s game (tie), also displaying a message.
    - Provide a Reset Game button that will clear the contents of the board.
*/