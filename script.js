const gameboardContainer = document.querySelector(".gameBoard");

function createPlayer (name){
    let points = 0;
    

    const givePoint = () => points++;
    const getPoints = () => points;
    const getName = () => name;
    const Winner = () => {
        console.log(name + " is the Winner, gains one point");
        
    }
    return {getName, givePoint, Winner, getPoints};
}




const gameBoard = (function (){
    let symbols = ["X", "O"];
    let turns = 0;
    
    let board = [["", "", ""], ["", "", ""], ["", "", ""]];
    const addSymbol = (positionX, positionY) => {
        console.log(positionX);
        if (board[positionX][positionY] === 0) {
            board[positionX][positionY] = symbols[0];
            let temp = symbols[0];
            symbols[0] = symbols[1];
            symbols[1] = temp;

            turns++;
        }
        else console.log("Already something there, choose another");
    }

    function displayBoard(){
        console.table(board);
        for (let x = 0; x < board.length; x++){
            for (let y = 0; y < board[x].length; y++){
                const square = document.createElement("div");
                square.classList = "square";
                square.textContent = board[x][y];

                gameboardContainer.appendChild(square);
            }
        }
    }

    function clearBoard(){
        board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        turns = 0;
        symbols = ["X", "O"];
    }

    function checkTurns(){
        return turns;
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
    return {displayBoard, addSymbol,checkWinner, clearBoard, checkTurns};



})();

function game(){
    const playerOne = createPlayer("Jack");
    const playerTwo = createPlayer("Meghan");
    
    let gameLoop = true;
    while (gameLoop){

        let validChoice = false;
        let playerChoice = [prompt("X Coordinate"), prompt("Y Coordinate")];
        while (!validChoice){
            
            
            if ((playerChoice[0] < 3 && playerChoice[0] >= 0) && 
            (playerChoice[1] < 3 && playerChoice[1] >= 0)) {
                validChoice = true;
            }
            

            else {console.log("Error, not valid inputs");
                playerChoice = [prompt("X Coordinate"), prompt("Y Coordinate")];
            }
        }
        
        gameBoard.addSymbol(playerChoice[0], playerChoice[1]);
        
        gameBoard.displayBoard();
        

        const check = gameBoard.checkWinner();

        if ((check === "X") || (check === "O") || (gameBoard.checkTurns() >= 9)){
            gameBoard.clearBoard();
            gameBoard.displayBoard();

    
            if (check === "X") {
                playerOne.Winner();
                playerOne.givePoint();
            }
            else if (check === "O"){
                playerTwo.Winner();
                playerTwo.givePoint();
            }
    
            else if (gameBoard.checkTurns() >= 9){
                console.log("Tie, no points");
            } 
            
            
            gameLoop = confirm("Want to play again?")
            console.log(playerOne.getName() + " has "+playerOne.getPoints() + " Points");
            console.log(playerTwo.getName() + " has "+playerTwo.getPoints() + " Points");
            

        }
    
        
    }
    
    

}


//game();

gameBoard.displayBoard();