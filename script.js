function createPlayer (name){
    return {name};
}

const playerOne = createPlayer("Jack");
console.log(playerOne.name);

function game(){
    const playerOne = createPlayer("Jack");
    const playerTwo = createPlayer("Meghan");

    gameBoard();
}

function gameBoard(){
    const gameBoard = Array(3).fill(Array(3).fill(0));

    console.table(gameBoard);
}

game();