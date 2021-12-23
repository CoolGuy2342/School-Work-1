var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var gameStates=play;
var play=1;
var end=0;



var score=0;


function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  cloud1 = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle3.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  groundImage = loadImage("ground2.png");
  
 
  
}

function setup() {

  createCanvas(600,200)
  var score = 0;
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  obstacleGroup=createGroup();
  cloudGroup=createGroup();
  //generate random numbers
  var rand =  Math.round(random(1,100))
  

}

function draw() {
  //set background color
  background(180);
  text("Score:"+ score, 400, 30);
  
  if (gameStates==play){
    ground.velocityX = -4;
    score=score+Math.round(frameCount/60);
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
   if(keyDown("space")&& trex.y >= 100) {
      trex.velocityY = -10;
    }
   trex.velocityY = trex.velocityY + 0.8
  }
  else if(gameStates==end){
    ground.velocityX=0;
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
  }
  
  
  // jump when the space key is pressed

  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  //Spawn Clouds
  spawnObstacles();

  spawnClouds();
  
  drawSprites();
}

//function to spawn the clouds
function spawnClouds(){
 // write your code here 
 if(frameCount%60==0){
  cloud=createSprite(600,100,40,10);
  cloud.velocityX=-3;
  cloud.addImage(cloud1);
  cloud.y=Math.round(random(1,60))
  cloud.scale=0.7;
  cloud.depth = trex.depth;
  trex.depth = trex.depth +1;
  cloud.lifetime = 200;
  cloudGroup.add(cloud);
 }
 
}
function spawnObstacles(){
  if(frameCount%60==0){
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX=-5;
    var rand = Math.round(random(1,6))
    switch(rand){
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default:break;
    }
    obstacle.scale=0.7;
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
  }

}


