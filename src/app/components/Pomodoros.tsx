import React from 'react';
import '../sass/_variables.scss';
import './colors.scss';
import './Timer.scss';
import { Theme } from '../context/ThemeContext';

interface PomodorosProps {
  currentPomodoro: number;
  color: Theme;
}

export default function Pomodoros({currentPomodoro, color}: PomodorosProps) {
    return(
        <div className='flex justify-center'>
          <div className='flex w-44 justify-between'>
            <div className={`shadow-custom w-9 h-9 rounded-full ${currentPomodoro > 0 ? `${color}-primary` : `${color}-light`}`}></div>
            <div className={`shadow-custom w-9 h-9 rounded-full ${currentPomodoro > 1 ? `${color}-primary` : `${color}-light`}`}></div>
            <div className={`shadow-custom w-9 h-9 rounded-full ${currentPomodoro > 2 ? `${color}-primary` : `${color}-light`}`}></div>
            <div className={`shadow-custom w-9 h-9 rounded-full ${currentPomodoro > 3 ? `${color}-primary` : `${color}-light`}`}></div>
          </div>
        </div>
    )
}