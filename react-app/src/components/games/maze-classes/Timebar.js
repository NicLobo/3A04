class Timebar{
    constructor(time,height, x, y, p) {
      this.time = time;
      this.height = height;
      this.x = x;
      this.y = y;
      this.p5 = p
    }

    tickTime() {
      this.time -=2;
    }

    isTimeout(){
      return this.time === 0; 
    }

    reset(difficulty){
      switch (difficulty) {
        case 1:
          this.time = 1800;
          break;
        case 2:
          this.time = 1500;
          break;
        case 3:
          this.time = 1200;
          break;
      }
    }

    display() {
      this.p5.fill("blue");
      this.p5.rect(this.x, this.y, this.time / 3, this.height);
    }
  }
  export default Timebar;