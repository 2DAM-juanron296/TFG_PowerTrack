import { Register } from "../components/auth/Register";
import { Redirect, useRouter } from "expo-router";
import { Screen } from "../components/Screen";
import { Stack } from "expo-router";
import { useAuth } from "../context/AuthContext";

export default function LoginScreen() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

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
          animation: "fade",
          headerLeft: () => {},
          headerTitle: "",
          headerRight: () => {},
        }}
      />
      <Register
        onSuccess={() => {
          router.replace("/(tabs)/home");
        }}
      />
      ;
    </Screen>
  );
}
