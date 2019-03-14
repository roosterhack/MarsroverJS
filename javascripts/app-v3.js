// Apply rover obj to the board so it can be compare with another 
// Introduce another rover by changing the board


// The grid
let block = '💩';

let board = [ 
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, block, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, block],
  [null, null, null, null, null, null, null, null, null, null],
  [null, block, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, block, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, block, null, null]
];

// Turn left 
function turnLeft(rover){
  if (rover.direction === "N") 
    rover.direction = "W"; 
  else if (rover.direction === "E")
    rover.direction = "N";
  else if (rover.direction === "S")
    rover.direction = "E";
  else if (rover.direction === "W")
    rover.direction = "S"; 
  console.log(`${rover.name} is now facing  ${rover.direction}`);
  return true;
}
// Turn Right 
function turnRight(rover){
  if (rover.direction === "N") 
    rover.direction = "E"; 
  else if (rover.direction === "E")
    rover.direction = "S";
  else if (rover.direction === "S")
    rover.direction = "W";
  else if (rover.direction === "W")
    rover.direction = "N"; 
  console.log(`${rover.name} is now facing  ${rover.direction}`);
  return true;
}
// Check if rover will step into something like poop
function willStepIntoPoop(nextPosition) {
  return board[nextPosition.y][nextPosition.x] === block;
}
// Check if rover will go out of the grid
function willHitWalls(nextPosition) {
  return nextPosition.x < 0 || nextPosition.x > board.length - 1 
      || nextPosition.y < 0 || nextPosition.y > board[0].length - 1;
}

// Check if it would hit another rover
function willHitRover(nextPosition) {
  return board[nextPosition.y][nextPosition.x] === 'Rover';
}

// Move function which checks if it won't hit anthing or out of grid
function move(rover, newPosition) {
   // set the previous position to null
  board[rover.y][rover.x] = null;
  rover.x = newPosition.x;
  rover.y = newPosition.y;
  board[rover.y][rover.x] = 'Rover';
  rover.travelLog.push([rover.y, rover.x]);
  console.log(`${rover.name}'s new position is ${newPosition.y}, ${newPosition.x}`);
}
// move forward or backwards functions
function moving(rover, goForward){
//store rover moved position in an obj to check if it hit anything
  let nextPosition = {
    x: rover.x,
    y: rover.y
  };
  
  if (rover.direction === "N" && goForward === true) {
      nextPosition.y = rover.y - 1;
  } else if (rover.direction === "N" && goForward === false) {
    nextPosition.y = rover.y + 1;
  }
   else if (rover.direction === "S" && goForward === true) {
      nextPosition.y = rover.y + 1;
   } else if (rover.direction === "S" && goForward === false) {
      nextPosition.y = rover.y - 1;
   }
    
  else if (rover.direction === "W" && goForward === true) { 
    nextPosition.x = rover.x - 1;
  } else if (rover.direction === "W" && goForward === false) {
    nextPosition.x = rover.x + 1;
  }
  
  else if (rover.direction === "E" && goForward === true) { 
    nextPosition.x = rover.x + 1;
  } else if (rover.direction === "E" && goForward === false) {
    nextPosition.x = rover.x - 1;
  }
  
  if (willHitWalls(nextPosition)) {
    console.log('No! You just hit a wall...');
    return false;
  }
  
  if (willStepIntoPoop(nextPosition)) {
    console.log(`${rover.name} is gonna hit Poops!`);
    return false;
  }
  
  if(willHitRover(nextPosition)) {
    console.log(`${rover.name} is gonna hit another rover!`);
    return false;
  }
  
  move(rover, nextPosition);
  return true;
}

function commands(sequence) {
  
  const rovers = [{
    direction: "E",
    x: 0,
    y: 0,
    travelLog: [[0, 0]],
    name: 'Rover Ice'
  }, {
    direction: "W", 
    x: 8,
    y: 0,
    travelLog: [[0, 8]],
    name: 'Rover Fire'
  }
];
  //set rovers initial positions
  board[rovers[0].y][rovers[0].x] = 'Rover';
  board[rovers[1].y][rovers[1].x] = 'Rover';
  
  // Loop through the commands then loop through the rovers arrays
for (let command of sequence) {
  for (let rover of rovers) {
      if (command === 'f') {
           if (!moving(rover, true)) break;
    } else if (command === "r") {
            if (!turnRight(rover)) break;
            
    } else if (command === "l") {
            if (!turnLeft(rover)) break;
            
    } else if (command === "b") {
            if (!moving(rover, false)) break;
            
    } else console.log('This is incorrect, your input has to be f, r, l, b');
       
      console.log(rover.travelLog);
  } 
}
}

