import Timer from "./components/Timer";

export default function Home() {
  return (
    <>
      <main className="flex h-screen max-w-sm flex-col items-center justify-between p-5">
        <Timer></Timer>
      </main>
    </>
  )
}
