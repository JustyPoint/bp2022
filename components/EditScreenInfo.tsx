// External Components
import { useContext } from "react";
import * as WebBrowser from "expo-web-browser";
import { ThemeContext } from "styled-components";
import { StyleSheet, TouchableOpacity } from "react-native";
// Internal Components
import Box from "./Box";
import { MonoText } from "./StyledText";
import { Text, View } from "./Themed";

export default function EditScreenInfo({ path }: { path: string }) {
  const { colors } = useContext(ThemeContext);
  return (
    <Box background="background">
      <Box background="background" style={styles.getStartedContainer}>
        <Text style={styles.getStartedText} lightColor={colors.text}>
          Ruta para el código de ésta pantalla:
        </Text>

        <View
          style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
          darkColor={colors.grey050}
          lightColor={colors.grey050}
        >
          <MonoText>{path}</MonoText>
        </View>

        <Text style={styles.getStartedText} lightColor={colors.text}>
          Cualquier cambio que se haga se reflejará de forma automática al
          guardar el archivo.
        </Text>
      </Box>

      <Box background="background" style={styles.helpContainer}>
        <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
          <Text style={styles.helpLinkText} lightColor={colors.tint}>
            Tap aquí si la app no se actualiza automáticamente después de
            efectuar cambios.
          </Text>
        </TouchableOpacity>
      </Box>
    </Box>
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet"
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: "center",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: "center",
  },
});
