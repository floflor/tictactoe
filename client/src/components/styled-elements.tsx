import styled from "styled-components";
import { ContainerProps, HeadingProps } from "./styled-elements-types";

export const FlexContainer = styled.div<ContainerProps>((props) => ({
  width: props.width || "100%",
  ...(props.heigth && { height: props.heigth }),
  ...(props.minHeight && { minHeight: props.minHeight }),
  ...(props.justifyContent && {
    justifyContent: props.justifyContent || "center",
  }),
  ...(props.justifySelf && {
    justifySelf: props.justifySelf || "center",
  }),
  ...(props.margin && { margin: props.margin }),
  ...(props.alignSelf && { alignSelf: props.alignSelf }),
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
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));

export const GridLayer = styled.div((props) => ({
  width: "100%",
  height: "100vh",
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridTemplateRows: "1fr",
}));

export const BoardContainer = styled.div((props) => ({
  width: "100%",
  height: "100%",
  gridArea: "1 / 1 / 2 / 3",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "black",
}));

export const LogsContainer = styled.div((props) => ({
  width: "100%",
  height: "100%",
  gridArea: "1 / 3 / 2 / 4",
  backgroundColor: "white",
}));

export const BoardTable = styled.div((props) => ({
  width: "60%",
  height: "60%",
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridTemplateRows: "repeat(3, 1fr)",
  columnGap: "5px",
  rowGap: "5px",
}));

export const Input = styled.input<ContainerProps>((props) => ({
  fontFamily: "inherit",
  width: "50%",
  border: "0",
  borderBottom: "2px solid black",
  outline: "0",
  fontSize: "1.3rem",
  color: "black",
  padding: "7px 0",
  background: "transparent",
  margin: props.margin || '5%'
}));
