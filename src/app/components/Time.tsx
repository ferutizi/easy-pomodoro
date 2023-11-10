'use client'

import {useState, useEffect} from 'react';

export default function Timer() {
    const [minutes, setMinutes] = useState<number>(2);
    const [seconds, setSeconds] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
  
    useEffect(() => {
        if(isRunning) {
            const countDown = setInterval(() => {
              if (seconds === 0) {
                if (minutes === 0) {
                  setIsRunning(false)
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
  
    return (
      <div>
        <p>
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </p>
        <button type='button' onClick={()=> setIsRunning(true)}>Iniciar</button>
      </div>
    );
}