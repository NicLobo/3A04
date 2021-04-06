import Shape from "./shape.js";

class Barrier extends Shape{
  constructor(p, x, yGround){
    let barrierWidth = p.random(10, 30);
    let barrierHeight = p.random(10, 40);
    let y = yGround - barrierHeight;
    super(x, y, barrierWidth, barrierHeight);
    this.p5 = p;
    this.fillColor = p.color(128); 
    this.speed = 6;
    this.hasScoredYet = false;
  }
  
  checkIfCollision(shape){
    return this.overlaps(shape);
  }
  
  update(){
    this.x -= this.speed; 
  }
  
  draw(){
    // push();
    this.p5.noStroke();
    this.p5.fill(this.fillColor);
    this.p5.rect(this.x, this.y, this.width, this.height);
    // pop();
  }
}

export default Barrier