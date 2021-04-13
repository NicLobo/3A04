import {BehaviorSubject} from 'rxjs'

let health = 3;
let gamesCompleted = 0;

// create BehaviorSubject observable
export const gameSubject = new BehaviorSubject()

// initializes the game
export function initGame() {
    updateGame()
}

export function incrementCompletedGames () {
    gamesCompleted++;
    updateGame();
}

export function decreaseHealth () {
    health--;
    updateGame();
}

// update the game with potential pawn promotion
function updateGame() {
    const isGameOver = gameOver()
    const newGame = {
        health: health,
        gamesCompleted: gamesCompleted,
        isGameOver,
        result: isGameOver ? getGameResult() : null,
    }
    gameSubject.next(newGame)
}

function gameOver () {
    if (gamesCompleted === 5) return true;
    else if (health === 0) return true;
}

// get the result of the game
function getGameResult () {
    if (gamesCompleted === 5 ) {
        return `YOU FIXED THE SHIP! CONGRATULATIONS!`
    }
    else if (health === 0) {
        return `THE SHIP RAN OUT OF HEALTH, YOU DIED.`
    }
}