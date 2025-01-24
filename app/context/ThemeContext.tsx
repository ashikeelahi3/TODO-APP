
import { createContext, ReactNode, useState } from 'react';
import { colors } from '../styles/colors';

export type Theme = "light" | "dark";

export interface ThemeContextType {
  theme: Theme;
  colors: typeof colors.light;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({children} : {children : ReactNode}) => {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => {
    setTheme(theme === "light"? "dark" : "light");
  };     

  return (
    <ThemeContext.Provider 
      value={{
        theme,
        colors: theme === "light"? colors.light : colors.dark,
        toggleTheme,  // function to toggle theme
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}