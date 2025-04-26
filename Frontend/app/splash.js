import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { View, ActivityIndicator } from "react-native";
import * as Font from "expo-font";

export default function SplashScreen() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const { isLoggedIn } = useAuth();
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
    if (isLoggedIn && fontsLoaded) {
      router.replace("/(tabs)/home");
    } else if (fontsLoaded && !isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoggedIn, router, fontsLoaded]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <ActivityIndicator size="large" color="#25AEA6" />
    </View>
  );
}
