// External Modules
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";
// Internal Modules
import createStore from "./redux/createStore";
import { palette } from "./lib/theme";
import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";

// Types & Interfaces

const paperTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    accent: palette.white095,
    backdrop: palette.white095,
    disabled: palette.grey100,
    primary: palette.green100,
    surface: palette.white100,
    text: palette.white095,
  },
};

export const store = createStore();

export default function App() {
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <PaperProvider theme={paperTheme}>
          <ReduxProvider store={store}>
            <Navigation />
            <StatusBar />
          </ReduxProvider>
        </PaperProvider>
      </SafeAreaProvider>
    );
  }
}
