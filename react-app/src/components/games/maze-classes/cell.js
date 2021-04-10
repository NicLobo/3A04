function Cell(i, j) {
    this.i = i;
    this.j = j;
    this.x = this.i * w;
    this.y = this.j * w;

    this.property = "X";
    this.win = false;

    this.show = function () {
        if(this.property === "X"){
            fill(0);
            rect(this.x, this.y, w, w);
        }
        else if(this.property === "O"){
            fill(255);
            rect(this.x, this.y, w, w);
        }
        else if(this.property === "F"){
            fill(255, 0, 0);
            rect(this.x, this.y, w, w);
            this.win = true;
        }
        else if(this.property === "P"){
            fill(0, 255, 0);
            rect(this.x, this.y, w, w);
        }
    }

    this.setProperty = function(property){
        this.property = property;
    }
}