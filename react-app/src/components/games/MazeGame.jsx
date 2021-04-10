import React from "react"
import Sketch from 'react-p5'

import Cell from './maze/cell.js'
import Maze from './maze/maze.js'

function MazeGame({ back, difficulty, character }) {
    var width = 600;
    var height = 520;
    var cols, rows;
    var w = 40;

    var grid = [];

    var m;
    var maze;

    var currentCell;
    var winCell = false;

    function setup(p, canvasParentRef) {
        p.createCanvas(width, height).parent(canvasParentRef);

        cols = floor(width / w);
        rows = floor(height / w);

        m = new Maze();
        maze = m.maze;

        // make cell objects, put in grid array
        for (var j = 0; j < rows; j++) {
            for (var i = 0; i < cols; i++) {
                var cell = new Cell(i, j);
                cell = makeCellProperty(cell, j, i);
                grid.push(cell);
            }
        }

        // find starting cell and assign it as current cell
        for (var j = 0; j < grid.length; j++) {
            if (grid[j].property === "P") {
                currentCell = grid[j];
            }
        }
    }

    function draw(p) {
        if (winCell) {
            p.clear();
            p.text("You win", width / 2, height / 2);
        }
        else {
            p.background(51);

            for (var i = 0; i < grid.length; i++) {
                grid[i].show();
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
        property = maze[j][i];
        cell.setProperty(property);
        return cell;
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
            makeMove(p.keyCode, i, j);
        }
    }

    /**
     * Assign properties based on valid move made
     * 
     * @param {*} keyCode - key pressed code
     * @param {*} i - column i
     * @param {*} j - row j
     */
    function makeMove(keyCode, i, j) {
        if (keyCode === p.UP_ARROW) {
            // assign P property to new cell
            grid[(j - 1) * cols + i].property = "P";
            // get win state boolean
            winCell = grid[(j - 1) * cols + i].win;
            // set new cell as current cell
            currentCell = grid[(j - 1) * cols + i];
        }
        else if (keyCode === p.DOWN_ARROW) {
            // assign P property to new cell
            grid[(j + 1) * cols + i].property = "P";
            // get win state boolean
            winCell = grid[(j + 1) * cols + i].win;
            // set new cell as current cell
            currentCell = grid[(j + 1) * cols + i];
        }
        else if (keyCode === p.RIGHT_ARROW) {
            // assign P property to new cell
            grid[j * cols + i + 1].property = "P"
            // get win state boolean
            winCell = grid[j * cols + i + 1].win;
            // set new cell as current cell
            currentCell = grid[j * cols + i + 1];
        }
        else if (keyCode === p.LEFT_ARROW) {
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
            <button onClick={back}>Back to game menu</button>
            <div className="game mt-2">
                <Sketch setup={setup} draw={draw} keyPressed={keyPressed} />
            </div>
        </div>
    );
}

export default MazeGame;