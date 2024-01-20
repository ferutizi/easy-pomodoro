'use client'

import { useState, useEffect } from "react";
import { useAlarm } from "./useAlarm";

import { TimerProps } from "../components/Timer";

export function useTimer({pomodoroMinutes, breakMinutes, longBreakMinutes, alarmSound}: TimerProps) {
    //State pomodoro(true) or break(false)
  const [intervalState, setIntervalState] = useState<boolean>(true);
  //Set initial time
  const [minutes, setMinutes] = useState<number>(pomodoroMinutes);
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [circleProgress, setCircleProgress] = useState<boolean>(false);
  const [animationPause, setAnimationPause] = useState<boolean>(true);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [currentPomodoro, setCurrentPomodoro] = useState<number>(1);
  //Show startButton(true) or playButton(false)
  const [startButton, setStartButton] = useState<boolean>(true);

  const [playSound] = useAlarm();

    //Setting Time from Main.tsx
  useEffect(() => {
    setMinutes(pomodoroMinutes);
  }, [pomodoroMinutes]);

  useEffect(() => {
    if(!intervalState)
    setMinutes(breakMinutes);
  }, [breakMinutes]);

  useEffect(() => {
    if(!intervalState && currentPomodoro === 0)
    setMinutes(longBreakMinutes);
  }, [longBreakMinutes]);
  //-------------------------

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
            playSound(alarmSound);
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
      setSeconds(0);
      setCurrentPomodoro(1);
    }
  }

  const pause = () => {
    setIsRunning(!isRunning);
    if(!animationPause) {
      /* It is necessary to keep the timer and animation in sync */
      setTimeout(()=> {
        setAnimationPause(!animationPause);
      }, 750)
    } else {
      setAnimationPause(!animationPause)
    }
  }

  const next = () => {
    if(!isRunning) {
      setStartButton(true)
      setIsRunning(false);
      setCircleProgress(false);
      setSeconds(0);
      if(!intervalState) {
        setCurrentPomodoro(currentPomodoro + 1);
        setMinutes(pomodoroMinutes);
      } else {
        if(currentPomodoro === 4) {
          setMinutes(longBreakMinutes);
          setCurrentPomodoro(0);
        } else {          
          setMinutes(breakMinutes);
        }
      }
      setIntervalState(!intervalState);
    }
    //Start Break
  }

  return [start, reset, pause, next, startButton, isRunning, circleProgress, totalTime, animationPause, minutes, seconds, currentPomodoro] as const;
}