import Main from './components/Main';
import { ThemeProvider } from './context/ThemeContext';

export default function Home() {

  return (
    <>
      <ThemeProvider>
        <Main />
      </ThemeProvider>
    </>
  )
}
