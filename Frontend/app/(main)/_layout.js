import { Link, Stack, useRouter } from "expo-router";
import { Pressable, View, Image } from "react-native";
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
            <Link asChild href="/(tabs)/home">
              <Pressable>
                <Image
                  source={require("../../assets/images/PowerTrackIcon.png")}
                  className="w-10 h-10 m-1"
                />
              </Pressable>
            </Link>
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
          name="[idRoutine]"
          options={{ title: "Detalle de Rutina" }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
