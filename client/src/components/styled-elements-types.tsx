export type FlexDirection =
  | "column"
  | "inherit"
  | "initial"
  | "revert"
  | "unset"
  | "column-reverse"
  | "row"
  | "row-reverse";

export interface ContainerProps {
  width?: string;
  heigth?: string;
  minHeight?: string;
  flexDirection?: FlexDirection;
  justifyContent?: string;
  alignItems?: string;
  backgroundColor?: string;
  margin?: string;
  alignSelf?: string;
  justifySelf?:string;
}
export interface HeadingProps {
  fontSize?: string;
  color?: string;
}
