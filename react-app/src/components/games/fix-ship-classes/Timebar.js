class Timebar{
    constructor(time,height, x, y, p) {
      this.time = time;
      this.height = height;
      this.x = x;
      this.y = y;
      this.p5 = p
    }

    tickTime() {
      this.time -=1;
    }

    isTimeout(){
      return this.time === 0; 
    }

    reset(){
      this.time = 1000;
    }
    display() {
      this.p5.fill("blue");
      this.p5.rect(this.x, this.y, this.time, this.height);
    }
  }
  export default Timebar;