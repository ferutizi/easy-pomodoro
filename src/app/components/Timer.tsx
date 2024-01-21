'use client'

import 'react';
import '../sass/_variables.scss';
import Themes from './Themes';
import './colors.scss';
import './Timer.scss'
import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';
import { Next, Pause, Play, Stop } from './svgs';
import { useTimer } from '../hooks/useTimer';
import { TimerProps } from '../types/componentTypes';
import Pomodoros from './Pomodoros';
import './Clock'
import Clock from './Clock';

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number
  }
}

export default function Timer({pomodoroMinutes, breakMinutes, longBreakMinutes, alarmSound}: TimerProps) {
  const [
    start,
    reset,
    pause,
    next,
    startButton,
    isRunning,
    circleProgress,
    totalTime,
    animationPause,
    minutes,
    seconds,
    currentPomodoro
  ] = useTimer({pomodoroMinutes, breakMinutes, longBreakMinutes, alarmSound});
  
  const { theme } = useContext(ThemeContext);
  const color = theme.color;

  return (
    <>
      <Pomodoros currentPomodoro={currentPomodoro} color={color}/>
      <Clock 
        color={color}
        circleProgress={circleProgress}
        totalTime={totalTime}
        animationPause={animationPause}
        minutes={minutes}
        seconds={seconds}
      /> 
      <section className='flex flex-col w-full gap-4'>
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
      </section>
      <section className='flex flex-col w-full gap-4'>
        <Themes />
      </section>
    </>
  );
}