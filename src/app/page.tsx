import Main from './components/Main';
import { ThemeProvider } from './context/ThemeContext';
import { Config } from './components/svgs';
import { salsa } from './fonts';

export default function Home() {

  return (
    <>
      <ThemeProvider>
        <Main />
      </ThemeProvider>
    </>
  )
}
