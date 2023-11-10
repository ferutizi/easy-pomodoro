import Time from "./components/Time";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Easy pomodoro</h1>
      <Time></Time>
    </main>
  )
}
