'use client'
import { createContext, useState, ReactNode, Dispatch, SetStateAction} from "react";

type Theme = {
    color: 'blue' | 'red' | 'dark' | 'green';
}

const initialTheme: Theme = { color: 'blue' };

export type ThemeContextType = {
    theme: Theme;
    setTheme: Dispatch<SetStateAction<Theme>>;
};

const ThemeContext = createContext<ThemeContextType | undefined>({
    theme: initialTheme,
    setTheme: () => {},
    });

const ThemeProvider: React.FC<{ children: ReactNode }> = ({children} : any) => {
    const [theme, setTheme] = useState<Theme>(initialTheme);
    const contextValue = {theme, setTheme};

    return(
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
}

export { ThemeProvider };
export default ThemeContext;