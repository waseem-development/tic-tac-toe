const cells = document.querySelectorAll(".cell")
const boardElement = document.getElementById("board")
const result = document.getElementById("result")
const message = document.getElementById("message")
const restart = document.getElementById("restart")

let currentPlayer = "X"
let board = ["", "", "", "", "", "", "", "", ""]
let active = true

const wins = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

cells.forEach((cell, i) => {
    cell.addEventListener("click", () => play(cell, i))
})

function play(cell, i) {
    if (!active || board[i]) return
    board[i] = currentPlayer
    cell.textContent = currentPlayer
    cell.style.boxShadow = "0 0 20px rgba(0,255,255,0.8)"
    check()
}

function check() {
    for (let combo of wins) {
        const [a, b, c] = combo
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            end(`Player ${currentPlayer} Wins`)
            return
        }
    }

    if (!board.includes("")) {
        end("It's a Draw")
        return
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X"
}

function end(text) {
    active = false
    boardElement.style.opacity = "0"
    boardElement.style.transform = "scale(0.8)"
    setTimeout(() => {
        boardElement.classList.add("hidden")
        message.textContent = text
        result.classList.remove("hidden")
    }, 400)
}

restart.addEventListener("click", () => {
    board = ["", "", "", "", "", "", "", "", ""]
    active = true
    currentPlayer = "X"
    cells.forEach(c => {
        c.textContent = ""
        c.style.boxShadow = "none"
    })
    result.classList.add("hidden")
    boardElement.classList.remove("hidden")
    boardElement.style.opacity = "1"
    boardElement.style.transform = "scale(1)"
})
