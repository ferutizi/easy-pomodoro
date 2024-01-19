'use client'

import { ChangeEvent, useContext, useState } from "react";
import ThemeContext from '../context/ThemeContext';
import Timer from "./Timer";
import { useAlarm } from "../hooks/useAlarm";
import { Config } from '../components/svgs';
import { salsa } from '../fonts';

export type SoundType = "alarm" | "alarmDouble" | "bells" | "longBells" | "complete" | "note";

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
  const [alarmSound, setAlarmSound] = useState<string>('note')

  const [playSound] = useAlarm();
  
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    return null;
  }
  
  const { theme } = themeContext;
  const color = theme.color;
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTimerValue({
      ...timerValue,
      [name]: value
    })
    if(name === "alarmSound") {
      setAlarmSound(value as SoundType)
      console.log(alarmSound)
    }
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
          <button id="settings" aria-label='Settings' onClick={() => setModal(true)}>
            <Config className="config" />
          </button>
        </div>
      </section>
      {modal && 
        <div className="w-screen h-screen fixed z-20 bg-transparent">
          <form onSubmit={handleSubmit} className={`flex flex-col text-lg ${color}-primary modal w-80 p-4 h-5/6 rounded-lg justify-between`}>
            <div> {/* Header */}
              <div className={`absolute right-4 py-0 px-2 rounded-full text-white cursor-pointer hover:bg-white hover:text-black transition-all ease-in duration-300`}>
                <span onClick={() => {setModal(false), setTimerValue(initialTimer)}}>X</span>
              </div>
              <h2 className="text-white text-lg">Settings</h2>
            </div>
            <div className="flex flex-col gap-6"> {/* Options */}
              <article className= "flex flex-col gap-4">
                <div>
                  <h2 className="text-white text-center text-xl pl-0">Timer</h2>
                  <hr style={{borderColor: "white"}}></hr>
                </div>
                <div className="flex flex-col items-center">
                  <div className={`flex items-center p-2 ${color}-primary`}>
                    <label className="flex items-center justify-between w-64 text-base text-white focus-within:text-lg transition-all ease-in duration-300"> Pomodoros
                      <input className={`w-20 h-8 text-xl text-black rounded text-center ps-3 ${color}-light outline-none focus:bg-white`} name="pomodoro" type="number" value={timerValue.pomodoro} onChange={handleChange} min={1} max={120} />
                    </label>
                  </div>
                  <div className={`flex items-center p-2 ${color}-primary`}>
                    <label className="flex items-center justify-between w-64 text-base text-white focus-within:text-lg transition-all ease-in duration-300"> Breaks
                      <input className={`w-20 h-8 text-xl text-black rounded text-center ps-3 ${color}-light outline-none focus:bg-white`} name="break" type="number" value={timerValue.break} onChange={handleChange} min={1} max={120} />
                    </label>
                  </div>
                  <div className={`flex items-center p-2 ${color}-primary`}>
                    <label className="flex items-center justify-between w-64 text-base text-white focus-within:text-lg transition-all ease-in duration-300"> Long breaks
                      <input className={`w-20 h-8 text-xl text-black rounded text-center ps-3 ${color}-light outline-none focus:bg-white`} name="longBreak" type="number" value={timerValue.longBreak} onChange={handleChange} min={1} max={120} />
                    </label>
                  </div>
                </div>
              </article>
              <article> 
                <div>
                  <h2 className="text-white text-center text-xl pl-0">Sounds</h2>
                  <hr style={{borderColor: "white"}}></hr>
                </div>
                <div>
                  <div>
                    Alarm sound yes/no
                  </div>
                  <div>
                    <select onChange={(e) => setAlarmSound(e.target.value)} defaultValue={'note'}>
                      <option value='alarm'>Alarm</option>
                      <option value='alarmDouble'>Alarm Double</option>
                      <option value='bells'>Bells</option>
                      <option value='longBells'>Long Bells</option>
                      <option value='complete'>Complete</option>
                      <option value='note'>note</option>
                    </select>
                    <button type="button" onClick={() => playSound(alarmSound)}>Play</button>
                  </div>
                </div>
              </article>
            </div> {/* Footer */}
            <button className={`p-2 rounded-lg ${color}-light font-bold text-black shadow-custom active:shadow-active hover:bg-white transition-all ease-out 2seg duration-700`} type="submit">Save changes</button>
          </form>
        </div>
      }
      <Timer
        pomodoroMinutes={pomodoroMinutes}
        breakMinutes={breakMinutes}
        longBreakMinutes={longBreakMinutes}
        alarmSound={alarmSound}
      />
      </div>
    </main>
  );
}