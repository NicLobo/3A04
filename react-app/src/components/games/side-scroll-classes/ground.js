import Shape from "./shape.js";

class Ground extends Shape{
  constructor(p,width,height){
    let yGround = height * 0.8;
    let groundHeight = Math.ceil(height - yGround);
    super(0, yGround, width, groundHeight);
    this.p5 = p;
    this.fillColor = this.p5.color(128); 
  }
  
  draw(){
    // push();
    this.p5.noStroke();
    this.p5.fill(this.fillColor);
    this.p5.rect(this.x, this.y, this.width, this.height);
    // pop();
  }
}

export default Ground