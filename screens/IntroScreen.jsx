// External components
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Storage } from "expo-storage";
import { StyleSheet } from "react-native";
import { ThemeContext } from "styled-components";
import { IntroSlider } from "@pspatel/react-native-app-intro";
import { Button } from "react-native-paper";
// Internal components
import Box from "../components/Box";
import {
  fontPixel,
  FULLSCREEN,
  heightPixel,
  getResponsiveValue,
} from "../lib/style";
import { Text } from "../components/Themed";

export default function IntroScreen({ navigation }) {
  const { colors } = useContext(ThemeContext);

  const Screen = ({ title }) => {
    return (
      <Box
        background="primary"
        padding={{ phone: "xs", smallPhone: "xs", retina: "l" }}
        style={[styles.container, FULLSCREEN]}
      >
        <Text style={[styles.title, styles.text, { color: colors.text }]}>
          {title}
        </Text>
      </Box>
    );
  };

  const onDone = async () => {
    await Storage.setItem({
      key: "intro",
      value: JSON.stringify({ valor: true, timestamp: Date.now() }),
    });
    navigation.navigate("Root");
  };

  return (
    <IntroSlider
      showPagination
      buttonProps={{
        showSkipButton: true,
        skipButtonText: "Saltar",
        nextButtonText: "SIG.",
        skipContainerStyle: {
          backgroundColor: colors.primary,
          borderColor: colors.surface,
        },
        skipTextStyle: { color: colors.text },
        onDonePress: onDone,
        onSkipPress: onDone,
      }}
      paginationProps={{
        animationType: "expanding",
        dotStyle: {
          backgroundColor: colors.primary,
          borderColor: colors.surface,
        },
      }}
    >
      <IntroSlider.Page
        image={require("../assets/images/Onboarding1.jpg")}
        imageStyle={{
          backgroundColor: colors.foreground,
        }}
      />
      <IntroSlider.Page
        title="Titulo 2"
        image={require("../assets/images/Onboarding2.jpg")}
        description="Onboarding Two"
      />
      <IntroSlider.Page
        title="Titulo 3"
        image={require("../assets/images/Onboarding3.jpg")}
        description="Onboarding Three"
      />
      <IntroSlider.Page
        title="Titulo 4"
        image={require("../assets/images/Onboarding4.jpg")}
        description="Onboarding Four"
      />
    </IntroSlider>
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
  text: { textAlign: "center" },
});
