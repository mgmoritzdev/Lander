var position;
var velocity;

var shipWidth = 50, shipHeight = 50;
var propulsion = false;
var leftJet = false;
var rightJet = false;
var gameStarted = false;
var gameEnded = false;
var maxLandingVelocity = 1;
var groundLine;

function setup(){
  createCanvas(600,600);
  resetGame();
  frameRate(60);
}

function draw() {
  background(255);
  
  if (gameStarted && !gameEnded) {
    update();
  }
  
  ellipse(position.x, position.y,shipWidth,shipHeight);
  line(0,groundLine,width,groundLine);
  
  checkWinState();
}

function keyPressed(){
  
  handleRestart();
  
  gameStarted = true;
  handleControls();
}

function keyReleased(){
  if (keyCode == UP_ARROW) {
    propulsion = false; 
  } else if (keyCode == LEFT_ARROW) {
    leftJet = false;
  } else if (keyCode == RIGHT_ARROW) {
    rightJet = false;
  }
}

function handleRestart(){
  if (keyCode == ENTER && gameEnded) {
    console.log("restarting");
    resetGame();
  }
}

function resetGame(){
  groundLine = (int)(0.8 * height);
  propulsion = false;
  leftJet = false;
  rightJet = false;
  gameStarted = false;
  gameEnded = false;
  position = {x: 200, y: 200};
  velocity = {x: 0, y: 0};
  fill(255);
}

function handleControls() {
  if (keyCode == UP_ARROW) {
    propulsion = true; 
  } else if (keyCode == LEFT_ARROW) {
    leftJet = true;
  } else if (keyCode == RIGHT_ARROW) {
    rightJet = true;
  }
}

function update() {
  if (propulsion){
      velocity.y -= 0.05;
    } else {
      velocity.y += 0.05;
    }
    
    if (leftJet) {
      velocity.x -= 0.05;
    }
    
    if (rightJet) {
      velocity.x += 0.05;
    }
    
    position.x += velocity.x;
    position.y += velocity.y;
}

function checkWinState(){
  if (!gameEnded && groundLine - position.y - shipHeight/2 < 1) {
    gameEnded = true;
    var absVelocity = distance({x:velocity.x, y: velocity.y}, {x: 0, y:0});
    if (absVelocity < maxLandingVelocity) {
      console.log("You win");
      fill(0,0,255);
    } else {
      console.log("You lose");
      fill(255,0,0);
    }
  }
}

function distance(v1, v2) {
  return Math.pow(Math.pow((v1.x - v2.x),2) + Math.pow((v1.y - v2.y),2), .5);
}