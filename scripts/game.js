"use strict";

var gameSquareArray = Array.from(document.getElementsByClassName("gameSquare"));
var turnDisplay = document.getElementById("turnDisplay");
var resetButton = document.getElementById("restart");
var instructionDisplay = document.getElementById("instructions");
var againstAIButton = document.getElementById("vsAI");
var twoPlayerButton = document.getElementById("twoPlayer");
var gameBoard = document.getElementById("board");
var turn = "x";
var twoPlayerMode = false;

resetButton.addEventListener("click", resetGame);

againstAIButton.addEventListener("click", function(){
	twoPlayerMode = false;
	initGame();
});

twoPlayerButton.addEventListener("click", function(){
	twoPlayerMode = true;
	initGame();
});

gameSquareArray.forEach(function(item){
	item.addEventListener("click", handleButtonClick);
});

/*
handleButtonClick() takes the correct action when the user clicks a square, including
doing nothing if the square is already set, setting the square's text to the right value, checking
for win conditions and processing the AI's turn in one player mode. Return type void.
*/
function handleButtonClick(){
	
	if(this.touched || checkGameOverConditions() != ""){
		return;
	}
	
	//handle setting button to right value on click
	if(turn === "x"){
		this.innerHTML = "X";
		this.touched = true;
		turnDisplay.innerHTML = twoPlayerMode ? "O's turn" : "X's turn";
		turn = "o";
	}else{
		this.innerHTML = "O";
		this.touched = true;
		turnDisplay.innerHTML = "X's turn";
		turn = "x";
	}
	/*if game not over and not 2 player mode, 
		keep the player's turn on "x" and handle AI's turn*/
	if(!twoPlayerMode && checkGameOverConditions() == ""){
		turn = "x";
		processAITurn();
	}

	//check if game is over
	if(checkGameOverConditions() !== ""){
		resetButton.classList.remove("hide");
		instructionDisplay.innerHTML = "Click the button below to reset";
		if(checkGameOverConditions() === "x"){
			turnDisplay.innerHTML = "GAME OVER - X WINS!";
			markWinnerTextRed("x");
		}else if(checkGameOverConditions() === "o"){
			turnDisplay.innerHTML = "GAME OVER - O WINS!";
			markWinnerTextRed("o");
		}else if(checkGameOverConditions() === "tie"){
			turnDisplay.innerHTML = "GAME OVER - IT'S A TIE!";
			markWinnerTextRed("tie");
		}
	}	
}

/*
checkGameOverConditions() checks the board and returns "x" if X won, "o" if O won, 
"tie" if all squares are filled but no one won, or an empty string if the game isn't over yet.
*/
function checkGameOverConditions(){
	var b0h = gameSquareArray[0].innerHTML.toLowerCase();
	var b1h = gameSquareArray[1].innerHTML.toLowerCase();
	var b2h = gameSquareArray[2].innerHTML.toLowerCase();
	var b3h = gameSquareArray[3].innerHTML.toLowerCase();
	var b4h = gameSquareArray[4].innerHTML.toLowerCase();
	var b5h = gameSquareArray[5].innerHTML.toLowerCase();
	var b6h = gameSquareArray[6].innerHTML.toLowerCase();
	var b7h = gameSquareArray[7].innerHTML.toLowerCase();
	var b8h = gameSquareArray[8].innerHTML.toLowerCase();
	
	if(b0h === "x" && b1h === "x" && b2h === "x"){
		gameSquareArray[0].winning = true;
		gameSquareArray[1].winning = true;
		gameSquareArray[2].winning = true;
		return "x";
	}else if(b3h === "x" && b4h === "x" && b5h === "x"){
		gameSquareArray[3].winning = true;
		gameSquareArray[4].winning = true;
		gameSquareArray[5].winning = true;
		return "x";
	}else if(b6h === "x" && b7h === "x" && b8h === "x"){
		gameSquareArray[6].winning = true;
		gameSquareArray[7].winning = true;
		gameSquareArray[8].winning = true;
		return "x";
	}else if(b0h === "x" && b3h === "x" && b6h === "x"){
		gameSquareArray[0].winning = true;
		gameSquareArray[3].winning = true;
		gameSquareArray[6].winning = true;
		return "x";
	}else if(b1h === "x" && b4h === "x" && b7h === "x"){
		gameSquareArray[1].winning = true;
		gameSquareArray[4].winning = true;
		gameSquareArray[7].winning = true;
		return "x";
	}else if(b2h === "x" && b5h === "x" && b8h === "x"){
		gameSquareArray[2].winning = true;
		gameSquareArray[5].winning = true;
		gameSquareArray[8].winning = true;
		return "x";
	}else if(b0h === "x" && b4h === "x" && b8h === "x"){
		gameSquareArray[0].winning = true;
		gameSquareArray[4].winning = true;
		gameSquareArray[8].winning = true;
		return "x";
	}else if(b2h === "x" && b4h === "x" && b6h === "x"){
		gameSquareArray[2].winning = true;
		gameSquareArray[4].winning = true;
		gameSquareArray[6].winning = true;
		return "x";
	}
	
	if(b0h === "o" && b1h === "o" && b2h === "o"){
		gameSquareArray[0].winning = true;
		gameSquareArray[1].winning = true;
		gameSquareArray[2].winning = true;
		return "o";
	}else if(b3h === "o" && b4h === "o" && b5h === "o"){
		gameSquareArray[3].winning = true;
		gameSquareArray[4].winning = true;
		gameSquareArray[5].winning = true;
		return "o";
	}else if(b6h === "o" && b7h === "o" && b8h === "o"){
		gameSquareArray[6].winning = true;
		gameSquareArray[7].winning = true;
		gameSquareArray[8].winning = true;
		return "o";
	}else if(b0h === "o" && b3h === "o" && b6h === "o"){
		gameSquareArray[0].winning = true;
		gameSquareArray[3].winning = true;
		gameSquareArray[6].winning = true;
		return "o";
	}else if(b1h === "o" && b4h === "o" && b7h === "o"){
		gameSquareArray[1].winning = true;
		gameSquareArray[4].winning = true;
		gameSquareArray[7].winning = true;
		return "o";
	}else if(b2h === "o" && b5h === "o" && b8h === "o"){
		gameSquareArray[2].winning = true;
		gameSquareArray[5].winning = true;
		gameSquareArray[8].winning = true;
		return "o";
	}else if(b0h === "o" && b4h === "o" && b8h === "o"){
		gameSquareArray[0].winning = true;
		gameSquareArray[4].winning = true;
		gameSquareArray[8].winning = true;
		return "o";
	}else if(b2h === "o" && b4h === "o" && b6h === "o"){
		gameSquareArray[2].winning = true;
		gameSquareArray[4].winning = true;
		gameSquareArray[6].winning = true;
		return "o";
	}


	if(allSquaresFull()){
		return "tie";
	}else{
		return "";
	}
}

/*
allSquaresFull() checks if all the squares of the game are full, returns true if they are,
false if not.
*/
function allSquaresFull(){
	return gameSquareArray.every(function(item){
		return item.touched;
	});
}

/*
resetGame() resets the game by clearing all game squares, 
then hiding the reset button and other elements. Return type void.
*/
function resetGame(){
	//change all squares back to black text
	gameSquareArray.forEach(function(item){
		item.innerHTML = "";
		item.touched = false;
		item.style.color = "black";
		item.winning = false;
	});
	resetButton.classList.add("hide"); 
	instructionDisplay.classList.add("hide");
	turnDisplay.classList.add("hide");
	gameBoard.classList.add("hide");
	twoPlayerButton.classList.remove("hide");
	againstAIButton.classList.remove("hide");
}

/*
initGame() initializes the game by setting turn equal to "x" and displaying 
the game board and other elements while hiding the game mode buttons. Return type void.
*/
function initGame(){
	turn = "x";
	instructionDisplay.innerHTML = "Click a square to mark it";
	turnDisplay.innerHTML = "X's turn";
	twoPlayerButton.classList.add("hide");
	againstAIButton.classList.add("hide");
	instructionDisplay.classList.remove("hide");
	gameBoard.classList.remove("hide");
	turnDisplay.classList.remove("hide");
}

/*
markWinnerTextRed() changes the color of the winner's text to red for the user to more easily
see the victory. Return type void.
*/
function markWinnerTextRed(winner){
	gameSquareArray.forEach(function(item){
		if(item.innerHTML.toLowerCase() === winner && item.winning){
			item.style.color = "red";
		}else if(winner.toLowerCase() === "tie"){
			item.style.color = "gray";
		}
	});
}

/*
processAITurn() sets a random empty square to an "O" for the AI's turn. Return type void.
*/	
function processAITurn(){
	var emptySquares = [];
	var square;
	gameSquareArray.forEach(function(item){
		if(!item.touched){
			emptySquares.push(item);
		}
	});
	
	square = emptySquares[Math.floor(Math.random() * emptySquares.length)];
	square.innerHTML = "O";
	square.touched = true;
}