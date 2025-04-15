function createPlayer (name){
    let points = 0;

    const givePoint = () => points++;
    return {name, givePoint};
}


function game(){
    const playerOne = createPlayer("Jack");
    const playerTwo = createPlayer("Meghan");

    playerOne.givePoint();

    const gameBoard = createGameboard();

    let gameLoop = true;
    while (gameLoop){
        const playerChoice = [prompt("X"), prompt("Y")];

        gameBoard.addSymbol("X", playerChoice[0], playerChoice[1]);
        
        console.table(gameBoard.board);
        
        let countX = 0;
        let countO = 0;
        for (let x in gameBoard.board){
            for (let i in gameBoard.board[x]){
                if (gameBoard.board[x][i] === "X"){
                    countX++;
                    console.log(countX);
                }
                else if (gameBoard.board[x][i] === "O"){
                    countO++;
                    console.log(countO);
                }
                
                if (countX === 3){
                    gameLoop = false;
                }
            }
            countX = 0;
            countO = 0;
        }
    }

}

function createGameboard(){
    const board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    const addSymbol = (symbol, positionX, positionY) => {
        console.log(positionX, positionY);
        board[positionX][positionY] = symbol;
        
    }
    return {board, addSymbol};



}


game();