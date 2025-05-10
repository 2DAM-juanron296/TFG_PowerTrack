import { View, Text, TextInput, Pressable, Image } from "react-native";
import { useState } from "react";
import { Screen } from "../Screen";
import { styled } from "nativewind";
import { useAuth } from "../../context/AuthContext";
import { Link } from "expo-router";
import Toast from "react-native-toast-message";
import { loginUser } from "../../context/api/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Login({ onSuccess }) {
  const StyledPressable = styled(Pressable);
  const [isDisabled, setIsDisabled] = useState(false);
  const { login } = useAuth();

  // Variables para el Login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    setIsDisabled(true);

    if (!username || !password) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Debe completar ambos campos",
        text1Style: { fontFamily: "Inter-Bold", fontSize: 12 },
        text2Style: { fontFamily: "Inter-SemiBold", fontSize: 11 },
        position: "top",
        animation: true,
        visibilityTime: 2000,
      });
      setIsDisabled(false);
      return;
    }
    console.log("Username: ", username);
    console.log("Password: ", password);

    try {
      const [data, res] = await loginUser(username, password);

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
        setIsDisabled(false);
        return;
      }

      Toast.show({
        type: "success",
        text1: "Éxito",
        text2: data.message,
        text1Style: { fontFamily: "Inter-Bold", fontSize: 12 },
        text2Style: { fontFamily: "Inter-SemiBold", fontSize: 11 },
        position: "top",
        animation: true,
        visibilityTime: 2000,
      });

      console.log("Login exitoso");
      console.log("Token:", data.token);
      console.log("User:", data.user);

      await AsyncStorage.setItem("userToken", data.token);
      await AsyncStorage.setItem("username", data.user.username);
      await AsyncStorage.setItem("id_user", data.user.id.toString());

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
      setIsDisabled(false);
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
            className="bg-[#54807D] rounded-md w-60 p-4 text-left text-black"
            placeholder="Username"
            placeholderTextColor={"#222"}
            style={{ fontFamily: "Inter-SemiBold" }}
            onChangeText={setUsername}
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
            className={`bg-[#25AEA6] rounded-md mt-8 w-64 px-2 py-3 justify-center items-center transition-opacity ${isDisabled ? "opacity-75" : ""}`}
            onPress={handleLogin}
            style={{
              transition: "opacity 0.5s ease",
            }}
            disabled={isDisabled}
          >
            <Text className="text-lg" style={{ fontFamily: "Inter-Bold" }}>
              {isDisabled ? "Iniciando Sesión..." : "LOGIN"}
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
