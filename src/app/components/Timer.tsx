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
  //Initial pomodoro time
  const [pomodoroMinutes, setPomodoroMinutes] = useState(0);
  const [pomodoroSeconds, setPomodoroSeconds] = useState(7);
  //Initial break time
  const [breakMinutes, setBreakMinutes] = useState(0);
  const [breakSeconds, setBreakSeconds] = useState(5);
  //Initial long break time
  const [longBreakMinutes, setLongBreakMinutes] = useState(0);
  const [longBreakSeconds, setLongBreakSeconds] = useState(9);
  //State pomodoro or break
  const [intervalState, setIntervalState] = useState<boolean>(true);
  const [minutes, setMinutes] = useState<number>(pomodoroMinutes);
  const [seconds, setSeconds] = useState<number>(pomodoroSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [circleProgress, setCircleProgress] = useState<boolean>(false);
  const [totalTime, setTotalTime] = useState<number>();
  const [currentPomodoro, setCurrentPomodoro] = useState<number>(1);

  useEffect(() => {
    if(isRunning) {
      setTotalTime(minutes * 60 + seconds);
    }
  },[isRunning]);

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
  }, [minutes, seconds, isRunning, currentPomodoro]);

  const start = () => {
    console.log(minutes, seconds)
    if(minutes > 0 || seconds > 0) {
      setIsRunning(true);
      setCircleProgress(true);
    }
  }

  const reset = () => {
    if(!isRunning) {
      setMinutes(pomodoroMinutes);
      setSeconds(pomodoroSeconds);
      setCurrentPomodoro(1);
    }
  }

  const next = () => {
    if(!isRunning) {
      if(!intervalState) {
        setCurrentPomodoro(currentPomodoro + 1);
        setMinutes(pomodoroMinutes);
        setSeconds(pomodoroSeconds);
      } else {
        if(currentPomodoro === 4) {
          setMinutes(longBreakMinutes);
          setSeconds(longBreakSeconds);
          setCurrentPomodoro(0);
        } else {          
          setMinutes(breakMinutes);
          setSeconds(breakSeconds);
        }
      }
      setIntervalState(!intervalState);
    }
    //inicio descanso
  }

  return (
    <>
      <h2>{intervalState ? 'Pomodoro' : 'Descanso'}</h2>
      <h2>{currentPomodoro}</h2>
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
        <button type='button' onClick={()=> start()}>Iniciar</button>
        <button type='button' onClick={()=> reset()}>Reiniciar</button>
        <button type='button' onClick={()=> next()}>Continuar</button>
      </div>
    </>
  );
}