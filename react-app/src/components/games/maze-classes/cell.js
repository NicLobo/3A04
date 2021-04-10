function Cell(i, j, w) {
    this.i = i;
    this.j = j;
    this.x = this.i * w;
    this.y = this.j * w;

    this.property = "X";
    this.win = false;

    /**
     * Show cell
     * 
     * @param {*} p 
     */
    this.show = function (p) {
        if(this.property === "X"){
            p.fill(0);
            p.rect(this.x, this.y, w, w);
        }
        else if(this.property === "O"){
            p.fill(255);
            p.rect(this.x, this.y, w, w);
        }
        else if(this.property === "F"){
            p.fill(255, 0, 0);
            p.rect(this.x, this.y, w, w);
            this.win = true;
        }
        else if(this.property === "P"){
            p.fill(0, 255, 0);
            p.rect(this.x, this.y, w, w);
        }
    }

    /**
     * Set property of the cell
     * 
     * @param {*} property - new property of the cell
     */
    this.setProperty = function(property){
        this.property = property;
    }
}

export default Cell;