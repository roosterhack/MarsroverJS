// Apply rover obj to the board so it can be compare with another 
// Introduce another rover by changing the board


// The grid
let block = '💩';

let board = [ 
  [null, null, null, null, null, null, null, null, null, null],
  [null, block, null, null, null, null, null, null, null, null],
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
  console.log("Rover is now facing " + rover.direction);
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
  console.log("Rover is now facing " + rover.direction);
  return true;
}
// Check if rover will step into something like poop
function willStepIntoPoop(nextPosition) {
  return board[nextPosition.y][nextPosition.x] === '💩';
}
// Check if rover will go out of the grid
function willHitWalls(nextPosition) {
  return nextPosition.x < 0 || nextPosition.x > board.length - 1 
      || nextPosition.y < 0 || nextPosition.y > board[0].length - 1;
}
// Move function which checks if it won't hit anthing or out of grid
function move(rover, newPosition) {
  rover.x = newPosition.x;
  rover.y = newPosition.y;
  rover.travelLog.push([rover.x, rover.y]);
  console.log(`Rover's new position is ${newPosition.x} ${newPosition.y}`);
}
// move forward or backwards functions
function moving(rover){
//store rover moved position in an obj to check if it hit anthing
  let nextPosition = {
    x: rover.x,
    y: rover.y
  };
  
  if (rover.direction === "N" && rover.forward === true) {
      nextPosition.y = rover.y - 1;
  } else if (rover.direction === "N" && rover.forward === false) {
    nextPosition.y = rover.y + 1;
  }
   else if (rover.direction === "S" && rover.forward === true) {
      nextPosition.y = rover.y + 1;
   } else if (rover.direction === "S" && rover.forward === false) {
      nextPosition.y = rover.y - 1;
   }
    
  else if (rover.direction === "W" && rover.forward === true) { 
    nextPosition.x = rover.x - 1;
  } else if (rover.direction === "W" && rover.forward === false) {
    nextPosition.x = rover.x + 1;
  }
  
  else if (rover.direction === "E" && rover.forward === true) { 
    nextPosition.x = rover.x + 1;
  } else if (rover.direction === "E" && rover.forward === false) {
    nextPosition.x = rover.x - 1;
  }
  
//    console.log("Will move to", nextPosition)
  
  if (willHitWalls(nextPosition)) {
    console.log('No! You just hit a wall...');
    return false;
  }
  
  if (willStepIntoPoop(nextPosition)) {
    console.log('Poops!');
    return false;
  }
  
  move(rover, nextPosition);
  return true;
}

// function moveBackward(rover) {
  
//   let nextPosition = {
//     x: rover.x,
//     y: rover.y
//   };
  
//   if (rover.direction === "N") 
//     nextPosition.y = rover.y + 1;
  
//   else if (rover.direction === "S")
//     nextPosition.y = rover.y - 1;
 
//   else if (rover.direction === "W")
//     nextPosition.x = rover.x + 1;
  
//   else if (rover.direction === "E") 
//     nextPosition.x = rover.x - 1;
  
//   if (willStepIntoPoop(nextPosition)) {
//     console.log('Poops!');
//     return false;
//   }
  
//   if (willHitWalls(nextPosition)) {
//     console.log('Crash! Just hit a wall...');
//     return false;
//   }
  
//   move(rover, nextPosition);
//   return true;
// }


// Two rover objs in an rovers array
// Loop through both rover arrays to apply commands 
// Apply the rover position in the grid 
// Check if the next position will hit each other


function commands(sequence) {
  
  const rover = {
    direction: "E",
    x: 0,
    y: 0,
    travelLog: [[0, 0]],
    forward: true
  };
  
  for (let command of sequence) 
    
      if (command === "f") {
        rover.forward = true;
        if (!moving(rover)) break; 
        
      } else if (command === "r") {
        if (!turnRight(rover)) break;
        
      } else if (command === "l") {
        if (!turnLeft(rover)) break;
        
      } else if (command === "b") {
        rover.forward = false;
        if (!moving(rover)) break;
        
      } else console.log('This is incorrect, your input has to be f, r, l, b');
   
  console.log(rover.travelLog);

}