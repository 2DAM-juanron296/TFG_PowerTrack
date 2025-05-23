import { Slot } from "expo-router";
import { AuthProvider } from "../context/AuthContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function Layout() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: "#0F0F0F",
            paddingBottom: insets.bottom,
          }}
        >
          <Slot />
          <Toast />
        </SafeAreaView>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
