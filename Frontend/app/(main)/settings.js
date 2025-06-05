import { Pressable, Text, View } from "react-native";
import { Screen } from "../../components/Screen";
import { BackIcon } from "../../utils/Icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Logout } from "../../components/auth/Logout";
import { fetchUserProgress } from "../../context/api/user";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Settings() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [weight, setWeight] = useState(null);
  const [height, setHeight] = useState(null);
  const [bodyFat, setBodyFat] = useState(null);

  useEffect(() => {
    const getUserProgress = async () => {
      const user = await AsyncStorage.getItem("username");
      const [data, res] = await fetchUserProgress();

      if (res) {
        console.error("Error, ", data.message);
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

      console.log("Datos user", data.user);
      console.log("Datos progress", data.progress);

      setName(data.user.name);
      setUsername(user);
      setEmail(data.user.email);
      setWeight(data.progress.weight);
      setHeight(data.progress.height);
      setBodyFat(data.progress.body_fat);
    };

    getUserProgress();
  }, []);

  return (
    <Screen>
      <View className="mx-10">
        <Pressable onPress={() => router.push("/(main)/(tabs)/home")}>
          <BackIcon />
        </Pressable>

        <View className="mb-6 mt-4">
          <Text
            className="text-xl text-[#25AEA6] mb-2"
            style={{ fontFamily: "Inter-Bold" }}
          >
            Mi Perfil
          </Text>

          <Text
            className="text-white py-3 border-b border-[#333]"
            style={{
              fontFamily: "Inter-SemiBold",
            }}
          >
            Nombre Completo: {name ?? ""}
          </Text>

          <Text
            className="text-white py-3 border-b border-[#333]"
            style={{
              fontFamily: "Inter-SemiBold",
            }}
          >
            Nombre de usuario: {username ?? ""}
          </Text>

          <Text
            className="text-white py-3 border-b border-[#333]"
            style={{
              fontFamily: "Inter-SemiBold",
            }}
          >
            Peso corporal: {weight ?? 0} kg
          </Text>

          <Text
            className="text-white py-3 border-b border-[#333]"
            style={{
              fontFamily: "Inter-SemiBold",
            }}
          >
            Altura: {height ?? 0} cm
          </Text>

          <View className="py-3 border-b border-[#333]">
            <Text
              className="text-white"
              style={{
                fontFamily: "Inter-SemiBold",
              }}
            >
              Grasa corporal: {bodyFat ?? 0} %
            </Text>
          </View>
        </View>

        <View className="my-20">
          <Text
            className="text-white text-lg"
            style={{
              fontFamily: "Inter-SemiBold",
            }}
          >
            GRÁFICO
          </Text>
        </View>

        {/* Cuenta */}
        <View className="mb-6 mt-3">
          <Text
            className="text-xl text-[#25AEA6] mb-2"
            style={{ fontFamily: "Inter-Bold" }}
          >
            Cuenta
          </Text>

          <Pressable
            onPress={() =>
              router.push({
                pathname: "/(main)/userData",
                params: {
                  username: username,
                  name: name,
                  email: email,
                  weight: weight,
                  height: height,
                  bodyFat: bodyFat,
                },
              })
            }
            className="py-3 border-b border-[#333]"
          >
            <Text
              className="text-white"
              style={{
                fontFamily: "Inter-Bold",
              }}
            >
              Actualizar datos
            </Text>
          </Pressable>

          <Logout />

          <Pressable className="py-3 border-b border-[#333]">
            <Text
              className="text-red-500"
              style={{
                fontFamily: "Inter-Bold",
              }}
            >
              Eliminar cuenta
            </Text>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}
