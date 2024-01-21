'use client'
import { createContext, useState, ReactNode } from "react";

import { ThemeContextType, Theme } from "../types/componentTypes";

const initialTheme: Theme = { color: 'blue' };

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