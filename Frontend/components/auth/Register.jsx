import { View, Text, TextInput, Pressable, Image } from "react-native";
import { useState } from "react";
import { styled } from "nativewind";
import { useAuth } from "../../context/AuthContext";
import { Link } from "expo-router";
import { registerUser } from "../../context/api/auth";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Complete todos los campos",
        text1Style: { fontFamily: "Inter-Bold", fontSize: 12 },
        text2Style: { fontFamily: "Inter-SemiBold", fontSize: 11 },
        position: "top",
        animation: true,
        visibilityTime: 2000,
      });
      return;
    }

    try {
      const [data, res] = await registerUser(username, password, email, name);

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

      console.log("Registro exitoso");

      await AsyncStorage.setItem("userToken", data.token);
      await AsyncStorage.setItem("username", username);

      login(data.token);
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
    <View className="flex-1">
      <View className="flex-1 justify-center items-center mb-10">
        <Image
          source={require("../assets/images/PowerTrackIcon.png")}
          className="w-20 h-20 mb-5"
        />
        <View className="border-2 border-[#25AEA6] rounded-xl bg-[#0F0F0F] w-80 full py-14 justify-center items-center">
          <TextInput
            className="bg-[#54807D] rounded-md w-60 p-4 text-left text-black"
            placeholder="Nombre"
            placeholderTextColor={"#222"}
            style={{ fontFamily: "Inter-SemiBold" }}
            onChangeText={setName}
          />
          <TextInput
            className="bg-[#54807D] rounded-md mt-6 w-60 p-4 text-left text-black"
            placeholder="Username"
            placeholderTextColor={"#222"}
            style={{ fontFamily: "Inter-SemiBold" }}
            onChangeText={setUsername}
          />
          <TextInput
            className="bg-[#54807D] rounded-md mt-6 w-60 p-4 text-left text-black"
            placeholder="Email"
            placeholderTextColor={"#222"}
            style={{ fontFamily: "Inter-SemiBold" }}
            onChangeText={setEmail}
          />
          <TextInput
            className="bg-[#54807D] rounded-md mt-6 w-60 p-4 text-left text-black"
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
