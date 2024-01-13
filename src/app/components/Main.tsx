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
    <main className={`flex justify-center ${color}-background h-full items-center relative`}>
      <div className={`flex h-screen max-w-sm flex-col items-center justify-between p-5 ${color}-background max-h-hd`}>
      <section className='flex flex-col w-full justify-around gap-10'>
        <div className='flex w-full justify-between'>
          <h1 className={`${salsa.className} antialiased text-2xl text-white`} >Easy pomodoro</h1>
          <button aria-label='Settings' onClick={() => setModal(true)}>
            <Config className="config" />
          </button>
        </div>
      </section>
      {modal && 
        <form onSubmit={handleSubmit} className={`flex flex-col gap-4 text-lg ${color}-secondary modal w-80 p-4 h-5/6 rounded-lg justify-between`}>
          <div> {/* Header */}
            <p onClick={() => {setModal(false), setTimerValue(initialTimer)}} className="absolute right-0 px-4 text-white cursor-pointer">X</p>
            <h2 className="text-white text-lg">Settings</h2>
          </div>
          <div className="flex flex-col gap-4"> {/* Options */}
            <div className= "flex flex-col gap-4">
              <h2 className="text-white text-lg">Timer</h2>
              <div style={{boxShadow: "0px 4px 0.7px rgba(0, 0, 0, 0.25);"}} className={`flex items-center p-2 rounded-lg ${color}-primary`}>
                <label className="flex items-center justify-between w-64 text-white"> Pomodoros
                  <input className={`w-20 h-10 text-3xl text-black rounded text-center ps-3 ${color}-light`} name="pomodoro" type="number" value={timerValue.pomodoro} onChange={handleChange} min={1} max={120} />
                </label>
              </div>
              <div className={`flex items-center p-2 rounded-lg ${color}-primary`}>
                <label className="flex items-center justify-between w-64 text-white"> Breaks
                  <input className={`w-20 h-10 text-3xl text-black rounded text-center ps-3 ${color}-light`} name="break" type="number" value={timerValue.break} onChange={handleChange} min={1} max={120} />
                </label>
              </div>
              <div className={`flex items-center p-2 rounded-lg ${color}-primary`}>
                <label className="flex items-center justify-between w-64 text-white"> Long breaks
                  <input className={`w-20 h-10 text-3xl text-black rounded text-center ps-3 ${color}-light`} name="longBreak" type="number" value={timerValue.longBreak} onChange={handleChange} min={1} max={120} />
                </label>
              </div>
            </div>
            <div> 
              <h2 className="text-white text-lg">Sounds</h2>
            </div>
          </div> {/* Footer */}
          <button className={`p-2 rounded-lg ${color}-light font-bold text-black`} type="submit">Save changes</button>
        </form>
      }
      <Timer pomodoroMinutes={pomodoroMinutes} breakMinutes={breakMinutes} longBreakMinutes={longBreakMinutes} />
      </div>
    </main>
  );
}