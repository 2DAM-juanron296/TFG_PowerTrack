import { Pressable, Text } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { logoutUser } from "../../context/api/auth";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Logout({ onSuccess }) {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      const [data, res] = await logoutUser();

      //console.log("Response:", data);

      if (res) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: data.message,
          text1Style: { fontFamily: "Inter-Bold", fontSize: 12 },
          text2Style: { fontFamily: "Inter-SemiBold", fontSize: 11 },
          position: "top",
          animation: true,
          visibilityTime: 2000,
        });
        return;
      }

      console.log("Logout exitoso");
      console.log("Message:", data.message);

      await AsyncStorage.clear();

      logout();
      onSuccess();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error,
        text1Style: { fontFamily: "Inter-Bold", fontSize: 12 },
        text2Style: { fontFamily: "Inter-SemiBold", fontSize: 11 },
        position: "top",
        animation: true,
        visibilityTime: 2000,
      });
    }
  };

  return (
    <Pressable onPress={handleLogout} className="py-3 border-b border-[#333]">
      <Text
        className="text-white"
        style={{
          fontFamily: "Inter-SemiBold",
        }}
      >
        Cerrar sesión
      </Text>
    </Pressable>
  );
}
