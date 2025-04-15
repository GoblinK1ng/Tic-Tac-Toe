function createPlayer (name){
    let points = 0;

    const givePoint = () => points++;
    const Winner = () => {
        console.log(name + " is the Winner, gains one point");
        
    }
    return {name, givePoint, Winner};
}


function game(){
    const playerOne = createPlayer("Jack");
    const playerTwo = createPlayer("Meghan");

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
        
        gameBoard.displayBoard();
        

        const check = gameBoard.checkWinner();

        if (check === "X"){
            playerOne.Winner();
            playerOne.givePoint();
            gameLoop = false;
        }
        else if (check === "O"){
            playerTwo.Winner();
            playerTwo.givePoint();
            gameLoop = false;
        }
        
    }

}



function createGameboard(){
    const board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    const addSymbol = (symbol, positionX, positionY) => {

        board[positionX][positionY] = symbol;
        
    }

    function displayBoard(){
        console.table(board);
    }

    function checkWinner(){
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
    return {displayBoard, addSymbol,checkWinner};



}


game();