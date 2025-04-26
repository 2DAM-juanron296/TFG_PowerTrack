import { Register } from "../components/Register";
import { Redirect, useRouter } from "expo-router";
import { Screen } from "../components/Screen";
import { Stack } from "expo-router";
import { useAuth } from "../context/AuthContext";

export default function LoginScreen() {
  const { isLoggedIn } = useAuth();

  // Redirigimos si ya está logueado
  if (isLoggedIn) {
    return <Redirect href="/(tabs)/home" />;
  }

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerShown: false,
          headerTintColor: "black",
          contentStyle: {
            backgroundColor: "black",
          },
          animation: "simple_push",
          headerLeft: () => {},
          headerTitle: "",
          headerRight: () => {},
        }}
      />
      <Register onSuccess={() => {}} />;
    </Screen>
  );
}
