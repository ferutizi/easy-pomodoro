'use client'

import { useContext, useState } from "react";
import ThemeContext from '../context/ThemeContext';
import Timer from "./Timer";
import TimerInput from "./TimerInput";
import { useAlarm } from "../hooks/useAlarm";
import { Config } from '../components/svgs';
import { salsa } from '../fonts';
import useSettings from "../hooks/useSettings";

export default function Main() {
  const initialTimer = {
    pomodoro: 25,
    break: 5,
    longBreak: 15,
  }
  
  const [soundOn, setSoundOn] = useState<boolean>(true);

  const initial = {
    initialTimer,
    sound: 'note',
  }
  const [
    settings,
    handleChange,
    handleSubmit,
    timerValue,
    pomodoroMinutes,
    breakMinutes,
    longBreakMinutes,
    alarmSound,
    modal,
    openModal,
    closeModal
  ] = useSettings(initial);
  const [playSound] = useAlarm();
  
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    return null;
  }
  
  const { theme } = themeContext;
  const color = theme.color;
  
  return(
    <main className={`flex flex-col justify-center ${color}-background h-full items-center`}>
      <div className={`flex h-screen max-w-sm flex-col items-center justify-between ${color}-background max-h-hd p-5`}>
        <section className='flex flex-col w-full justify-around gap-10'>
          <div className='flex w-full justify-between'>
            <h1 className={`${salsa.className} antialiased text-2xl text-white`}>Easy pomodoro</h1>
            <button id="settings" aria-label='Settings' onClick={() => openModal()}>
              <Config className="config" />
            </button>
          </div>
        </section>
        
        {modal && 
          <section className="w-screen h-full max-h-hd fixed z-20 bg-transparent">
            <form onSubmit={handleSubmit} className={`flex flex-col text-lg ${color}-primary modal w-80 p-4 h-5/6 rounded-lg justify-between`}>
              <article> {/* Header */}
                <div onClick={() => closeModal()} className={`absolute right-4 py-0 px-2 rounded-full text-white cursor-pointer hover:bg-white hover:text-black transition-all ease-in duration-300`}>
                  <span>X</span>
                </div>
                <h2 className="text-white text-lg">Settings</h2>
              </article>
              <div className="flex flex-col gap-6"> {/* Options */}
                <article className= "flex flex-col gap-4">
                  <div>
                    <h2 className="text-white text-center text-xl pl-0">Timer</h2>
                    <hr style={{borderColor: "white"}}></hr>
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <TimerInput
                      name="pomodoro"
                      label="Pomodoros"
                      value={timerValue.pomodoro}
                      onChange={handleChange}
                    />
                    <TimerInput
                      name="break"
                      label="Breaks"
                      value={timerValue.break}
                      onChange={handleChange}
                    />
                    <TimerInput
                      name="longBreak"
                      label="LongBreaks"
                      value={timerValue.longBreak}
                      onChange={handleChange}
                    />                
                  </div>
                </article>
                <article className= "flex flex-col gap-4"> 
                  <div>
                    <h2 className="text-white text-center text-xl pl-0">Sounds</h2>
                    <hr style={{borderColor: "white"}}></hr>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className={`flex items-center p-2 ${color}-primary`}>
                      <p className="flex items-center justify-between w-44 text-base text-white focus-within:text-lg transition-all ease-in duration-300">Play alarm</p>
                      <button
                        className={`w-20 h-8 text-xl text-black rounded text-center ${color}-light outline-none focus:bg-white`}
                        type="button"
                        onClick={() => setSoundOn(!soundOn)}
                      >
                        {soundOn ? 'ON' : 'OFF'}
                      </button>
                    </div>
                    <div className="flex items-center justify-between w-64 text-base text-black transition-all ease-in duration-300">
                      {/* @ts-ignore */}
                      <select name="alarmSound" disabled={!soundOn} className={`w-40 h-8 text-xl pl-1 text-black rounded ${color}-light outline-none cursor-pointer focus:bg-white`} onChange={handleChange} defaultValue={settings.sound}>
                        <option value='alarm'>Alarm</option>
                        <option value='alarmDouble'>Alarm Double</option>
                        <option value='bells'>Bells</option>
                        <option value='longBells'>Long Bells</option>
                        <option value='complete'>Complete</option>
                        <option value='note'>Note</option>
                      </select>
                      <button
                        className={`w-20 h-8 text-xl text-black rounded text-center ${color}-light outline-none focus:bg-white ${!soundOn && 'opacity-70'}`}
                        disabled={!soundOn}
                        type="button"
                        onClick={() => playSound(settings.sound)}
                        >Play
                      </button>
                    </div>
                  </div>
                </article>
              </div> {/* Footer */}
              <button type="submit" className={`p-2 rounded-lg ${color}-light font-bold text-black shadow-custom active:shadow-active hover:bg-white transition-all ease-out 2seg duration-700`}>
                Save changes
              </button>
            </form>
          </section>
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