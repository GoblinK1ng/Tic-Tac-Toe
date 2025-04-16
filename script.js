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
        
        
        if (board[positionX][positionY] === "") {
            board[positionX][positionY] = symbols[0];
            let temp = symbols[0];
            symbols[0] = symbols[1];
            symbols[1] = temp;

            turns++;

            gameBoard.displayBoard();
            if (gameBoard.checkWinner() !== ""){
                game.displayWinner();
            }
        }
        else console.log("Already something there, choose another");
    }

    function displayBoard(){
        console.table(board);
        gameboardContainer.innerHTML = '';
        let count = 0;

        for (let x = 0; x < board.length; x++){
            for (let y = 0; y < board[x].length; y++){

                const square = document.createElement("div");
                square.classList = "square";
                square.id = count;

                count++;

                square.textContent = board[x][y];
                square.addEventListener("click", () => {
                    
                    gameBoard.addSymbol(Math.floor(square.id / 3) , Math.ceil(square.id%3));
                })

                gameboardContainer.appendChild(square);
            }
        }
    }

    function clearBoard(){
        board = [["", "", ""], ["", "", ""], ["", "", ""]];
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

const game = (function(){
    const playerOne = createPlayer("Jack");
    const playerTwo = createPlayer("Meghan");
    
    function displayWinner(){
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
    return{displayWinner};

})();

gameBoard.displayBoard();