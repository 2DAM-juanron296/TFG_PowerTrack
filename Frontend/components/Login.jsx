import { View, Text, TextInput, Pressable, Image } from "react-native";
import { useState } from "react";
import { Screen } from "./Screen";
import { showMessage } from "react-native-flash-message";
import { styled } from "nativewind";
import { useRouter } from "expo-router";

export function Login() {
  const StyledPresable = styled(Pressable);
  const router = useRouter();

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Error en login");
        return;
      }

      console.log("Login exitoso");
      console.log("Token:", data.token);
      console.log("User:", data.user);

      router.replace("/");
    } catch (error) {
      console.error("Error al iniciar sesión", error);
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <Screen style={{ color: "#010410" }}>
      <View className="justify-center items-center">
        <Image
          source={require("../assets/images/PowerTrackIcon.png")}
          className="w-20 h-20 mb-5"
        />
        <View className="border-2 border-[#25AEA6] rounded-xl bg-[#0F0F0F] w-80 py-12 justify-center items-center">
          <TextInput
            className="bg-[#54807D] rounded-md w-56 p-3 text-left"
            placeholder="Username"
            placeholderTextColor={"#222"}
            style={{ fontFamily: "Inter-SemiBold" }}
            onChangeText={setUsername}
          />
          <TextInput
            className="bg-[#54807D] rounded-md mt-6 w-56 p-3 text-left"
            placeholder="Password"
            placeholderTextColor={"#222"}
            style={{ fontFamily: "Inter-SemiBold" }}
            secureTextEntry={true}
            onChangeText={setPassword}
          />

          <StyledPresable
            className="bg-[#25AEA6] rounded-md mt-8 w-60 px-2 py-2 justify-center items-center"
            onPress={handleLogin}
          >
            <Text className="text-lg" style={{ fontFamily: "Inter-Bold" }}>
              LOGIN
            </Text>
          </StyledPresable>
        </View>
      </View>
    </Screen>
  );
}
