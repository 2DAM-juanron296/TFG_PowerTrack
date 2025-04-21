import { Stack, Redirect } from "expo-router";
import { View, Pressable, Image, ActivityIndicator } from "react-native";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import * as Font from "expo-font";

export default function Layout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

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

  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }

  return (
    <View className="flex-1">
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
          headerTitleAlign: "center",
          headerTitle: "",
          headerLeft: null,
          headerRight: () => (
            <Link asChild href="/profile">
              <Pressable>
                <Image
                  source={require("../assets/images/PowerTrackIcon.png")}
                  className="w-20 h-20 mb-5"
                />
              </Pressable>
            </Link>
          ),
        }}
      />
    </View>
  );
}
