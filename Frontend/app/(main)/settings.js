import { Pressable, Text, View } from "react-native";
import { Screen } from "../../components/Screen";
import { BackIcon } from "../../utils/Icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Logout } from "../../components/auth/Logout";

export default function Settings() {
  const router = useRouter();

  const [bodyFat, setBodyFat] = useState(0);
  const [username, setUsername] = useState("");
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);

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

          <Pressable className="py-3 border-b border-[#333]">
            <Text
              className="text-white"
              style={{
                fontFamily: "Inter-SemiBold",
              }}
            >
              Nombre de usuario: {username}
            </Text>
          </Pressable>

          <Pressable className="py-3 border-b border-[#333]">
            <Text
              className="text-white"
              style={{
                fontFamily: "Inter-SemiBold",
              }}
            >
              Peso corporal: {weight} kg
            </Text>
          </Pressable>

          <Pressable className="py-3 border-b border-[#333]">
            <Text
              className="text-white"
              style={{
                fontFamily: "Inter-SemiBold",
              }}
            >
              Altura: {height} cm
            </Text>
          </Pressable>

          <View className="py-3 border-b border-[#333]">
            <Text
              className="text-white"
              style={{
                fontFamily: "Inter-SemiBold",
              }}
            >
              Grasa corporal: {bodyFat}%
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
