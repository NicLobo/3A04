import React from "react"
import Sketch from 'react-p5'

import Cell from './maze-classes/cell.js'
import Maze from './maze-classes/maze.js'
import Timebar from './maze-classes/Timebar.js'

function MazeGame({ back, difficulty, character }) {
    var width = 600;
    var height = 520;
    var cols, rows;
    var w = 40;

    var grid = [];

    var maze;

    var currentCell;
    var winCell = false;

    var timeBar;
    var openingScreen = true;

    function setup(p, canvasParentRef) {
        p.createCanvas(width, height + 10).parent(canvasParentRef);

        cols = p.floor(width / w);
        rows = p.floor(height / w);

        var m = new Maze();
        maze = m.maze;

        // create grid
        createGrid();

        // assign current cell
        assignCurrentCell();

        // take associated difficulty and set time accordingly
        let time;
        switch (difficulty) {
            case 1:
                time = 1800;
                break;
            case 2:
                time = 1500;
                break;
            case 3:
                time = 1200;
                break;
        }
        timeBar = new Timebar(time, 10, 0, height, p);
    }

    function draw(p) {
        if(openingScreen){
            /**
             * Opening text explaining context of the game.
             */
            p.textSize(16)
            p.text("Your objective is to get the fuel core to the correct place.", 15, height / 2);
            p.text("We've marked where the core is located, along with the place you need to get to.", 15, height / 2 + 20);
            p.text("Use the arrow keys to move that core through the maze.", 15, height / 2 + 40)
            p.text("You only have a limited amount of time, so get there quickly!", 15, height / 2 + 60);
        }
        else if (winCell || timeBar.isTimeout()) {
            p.clear();
            if(winCell){
                // win state
                p.textSize(16)
                p.text("Good work! You successfully switched cores!", width / 4, height / 2);
            }
            else{
                // lose state
                p.textSize(16)
                p.text("You ran out of time!", width / 4, height / 2);
            }
        }
        else {
            // maze
            p.background(51);

            for (var i = 0; i < grid.length; i++) {
                grid[i].show(p);
            }
            timeBar.display();
            timeBar.tickTime();
        }
    }

    /**
     * Find starting cell and assign it as current cell
     */
    function assignCurrentCell(){
        for (var k = 0; k < grid.length; k++) {
            if (grid[k].property === "P") {
                currentCell = grid[k];
            }
        }
    }

    /**
     * Create the grid by making cell objects and putting them in the array
     */
    function createGrid(){
        for (var j = 0; j < rows; j++) {
            for (var i = 0; i < cols; i++) {
                var cell = new Cell(i, j, w);
                cell = makeCellProperty(cell, j, i);
                grid.push(cell);
            }
        }
    }

    /**
     * According to the preset maze, assign properties to the cell
     * 
     * @param {*} cell - cell
     * @param {*} j - row j
     * @param {*} i - column i
     * @returns cell with non-null property
     */
    function makeCellProperty(cell, j, i) {
        // determine cell properties from maze
        let property = maze[j][i];
        cell.setProperty(property);
        return cell;
    }

    function mousePressed(p){
        openingScreen = false;
    }

    function keyPressed(p) {
        var valid = true;
        var i = currentCell.i;
        var j = currentCell.j;

        if (p.keyCode === p.UP_ARROW) {
            if (j === 0) {
                valid = false;
            }
            else {
                //get cell above current cell and check if it is a wall
                if (grid[(j - 1) * cols + i].property === "X") {
                    valid = false;
                }
            }
        }
        else if (p.keyCode === p.DOWN_ARROW) {
            if (j === rows - 1) {
                valid = false;
            }
            else {
                // get cell below current cell and check if it is a wall
                if (grid[(j + 1) * cols + i].property === "X") {
                    valid = false;
                }
            }
        }
        else if (p.keyCode === p.RIGHT_ARROW) {
            if (i === cols - 1) {
                valid = false;
            }
            else {
                // get cell to the right of the current cell and check if it is a wall
                if (grid[j * cols + i + 1].property === "X") {
                    valid = false;
                }
            }
        }
        else if (p.keyCode === p.LEFT_ARROW) {
            if (i === 0) {
                valid = false;
            }
            else {
                // get cell to the left of the current cell and check if it is a wall
                if (grid[j * cols + i - 1].property === "X") {
                    valid = false;
                }
            }
        }
        else {
            // any other key pressed
            valid = false;
        }

        if (valid) {
            makeMove(p, i, j);
        }
    }

    /**
     * Assign properties based on valid move made
     * 
     * @param {*} p
     * @param {*} i - column i
     * @param {*} j - row j
     */
    function makeMove(p, i, j) {
        if (p.keyCode === p.UP_ARROW) {
            // assign P property to new cell
            grid[(j - 1) * cols + i].property = "P";
            // get win state boolean
            winCell = grid[(j - 1) * cols + i].win;
            // set new cell as current cell
            currentCell = grid[(j - 1) * cols + i];
        }
        else if (p.keyCode === p.DOWN_ARROW) {
            // assign P property to new cell
            grid[(j + 1) * cols + i].property = "P";
            // get win state boolean
            winCell = grid[(j + 1) * cols + i].win;
            // set new cell as current cell
            currentCell = grid[(j + 1) * cols + i];
        }
        else if (p.keyCode === p.RIGHT_ARROW) {
            // assign P property to new cell
            grid[j * cols + i + 1].property = "P"
            // get win state boolean
            winCell = grid[j * cols + i + 1].win;
            // set new cell as current cell
            currentCell = grid[j * cols + i + 1];
        }
        else if (p.keyCode === p.LEFT_ARROW) {
            // assign P property to new cell
            grid[j * cols + i - 1].property = "P"
            // get win state boolean
            winCell = grid[j * cols + i - 1].win;
            // set new cell as current cell
            currentCell = grid[j * cols + i - 1];
        }
        // assign O property to old cell
        grid[j * cols + i].property = "O";
    }

    return (
        <div className="text-center">
            <h3>Maze</h3>
            <button onClick={back}>Return to main hub</button>
            <div className="game mt-2">
                <Sketch setup={setup} draw={draw} keyPressed={keyPressed} mousePressed={mousePressed} />
            </div>
        </div>
    );
}

export default MazeGame;