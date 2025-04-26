import { Slot, Stack } from "expo-router";
import { View, Pressable, Image } from "react-native";
import { Link } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "../context/AuthContext";
import { Logout } from "../components/Logout";
import { useRouter } from "expo-router";

export default function Layout() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
