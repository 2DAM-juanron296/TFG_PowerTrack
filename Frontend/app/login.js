import { Login } from "../components/Login";
import { useRouter } from "expo-router";
import { Screen } from "../components/Screen";
import { Stack } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerTintColor: "black",
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
