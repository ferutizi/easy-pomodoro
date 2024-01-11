'use client'

import 'react';
import '../sass/_variables.scss';
import Themes from './Themes';
import './colors.scss';
import './Timer.scss'
import {useState, useEffect, useContext} from 'react';
import ThemeContext from '../context/ThemeContext';
import { Config, Next, Pause, Play, Stop } from './svgs';
import Pomodoros from './Pomodoros';
import Clock from './Clock';
import { salsa } from '../Fonts';

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
          <h1 className={`${salsa.className} antialiased text-2xl text-white`} >Easy pomodoro</h1>
          <button aria-label='Configuration'>
            <Config className="config" />
          </button>
        </div>
        <Pomodoros currentPomodoro={currentPomodoro} color={color}/>
      </section>
      <Clock 
        color={color}
        circleProgress={circleProgress}
        totalTime={totalTime}
        animationPause={animationPause}
        minutes={minutes}
        seconds={seconds}
      /> 
      <section className='flex flex-col w-full gap-4 '>
        <div className='flex gap-10 justify-center'>
          <button type='button' aria-label='stop' onClick={()=> reset()}>
            <Stop className={`icon icon--${color}`} />
          </button>
          <div>
            {!startButton 
              ? (!isRunning ?
                  <button aria-label='play' onClick={()=> pause()}>
                    <Play className={`icon icon--${color}`} />
                  </button>
                :
                  <button aria-label='pause' onClick={()=> pause()}>
                    <Pause className={`icon icon--${color}`} />
                  </button>

                ) 
              : 
              <button aria-label='start' onClick={()=> start()}>
                <Play className={`icon icon--${color}`} />
              </button>
            }
          </div>
          <button aria-label='next' onClick={()=> next()}>
            <Next className={`icon icon--${color}`} />
          </button>
        </div>
        <Themes />
      </section>
    </>
  );
}