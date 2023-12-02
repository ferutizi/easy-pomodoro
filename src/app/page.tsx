import Timer from "./components/Timer";

export default function Home() {
  return (
    <main className="flex h-screen max-w-sm flex-col items-center justify-between p-5">
      <header className="flex w-full justify-between">
        <h1>Easy pomodoro</h1>
        <p>Q</p>
      </header>
      <Timer></Timer>
    </main>
  )
}
