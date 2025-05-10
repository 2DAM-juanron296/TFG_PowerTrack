import { Login } from "../components/auth/Login";
import { useRouter } from "expo-router";
import { Screen } from "../components/Screen";
import { Stack } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();

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
      <Login
        onSuccess={() => {
          router.replace("/(tabs)/home");
        }}
      />
    </Screen>
  );
}
