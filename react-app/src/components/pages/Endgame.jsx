
function Endgame({ result, active, health, gamesCompleted } ) {

    return (
        <div className="options">
            <div className="container">
                <h1 className="font-weight-light">Endgame</h1>
            </div>
        <div className="endgame">
            <p>{result}</p>
            <p>Final Score: { (health + 1) * (gamesCompleted + 1) * 100 }</p>
        </div>
        </div>
    );
}

export default Endgame;
