//@ts-ignore
import useSound from 'use-sound';
import { alarm, alarmDouble, bells, complete, longBells, note } from "../../../public/sounds";

export function useAlarm() {
  const [playAlarm] = useSound(alarm);
  const [playAlarmDouble] = useSound(alarmDouble);
  const [playBells] = useSound(bells);
  const [playLongBells] = useSound(longBells);
  const [playComplete] = useSound(complete);
  const [playNote] = useSound(note);

  const playSound = (alarmSound: any) => {
    console.log('first')
    alarmSound === 'alarm' && playAlarm();
    alarmSound === 'alarmDouble' && playAlarmDouble();
    alarmSound === 'bells' && playBells();
    alarmSound === 'longBells' && playLongBells();
    alarmSound === 'complete' && playComplete();
    alarmSound === 'note' && playNote();
  }
  
  return[playSound];
}