import { View, Text, TextInput, Pressable, Image } from "react-native";
import { useState } from "react";
import { showMessage } from "react-native-flash-message";
import { styled } from "nativewind";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../context/AuthContext";
import { Link } from "expo-router";

export function Register({ onSuccess }) {
  const StyledPressable = styled(Pressable);
  const { login } = useAuth();

  // Variables para el Login
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!username || !password || !email || !name) {
      showMessage({
        message: "Complete ambos campos",
        type: "danger",
        duration: 2000,
        color: "#FF0000",
      });
      return;
    }

    try {
      const response = await fetch("http://192.168.1.132:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email, name }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Error en registro");
        return;
      }

      console.log("Registro exitoso");

      await AsyncStorage.setItem("userToken", data.token);
      //await AsyncStorage.setItem("username", username);

      login(data.token);
      onSuccess();
    } catch (error) {
      console.error("Error al registrarte", error);
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <View className="flex-1">
      <View className="flex-1 justify-center items-center mb-10">
        <Image
          source={require("../assets/images/PowerTrackIcon.png")}
          className="w-20 h-20 mb-5"
        />
        <View className="border-2 border-[#25AEA6] rounded-xl bg-[#0F0F0F] w-80 full py-14 justify-center items-center">
          <TextInput
            className="bg-[#54807D] rounded-md w-60 p-4 text-left"
            placeholder="Nombre"
            placeholderTextColor={"#222"}
            style={{ fontFamily: "Inter-SemiBold" }}
            onChangeText={setName}
          />
          <TextInput
            className="bg-[#54807D] rounded-md mt-6 w-60 p-4 text-left"
            placeholder="Username"
            placeholderTextColor={"#222"}
            style={{ fontFamily: "Inter-SemiBold" }}
            onChangeText={setUsername}
          />
          <TextInput
            className="bg-[#54807D] rounded-md mt-6 w-60 p-4 text-left"
            placeholder="Email"
            placeholderTextColor={"#222"}
            style={{ fontFamily: "Inter-SemiBold" }}
            onChangeText={setEmail}
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
            onPress={handleRegister}
          >
            <Text className="text-lg" style={{ fontFamily: "Inter-Bold" }}>
              REGISTER
            </Text>
          </StyledPressable>
        </View>
      </View>
      <View className="m-4 justify-center items-center">
        <Text
          className="text-white mb-1"
          style={{ fontFamily: "Inter-Regular" }}
        >
          ¿Ya tienes una cuenta?
        </Text>
        <Link asChild href="/login">
          <Pressable>
            <Text
              className="text-white"
              style={{ fontFamily: "Inter-SemiBold" }}
            >
              Inicia Sesión
            </Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}
