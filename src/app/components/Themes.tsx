import { useState } from "react";

export default function Themes() {
    const [showThemes, setShowThemes] = useState(true);

    return(
        <div className='flex flex-col items-center'>
          <button type='button' onClick={() => setShowThemes(!showThemes)}>-.-</button>
          {
            showThemes ?
            <div className='flex justify-between w-full'>
                <button type='button' className='button--theme'>B</button>
                <button type='button' className='button--theme'>R</button>
                <button type='button' className='button--theme'>D</button>
                <button type='button' className='button--theme'>G</button>
            </div>
            : <></>
          }
        </div>
    );
}