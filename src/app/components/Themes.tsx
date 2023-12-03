'use client'

import { useState } from "react";

export default function Themes({setTheme}) {
    const [showThemes, setShowThemes] = useState<boolean>(true);
    
    return(
        <div className='flex flex-col items-center'>
          <button type='button' onClick={() => setShowThemes(!showThemes)}>-.-</button>
          {
            showThemes ?
            <div className='flex justify-between w-full'>
                <button onClick={() => setTheme({ color: 'blue' })} type='button' className='button--theme'>B</button>
                <button onClick={() => setTheme({ color: 'red' })} type='button' className='button--theme'>R</button>
                <button onClick={() => setTheme({ color: 'dark' })} type='button' className='button--theme'>D</button>
                <button onClick={() => setTheme({ color: 'green' })} type='button' className='button--theme'>G</button>
            </div>
            : <></>
          }
        </div>
    );
}

