import { View, Text, TextInput, Pressable, Image } from "react-native";
import { useState } from "react";
import { Screen } from "./Screen";
import { showMessage } from "react-native-flash-message";
import { styled } from "nativewind";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../context/AuthContext";
import { Link } from "expo-router";

export function Login({ onSuccess }) {
  const StyledPressable = styled(Pressable);
  const { login } = useAuth();

  // Variables para el Login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      //alert("Complete ambos campos");
      showMessage({
        message: "Complete ambos campos",
        type: "danger",
        duration: 2000,
        color: "#FF0000",
      });
      return;
    }
    console.log("Username: ", username);
    console.log("Password: ", password);

    try {
      const response = await fetch("http://192.168.1.132:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Error en login");
        return;
      }

      console.log("Login exitoso");
      console.log("Token:", data.token);
      console.log("User:", data.user);

      await AsyncStorage.setItem("userToken", data.token);

      login(data.token);
      onSuccess();
    } catch (error) {
      console.error("Error al iniciar sesión", error);
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <Screen style={{ color: "#010410" }}>
      <View className="flex-1 justify-center items-center mb-14">
        <Image
          source={require("../assets/images/PowerTrackIcon.png")}
          className="w-20 h-20 mb-5"
        />
        <View className="border-2 border-[#25AEA6] rounded-xl bg-[#0F0F0F] w-80 full py-14 justify-center items-center">
          <TextInput
            className="bg-[#54807D] rounded-md w-60 p-4 text-left"
            placeholder="Username"
            placeholderTextColor={"#222"}
            style={{ fontFamily: "Inter-SemiBold" }}
            onChangeText={setUsername}
          />
          <TextInput
            className="bg-[#54807D] rounded-md mt-6 w-60 p-4 text-left"
            placeholder="Password"
            placeholderTextColor={"#222"}
            style={{ fontFamily: "Inter-SemiBold" }}
            secureTextEntry={true}
            onChangeText={setPassword}
          />

          <StyledPressable
            className="bg-[#25AEA6] rounded-md mt-8 w-64 px-2 py-3 justify-center items-center"
            onPress={handleLogin}
          >
            <Text className="text-lg" style={{ fontFamily: "Inter-Bold" }}>
              LOGIN
            </Text>
          </StyledPressable>
        </View>
      </View>
      <View className="m-4 justify-center items-center">
        <Text
          className="text-white mb-1"
          style={{ fontFamily: "Inter-Regular" }}
        >
          ¿No tienes una cuenta?
        </Text>
        <Link asChild href="/register">
          <Pressable>
            <Text
              className="text-white"
              style={{ fontFamily: "Inter-SemiBold" }}
            >
              Regístrate
            </Text>
          </Pressable>
        </Link>
      </View>
    </Screen>
  );
}
