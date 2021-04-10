import { Link, withRouter } from "react-router-dom";

function Endgame() {

    return (
        <div className="options">
            <div className="container">
                <h1 className="font-weight-light">Endgame</h1>
                <Link className="" to="/" >
                    Back
        </Link>
            </div>
        <div className="endgame">
            <p>You Won/Lost</p>
            <p>Current Score:</p>
            <p>High Score:</p>
            <p>Longest Time Survived:</p>
        </div>
        </div>
    );
}

export default withRouter(Endgame);
