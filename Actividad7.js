stage = 0;
goingUp = false;
goingDown = true;
ELIPSESIZE = 38;
TEXTSIZE = 20;

function setup() {
  createCanvas(800, 480)
  frameRate(1)
}

function draw() {
  background(220);
  
  noFill();
  //stroke(255,102,0);
  //line(120,80,320,20);
  //line(320,300,120,300);
  //line(120,80,320,20);
  if(stage == 0){
    textSize(TEXTSIZE);
    fill(1);
    text('Click to start the animation.',260,240);
    noFill();
  }
  else if(stage == 1){
    textSize(TEXTSIZE);
    fill(1);
    text('Stage 1',10,30);
    noFill();
    stroke(0);
    bezier(120,40, 320,20,320,300, 330,300);      
    stroke(0);
    bezier(330,300, 330,94,380,58, 600,40);  
  }
  else if(stage == 2){
    textSize(TEXTSIZE);
    fill(1);
    text('Stage 2',10,30);
    noFill();
    stroke(0);
    bezier(120,40, 320,20,320,300, 330,300);      
    stroke(0);
    bezier(330,300, 330,94,380,58, 600,40); 
    storyboard(120,40,320,20,320,300,330,300);
    storyboard(330,300,330,94,380,58,600,40);
  }
  else if(stage == 3){
    textSize(TEXTSIZE);
    fill(1);
    text('Stage 3',10,30);
    noFill();
    if(goingDown){
      ball(120,40,320,20,320,300,330,300);
    }
    if(goingUp){
      ball(330,300,330,94,380,58,600,40);
    }   
  }
  else if(stage > 3){
    goingUp = false;
    goingDown = true;
    stage = 1;
  }
}

size = 0;
sizeX = 0;
auxSize = 0;
async function ball(x1, y1, x2, y2, x3, y3, x4, y4){
  auxUp = goingUp;
  auxDown = goingDown;
  goingDown = false;
  goingUp = false;
  steps = 60;
  for (i = 0; i <= steps-5; i++){
    await sleep(7)
    clear();   
    background(220);
    textSize(TEXTSIZE);
    fill(1);
    text('Stage 3',10,30);
    noFill();
    t = i / float(steps);   
    x = bezierPoint(x1, x2, x3, x4, t)
    y = bezierPoint(y1, y2, y3, y4, t);
    if(auxDown){     
      if(i > ((steps/5)*4)){
        auxSize = size - 30;
        sizeX = sizeX + 3.5;
        fill(255);
        ellipse(x, y, ELIPSESIZE+sizeX, ELIPSESIZE+auxSize); 
      }
      else{
        size = size + 0.7;
        fill(255);
        ellipse(x, y, ELIPSESIZE, ELIPSESIZE+size); 
      }
    }
       
    if(auxUp){      
      if(i < (steps/5)){
        auxSize = size + 30;
        sizeX = sizeX - 3.5;
        fill(255);
        ellipse(x, y, ELIPSESIZE+sizeX, ELIPSESIZE+auxSize);
      }
      else{
        size = size - 0.7;
        fill(255);
        ellipse(x, y, ELIPSESIZE, ELIPSESIZE+size); 
      }  
    }    
  }
  if(auxDown){
    goingUp = true;
    goingDown = false;
  }
  else{
    goingUp = false;
    goingDown = true;
    size = 0;
    sizeX = 0;
    auxSize = 0;
  }
}

function sleep(ms){
  return new Promise(resolve => setTimeout(resolve,ms));
}


function storyboard(x1, y1, x2, y2, x3, y3, x4, y4) {
  fill(255);
  nSteps = 10;
  for (i = 0; i <= nSteps; i++) {
    t = i / float(nSteps);
    x = bezierPoint(x1, x2, x3, x4, t);
    y = bezierPoint(y1, y2, y3, y4, t);
    ellipse(x, y, ELIPSESIZE, ELIPSESIZE);
  }
}


function mousePressed() {
  stage++;
}
