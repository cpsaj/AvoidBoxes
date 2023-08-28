xPos = 0;
yPos = 0;
zPos = 0;
xFocus = 0;
yFocus = 0;
zFocus = 1;
speed = 2;
boxSpeedMax = 18;
boxSpeedMin = 5;
randomX = [];
randomY = [];
randomSpeed = [];
numOfBoxes = 10;
boxes = [];
edge = 100;
numOfLives = 3;
lives = numOfLives;
score = 0;
let font;
let livesGraphic;
let scoreGraphic;
let gameOverGraphic;

function preload()
{
  font = loadFont("Baliw.ttf");
}

function setup() 
{
  createCanvas(400, 400, WEBGL);
  angleMode(DEGREES);
  livesGraphic = createGraphics(75*numOfLives,75*numOfLives);
  livesGraphic.fill(128, 24, 24);
  livesGraphic.textSize(50);
  scoreGraphic = createGraphics(200,200);
  scoreGraphic.fill(0);
  scoreGraphic.textSize(30);
  scoreGraphic.textFont(font);
  gameOverGraphic = createGraphics(200,200);
  gameOverGraphic.fill(0);
  gameOverGraphic.textSize(30);
  gameOverGraphic.textAlign(CENTER);
  gameOverGraphic.textFont(font);
  gameOverGraphic.text("Game over", 100,100);

  for(i = 0; i <= numOfBoxes; i++)
  {
    randomX[i] = random(-edge,edge);
    randomY[i] = random(-edge,edge);
    randomSpeed[i] = random(boxSpeedMin,boxSpeedMax);
    boxes[i] = new FlyingBox(10,randomX[i], randomY[i], -200, randomSpeed[i]);
  }
}

function draw() 
{
  if(lives > 0)
  {
    background(220);

      //Create camera
    camera(xPos, yPos, zPos + 400, 
      xPos + xFocus, yPos + yFocus, zPos + zFocus, 
      0, 1, 0);
    
    //Hearts
    push();
    let heartString = "";
    for(j = 0; j < lives; j++)
    {
      heartString += "\u2764 ";
    }
    livesGraphic.text(heartString,0,50);
    translate(-430 + xPos,-450 + yPos,-1000);
    noStroke();
    texture(livesGraphic);
    plane(600,600);
    pop();

    //Score
    push();
    scoreGraphic.text("Score: " + score, 0,50);
    translate(490 + xPos, -480 + yPos, -1000);
    noStroke();
    texture(scoreGraphic);
    plane(600,600);
    pop();

    //Box movement
    for(i = 0; i < numOfBoxes; i++)
    {
      boxes[i].boxMovement();
    }

    //Camera movement
    if(keyIsDown(LEFT_ARROW) && xPos > -edge*0.8)
    {
      xPos -= speed;
    }
    if(keyIsDown(RIGHT_ARROW) && xPos < edge*0.8)
    {
      xPos += speed;
    }
    if(keyIsDown(UP_ARROW) && yPos > -edge*0.8)
    {
      yPos -= speed;
    }
    if(keyIsDown(DOWN_ARROW) && yPos < edge*0.8)
    {
      yPos += speed;
    }
  }
  else
  {
    background(255,0,0);
    camera(0,0,400,0,0,-1,0,1,0);

    push();
    noStroke();
    texture(gameOverGraphic);
    plane(400);
    pop();

    push();
    noStroke();
    scoreGraphic.text("Score: " + score);
    //scoreGraphic.background(255);
    scoreGraphic.textSize(30);
    scoreGraphic.textAlign(CENTER);
    texture(scoreGraphic);
    translate(20,100,0);
    plane(200);
    pop();
  }

}

class FlyingBox
{
  constructor(s,x,y,z,boxSpeed)
  {
    this.s = s;
    this.x = x;
    this.y = y;
    this.z = z;
    this.boxSpeed = boxSpeed;
    this.dist = 0;
  }

  boxMovement()
  {
    push();
    translate(this.x,this.y,this.z);
    box(this.s);
    this.z += this.boxSpeed;
    this.dist = sqrt(pow(this.x-xPos,2) + pow(this.y-yPos,2) + pow(this.z-(zPos+400),2));

    if(this.z > zPos+400){
      this.x = random(-edge,edge);
      this.y = random(-edge,edge);
      this.z = -200;
      this.boxSpeed = random(boxSpeedMin,boxSpeedMax);
      score += 1;
      scoreGraphic.clear();
    }

    if(this.dist < (this.s/2)+15){
      this.x = random(-edge,edge);
      this.y = random(-edge,edge);
      this.z = -200;
      this.boxSpeed = random(boxSpeedMin,boxSpeedMax);
      lives -= 1;
      livesGraphic.clear();
    }
    pop();
  }
}
