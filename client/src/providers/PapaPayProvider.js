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

  const changeTheme = (themeName) => {
    console.log("Changing theme");
    themes.forEach((theme) => {
      if (theme.name === themeName) {
        setTheme(theme);
        localStorage.setItem("themeName", themeName);
      }
    });
  };

  const muiTheme = createTheme({
    palette: {
      primary: {
        main: theme.primary,
      },
      secondary: {
        main: theme.secondary,
      },
      text: {
        primary: theme.content_color,
        secondary: theme.content_color,
      }
    },
    overrides: {
      MuiContainer: {
        root: {
          color: theme.content_color
        }
      },
      MuiPaper: {
        outlined: {
          backgroundColor: theme.content_background,
          borderColor: theme.content_color,
          color: theme.content_color,
          margin: "auto 1rem"
        },
        root: {
          backgroundColor: theme.menu_background,
          color: theme.content_color,
        }
      },
      MuiRadio: {
        root: {
          color: theme.content_color,
        },
      },
      MuiCheckbox: {
        root: {
          color: theme.content_color
        }
      },
      MuiOutlinedInput: {
        notchedOutline: {
          borderColor: theme.content_color,
          "&:hover": {
            borderColor: "red",
          },
        },
        root: {
          color: theme.content_color,
        },
      },
      MuiInputLabel: {
        root: {
          color: theme.content_color,
        },
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
