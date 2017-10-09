"use strict";

var buttonArray = Array.from(document.getElementsByTagName("button"));
var turnDisplay = document.getElementById("turnDisplay");
var turn = "x";

buttonArray.forEach(function(item){
	item.addEventListener("click", handleButtonClick);
});

function handleButtonClick(){
	
	if(this.touched || checkGameOverConditions() != ""){
		return;
	}
	
	if(turn === "x"){
		this.innerHTML = "X";
		this.touched = true;
		turnDisplay.innerHTML = "O's turn";
		turn = "o";
	}else{
		this.innerHTML = "O";
		this.touched = true;
		turnDisplay.innerHTML = "X's turn";
		turn = "x";
	}
	
	if(checkGameOverConditions() === "x"){
		turnDisplay.innerHTML = "GAME OVER - X WINS!";
	}else if(checkGameOverConditions() === "o"){
		turnDisplay.innerHTML = "GAME OVER - O WINS!";
	}else if(checkGameOverConditions() === "tie"){
		turnDisplay.innerHTML = "GAME OVER - IT'S A TIE!";
	}

}

/*
checkGameOverConditions() checks the board and returns "x" if X won, "o" if O won, 
"tie" if all squares are filled but no one won, or an empty string if the game isn't over yet.
*/
function checkGameOverConditions(){
	var b0h = buttonArray[0].innerHTML.toLowerCase();
	var b1h = buttonArray[1].innerHTML.toLowerCase();
	var b2h = buttonArray[2].innerHTML.toLowerCase();
	var b3h = buttonArray[3].innerHTML.toLowerCase();
	var b4h = buttonArray[4].innerHTML.toLowerCase();
	var b5h = buttonArray[5].innerHTML.toLowerCase();
	var b6h = buttonArray[6].innerHTML.toLowerCase();
	var b7h = buttonArray[7].innerHTML.toLowerCase();
	var b8h = buttonArray[8].innerHTML.toLowerCase();
	
	if((b0h === "x" && b1h === "x" && b2h === "x") || 
		 (b3h === "x" && b4h === "x" && b5h === "x") ||
		 (b6h === "x" && b7h === "x" && b8h === "x") ||
		 (b0h === "x" && b3h === "x" && b6h === "x") ||
		 (b1h === "x" && b4h === "x" && b7h === "x") ||
		 (b2h === "x" && b5h === "x" && b8h === "x") ||
		 (b0h === "x" && b4h === "x" && b8h === "x") ||
		 (b2h === "x" && b4h === "x" && b6h === "x")){
		return "x";
	}else if((b0h === "o" && b1h === "o" && b2h === "o") || 
		 (b3h === "o" && b4h === "o" && b5h === "o") ||
		 (b6h === "o" && b7h === "o" && b8h === "o") ||
		 (b0h === "o" && b3h === "o" && b6h === "o") ||
		 (b1h === "o" && b4h === "o" && b7h === "o") ||
		 (b2h === "o" && b5h === "o" && b8h === "o") ||
		 (b0h === "o" && b4h === "o" && b8h === "o") ||
		 (b2h === "o" && b4h === "o" && b6h === "o")){
			return "o";
	}else if(allSquaresFull()){
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
	return buttonArray.every(function(item){
		return item.touched;
	});
}