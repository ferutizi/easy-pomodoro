import { Dispatch, SetStateAction } from "react";

export type SoundType = "alarm" | "alarmDouble" | "bells" | "longBells" | "complete" | "note";

export type Theme = {
  color: 'blue' | 'red' | 'dark' | 'green';
}

export interface ClockProps {
  color: Theme,
  circleProgress: boolean,
  totalTime: number | undefined,
  animationPause: boolean,
  minutes: number,
  seconds: number
}

export interface TimerProps {
  pomodoroMinutes: number;
  breakMinutes: number;
  longBreakMinutes: number;
  alarmSound: SoundType;
}

export type ThemeContextType = {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
};