import { Stack } from "expo-router";
import { View, Pressable, Image } from "react-native";
import { Link } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "../context/AuthContext";

export default function Layout() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <View className="flex-1">
          <Stack
            screenOptions={{
              headerStyle: { backgroundColor: "black" },
              headerTintColor: "white",
              headerTitleStyle: {
                fontFamily: "Inter-Bold",
                fontSize: 25,
                color: "#25AEA6",
              },
              headerTitleAlign: "center",
              headerTitle: "Power Track",
              headerRight: () => {},
              headerLeft: () => (
                <Link asChild href="/home">
                  <Pressable>
                    <Image
                      source={require("../assets/images/PowerTrackIcon.png")}
                      className="w-12 h-12 m-2"
                    />
                  </Pressable>
                </Link>
              ),
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: true }} />
          </Stack>
        </View>
      </SafeAreaProvider>
    </AuthProvider>
  );
}
