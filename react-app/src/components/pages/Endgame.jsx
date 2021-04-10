import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import ls from 'local-storage'

function Endgame() {

    return (
        <div className="options">
            <div className="container">
                <h1 className="font-weight-light">Endgame</h1>
                <Link className="" to="/" >
                    Back
        </Link>
            </div>
        <div>
            <p>You Won/Lost</p>
            <p>Current Score:</p>
            <p>High Score:</p>
            <p>Longest Time Survived:</p>
        </div>
        </div>
    );
}

export default withRouter(Endgame);
