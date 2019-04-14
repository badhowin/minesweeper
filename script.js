bombsCells = [];
gameField = [];

colors = [
			"blue",
			"green",
			"red",
			"purple",
			"maroon",
			"#34b7aa",
			"black",
			"gray",		
			];



for (var i = 0; i < 480; i++) {
	gameField[i] = 0;
}

window.onload = function() {

	cells = document.getElementsByTagName("td");
		
	for (var i = 0; i < cells.length; i++) {
		   	cells[i].addEventListener("click", function (event){
				event.preventDefault();				
				event.currentTarget.style.border = "1px solid #000";

				makeMove(event);
				
		});
		   	cells[i].position = i;
	}

	setBombs(cells);
	setNumbers();
}

function makeMove(event){

	
	var selectedPosition = event.currentTarget.position;
	var offsets;
	var currentCell;
	var nextCell = [];

	event.currentTarget.style.border = "1px solid #000";

	nextCell.push(selectedPosition);

	tmpArray = [];
	for (var i = 0; i < gameField.length; i++)
	{
		tmpArray.push(gameField[i]);
	}


	do {
		for (var i = 0; i < nextCell.length; i++) {
			currentCell = nextCell.splice(i, 1);
			tmpArray[currentCell] = "o";
			offsets = getOffsets(currentCell);
			if (+gameField[currentCell] == 0) {
				for (var j = 0; j < offsets.length; j++) {
					var tmp = Number(tmpArray[+currentCell + +offsets[j]]);
					if ((+offsets[j] != 0) && (tmp >= 0)) nextCell.push(+currentCell + +offsets[j]);
				}
			}
		}


	}while (nextCell.length > 0);
	markOpened(tmpArray);	
}



function markOpened(array) {
	cells = document.getElementsByTagName("td");
	for (var i=0; i<array.length; i++){
		if (array[i] == "o"){
			cells[i].style.border = "1px solid #000";
			if (gameField[i].toFixed && (gameField[i] > 0)) {
				cells[i].innerHTML = gameField[i];
				cells[i].style.color = colors[gameField[i] - 1];
			}
			if (gameField[i] == "b") {
			 	cells[i].innerHTML = "&#216;";
			}
		}

	}
}

function setBombs (cells){

	tmpArray = [];
	for (var i = 0; i < cells.length; i++)
	{
		tmpArray.push(i);
	}

	for (var i = 0; i < 100; i++)
	{
		var boomCell = Math.floor(Math.random() * tmpArray.length);
		gameField[tmpArray[boomCell]] = "b";
		bombsCells.push(tmpArray.splice(boomCell, 1));
	}

}

function setNumbers(){


	for (var i = 0; i < bombsCells.length; i++){

		offsets = getOffsets(bombsCells[i]);

		for (var j = 0; j < offsets.length; j++) {
			curCell = Number(bombsCells[i]) + Number(offsets[j]);
			
			if (offsets[j] != 0 && gameField[curCell].toFixed) {
				
				
				gameField[curCell]++;
			}
		}

	}
}

function getOffsets(cell)
{
	bombNumberOffsets = [-31, -30, -29, -1, +1, +29, +30, +31];

	if (((Number(cell) +1) % 30) == 0) {
		bombNumberOffsets[2] = 0;
		bombNumberOffsets[4] = 0;
		bombNumberOffsets[7] = 0;
	}

	if (((Number(cell) +31) % 30)	== 1) {
		bombNumberOffsets[0] = 0;
		bombNumberOffsets[3] = 0;
		bombNumberOffsets[5] = 0;
	}

	if (cell < 30) {
		bombNumberOffsets[0] = 0;
		bombNumberOffsets[1] = 0;
		bombNumberOffsets[2] = 0;
	}

	if (cell > 449) {
		bombNumberOffsets[7] = 0;
		bombNumberOffsets[6] = 0;
		bombNumberOffsets[5] = 0;
	}

	return bombNumberOffsets;
}


function writeNumbers(cells)
{
	
	for (var i = 0; i < cells.length;i++){
		if (gameField[i].toFixed && gameField[i] > 0) cells[i].innerHTML = gameField[i];
	}

}