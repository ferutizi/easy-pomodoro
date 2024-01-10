'use client'

import 'react';
import '../sass/_variables.scss';
import Themes from './Themes';
import './colors.scss';
import './Timer.scss'
import {useState, useEffect, useContext} from 'react';
import ThemeContext from '../context/ThemeContext';
import Image from 'next/image'
import { Arrow, /* Config, */ Next, Pause, Play, Stop } from './svgs';

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number
  }
}

export default function Timer() {
  //Initial interval times
  const [pomodoroMinutes, setPomodoroMinutes] = useState<number>(25);
  const [pomodoroSeconds, setPomodoroSeconds] = useState<number>(0);
  const [breakMinutes, setBreakMinutes] = useState<number>(5);
  const [breakSeconds, setBreakSeconds] = useState<number>(0);
  const [longBreakMinutes, setLongBreakMinutes] = useState<number>(15);
  const [longBreakSeconds, setLongBreakSeconds] = useState<number>(0);
  //State pomodoro or break
  const [intervalState, setIntervalState] = useState<boolean>(true);
  //Set initial time
  const [minutes, setMinutes] = useState<number>(pomodoroMinutes);
  const [seconds, setSeconds] = useState<number>(pomodoroSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [circleProgress, setCircleProgress] = useState<boolean>(false);
  const [animationPause, setAnimationPause] = useState<boolean>(true);
  const [totalTime, setTotalTime] = useState<number>();
  const [currentPomodoro, setCurrentPomodoro] = useState<number>(1);

  const [startButton, setStartButton] = useState<boolean>(true);
  
  const { theme } = useContext(ThemeContext);
  const color = theme.color;
  
  useEffect(() => {
    if(circleProgress) {
      setTotalTime(minutes * 60 + seconds);
    }
  },[circleProgress]);

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
      setStartButton(false)
      setAnimationPause(true)
      setIsRunning(true);
      setCircleProgress(true);
  }
  
  const reset = () => {
    if(!isRunning) {
      setStartButton(true)
      setIsRunning(false);
      setCircleProgress(false);
      setMinutes(pomodoroMinutes);
      setSeconds(pomodoroSeconds);
      setCurrentPomodoro(1);
    }
  }

  const pause = () => {
    setIsRunning(!isRunning);
    if(!animationPause) {
      /* It is necessary to keep the timer and animation in sync */
      setTimeout(()=> {
        setAnimationPause(!animationPause);
      }, 500)
    } else {
      setAnimationPause(!animationPause)
    }
  }

  const next = () => {
    if(!isRunning) {
      setStartButton(true)
      setIsRunning(false);
      setCircleProgress(false);
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
      <section className='flex flex-col w-full justify-around gap-10'>
        <div className='flex w-full justify-between'>
          <h1>Easy pomodoro</h1>
          <Image
            src={require("../../../public/config.png")}
            width={36}
            height={36}
            alt="Configuration"
          />
        </div>
        <div className='flex justify-center'>
          <div className='flex w-44 justify-between'>
            <div className={`shadow-custom w-9 h-9 rounded-full ${currentPomodoro > 0 ? `${color}-primary` : `${color}-light`}`}></div>
            <div className={`shadow-custom w-9 h-9 rounded-full ${currentPomodoro > 1 ? `${color}-primary` : `${color}-light`}`}></div>
            <div className={`shadow-custom w-9 h-9 rounded-full ${currentPomodoro > 2 ? `${color}-primary` : `${color}-light`}`}></div>
            <div className={`shadow-custom w-9 h-9 rounded-full ${currentPomodoro > 3 ? `${color}-primary` : `${color}-light`}`}></div>
          </div>
        </div>
      </section>
      <section className='timer--clock'>
        <svg width="300" height="300">
          <circle className={`base__circle ${color}-secondary`} r="130" cx="50%" cy="50%" pathLength="100" />
          { circleProgress ?
            <circle style={{"--totalTime": `${totalTime}s`, /* "--steps": `${totalTime}`, */ "--pause": `${animationPause ? 'running' : 'paused'}`}} className={`progress__circle ${color}-secondary ${color}-primary`} r="130" cx="50%" cy="50%" pathLength="100" />
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
      <section className='flex flex-col w-full gap-4 '>
        <div className='flex gap-10 justify-center'>
        <Stop className={`icon icon--${color}`} onClick={()=> reset()} />
          <div>
            {!startButton 
              ? (!isRunning 
                  ? <Play className={`icon icon--${color}`} onClick={()=> pause()} />
                  : <Pause className={`icon icon--${color}`} onClick={()=> pause()} />
                ) 
              : <Play className={`icon icon--${color}`} onClick={()=> start()} />
            }
          </div>
          <Next className={`icon icon--${color}`} onClick={()=> next()} />
        </div>
        <Themes />
      </section>
    </>
  );
}