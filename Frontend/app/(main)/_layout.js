import { Link, Stack, useRouter } from "expo-router";
import { Image, Pressable, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Logout } from "../../components/Logout";

export default function MainLayout() {
  const router = useRouter();

  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
          animation: "fade",
          headerTitleStyle: {
            fontFamily: "Inter-Bold",
            fontSize: 25,
            color: "#25AEA6",
          },
          contentStyle: { backgroundColor: "black" },
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
                  source={require("../../assets/images/PowerTrackIcon.png")}
                  className="w-9 h-9 m-1"
                />
              </Pressable>
            </Link>
          ),
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: true }} />
      </Stack>
    </SafeAreaProvider>
  );
}
