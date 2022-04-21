/* If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started*/
// External Components
import { ComponentProps, useLayoutEffect, useContext } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { ThemeContext, ThemeProvider } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable, View } from "react-native";
import { Storage } from "expo-storage";
// Internal Components
import { selColorScheme, setColorScheme } from "../redux/app";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import HomeScreen from "../screens/HomeScreen";
import IntroScreen from "../screens/IntroScreen";
import ForosScreen from "../screens/ForosScreen";
import { theme, darkTheme } from "../lib/theme";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation() {
  const colorScheme = useSelector(selColorScheme);
  return (
    <ThemeProvider theme={colorScheme === "dark" ? darkTheme : theme}>
      <NavigationContainer
        linking={LinkingConfiguration}
        theme={colorScheme === "dark" ? darkTheme : theme}
      >
        <RootNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  console.info("GetITEM en ROOT!!");
  const getIntro = async () => await Storage.getItem({ key: "intro" });
  console.info(getIntro());
  return (
    <Stack.Navigator initialRouteName={"Intro"}>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Intro"
        component={IntroScreen}
        options={{ title: "Intro" }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const { colors } = useContext(ThemeContext);
  const despachar = useDispatch();
  const colorScheme = useSelector(selColorScheme);
  const changeScheme = () => {
    if (colorScheme === "light") despachar(setColorScheme("dark"));
    else despachar(setColorScheme("light"));
  };

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: colors.tint,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<"Home">) => ({
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerLeft: () => (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
                padding: 16,
              }}
            >
              <Pressable
                onPress={() => navigation.navigate("Modal")}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}
              >
                <FontAwesome
                  name="bars"
                  size={25}
                  color={colors.text}
                  style={{ marginRight: 15 }}
                />
              </Pressable>
              <Pressable
                onPress={changeScheme}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}
              >
                <FontAwesome
                  name={colorScheme === "light" ? "sun-o" : "moon-o"}
                  size={25}
                  color={
                    colorScheme === "light" ? colors.primary : colors.disabled
                  }
                  style={{ marginRight: 15 }}
                />
              </Pressable>
            </View>
          ),
          headerRight: () => (
            <>
              <Pressable
                onPress={() => navigation.navigate("Modal")}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}
              >
                <FontAwesome
                  name="info-circle"
                  size={25}
                  color={colors.text}
                  style={{ marginRight: 15 }}
                />
              </Pressable>
            </>
          ),
        })}
      />
      <BottomTab.Screen
        name="Foros"
        component={ForosScreen}
        options={{
          title: "Foros",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="calendar" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Directorio"
        component={ForosScreen}
        options={{
          title: "Directorio",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="address-book" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Chat"
        component={ForosScreen}
        options={{
          title: "Chat",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="comment" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
