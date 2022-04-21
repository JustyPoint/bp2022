import { ComponentProps, useContext } from "react";
import { ThemeContext } from "styled-components";
import { View, Text as RNText } from "react-native";
// Internal Components
import { FULLSCREEN, getResponsiveValue } from "../../lib/style";
import spacing from "../../constants/Spacing";
// Interfaces & Tipos
import { IBreakpoints } from "../../constants/Breakpoints";

interface IBoxProps extends ComponentProps<typeof View> {
  padding?: keyof typeof spacing | IBreakpoints;
  margin?: keyof typeof spacing | IBreakpoints;
  background: keyof typeof theme.colors;
  style?: { [key: string]: string | number };
}

const Box = ({ style, padding, margin, background, ...rest }: IBoxProps) => {
  const theme = useContext(ThemeContext);
  return (
    <View
      style={{
        ...style,
        margin: theme.spacing[getResponsiveValue({ value: margin, theme })],
        padding: theme.spacing[getResponsiveValue({ value: padding, theme })],
        backgroundColor: theme.colors[background],
      }}
      {...rest}
    />
  );
};
Box.defaultProps = {
  margin: "none",
  padding: "none",
};

export default Box;
