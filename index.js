const boxes = document.querySelectorAll(".box");
const gameinfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentplayer;
let gameGrid;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


function initGame() {
    currentplayer = "x";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";

        box.classList = `box box${index + 1}`;
    });
    newGameBtn.classList.remove("active");
    gameinfo.innerText = `Current Player-${currentplayer}`;


}

initGame();

function swapTurn() {
    if (currentplayer === "x") {
        currentplayer = "0";
    }
    else {
        currentplayer = "x";
    }

    gameinfo.innerText = `current player-${currentplayer}`;
}
function checkGameOver() {
    let answer = "";

    winningPositions.forEach((position) => {
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
        && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {
            if (gameGrid[position[0]] === "x") {
                answer = "x";
            }
            else {
                answer = "0";
            }
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    if (answer !== "") {
        gameinfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    let fillcount = 0;
    gameGrid.forEach((box) => {
        if (box !== "") {
            fillcount++;
        }
    });

    if (fillcount === 9) {
        gameinfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }




}



function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentplayer;
        gameGrid[index] = currentplayer;
        boxes[index].style.pointerEvents = "none";
        swapTurn();

        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);