import { Stack } from "expo-router";
import { View, Pressable, Image } from "react-native";
import { Link } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "../context/AuthContext";
import { Logout } from "../components/Logout";
import { useRouter } from "expo-router";

export default function Layout() {
  const router = useRouter();

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
              headerTitle: "PowerTrack",
              headerRight: () => (
                <View className="w-8 justify-center items-center">
                  <Logout
                    onSuccess={() => {
                      router.replace("/login");
                    }}
                  />
                </View>
              ),
              headerLeft: () => (
                <Link asChild href="/home">
                  <Pressable>
                    <Image
                      source={require("../assets/images/PowerTrackIcon.png")}
                      className="w-9 h-9 m-1"
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
