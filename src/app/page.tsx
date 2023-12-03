'use client'

import { useState } from "react";
import Timer from "./components/Timer";

type Theme = {
  color: 'blue' | 'red' | 'dark' | 'green';
}

export default function Home() {
  const [theme, setTheme] = useState<Theme>({ color: 'blue' });
  return (
    <>
        <main className="flex h-screen max-w-sm flex-col items-center justify-between p-5">
          <Timer theme={theme} setTheme={setTheme}></Timer>
        </main>
    </>
  )
}
