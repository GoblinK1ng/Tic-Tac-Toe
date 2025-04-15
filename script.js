function createPlayer (name){
    const points = 0;

    const givePoint = () => points++;
    return {name, points, givePoint};
}


function game(){
    const playerOne = createPlayer("Jack");
    const playerTwo = createPlayer("Meghan");

    function gameBoard(){
        const gameBoard = Array(3).fill(Array(3).fill(0));
    
        console.table(gameBoard);
    }

    const playerChoice = prompt();
    gameBoard();

}



game();