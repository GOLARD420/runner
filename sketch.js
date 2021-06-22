var minecraftBackground
var steve;
var score=0;
var obstaclesGroup;
var ninja;
var boulder,boulderimg;
var jumpingAnimation,runningAnimation
var gameoverimage,invisibleGround
var PLAY=1;
var END=0
var gameState=PLAY;
var restartimg,restart;
function preload(){
 
    minecraftBackground = loadImage("minecraftbackground.jpg");
  boulderimg = loadImage('boulder.png');
  restartimg = loadImage('restart.png');
  jumpingAnimation = loadAnimation(
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/jump00.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/jump01.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/jump02.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/jump03.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/jump04.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/jump05.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/jump06.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/jump07.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/jump08.png',     
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/jump09.png'    
);
runningAnimation = loadAnimation(
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/run00.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/run01.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/run02.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/run03.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/run04.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/run05.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/run06.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/run07.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/run08.png',     
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/run09.png'    
);
  
}
function setup(){
  createCanvas(400,400);
  steve1 = createSprite(100,250,400,400);
  steve1.addImage(minecraftBackground);
  steve1.scale=2
  obstaclesGroup = new Group();
 restart = createSprite(200,200);
 restart.addImage(restartimg);
 restart.visible = false;
 restart.scale = 0.5
  ninja = createSprite(100,255,10,20);
  ninja.scale=1;
  ninja.addAnimation('run',runningAnimation)
  ninja.addAnimation('jump',jumpingAnimation);
  
  ninja.setCollider("rectangle", 0,0,10,41);
  invisibleGround = createSprite(200,285,400,10);
  invisibleGround.visible = false;
}
function draw(){
  background(0);
  
 
  if(gameState===PLAY){
    score = score +Math.round(getFrameRate()/60);
     steve1.velocityX = -10;
  if(steve1.x<0){
  steve1.x = steve1.width/2;    
 }
  if (keyDown("space")&&ninja.y>=100){
    ninja.velocityX = 0;
    ninja.velocityY = -2;
    ninja.changeAnimation('jump',jumpingAnimation);
  }
  ninja.velocityY = ninja.velocityY + 0.8;
    createObstacle();
  }
   

    if(obstaclesGroup.isTouching(ninja)){
      gameState=END
    }
  if(gameState===END){
    
    restart.visible = true;
    ninja.velocityX = 0; 
    ninja.velocityY = 0;
    steve1.velocityX = 0;
      obstaclesGroup.setLifetimeEach(-1);
      obstaclesGroup.setVelocityXEach(0);
      if(mousePressedOver(restart)){
        reset()
      }
  }
  ninja.collide(invisibleGround)
  

  
  drawSprites();
  textSize(20);
  fill("black")
   text("Score: "+ score, 200,20);
  
}
function reset(){
  score=0;
  gameState = PLAY;
   
  restart.visible = false; 
  obstaclesGroup.destroyEach();
 
    
}

function createObstacle() {
  if (frameCount % 60 == 0) {
    var obstacle = createSprite(random(100,400),250,10,40);
    obstacle.velocityX = -2;
    
    obstacle.addImage(boulderimg);

  //assign scale and lifetime to the obstacle
  obstacle.scale = 0.03;
    obstacle.lifetime = 50;
obstaclesGroup.add(obstacle);
    
    
  }
  
  
}





