class Healthbar{
    constructor(health, height, x, y, p, difficulty) {
      this.health = health;
      this.height = height;
      this.x = x;
      this.y = y;
      this.p5 = p
      this.difficulty = difficulty;
    }

    takeDamge() {
      this.health -=1;
    } 

    isDead(){
      return this.health === 0;
    }

    getHealth(){
      return this.health;
    }
    
    reset(){
      this.health = 6 - this.difficulty;
    }

    display(){
      this.p5.fill("red");
      for(let i = 0; i < this.health; i++ ){
      this.p5.rect(this.x +(100*i), this.y, 100 , this.height);}
    }
  }
  export default Healthbar;