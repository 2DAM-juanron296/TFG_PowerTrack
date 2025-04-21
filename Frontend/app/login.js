import { Login } from "../components/Login";
import { useRouter } from "expo-router";
import { Screen } from "../components/Screen";
import { Stack } from "expo-router";
import { useAuth } from "../context/AuthContext";

export default function LoginScreen() {
  const { setIsLoggedIn } = useAuth();
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
          setIsLoggedIn(true);
          router.replace("/(tabs)/home");
        }}
      />
    </Screen>
  );
}
