'use client'

import './Timer.css'
import {useState, useEffect} from 'react';
import 'react';

declare module 'react' {
  interface CSSProperties {
      [key: `--${string}`]: string | number
  }
}

export default function Timer() {
  const [minutes, setMinutes] = useState<number>(1);
  const [seconds, setSeconds] = useState<number>(5);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [circleProgress, setCircleProgress] = useState<boolean>(false);
  const [totalTime, setTotalTime] = useState<number>();

  useEffect(() => {
    if(isRunning) {
      setTotalTime(minutes * 60 + seconds);
    }
  },[isRunning])

  

  useEffect(() => {
      if(isRunning) {
          const countDown = setInterval(() => {
            if (seconds === 0) {
              if (minutes === 0) {
                setIsRunning(false);
                setCircleProgress(false);
                clearInterval(countDown);
                return;
              }
              setSeconds(59);
              setMinutes(minutes - 1);
            } else {
              setSeconds(seconds - 1);
            }
          }, 1000);
          return () => {
            clearInterval(countDown);
          };
      }
  }, [minutes, seconds, isRunning]);

  const reset = () => {
    console.log(totalTime)
    setIsRunning(false)
    setCircleProgress(false)
    setMinutes(0)
    setSeconds(10)
  }

  return (
    <>
      <svg width="300" height="300">
        <circle className='base__circle' r="130" cx="50%" cy="50%" pathLength="100" />
        { circleProgress ?
          <circle style={{"--totalTime": `${totalTime}s`}} className='progress__circle' r="124" cx="50%" cy="50%" pathLength="100" />
          : null
        }
      </svg>
      <div>
        <p>
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </p>
        <button type='button' onClick={()=> {setIsRunning(true), setCircleProgress(true)}}>Iniciar</button>
        <button type='button' onClick={()=> reset()}>Reiniciar</button>
      </div>
    </>
  );
}