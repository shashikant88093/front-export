const h3 = document.getElementsByTagName('h3')
const board = document.querySelectorAll('.board')
let currentplayer = 1
const BOARD_WIDTH = 3

// function boardEvent() {
//     // h3[0].textContent =  "Player 2's Turn"
//     // console.log(board)
//     board.forEach((ele, index) => {

//         let row = Math.floor(index / BOARD_WIDTH)
//         let col = index / BOARD_WIDTH
//         console.log(row, col)
//         makeMove(ele, row, col)


//     })
// }


function makeMove(ele, row, col) {
    ele.textContent = currentplayer === 1 ? "X" : "O"
    ele.disabled = true

    currentplayer = currentplayer === 1 ? 2 : 1
    setCurrentPlayer()
}

function setCurrentPlayer() {
    h3.textContent = `Playes ${currentplayer}'s Turn`

}

board.forEach((element,index) => {
    element.addEventListener("click", ()=>{
        let row = Math.floor(index / BOARD_WIDTH)
        let col = index / BOARD_WIDTH
        console.log(row, col)
        makeMove(element, row, col)
    })
})