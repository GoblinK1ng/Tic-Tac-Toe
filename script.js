const gameboardContainer = document.querySelector(".gameBoard");
const gameboardContainerBig = document.querySelector(".gameboard-container");
const startButton = document.querySelector(".start");
const resetBoard = document.querySelector(".resetBoard");
const resetPoints = document.querySelector(".resetPoints");

startButton.addEventListener("click", () =>{
    game.resetGamePlayers();
    gameBoard.clearBoard();
    gameBoard.displayBoard();
})

resetBoard.addEventListener("click", () =>{
    gameBoard.clearBoard();
    gameBoard.displayBoard();
})

resetPoints.addEventListener("click", () =>{
    game.resetPoints();
})

function createPlayer (name){
    let points = 0;
    

    const givePoint = () => points++;
    const resetPoints = () => points = 0;
    const getPoints = () => points;
    const getName = () => name;
    const changeName = (newName) => name = newName;
    const Winner = () => {
        console.log(name + " is the Winner, gains one point");
        
    }
    return {changeName, getName, givePoint, Winner, getPoints, resetPoints};
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
            let winner = gameBoard.checkWinner(positionX,positionY)
            if (winner !== null){
                
                game.displayWinner(winner);
                
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
        const child = document.getElementById("blocker");
        gameboardContainerBig.removeChild(child);
    }

    function checkTurns(){
        return turns;
    }

    function checkWinner(posX, posY){
        /*for (let i = 0; i < 3; i++){
            if ((board[i][0] === board[i][1]) || 
            (board[i][0] === board[i][2])) return board[posX][posY];
        }
        for (let i = 0; i < 3; i++){
            if ((board[0][i] === board[1][i]) || 
            (board[0][i] === board[2][i])) return board[posX][posY];
        }*/




        if (posX === 0){
            console.log(posX);
            if ((board[posX][posY] === board[posX+1][posY]) || 
            (board[posX][posY] === board[posX+2][posY])) return board[posX][posY];
            
        }
        else if (posX === 1){
            if ((board[posX][posY] === board[posX+1][posY]) && 
            (board[posX][posY] === board[posX-1][posY])) return board[posX][posY];

        }
        else if (posX === 2){
            
            if ((board[posX][posY] === board[posX-1][posY]) && 
            (board[posX][posY] === board[posX-2][posY])) return board[posX][posY];
        }

        if (posY === 0){
            if ((board[posX][posY] === board[posX][posY+1]) && 
            (board[posX][posY] === board[posX][posY+2])) return board[posX][posY];
        }
        else if (posY === 1){
            if ((board[posX][posY] === board[posX][posY-1]) && 
            (board[posX][posY] === board[posX][posY+1])) return board[posX][posY];
        }
        else if (posY === 2){
            if ((board[posX][posY] === board[posX][posY-1]) && 
            (board[posX][posY] === board[posX][posY-2])) return board[posX][posY];
        }

        if (board[0][0] === board[1][1] && board[0][0] === board[2][2] ||
            board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
                if (board[1][1] !== "") return board[posX][posY];
            }
        return null;
        

        /*if (board[1][0] === board[1][1] && board[1][0] === board[1][2] ||
            board[0][1] === board[1][1] && board[0][1] === board[2][1]){
                if (board[1][1] !== "") return board[1][1];
                
        }
    
        if (board[0][0] === board[0][1] && board[0][0] === board[0][2] ||
            board[0][0] === board[1][0] && board[0][0] === board[2][0] ||
            board[0][0] === board[1][1] && board[0][0] === board[2][2]){
                
                if (board[0][0] !== "") return board[0][0];
        }
    
        if (board[0][2] === board[1][2] && board[0][2] === board[2][2] ||
            board[0][2] === board[1][1] && board[0][2] === board[2][0]){
                
                if (board[0][2] !== "") return board[0][2];
        }
        if (board[2][0] === board[2][1] && board[2][0] === board[2][2]){
                
            if (board[2][0] !== "") return board[2][0];
        }*/
    }
    return {displayBoard, addSymbol,checkWinner, clearBoard, checkTurns};



})();

const game = (function(){
    const playerOne = createPlayer("Player One");
    const playerTwo = createPlayer("Player Two");
    
    function resetGamePlayers(){
        playerOne.changeName(prompt("What is Player One's Name"));
        playerTwo.changeName(prompt("What is Player Two's Name"));
        resetPoints();
    }   

    function resetPoints(){
        playerOne.resetPoints();
        playerTwo.resetPoints();
    }
    
    

    function displayWinner(check){
        
        if ((check === "X") || (check === "O") || (gameBoard.checkTurns() >= 9)){
            const blocker = document.createElement("div");
            blocker.id = "blocker";
            gameboardContainerBig.appendChild(blocker);
    
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
            
            
            console.log(playerOne.getName() + " has "+playerOne.getPoints() + " Points");
            console.log(playerTwo.getName() + " has "+playerTwo.getPoints() + " Points");
            
    
        }
    }
    return{displayWinner, resetGamePlayers, resetPoints};

})();