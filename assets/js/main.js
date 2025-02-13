const gridContainer = document.querySelector('.grid-container');
const gridChild = [...document.querySelectorAll('.box')];
const gameOverContainer = document.querySelector('.game-over-container');
const replayBtn = document.querySelector('.replay-btn');
const winnerMessage = document.querySelector('.winner-message');
let playerSelections = {
    1: [],
    2: []
};
const gridLength = 9;
const winningCombinationArray = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],    
]
let currentPlayer = 1;
let gameWon = false;

const createGrid = () => {    
    for (let index = 0; index < gridLength; index++) {
        const element = `<div class="box" id="${index}"></div`;
        gridContainer.insertAdjacentHTML("beforeend", element);
    }
};

gridContainer.addEventListener('click', (e) => {

    if(e) {
        e.stopPropagation();
    }
    
    if(!e.target.classList.contains('box')) {
        return;
    }

    const boxId = Number(e.target.id);
    const box = e.target;

    if(box.classList.contains('selected') || gameWon) {
        return;
    }

    if(currentPlayer === 1) {
        box.classList.add('zero', 'selected');
    } else {
        box.classList.add('cross', 'selected');
    }

    addIndexToPlayerArray(currentPlayer, boxId);
});

const addIndexToPlayerArray = (playerId, boxId) => {
    
    playerSelections[playerId].push(boxId);
    playerSelections[playerId].sort();   
        
    if(playerSelections[currentPlayer].length >= 3) {
        checkWinningCombination(playerId);
    } 
    
    if(!gameWon){
        checkDraw();
    }
    switchPlayer(playerId);
};

const checkWinningCombination = (playerId) => {
    winningCombinationArray.forEach( (arr) => {
        if( arr.every((num) => playerSelections[playerId].includes(num))) {
            gameWon = true;
            gameOverContainer.classList.add('end-game');
            winnerMessage.textContent = `Player ${playerId} wins, congrats!`;
        } 
    });
};

const checkDraw = () => {
    const totalSelections = playerSelections[1].length + playerSelections[2].length;
    
    if(totalSelections === gridLength && !gameWon) {
        gameWon = true;
        gameOverContainer.classList.add('end-game');
        winnerMessage.textContent = "It's a draw!";
    }
};

const switchPlayer = (playerId) => {
    currentPlayer = playerId === 1 ?  2 :  1;
};

const gameOver = () => {
    const gridBoxes = [...document.querySelectorAll('.box')];

    gridBoxes.forEach( (box) => {
        box.classList.remove('zero', 'cross','selected');
    });
    
    playerSelections = {
        1: [],
        2: []
    }

    currentPlayer = 1;
    gameWon = false;
}

createGrid();

replayBtn.addEventListener('click', () => {
    gameOverContainer.classList.remove('end-game');
    gameOver();
});
