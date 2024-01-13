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
                <form onSubmit={handleSubmit}>
                    <input name="pomodoro" type="number" value={timerValue.pomodoro} onChange={handleChange} />
                    <input name="break" type="number" value={timerValue.break} onChange={handleChange} />
                    <input name="longBreak" type="number" value={timerValue.longBreak} onChange={handleChange} />
                    <button type="submit">ok</button>
                </form>
            }
            <Timer pomodoroMinutes={pomodoroMinutes} breakMinutes={breakMinutes} longBreakMinutes={longBreakMinutes} />
            </div>
        </main>
    );
}