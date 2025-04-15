function createPlayer (name){
    const points = 0;

    const givePoint = () => points++;
    return {name, points, givePoint};
}


function game(){
    const playerOne = createPlayer("Jack");
    const playerTwo = createPlayer("Meghan");

    const gameBoard = createGameboard();
 
    const playerChoice = [prompt("X"), prompt("Y")];

    gameBoard.addSymbol("X", playerChoice[0], playerChoice[1]);
    
    console.table(gameBoard.gameBoard);

}

function createGameboard(){
    const gameBoard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    const addSymbol = (symbol, positionX, positionY) => {
        console.log(positionX, positionY);
        gameBoard[0][0] = symbol;
        
    }
    return {gameBoard, addSymbol};



}


game();