import { Pressable, Text, TextInput, View } from "react-native";
import { Screen } from "../../components/Screen";
import { BackIcon } from "../../utils/Icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { updateUserData, updateUserProgress } from "../../context/api/user";
import Toast from "react-native-toast-message";

export default function UserData() {
  const router = useRouter();

  const {
    username: u,
    name: n,
    email: e,
    weight: w,
    height: h,
    bodyFat: bf,
  } = useLocalSearchParams();

  const [name, setName] = useState(n?.toString() || "");
  const [username, setUsername] = useState(u?.toString() || "");
  const [email, setEmail] = useState(e?.toString() || "");

  const [weight, setWeight] = useState(w?.toString() || "0");
  const [height, setHeight] = useState(h?.toString() || "0");
  const [bodyFat, setBodyFat] = useState(bf?.toString() || "0");

  useEffect(() => {
    const peso = parseFloat(weight);
    const altura = parseFloat(height);

    if (!isNaN(peso) && peso > 0 && !isNaN(altura) && altura > 0) {
      const alturaEnMetros = altura / 100;
      const imc = peso / (alturaEnMetros * alturaEnMetros);
      setBodyFat(imc.toFixed(2).toString());
    } else {
      setBodyFat(0);
    }
  }, [weight, height]);

  const handleUpdateUser = async () => {
    const reqUser = {
      name: name,
      username: username,
      email: email,
    };

    const [data, res] = await updateUserData(reqUser);

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

    console.log("Usuario actualizado: ", data.user);
  };

  const handleUpdateProgress = async () => {
    const reqProgress = {
      weight: weight,
      height: height,
      body_fat: bodyFat,
    };

    const [data, res] = await updateUserProgress(reqProgress);

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

    console.log("Progreso actualizado: ", data.progress);
  };

  return (
    <Screen>
      <View className="mx-10">
        <Pressable onPress={() => router.push("/(main)/settings")}>
          <BackIcon />
        </Pressable>

        <View className="mt-5">
          <Text
            className="text-xl text-[#25AEA6]"
            style={{
              fontFamily: "Inter-Bold",
            }}
          >
            Datos de Usuario
          </Text>

          <View className="mt-4">
            <Text
              className="text-white"
              style={{
                fontFamily: "Inter-SemiBold",
              }}
            >
              Nombre Completo
            </Text>
            <TextInput
              className="bg-white text-black rounded text-left p-2 mt-1"
              value={name}
              onChangeText={setName}
              style={{ fontFamily: "Inter-SemiBold" }}
            />
          </View>

          <View className="my-3">
            <Text
              className="text-white"
              style={{
                fontFamily: "Inter-SemiBold",
              }}
            >
              Nombre de Usuario
            </Text>
            <TextInput
              className="bg-white text-black rounded text-left p-2 mt-1"
              value={username}
              onChangeText={setUsername}
              style={{ fontFamily: "Inter-SemiBold" }}
            />
          </View>
          <View>
            <Text
              className="text-white"
              style={{
                fontFamily: "Inter-SemiBold",
              }}
            >
              Correo Electrónico
            </Text>
            <TextInput
              className="bg-white text-black rounded text-left p-2 mt-1"
              value={email}
              onChangeText={setEmail}
              style={{ fontFamily: "Inter-SemiBold" }}
            />
          </View>
        </View>

        <View className="my-10">
          <Pressable
            onPress={handleUpdateUser}
            className="bg-[#25AEA6] rounded-md px-4 py-2 items-center"
          >
            <Text
              className="text-black text-lg"
              style={{ fontFamily: "Inter-Bold" }}
            >
              Actualizar Datos
            </Text>
          </Pressable>
        </View>

        <View className="mt-2">
          <Text
            className="text-xl text-[#25AEA6]"
            style={{
              fontFamily: "Inter-Bold",
            }}
          >
            Progreso
          </Text>

          {/* Peso y Altura en la misma fila */}
          <View className="flex-row justify-between mt-4 space-x-2">
            <View className="flex-1">
              <Text
                className="text-white"
                style={{ fontFamily: "Inter-SemiBold" }}
              >
                Peso (kg)
              </Text>
              <TextInput
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
                className="bg-white text-black rounded text-left p-2 mt-1"
                style={{ fontFamily: "Inter-SemiBold" }}
              />
            </View>

            <View className="flex-1">
              <Text
                className="text-white"
                style={{ fontFamily: "Inter-SemiBold" }}
              >
                Altura (cm)
              </Text>
              <TextInput
                value={height}
                onChangeText={setHeight}
                keyboardType="numeric"
                className="bg-white text-black rounded text-left p-2 mt-1"
                style={{ fontFamily: "Inter-SemiBold" }}
              />
            </View>
          </View>

          {/* IMC */}
          <View className="mt-4">
            <Text
              editable={false}
              className="text-white"
              style={{ fontFamily: "Inter-SemiBold" }}
            >
              Masa corporal (IMC): {bodyFat}
            </Text>
          </View>
        </View>

        <View className="mt-10">
          <Pressable
            onPress={handleUpdateProgress}
            className="bg-[#25AEA6] rounded-md px-4 py-2 items-center"
          >
            <Text
              className="text-black text-lg"
              style={{ fontFamily: "Inter-Bold" }}
            >
              Actualizar Progreso
            </Text>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}
