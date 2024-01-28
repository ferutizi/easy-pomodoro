import { ChangeEvent, useState } from "react"
import { SoundType } from "../types/componentTypes";
import { TimerValues, SettingsProps } from "../types/componentTypes";

export default function useSettings({initialTimer, sound}: SettingsProps) {

  const [timerValue, setTimerValue] = useState<TimerValues>(initialTimer);
  const [pomodoroMinutes, setPomodoroMinutes] = useState<number>(25);
  const [breakMinutes, setBreakMinutes] = useState<number>(5);
  const [longBreakMinutes, setLongBreakMinutes] = useState<number>(15);
  const [alarmSound, setAlarmSound] = useState<string>('note');
  const [modal, setModal] = useState<boolean>(false);
  
  const [settings, setSettings] = useState({timerValue, sound});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTimerValue({
      ...timerValue,
      [name]: value
    })
    if(name === "alarmSound") {
      setSettings({
        ...settings,
        sound: value as SoundType
      });
    } else {
      setSettings({
        ...settings,
        timerValue: {
          ...settings.timerValue,
          [name]: Number(value)
        }
      });
    }
  }
    
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(timerValue.pomodoro > 0) {
      setPomodoroMinutes(settings.timerValue.pomodoro);
      setBreakMinutes(settings.timerValue.break);
      setLongBreakMinutes(settings.timerValue.longBreak);
    }
    setAlarmSound(settings.sound);
    setModal(false);
  }

  const openModal = () => {
    setModal(true);
  }

  const closeModal = () => {
    setSettings({timerValue, sound: alarmSound});
    setModal(false);
    setTimerValue({
      pomodoro: pomodoroMinutes,
      break: breakMinutes,
      longBreak: longBreakMinutes
    })
  }
    
  return[
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
    closeModal,
  ] as const
}