import Shape from "./shape.js";

class Avatar extends Shape{
    constructor(p,yGround){
      let avatarHeight = 20;
      super(64, yGround - avatarHeight, 10, 20);
      this.p5 = p;
      this.fillColor = this.p5.color(70); 
      this.gravity = 0.9;
      this.jumpStrength = 15;
      this.yVelocity = 0;
      this.yGround = yGround;
    }
    
    jump(){
      this.yVelocity += -this.jumpStrength;   
    }
    
    isOnGround(){
      return this.y === this.yGround - this.height;
    }
  
    update() {
      this.yVelocity += this.gravity;
      this.yVelocity *= 0.9; // some air resistance
      this.y += this.yVelocity;
      
      if (this.y + this.height > this.yGround) {
        // hit the ground
        this.y = this.yGround - this.height;
        this.yVelocity = 0;
      }
    }
    
    draw(){
      // push();
      this.p5.noStroke();
      this.p5.fill(this.fillColor);
      this.p5.rect(this.x, this.y, this.width, this.height);
      // pop();
    }
  }
  
export default Avatar