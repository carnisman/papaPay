import React, { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";
import { themes } from "../providers/themes";

export const MenuCambiarTema = (props) => (
  <div
    style={{
      position: "absolute",
      top: props.moreTop ? "7.5rem" : "3.2rem",
      right: "0%",
      display: "flex",
      alignItems: "center",
      zIndex: "1",
    }}
  >
    {props.children}
  </div>
);

export const MenuCambiarTemaLetras = (props) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      style={{
        fontSize: "80%",
        color: theme.content_color,
        display: "inline",
        marginRight: "9px",
        marginTop: "6px",
        cursor: "context-menu",
      }}
    >
      {props.children}
    </div>
  );
};

export const BotonCambiarTema = (props) => {
  const { changeTheme } = useContext(ThemeContext);

  return (
    <span
      style={{
        backgroundColor: props.content_background,
        border: "2px solid " + props.border,
        borderRadius: "50%",
        width: "1rem",
        height: "1rem",
        marginRight: "6px",
        marginTop: "6px",
        outline: "none",
        cursor: "pointer",
      }}
      onClick={() => changeTheme(props.name)}
    />
  );
};

export const CambiarTema = ({ moreTop }) => {
  return (
    <MenuCambiarTema moreTop={moreTop}>
      <MenuCambiarTemaLetras>Tema </MenuCambiarTemaLetras>
      {themes?.map((theme, i) => {
        return (
          <BotonCambiarTema
            key={i}
            name={theme.name}
            border={theme.primary}
            content_background={theme.content_background}
          />
        );
      })}
    </MenuCambiarTema>
  );
};