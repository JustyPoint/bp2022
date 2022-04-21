// External components
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StyleSheet } from "react-native";
import { ThemeContext } from "styled-components";
import { Button } from "react-native-paper";
// Internal components
import Box from "../components/Box";
import { selColorScheme } from "../redux/app";
import { fontPixel, heightPixel, getResponsiveValue } from "../lib/style";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

export default function HomeScreen({ navigation }: RootTabScreenProps<"Home">) {
  const colorScheme = useSelector(selColorScheme);
  const { colors, breakpoints, spacing } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Box
        background="background"
        margin={{ phone: "none", smallPhone: "xs", retina: "l" }}
      >
        <Text style={[styles.title, { color: colors.text }]}>
          Valor:{" "}
          {
            spacing[
              getResponsiveValue({
                value: { phone: "l", smallPhone: "xs", retina: "xxl" },
                theme: { breakpoints: { ...breakpoints } },
              })
            ]
          }
        </Text>
      </Box>

      <Text style={styles.title}>Home</Text>
      <Text style={[styles.title, { color: colors.error }]}>
        Error {colors.error}
      </Text>
      <Text style={[styles.title, { color: colors.warning }]}>
        Color Scheme: {colorScheme}
      </Text>
      <Text style={[styles.title, { color: colors.primary }]}>
        fontPixel(20)[{fontPixel(20)}] - {colors.primary}
      </Text>
      <Text style={[styles.title, { color: colors.disabled }]}>
        heightPixel(30) - marginVertical[{heightPixel(30)}]
      </Text>

      <Button
        icon="camera"
        mode="contained"
        onPress={() => console.log("¡Apretado!")}
      >
        Aprietame
      </Button>
      <View
        style={styles.separator}
        lightColor={colors.surface}
        darkColor={colors.surface}
      />
      <EditScreenInfo path="/screens/HomeScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: fontPixel(20),
    fontWeight: "bold",
  },
  buttonView: {
    width: "50%",
    padding: 10,
  },
  separator: {
    marginVertical: heightPixel(30),
    height: 1,
    width: "80%",
  },
  text: { textAlign: "center" },
});
