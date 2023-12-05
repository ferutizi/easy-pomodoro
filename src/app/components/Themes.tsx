'use client'

import { useState, useContext } from "react";
import ThemeContext from "../context/ThemeContext";

export default function Themes() {
    const [showThemes, setShowThemes] = useState<boolean>(true);

    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
      return null;
    }

    const { setTheme } = themeContext;

    return(
        <div className='flex flex-col items-center'>
          <button type='button' onClick={() => setShowThemes(!showThemes)}>-.-</button>
          {
            showThemes ?
            <div className='flex justify-between w-full'>
                <button onClick={() => setTheme({ color: 'blue' })} type='button' className='button--theme shadow-custom active:shadow-active w-60 h-60 rounded-full blue-primary'></button>
                <button onClick={() => setTheme({ color: 'red' })} type='button' className='button--theme shadow-custom active:shadow-active w-60 h-60 rounded-full red-primary'></button>
                <button onClick={() => setTheme({ color: 'dark' })} type='button' className='button--theme shadow-custom active:shadow-active w-60 h-60 rounded-full dark-primary'></button>
                <button onClick={() => setTheme({ color: 'green' })} type='button' className='button--theme shadow-custom active:shadow-active w-60 h-60 rounded-full green-primary'></button>
            </div>
            : <></>
          }
        </div>
    );
}

