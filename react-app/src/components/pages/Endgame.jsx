
function Endgame({ result, score } ) {

    return (
        <div className="options">
            <div className="container">
                <h1 className="font-weight-light">Endgame</h1>
            </div>
        <div className="endgame">
            <p>{result}</p>
            <p>Final Score: {score}</p>
        </div>
        </div>
    );
}

export default Endgame;
