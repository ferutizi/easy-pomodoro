'use client'

import { useContext } from "react";
import ThemeContext from '../context/ThemeContext';
import Timer from "./Timer";

export default function Main() {
    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
      return null;
    }

    const { theme } = themeContext;
    const color = theme.color;

    return(
        <main className={`flex justify-center ${color}-background h-full items-center`}>
            <div className={`flex h-screen max-w-sm flex-col items-center justify-between p-5 ${color}-background max-h-hd`}>
                <Timer></Timer>
            </div>
        </main>
    );
}