import { Pressable } from "react-native";
import { styled } from "nativewind";
import { useAuth } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LogoutIcon } from "./Icons";

export function Logout({ onSuccess }) {
  const StyledPressable = styled(Pressable);
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      const response = await fetch("http://192.168.1.132:8000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      //console.log("Response:", data);

      if (!response.ok) {
        alert(data.message || "Error en logout");
        return;
      }

      console.log("Logout exitoso");
      console.log("Message:", data.message);

      logout();
      onSuccess();
    } catch (error) {
      console.error("Error al cerrar sesión", error);
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <StyledPressable onPress={handleLogout}>
      <LogoutIcon />
    </StyledPressable>
  );
}
