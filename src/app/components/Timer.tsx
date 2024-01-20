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
import { SoundType } from './Main';
import Pomodoros from './Pomodoros';
import './Clock'
import Clock from './Clock';

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number
  }
}

export interface TimerProps {
  pomodoroMinutes: number;
  breakMinutes: number;
  longBreakMinutes: number;
  alarmSound: SoundType;
}

export default function Timer({pomodoroMinutes, breakMinutes, longBreakMinutes, alarmSound}: TimerProps) {

  const [start, reset, pause, next, startButton, isRunning, circleProgress, totalTime, animationPause, minutes, seconds, currentPomodoro] = useTimer({pomodoroMinutes, breakMinutes, longBreakMinutes, alarmSound});
  
  const { theme } = useContext(ThemeContext);
  const color = theme.color;

  return (
    <>
      <Pomodoros currentPomodoro={currentPomodoro as number} color={color}/>
      <Clock 
        color={color}
        circleProgress={circleProgress as boolean}
        totalTime={totalTime as number}
        animationPause={animationPause as boolean}
        minutes={minutes as number}
        seconds={seconds as number}
      /> 
      <section className='flex flex-col w-full gap-4'>
        <div className='flex gap-10 justify-center'>
          <button type='button' aria-label='stop' onClick={()=> (reset as ()=> void)()}>
            <Stop className={`icon icon--${color}`} />
          </button>
          <div>
            {!startButton 
              ? (!isRunning ?
                  <button aria-label='play' onClick={()=> (pause as ()=> void)()}>
                    <Play className={`icon icon--${color}`} />
                  </button>
                :
                  <button aria-label='pause' onClick={()=> (pause as ()=> void)()}>
                    <Pause className={`icon icon--${color}`} />
                  </button>
                ) 
              : 
              <button aria-label='start' onClick={()=> (start as ()=> void)()}>
                <Play className={`icon icon--${color}`} />
              </button>
            }
          </div>
          <button aria-label='next' onClick={()=> (next as ()=> void)()}>
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