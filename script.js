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
    let lastSymbol = "O";
    while (gameLoop){

        const playerChoice = [prompt("X"), prompt("Y")];

        if (lastSymbol === "O"){
            lastSymbol = "X";
            gameBoard.addSymbol("X", playerChoice[0], playerChoice[1]);
            
        }
        else {
            lastSymbol = "O";
            gameBoard.addSymbol("O", playerChoice[0], playerChoice[1]);
        }
        
        console.table(gameBoard.board);
        
        let countX = 0;
        let countO = 0;

        const check = checkWinner(gameBoard.board);
        if (check === "X"){
            playerOne.givePoint();
            gameLoop = false;
            console.log(playerOne.name);
        }
        else if (check === "O"){
            playerTwo.givePoint();
            gameLoop = false;
            console.log(playerOne.name);
        }
        
    }

}

function checkWinner(board){
    if (board[1][0] === board[1][1] && board[1][0] === board[1][2] ||
        board[0][1] === board[1][1] && board[0][1] === board[2][1]){
        return board[1][1];
    }

    else if (board[0][0] === board[0][1] && board[0][0] === board[0][2] ||
        board[0][0] === board[1][0] && board[0][0] === board[2][0] ||
        board[0][0] === board[1][1] && board[0][0] === board[2][2]){
        return board[0][0];
    }

    else if (board[0][2] === board[1][2] && board[0][2] === board[2][2] ||
        board[0][2] === board[1][1] && board[0][2] === board[2][0]){
        return board[0][2];
    }
    else if (board[2][0] === board[2][1] && board[2][0] === board[2][2]){
        return board[2][0];
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