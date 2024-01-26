import React, { ChangeEvent } from 'react';
import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';

interface TimerInputsProps {
  name: string;
  label: string;
  value: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function TimerInput({ name, label, value, onChange }: TimerInputsProps) {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    return null;
  }
  
  const { theme } = themeContext;
  const color = theme.color;

  return(
    <>
      <label
        className="flex items-center justify-between w-64 text-base text-white focus-within:text-lg transition-all ease-in duration-300"
      >{label}
        <input
          className={`w-20 h-8 text-xl text-black rounded text-center ${color}-light ps-3 outline-none focus:bg-white`}
          name={name}
          type="number"
          value={value}
          onChange={onChange}
          min={1}
          max={120} 
        />
      </label>       
    </>
  );
}