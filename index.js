// set grid rows and columns and the size of each square
var rows = 10;
var cols = 10;
var squareSize = 50;
var hitCount = 0;


/* Ship constructor.
create subclass for each type of ship.
this may become useful when we want to create different image
and interaction for different ships later on.

*/
class ship {
	constructor(isHorizontal, iCorr, jCorr){
	this.isHorizontal = isHorizontal;
	this.i = iCorr;
	this.j = jCorr;
	}

    getRowCoord() {
        return this.i;
    };

	getColCoord() {
        return this.j;
    };

    getHorizontal() {
        return this.isHorizontal;
    };


    setCoord(inputI, inputJ) {
        this.i = inputI;
        this.j = inputJ;
    }

    setDirection(horizontal){
        this.isHorizontal = horizontal;
    }
}

class carrier extends ship{
	constructor(isHorizontal, iCorr, jCorr){
		super(isHorizontal, iCorr, jCorr);
		this.type = "carrier";
		this.size = 5;
		this.img = "./assets/carrier.png";
	}
	
}

class battleship extends ship{
	constructor(isHorizontal, iCorr, jCorr){
		super(isHorizontal, iCorr, jCorr);
		this.type = "battleship";
		this.size = 4;
		this.img = "./assets/battleship.png";
	}
	
}

class destroyer extends ship{
	constructor(isHorizontal, iCorr, jCorr){
		super(isHorizontal, iCorr, jCorr);
		this.type = "destroyer";
		this.size = 3;
		this.img = "./assets/destroyer.png";
	}
	
}

class submarine extends ship{
	constructor(isHorizontal, iCorr, jCorr){
		super(isHorizontal, iCorr, jCorr);
		this.type = "submarine";
		this.size = 3;
		this.img = "./assets/submarine.png";
	}
	
}

class patrol extends ship{
	constructor(isHorizontal, iCorr, jCorr){
		super(isHorizontal, iCorr, jCorr);
		this.type = "patrol";
		this.size = 2;
		this.img = "./assets/patrol.png";
	}
	
}




/* check if the position to place a ship is valid for placing that ship.

*/
function validPosition(isHorizontal, size, iCorr, jCorr, ocean){

	if(isHorizontal){

		if(jCorr+size>9){
			return false;
		}

		for (var i =0; i<=size; i++){
			if (ocean[iCorr][jCorr+i] != 0){
				return false;
			}
		}

		return true;

	} else {
		if(iCorr+size>9){
			return false;
		}

		for (var i =0; i<=size; i++){
			if (ocean[iCorr+i][jCorr] != 0){
				return false;
			}
		}

		return true;
	}

}

/* Placing a ship on the ocean board

*/
function placeShip(ocean, ship){
	var direciton = ship.getHorizontal();
	var iCoor = ship.getRowCoord();
	var jCoor = ship.getColCoord();
	if (direciton){
		for(var i=0; i<ship.size; i++){
			console.log(ocean[iCoor][jCoor+i])
			ocean[iCoor][jCoor+i]=1;
			$(`#s${iCoor}${jCoor+i}`).addClass(`${ship.type}`);	

		}
	} else {
		for(var i=0; i<ship.size; i++){
			console.log(ocean[iCoor+i][jCoor])
			ocean[iCoor+i][jCoor]=1;
			$(`#s${iCoor+i}${jCoor}`).addClass(`${ship.type}`);	
		}

	}

	var topPosition = parseInt($(`#s${iCoor}${jCoor}`).css("top"));
	var leftPosition = parseInt($(`#s${iCoor}${jCoor}`).css("left"));


	$("#gameboard").append(`<div class=ship-img-${ship.type}></div>`)
	// $(`.${ship.type}`).wrapAll(`<div class=ship-img-${ship.type}></div>`)
	
	if(direciton){
		$(`.ship-img-${ship.type}`).css({
			"transform": "rotate(-90deg)",
			"transform-origin": "top left",
		});
		
		topPosition = topPosition + 50;

	}


	$(`.ship-img-${ship.type}`).css({
		"position":"absolute",
		"background": "transparent",
		top: topPosition + "px",
		left: leftPosition + "px",
		"background-image":`url(${ship.img})`,
		"background-size": "contain",
		"background-repeat": "no-repeat",
		"background-position": "center center",
		height: squareSize*ship.size,
		"z-index":2
	});	

	if(ship.type==="carrier"){
		$(`.ship-img-${ship.type}`).css({
			"background-size": "100% 100%",
		});	
	
	}

	// $(`.ship-img-${ship.type}`).css({"background-image": `url(${ship.img})`});
}

/* Create an array of all the ships objects
      Carrier     - 5 hits
      Battleship  - 4 hits
      Destroyer   - 3 hits
      Submarine   - 3 hits
      Patrol Boat - 2 hits
*/
function createShips(){

	var carrierShip = new carrier(true, 0, 0)
	var battleshipShip = new battleship(true, 0, 0)
	var destroyerShip = new destroyer(true, 0, 0)
	var submarineShip = new submarine(true, 0, 0)
	var patrolShip = new patrol(true, 0, 0)

	return [carrierShip, battleshipShip, destroyerShip, submarineShip, patrolShip];
}


/* Randomly place ship on the board

*/
function randomPlaceShip(ocean){


	var allPlaced = false;
	var shipsArray = createShips();
	var currShip = shipsArray.pop();
	
	while (!allPlaced){

		var iCoordinate = Math.floor(Math.random()*10);
		var jCoordinate = Math.floor(Math.random()*10);
		var horizontal = Math.floor(Math.random()*2);

		if(validPosition(horizontal,currShip.size, iCoordinate, jCoordinate, ocean)){

			currShip.setCoord(iCoordinate,jCoordinate);
			currShip.setDirection(horizontal);
			placeShip(ocean, currShip);




			if (shipsArray.length==0){
				allPlaced = true;
			} else{

				currShip = shipsArray.pop();

			}
			
		}

	}

}



// get the container element
// var gameBoardContainer = document.getElementById("gameboard");

// make the grid columns and rows
for (i = 0; i < cols; i++) {
	for (j = 0; j < rows; j++) {
		
		
		$("#gameboard").append(`<div id=s${j}${i}></div>`)

		var topPosition = j * squareSize;
		var leftPosition = i * squareSize;			
	

		$(`#s${j}${i}`).css({top: topPosition +'px'});	
		$(`#s${j}${i}`).css({left: leftPosition +'px'});					
	}
}


/* create the 2d array that will contain the status of each square on the board
   and place ships on the board 

   0 = empty, 1 = part of a ship, 2 = a sunken part of a ship, 3 = a missed shot
*/
var ocean = Array(rows).fill().map(() => Array(cols).fill(0));


/* randomly placed the ships on the ocean board.

*/
randomPlaceShip(ocean);


// set event listener for all elements in gameboard, run fireTorpedo function when square is clicked
// gameBoardContainer.addEventListener("click", fireTorpedo, false);
$('#gameboard').click(fireTorpedo);

// initial code via http://www.kirupa.com/html5/handling_events_for_many_elements.htm:
function fireTorpedo(e) {
    // if item clicked (e.target) is not the parent element on which the event listener was set (e.currentTarget)
	if (e.target !== e.currentTarget) {
        // extract row and column # from the HTML element's id
		var row = e.target.id.substring(1,2);
		var col = e.target.id.substring(2,3);
        //alert("Clicked on row " + row + ", col " + col);
				
		// if player clicks a square with no ship, change the color and change square's value
		if (ocean[row][col] == 0) {
			$(e.target).css({background: "transparent"});
			// set this square's value to 3 to indicate that they fired and missed
			ocean[row][col] = 3;
			
		// if player clicks a square with a ship, change the color and change square's value
		} else if (ocean[row][col] == 1) {
			
			$(e.target).css({background: "transparent"});
			$(e.target).css({"background-image": "url(./assets/explosion.gif)",
				"background-size":"contain"
			}).delay(1000).queue(function (next){
				$(this).css({"background-image":"url(./assets/smoke2.gif)",
				"background-size":"cover"
				});
				next();
			});	
			// set this square's value to 2 to indicate the ship has been hit
			ocean[row][col] = 2;
			
			// increment hitCount each time a ship is hit
			hitCount++;
			// this definitely shouldn't be hard-coded, but here it is anyway. lazy, simple solution:
			if (hitCount == 17) {
				alert("All enemy battleships have been defeated! You win!");
			}
			
		// if player clicks a square that's been previously hit, let them know
		} else if (ocean[row][col] > 1) {
			alert("Stop wasting your torpedos! You already fired at this location.");
		}		
    }
    e.stopPropagation();
}