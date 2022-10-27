import { useState } from "react";

export enum THEME {
  LIGHT,
  DARK,
}

const useTheme = () => {
  const [theme, setTheme] = useState<THEME>(THEME.LIGHT);

  const toggleTheme = () => {
    setTheme((theme) => (theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT));
  };

  return {
    theme,
    toggleTheme,
    isLightTheme: theme === THEME.LIGHT,
  };
};

export default useTheme;
