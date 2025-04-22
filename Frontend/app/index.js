// app/index.js
import { useEffect, useState } from "react";
import * as Font from "expo-font";
import { ActivityIndicator, View } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";

export default function Index() {
  const { isLoggedIn } = useAuth();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Inter-Bold": require("../assets/fonts/Inter_24pt-Bold.ttf"),
        "Inter-Regular": require("../assets/fonts/Inter_24pt-Regular.ttf"),
        "Inter-SemiBold": require("../assets/fonts/Inter_24pt-SemiBold.ttf"),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      if (isLoggedIn) {
        router.replace("/(tabs)/home");
      } else {
        router.replace("./login");
      }
    }
  }, [fontsLoaded, isLoggedIn, router]);

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
}
