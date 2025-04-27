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

let isXTurn = false
let turn, squareIdx

let board = [
    '', '', '',
    '', '', '',
    '', '', ''
]

let playerX = []
let playerO = []

let winner = false
let tie = false

/*------------------------ Cached Element References ------------------------*/

const message = document.querySelector('#message')
const square = document.querySelectorAll('.sqr')
const reset = document.querySelector('#reset')

/*-------------------------------- Functions --------------------------------*/

function handleClick(event) {
    squareIdx = event.target.id

    if (winner || tie) return
    if (board[squareIdx] !== '') return

    markPiece()
    checkWinner()
    checkTie()
    resultMessage()
}

function markPiece() {
    const displaySquare = document.getElementById(`${squareIdx}`)
    isXTurn = !isXTurn
    // checks if X or O turn
    if (isXTurn) {
        board[squareIdx] = 'X'
        playerX.push(Number(squareIdx))
        displaySquare.textContent = '❌'
        message.textContent = `Your turn, Player ⭕.`
    } else {
        board[squareIdx] = 'O'
        playerO.push(Number(squareIdx))
        displaySquare.textContent = '⭕'
        message.textContent = 'Your turn, Player ❌.'
    }
}

const checkWins = (arr, targetArr) => targetArr.every(v => arr.includes(v))

function checkWinner() {
    let playerXWins = []
    let playerOWins = []

    winConditions.forEach(winArray => {
        const didPlayerXWin = checkWins(playerX, winArray)
        playerXWins.push(didPlayerXWin)
        const didPlayerOWin = checkWins(playerO, winArray)
        playerOWins.push(didPlayerOWin)
    })

    if (playerXWins.includes(true)) winner = 'Player ❌'
    else if (playerOWins.includes(true)) winner = 'Player ⭕'
}

function checkTie() {
    if (board.includes('') === false && !winner) tie = true
}

function resultMessage() {
    if (winner) message.textContent = `${winner} is the winner!`
    else if (tie) message.textContent = `It's a tie.`
}

function resetGame() {
    message.textContent = ''
    isXTurn = false
    winner = false
    tie = false
    playerX = []
    playerO = []

    for (let i = 0; i < board.length; i++) {
        board[i] = ''
    }
    square.forEach((sqr) => {
        const displaySquare = document.getElementById(`${sqr.id}`)
        displaySquare.textContent = ''
    })
}

/*----------------------------- Event Listeners -----------------------------*/

square.forEach(sqr => {
    sqr.addEventListener('click', handleClick)
})

reset.addEventListener('click', resetGame)


// // As a user, I want to click on a square.
// //     - when i click on a square, it should show me X or O in that square
// //     - if i am the first person to click a square, it is X
// //     - each square after alternates between O / X to keep turns

// // As a user, whoever gets 3-in-a-row should be the winner.
// //    - display the winner in the 'message' field
// //   - 'X' is the winner. 'O' is the winner.
// // - Reset game/Play again to clear the board

// // If the game results in a tie,
// //    - display a message 
// //   - reset the game

/*
// -Display an empty tic-tac-toe board when the page is initially displayed.
// -A player can click on the nine cells to make a move.
// -Every click will alternate between markPieceing an X and O.
// Display whose turn it is (X or O).
// The cell cannot be played again once occupied with an X or O.
// Provide win logic and display a winning message.
// Provide logic for a cat’s game (tie), also displaying a message.
// Provide a Reset Game button that will clear the contents of the board.
*/