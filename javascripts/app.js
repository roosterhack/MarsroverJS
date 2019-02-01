// Rover Object Goes Here
// ======================
rover = {
  direction: "N",
  x: 0,
  y: 0,
  travelLog:[[0,0]]
};
// ======================
function turnLeft(rover){
  // console.log("turnLeft was called!");
  if (rover.direction === "N") 
    rover.direction = "W"; 
  else if (rover.direction === "E")
    rover.direction = "N";
  else if (rover.direction === "S")
    rover.direction = "E";
  else if (rover.direction === "W")
    rover.direction = "S"; 
}

function turnRight(rover){
  // console.log("turnRight was called!");
  if (rover.direction === "N") 
    rover.direction = "E"; 
  else if (rover.direction === "E")
    rover.direction = "S";
  else if (rover.direction === "S")
    rover.direction = "W";
  else if (rover.direction === "W")
    rover.direction = "N"; 
}

function moveForward(rover){
  //check if the rover is going to be within the boundaries
  if (rover.direction === "N" && rover.y != 0)
    rover.y -= 1; 
  
  else if (rover.direction === "E" && rover.x < 9)
    rover.x += 1;

  else if (rover.direction === "S" && rover.y < 9)
    rover.y += 1;
  
  else if (rover.direction === "W" && rover.y != 0)
    rover.x -= 1; 

  else return;
  //Push updated rover coordinate to rover object as an array
  rover.travelLog.push([rover.x,rover.y]);
}

function movingBackwards(rover) {
  if (rover.direction === "N" && rover.y < 9)
    rover.y += 1;
  
  else if (rover.direction === "E" && rover.x != 0)
    rover.x -= 1;

  else if (rover.direction === "S" && rover.y != 0)
    rover.y -= 1;
  
  else if (rover.direction === "W" && rover.y < 9)
    rover.x += 1; 

  else return;

  rover.travelLog.push([rover.x,rover.y]);
}


function commands(code) {
  if (typeof code !== 'string') 
    console.log('Read the menu or something, your commands are not correct!');

  for (let command of code)
     

    if (command === "f") 
      moveForward(rover);

    else if (command === "r") 
      turnRight(rover);
    
    else if (command === "l")
      turnLeft(rover);

    else if (command === "b")
      movingBackwards(rover);
    
    else console.log('This is incorrect, your input has to be f,r,l,b');
};


