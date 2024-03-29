class Hole{
    constructor(delay, p, width, height) {
      this.p5 = p
      this.x = p.random(50,width - 50);
      this.y = p.random(300,height -50);
      this.diameter = 10;
      this.delay = delay;
      this.speed = 1;
      this.width = width;
      this.height = height;
    }

    increaseSize() {
      this.diameter+=this.speed;
      if(this.isHit()) this.resetPosition();
    }

    increaseSpeed(){
      this.speed +=1; 
    }

    isHit(mx, my){
      let delta = this.diameter/2;
      return mx > this.x - delta && mx < this.x + delta && my < this.y + delta && my > this.y - delta; 
    }

    isExploded(){
      return this.diameter >= 100;
    }

    resetPosition(){
      this.x = this.p5.random(50,this.width - 50);
      this.y = this.p5.random(300,this.height -50);
      this.diameter = 10; 
    }

    reset(){
      this.resetPosition();
      this.speed = 1;
    }

    display(){
      this.p5.fill("brown");
      this.p5.ellipse(this.x, this.y, this.diameter, this.diameter);
      this.p5.fill((40,26,13));
    }
  }
  export default Hole;