import { Stack, useRouter } from "expo-router";
import { Pressable, View, Image } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

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
          headerRight: () => "",
          headerLeft: () => (
            <Pressable
              onPress={() => {
                router.push("/(tabs)/home");
              }}
            >
              <Image
                source={require("../../assets/images/PowerTrackIcon.png")}
                className="w-10 h-10 m-1"
              />
            </Pressable>
          ),
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: true }} />

        <Stack.Screen
          name="createRoutine"
          options={{ title: "Nueva Rutina" }}
        />
        <Stack.Screen
          name="exploreRoutine"
          options={{ title: "Explorar Rutinas" }}
        />
        <Stack.Screen name="trainHistory" options={{ title: "Historial" }} />
        <Stack.Screen
          name="[idWork]"
          options={{ title: "Detalle de rutinas o entrenos" }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
