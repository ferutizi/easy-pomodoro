import './Clock.scss';
import { Theme } from "../context/ThemeContext";

interface ClockProps {
    color: Theme,
    circleProgress: boolean,
    totalTime: number | undefined,
    animationPause: boolean,
    minutes: number,
    seconds: number
}

export default function Clock({color, circleProgress, totalTime, animationPause, minutes, seconds}: ClockProps) {
    return(
        <section className='timer--clock'>
            <svg width="300" height="300">
            <circle className={`base__circle ${color}-secondary`} r="130" cx="50%" cy="50%" pathLength="100" />
            { circleProgress ?
                <circle 
                    style={{"--totalTime": `${totalTime}s`, /* "--steps": `${totalTime}`, */ "--pause": `${animationPause ? 'running' : 'paused'}`}} 
                    className={`progress__circle ${color}-secondary ${color}-primary`} 
                    r="130" 
                    cx="50%" 
                    cy="50%" 
                    pathLength="100"
                />
                : null
            }
            </svg>
            <div className='timer--minutes'>
                <p>
                    {minutes.toString().padStart(2, '0')}
                </p>
            </div>
            <div className='timer--seconds'>
                <p>
                    {seconds.toString().padStart(2, '0')}
                </p>
            </div>
        </section> 
    );
}