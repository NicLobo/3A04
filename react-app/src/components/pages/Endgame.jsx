import React, { useState, useEffect } from "react";
import ls from 'local-storage'

function Endgame({ result, score, health } ) {


    const [character, setCharacter] = useState('Default Name');

    useEffect(() => {
        if (ls.get('character')) {
        setCharacter(ls.get('character'))
        }
    },[character])

    return (
        <div className={health === 0 ? "main bg-danger" : "main bg-success"}>
            <div className="container">
                <h1 className="font-weight-light">Endgame</h1>
            </div>
        <div className="endgame-text">
            <p>{result}</p>
            <p>{character}'s Final Score: {score}</p>
        </div>
        </div>
    );
}

export default Endgame;
