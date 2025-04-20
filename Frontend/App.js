import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import * as Font from "expo-font";

import { Main } from "./components/Main";
import { Login } from "./components/Login";

export default function App() {
  const isLoggedIn = false;
  const [fontsLoaded, setFontsLoaded] = useState(false);
  //console.log({ Login, Main });

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Inter-Bold": require("./assets/fonts/Inter_24pt-Bold.ttf"),
        "Inter-Regular": require("./assets/fonts/Inter_24pt-Regular.ttf"),
        "Inter-SemiBold": require("./assets/fonts/Inter_24pt-SemiBold.ttf"),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000",
        }}
      >
        <ActivityIndicator size="large" color="#25AEA6" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar style="light" />
        {isLoggedIn ? <Main /> : <Login />}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
});
