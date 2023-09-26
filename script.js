const cells = document.querySelectorAll(".cell");  // Selecting Cell Class
const statusText = document.querySelector("#statusText"); // Status Text
const restartBtn = document.querySelector("#restartBtn");   // Restart Button

// Win Conditions
const winConditions = [
    // Rows:
    [0, 1, 2],  // First Row
    [3, 4, 5],  // Second Row
    [6, 7, 8],  // Third Row
    // Columns:
    [0, 3, 6],  // First Column
    [1, 4, 7],  // Second Column
    [2, 5, 8],  // Third Column
    // Diagonally:
    [0, 4, 8],  // Upper Left to Bottom Right
    [2, 4, 6],  // Upper Right to Bottom Left
];

let options = ["", "", "", "", "", "", "", "", ""]; // Placeholder of the 3x3 Grid
let currentPlayer = "X"; // Keeps track of the current play
let running = false;    // Variable that keeps track of the Game Status


initializeGame();


function initializeGame(){
    // For every cell with a Click Event Listerner, if clicked, then the callback function is cellClicked.
    cells.forEach(cell => cell.addEventListener("click", cellClicked))
    restartBtn.addEventListener("click", restartGame); // On click, invoke restartGame()
    statusText.textContent = `😳 ${currentPlayer}'s turn 😳`;   // Displays the current player
    running = true;
}
function cellClicked(){
    // "this" refers to whichever cell is clicked on
    const cellIndex = this.getAttribute("cellIndex") // getAttribute of cellIndex

    if(options[cellIndex] != "" || !running){  // Only update the cell if empty or if the game is running
        return;
    }

    updateCell(this, cellIndex);    // Passed in the cell and index.
    checkWinner();
    // changePlayer();
}
function updateCell(cell, index){
    options[index] = currentPlayer; // Updating cell based on currentPlayer ("X" or "O")
    cell.textContent = currentPlayer;
}
function changePlayer(){
    // Reassign Current Player (X, O)
    currentPlayer = (currentPlayer == "X") ? "O" : "X";   // Ternary Operator
    statusText.textContent = `🥱 ${currentPlayer}'s turn 🥱`; 
}
function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];    // Storing the game input (options) from the user 
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){  // If empty space, then continue
            continue;
        }
        if (cellA == cellB && cellB == cellC){  // All three cells are the same
            roundWon = true;
            break;
        }
    }

    // If round is won
    if(roundWon){
        statusText.textContent = `🥺 ${currentPlayer} Wins! 💀`;
        restartBtn.textContent = "Play Again?";
        running = false;
    }
    // No more spaces left, then a draw.
    else if(!options.includes("")){
        statusText.textContent = "🤓 Draw! 🤓";
        running = false;
    }
    // Changes the player
    else{
        changePlayer();
    }

}
function restartGame(){
    currentPlayer = "X";

    // Resets cell and options to empty spaces
    cells.forEach(cell => cell.textContent = "");
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `🤡 ${currentPlayer}'s turn 🤡`;
    running = true;
}