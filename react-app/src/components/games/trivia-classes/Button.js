class Button{
    constructor(p, x, y, width, height, colour, letter) {
      this.p5 = p
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.colour = colour;
      this.letter = letter
    }

    isHit(mx, my){
      let delta = this.height;
      return mx > this.x && mx < this.x + delta && my < this.y + delta && my > this.y; 
    }

    display(){
      this.p5.fill(this.colour);
      this.p5.rect(this.x, this.y, this.width, this.height);
      this.p5.fill(0); 
      this.p5.textSize(50);
      this.p5.text(this.letter, this.x + this.width/3, this.y + this.height/1.5);
    }   
  }
  export default Button;