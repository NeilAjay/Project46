var PLAY = 1;
var END = 0;
var gameState = PLAY;

var fighterPlane, astroid1, astroid2, background;
var laser = [];
var backgroundImage, fighter, asteroidImage, asteroid2Image, laserImage;
var obstaclesGroup;
var k = 0;
var asteroid;

var score = 0;

var gameOver, restart, restartImage;

localStorage["HighestScore"] = 0;

function preload(){
backgroundImage = loadImage("SpaceBackground.jpg");

fighter = loadImage("FighterPlane.png")
asteroidImage = loadImage("Astroid.png")
asteroid2Image = loadImage("astroid2.png")
restartImage = loadImage("restart.png")

laserImage = loadImage("RedLaser.png")
}

function setup() {
  createCanvas(800,700);

  fighterPlane = createSprite(400, 400, 50, 50);
  fighterPlane.addImage(fighter);
  fighterPlane.scale = 0.3

 // asteroid = createSprite(600, 90, 50, 50);
 // asteroid.addImage(asteroidImage);
 // asteroid.scale = 0.3

  //asteroid2 = createSprite(200, 30, 50 ,50);
 // astroid.addImage(astroid2Image);
  //astroid.scale = 0.2

  for (var i = 0; i < 200; i++){
    laser[i]= createSprite(400, 400, 10, 80)
    laser[i].visible = false;
    laser[i].addImage(laserImage);
    laser[i].scale = 0.1
  }

  restart = createSprite(400, 350);
  restart.addImage(restartImage);
  restart.scale = 0.5;
  restart.visible = false;

  obstaclesGroup = new Group();

  score = 0;
}

function draw() {
  background(backgroundImage);  

  text("Score: "+ score, 400,30);

  if(gameState===PLAY){
    

    if(keyDown(LEFT_ARROW)){
      fighterPlane.x = fighterPlane.x-10
    }

    if(keyDown(RIGHT_ARROW)){
      fighterPlane.x = fighterPlane.x+10
    }

   spawnObstacles();

    if(obstaclesGroup.isTouching(fighterPlane)){
      gameState = END;
  }

   if(laser.isTouching(obstaclesGroup)){
     obstaclesGroup.(destroy)
   }

  if(keyDown("space")){
    laser[k].visible = true;
    laser[k].x = fighterPlane.x
    laser[k].velocityY = -10
    k = k+1
  }

  }
  else if(gameState === END){
    gameOver.visible = true;
    restart.visible = true;

    obstaclesGroup.setVelocityXEach(0);

    fighterPlane.changeAnimation(fighter);

  }

  drawSprites();
} 

function spawnObstacles(){
  if (frameCount % 60 === 0) {
    var asteroid = createSprite(random(50, 750),0,40,10);
    //asteroid.y = Math.round(random(80,120));
    asteroid.velocityY = 5;
    asteroid.scale = 0.2;
    var rand = Math.round(random(1, 2))
    if(rand === 1){
    asteroid.addImage(asteroidImage);   
    }else if(rand === 2){
    asteroid.addImage(asteroid2Image);
    }
    obstaclesGroup.add(asteroid);

    asteroid.lifetime = 800;
    astroid2.lifetime = 300;
   // asteroid.debug=true;
   // fighterPlane.debug=true;
}
} 