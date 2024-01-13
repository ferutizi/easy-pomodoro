'use client'

import { ChangeEvent, useContext, useState } from "react";
import ThemeContext from '../context/ThemeContext';
import Timer from "./Timer";
import { Config } from '../components/svgs';
import { salsa } from '../fonts';

export default function Main() {
  const initialTimer = {
    pomodoro: 25,
    break: 5,
    longBreak: 15,
  }
  const [timerValue, setTimerValue] = useState<any>(initialTimer);
  const [pomodoroMinutes, setPomodoroMinutes] = useState<number>(25);
  const [breakMinutes, setBreakMinutes] = useState<number>(5);
  const [longBreakMinutes, setLongBreakMinutes] = useState<number>(15);
  const [modal, setModal] = useState<boolean>(false);

  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    return null;
  }

  const { theme } = themeContext;
  const color = theme.color;
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTimerValue({
      ...timerValue,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(timerValue.pomodoro > 0) {
      setPomodoroMinutes(timerValue.pomodoro);
      setBreakMinutes(timerValue.break);
      setLongBreakMinutes(timerValue.longBreak);
    }
    setModal(false);
  }

  return(
    <main className={`flex justify-center ${color}-background h-full items-center`}>
      <div className={`flex h-screen max-w-sm flex-col items-center justify-between p-5 ${color}-background max-h-hd`}>
      <section className='flex flex-col w-full justify-around gap-10'>
        <div className='flex w-full justify-between'>
          <h1 className={`${salsa.className} antialiased text-2xl text-white`} >Easy pomodoro</h1>
          <button aria-label='Configuration' onClick={() => setModal(true)}>
            <Config className="config" />
          </button>
        </div>
      </section>
      {modal && 
        <div className="flex flex-col">
          <h2 className="text-white">Timer</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-8">
              <div className="flex bg-gray-800 h-12 px-2 rounded">
                <label className="flex items-center justify-between text-lg w-64 text-white"> Pomodoros
                  <input className="w-20 h-10 text-3xl text-black rounded text-center" name="pomodoro" type="number" value={timerValue.pomodoro} onChange={handleChange} />
                </label>
              </div>
              <label className="flex items-center justify-between text-lg text-white"> Breaks
                <input className="w-20 h-12 text-3xl text-black" name="break" type="number" value={timerValue.break} onChange={handleChange} />
              </label>
              <label className="flex items-center justify-between text-lg text-white"> Long breaks
                <input className="w-20 h-12 text-3xl text-black" name="longBreak" type="number" value={timerValue.longBreak} onChange={handleChange} />
              </label>
            </div>
            <button type="submit">ok</button>
          </form>
        </div>
      }
      <Timer pomodoroMinutes={pomodoroMinutes} breakMinutes={breakMinutes} longBreakMinutes={longBreakMinutes} />
      </div>
    </main>
  );
}