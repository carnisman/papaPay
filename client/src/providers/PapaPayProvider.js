import React, { useEffect, useState } from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@material-ui/core/styles";
import { themes } from "./themes";
export const ThemeContext = React.createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes[0]);

  useEffect(() => {
    const themeName = localStorage.getItem("themeName");
    if (themeName) {
      themes.forEach((theme) => {
        if (theme.name === themeName) {
          setTheme(theme);
        }
      });
    }
  }, []);


 

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
