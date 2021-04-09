class Healthbar{
    constructor(health, height, x, y, p) {
      this.health = health;
      this.height = height;
      this.x = x;
      this.y = y;
      this.p5 = p
    }

    takeDamge() {
      this.health -=100;
    } 

    isDead(){
      return this.health === 0;
    }

    reset(){
      this.health = 1000;
    }

    display(){
      this.p5.fill("red");
      this.p5.rect(this.x, this.y, this.health, this.height);
    }
  }
  export default Healthbar;