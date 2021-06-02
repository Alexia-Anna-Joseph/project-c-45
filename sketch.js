var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ground,ground_image,invisible_ground;
var girl,girl_running,girl_collided,girlImage;
var obstaclesGroup,obstacle1,obstacle2,obstacle3,obstacle4;
var jumpSound,dieSound,checkpointSound;
var score;
var gameOver,restart,gameOverImage,restartImage;

function preload(){
ground_image=loadImage("Background.png");
  girl_running=loadAnimation("Run (1).png","Run (2).png","Run (3).png","Run (4).png","Run (5).png","Run (6).png","Run (7).png","Run (8).png","Run (9).png","Run (10).png","Run (11).png","Run (12).png","Run (14).png","Run (15).png","Run (16).png","Run (17).png","Run (18).png","Run (19).png","Run (20).png");
  
   obstacle1=loadImage("stone3.png ");
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
  gameOverImage=loadImage("gameOver1.png");
  restartImage=loadImage("restart1.png");
  girl_collided=loadImage("Stand.png");
  girlImage=loadImage("Stand.png");
}

function setup() {
 createCanvas(displayWidth,displayHeight);
  
  //ground
ground=createSprite(0,0,0,0);
  ground.shapeColor="white";
ground.addImage("ground_image",ground_image);
ground.scale=2;
   ground.velocityX=-1
  
  //girl
   girl=createSprite(100,420,600,10);
  girl.addAnimation("girl_running",girl_running);
  girl.addImage("girl_collided",girl_collided);
  girl.addImage("girlImage",girlImage);
  girl.scale=0.2;
 // girl.velocityX=2;
  girl.debug=false;
 girl.setCollider("rectangle",0,0,girl.width,girl.height)
  
  invisible_ground=createSprite(300,displayHeight-50,600,10);
  invisible_ground.visible=false;
  
   gameOver = createSprite(displayWidth/2,displayHeight/2);
  gameOver.addImage(gameOverImage);
  
  restart = createSprite(displayWidth/2,displayHeight/2+80);
  restart.addImage(restartImage);
  
  obstaclesGroup=new Group();
  
  score=0;
}

function draw() {
 background("white");
  
 // console.log(girl.y);
   //Gravity
girl.velocityY = girl.velocityY + 0.8;
girl.collide(invisible_ground); 
  
   //Gravity

  if (gameState===PLAY){
    gameOver.visible=false;
  restart.visible=false;
    
   score = score + Math.round(getFrameRate()/60);
 
    spawnObstacles();
   
 ground.velocityX = -(4 + 3* score/100);
     
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
     if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
    
 if((keyDown("space")&& girl.y >= 220)) {
   girl.velocityY = -12;
    jumpSound.play();
  }  
  
  if (girl.isTouching(obstaclesGroup)){
    girl.changeAnimation("girlImage")
    gameState=END;
     dieSound.play();
  }
  }
else if ( gameState===END) {
  gameOver.visible=true;
  restart.visible=true;
  ground.velocityX = 0;
     girl.velocityY = 0
    girl.changeImage("girlImage",girlImage);
  
  
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
   obstaclesGroup.setVelocityXEach(0);
  
    if(mousePressedOver(restart)) {
      reset();
    }
} 
  
 
  drawSprites();
  fill("purple");
  textSize(20);
   text("Score: "+ score, 450,50);
}

function reset(){
  gameState=PLAY;
gameOver.visible=false;
restart.visible=false;
girl.changeAnimation("girl_running",girl_running);
  obstaclesGroup.destroyEach();
  score=0;
  
}

function spawnObstacles() {
   if (frameCount % 60 === 0){
   var obstacle = createSprite(600,displayHeight-90,10,40);
   obstacle.velocityX = -6 ;//+ score/100);
   
    //generate random obstacles
   var rand = Math.round(random(1,6));
     obstacle.addImage(obstacle1);
   obstacle.scale=0.1;
      obstaclesGroup.add(obstacle);
    obstacle.debug=false;
obstacle.setCollider("circle",0,0,1);
   }
     
}

