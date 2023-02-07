import styled from "styled-components";
import { ContainerProps, HeadingProps } from "./styled-elements-types";

export const FlexContainer = styled.div<ContainerProps>((props) => ({
  width: props.width || "100%",
  ...(props.heigth && { height: props.heigth }),
  ...(props.minHeight && { minHeight: props.minHeight }),
  ...(props.justifyContent && {
    justifyContent: props.justifyContent || "center",
  }),
  alignItems: props.alignItems || "center",
  flexDirection: props.flexDirection || "column",
  backgroundColor: props.backgroundColor || "transparent",
  display: "flex",
  color: props.color,
}));

export const ModalContainer = styled.div((props) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  height: "60%",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#FFFFFF",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1,
}));

export const Heading = styled.h1<HeadingProps>((props) => ({
  fontSize: props.fontSize || "8em",
  color: props.color || "#FFFFFF",
}));

export const Button = styled.button((props) => ({
  backgroundColor: "white",
  border: "1px solid #222222",
  borderRadius: "8px",
  boxSizing: "border-box",
  color: "#222222",
  cursor: "pointer",
  display: "inline-block",
  fontFamily:
    'Circular,-apple-system,BlinkMacSystemFont,Roboto,"Helvetica Neue",sans-serif;',
  fontSize: "1em",
  fontWeight: "600",
  lineHeight: "1.2em",
  margin: "0",
  outline: "none",
  padding: "13px 23px",
  position: "relative",
  textAlign: "center",
  textDecoration: "none",
  touchAction: "manipulation",
  transition:
    "box-shadow .2s,-ms-transform .1s,-webkit-transform .1s,transform .1s",
  userSelect: "none",
  width: "auto",
  ":focus-visible": {
    boxShadow: "#222222 0 0 0 2px, rgba(255, 255, 255, 0.8) 0 0 0 4px;",
    transition: "box-shadow .2s;",
  },
}));

export const Form = styled.form((props) => ({
  width: "100%",

  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));
