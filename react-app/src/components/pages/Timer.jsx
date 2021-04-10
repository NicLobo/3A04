import React from "react";

const Timer = ({ minutes = 0, seconds = 0 }) => {
    const [paused, setPaused] = React.useState(false);
    const [over, setOver] = React.useState(false);
    const [[m, s], setTime] = React.useState([minutes, seconds]);

    const tick = () => {
        if (paused || over) return;
        if (m === 0 && s === 0) setOver(true);
        else if (m === 0 && s === 0) {
            setTime([59, 59]);
        } else if (s == 0) {
            setTime([m - 1, 59]);
        } else {
            setTime([m, s - 1]);
        }
    };

    const reset = () => {
        setTime([parseInt(minutes), parseInt(seconds)]);
        setPaused(false);
        setOver(false);
    };

    React.useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);
        return () => clearInterval(timerID);
    });

    return (
        <div>
            <p>{`${m
                .toString()
                .padStart(2, '0')}:${s.toString().padStart(2, '0')}`}</p>
            <div>{over ? "Time's up!" : ''}</div>
        </div>
    );
};

export default Timer;