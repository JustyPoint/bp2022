// External Components
import { DefaultTheme, DarkTheme } from "@react-navigation/native";
// Internal Components
import breakpoints from "../constants/Breakpoints";
import spacing from "../constants/Spacing";

export const palette = {
  green020: "#E2EDD7",
  green050: "#B7D39C",
  green075: "#06712D",
  green100: "#70A73B",
  grey020: "#E6E6E6",
  grey050: "#C1C1C1",
  grey070: "#A9A9A9",
  grey100: "#858585",
  red030: "#E4C4C4",
  red050: "#D39C9C",
  red070: "#C17575",
  red100: "#A73B3B",
  black100: "#000000",
  black095: "#121212",
  black090: "#191919",
  black085: "#262626",
  black080: "#333333",
  blue030: "#BBC2CC",
  blue050: "#8E9AAB",
  blue080: "#4A5D78",
  blue100: "#1D3557",
  white080: "#CCCCCC",
  white090: "#E5E5E5",
  white095: "#F6F6F6",
  white100: "#FFFFFF",
};

export const theme = {
  ...DefaultTheme,
  breakpoints: { ...breakpoints },
  colors: {
    ...DefaultTheme.colors,
    accent: palette.white100,
    backdrop: palette.green050,
    background: palette.white100,
    border: palette.grey050,
    cardBG: palette.grey020,
    card: palette.white100,
    deempathized: palette.grey050,
    disabled: palette.grey100,
    error: palette.red100,
    foreground: palette.black095,
    headers: palette.white100,
    info: palette.blue080,
    labelMain: palette.black095,
    labelSecond: palette.grey100,
    notification: palette.blue100,
    onSurface: palette.green075,
    placeholder: palette.white080,
    preheader: palette.grey020,
    primary: palette.green100,
    surface: palette.green075,
    text: palette.black095,
    tint: palette.green100,
    tabIconDefault: palette.black095,
    tabIconSelected: palette.green100,
    titles: palette.white100,
    transparent: "transparent",
    warning: palette.red050,
  },
  spacing: { ...spacing },
  textVariants: {
    header: {
      fontFamily: "Poppins",
      fontSize: 40,
      fontWeight: "bold",
    },
    subheader: {
      fontFamily: "Poppins",
      fontSize: 30,
      fontWeight: "bold",
    },
    subtitle: {
      fontFamily: "Roboto",
      fontSize: 12,
      fontWeight: "bolder",
    },
    body: {
      fontFamily: "Roboto",
      fontSize: 14,
    },
    menu: {
      fontFamily: "Roboto",
      fontSize: 12,
      textTransform: "uppercase",
    },
    subtle: {
      fontFamily: "Roboto",
      fontSize: 14,
      fontStyle: "italic",
      textDecoration: "none",
    },
    link: {
      fontFamily: "Roboto",
      fontSize: 14,
      textDecoration: "underline",
      color: palette.green100,
    },
    medals: {
      fontFamily: "Roboto",
      fontSize: 10,
      lineHeight: "140%",
    },
  },
};

export const darkTheme = {
  ...DarkTheme,
  ...theme,
  colors: {
    ...theme.colors,
    accent: palette.green100,
    background: palette.black095,
    card: palette.black095,
    foreground: palette.white095,
    headers: palette.white100,
    labelMain: palette.white095,
    text: palette.white095,
    tint: palette.green100,
    tabIconDefault: palette.grey100,
    tabIconSelected: palette.green100,
    titles: palette.white100,
  },
};

export default theme;
