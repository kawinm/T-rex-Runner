let gravity = 3, speed = -10, score = 0, jumpPower = -35;
let maxSpeed = -25, maxJumpPower= 42, maxScore = 999999;
let runnerHeight = 100;
let x = 60, r = 100, vy = 0, y, counter = 0, multiplier = 10;
let runner;
var cacti;
let cactus_distance = 0;
var cactus;
var trex_animation, trex_fire_animation,trex_duck_animation, cactus_single, cactus_double, cactus_double_large, flying_dino_animation;
var reset_button, play_button, pause_button;
let gameOver = true;
let start = true;
var x1 = 0, ground;
var a,b,c;
var myButton;
var mode = 0, draw_pressed = 0;
var x1 = 0, xx1 = 0;
var x2, xx2;
var background_tree, scrollSpeed = -3;
let jumpSound, scoreSound, fireSound, hurtSound;
let bitfont;

function preload() {
  bitfont = loadFont('font/bitfont.ttf');
  trex_animation = loadAnimation( "sprites/trex-black/walk-0.png","sprites/trex-black/walk-1.png","sprites/trex-black/walk-2.png","sprites/trex-black/walk-3.png");

  trex_fire_animation = loadAnimation( "sprites/trex/flame/fire-0.png","sprites/trex/flame/fire-1.png","sprites/trex/flame/fire-2.png","sprites/trex/flame/fire-3.png");
  
  trex_duck_animation = loadAnimation( "sprites/trex/duck/duck-0.png","sprites/trex/duck/duck-1.png");
  
 flying_dino_animation = loadAnimation( "sprites/flying-dino/flying_dino-0.png","sprites/flying-dino/flying_dino-1.png");
  
cactus_single = loadImage("sprites/cactus/single.png");
  cactus_double = loadImage("sprites/cactus/double_x1.png");
  cactus_double_large = loadImage("sprites/cactus/double_x1.5.png");
  
  reset_button = loadImage("sprites/buttons/reset_button.png");
  
  play_button = loadImage("sprites/buttons/play_button.png");
  
  pause_button = loadImage("sprites/buttons/pause_button.png");
  
  ground = loadImage("sprites/background/ground_blue.png");
  
  background_tree = loadImage("sprites/background/5.png");
  
  jumpSound = loadSound('sounds/jump.wav');
  scoreSound = loadSound('sounds/score.wav');
  fireSound = loadSound('sounds/fire.wav');
  hurtSound = loadSound('sounds/hurt.wav');
}

function setup() {
  createCanvas(750, 500);
  y = height - r;
  runner = new Runner(trex_animation, trex_fire_animation, trex_duck_animation);
  cacti = new Group(); 
  x2 = ground.width;
  xx2 = background_tree.width/2;
  
  /*
  myButton = new Clickable();     //Create button
myButton.locate(750/2 - 125, 700/2 - 50); 
  myButton.color ="000000"
  myButton.resize(250, 100);

  myButton.onPress = function(){  
  this.color = "#AAAAFF";       
  alert("Yay!");   
    console.log("I have been pressed!");
}
  
  myButton.draw();
  */
  /*uxStrokeWeight(10)
  
  uxFill(255,0,0)
  uxStroke(150,0,0)
  a = uxRect(750/2 - 125, 500/2 - 50, 250, 60, 25);
  
  uxFill(0,255,0)
  uxStroke(0,150,0)
  b = uxRect(750/2 - 125, 300/2 - 50, 250, 60, 25);
  
  uxFill(0,0,255)
  uxStroke(0,0,150)
  c = uxRect(750/2 - 125, 700/2 - 50, 250, 60, 25);*/
}

function draw() {
  background(255);
  image(background_tree, xx1, -80, background_tree.width/2, background_tree.height/2);
  image(background_tree, xx2, -80, background_tree.width/2, background_tree.height/2);
  
  xx1 += scrollSpeed;
  xx2 += scrollSpeed;
  
  if (xx1 < -background_tree.width/2){
    xx1 = background_tree.width/2-15;
  }
  if (xx2 < -background_tree.width/2){
    xx2 = background_tree.width/2-15;
  }
  
  image(ground, x1, height-60);
  image(ground, x2, height-60);
  
  x1 += speed;
  x2 += speed;
  
  if (x1 < -ground.width){
    x1 = ground.width-35;
  }
  if (x2 < -ground.width){
    x2 = ground.width-35;
  }
  
  
  
  
  checkGameOver();
  counter++;
  if (counter % multiplier == 0) {
   score++; 
  }
  fill(0);
  textSize(13);
  textFont(bitfont);
  strokeWeight(4);
  stroke(255);
  text('Score: '+score, width-200, 25);
  if (random(1) < 0.02) {
    makeObstacle();
  }
  
  if (keyDown ( 70 )) {
  runner.ghost.changeAnimation("fire");
    fireSound.play();
    runnerHeight = 100;
  }
  else if (keyDown ( DOWN_ARROW )) {
    runner.ghost.changeAnimation("duck");
    runnerHeight = 75;
  }
  else {
    runner.ghost.changeAnimation("walk");
    runnerHeight = 100;
  }
  runner.move();
  runner.ghost.overlap(cacti, die);
  
  if (keyDown ( 13 )) {
    if (mode == 0 ){
       image(pause_button, 750/2 - 40, 500/2 - 35);
    }
    if (mode == 1 ){
       image(play_button, 750/2 - 40, 500/2 - 35);
    }
  }
  cactus_distance++;
  if (score%1000 == 0 && score != 0) {
   scoreSound.play(); 
  }
   if (score % ((20-multiplier)*100) == 0 && multiplier != 1) {
       multiplier -= 1
       }
  
  for( i = 0; i<cacti.length; i++){
      if(cacti[i].position.x < 0)
        cacti[i].remove();
  }
  drawSprites();
  if (score %100==0) {
    if (jumpPower != maxJumpPower) {
      jumpPower -= 0.01;
    }
    if (speed != maxSpeed) {
      speed -= 0.1;
      scrollSpeed -= 0.1;
    }
    
  }
  draw_pressed = 0
  if (start)  { 
    //myButton.draw();
   start = false; 
    image(play_button, 750/2 - 40, 500/2 - 35);
  }
  
}


function keyPressed() {
  if (keyCode == UP_ARROW && gameOver) {
      checkGameOver();
   }
  else if (keyCode == UP_ARROW) {  
    jumpSound.play()
      runner.jump();
   }
  
  if (keyCode == 13) {
   pauseGame(); 
    
  }
  
}

function die() {
  hurtSound.play();
  fill(255,0,0);
  textSize(25);
  textFont(bitfont);
  strokeWeight(7);
  stroke(0,0,255);
  text('GAME OVER',  750/2 - 110, 500/2 - 70);
  image(reset_button, 750/2 - 40, 500/2 - 35);
  noLoop();
  gameOver = true;
}


function makeObstacle() {
   
  cactus = new Obstacle(cactus_single, cactus_double, cactus_double_large, flying_dino_animation);
}


function checkGameOver() {
 if (gameOver && start) {
  noLoop(); 
 }
  else if (gameOver) {
     restart();
    gameOver = false;
    loop();
  }
}

function restart() {
  x1 = 0;
  xx1 = 0;
  x2 = ground.width;
  xx2 = background_tree.width/2;
 score = 0, gravity = 3, speed = -10; 
  for( i = 0; i<cacti.length; i++){
        cacti[i].remove();
  }
}

function pauseGame() {
  if (mode ==0) {
    redraw(), 
    noLoop();
    
    mode = 1;
    
  }
  else if (mode == 1) {
    loop();
    mode = 0;
    draw_pressed = 1;
  }
}
