import { Text, View, Pressable, TextInput } from "react-native";
import { Screen } from "../Screen";
import { useRouter } from "expo-router";
import { styled } from "nativewind";
import { BackIcon } from "../../utils/Icons";
import { useState } from "react";

export function CreateRoutine() {
  const StyledPresable = styled(Pressable);
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [exercises, setExercises] = useState([]);
  const [sets, setSets] = useState([]);

  return (
    <Screen>
      <View className="items-start mx-10">
        <StyledPresable
          onPress={() => router.push("/(main)/(tabs)/training")}
          style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
        >
          <BackIcon />
        </StyledPresable>

        <Text
          className="text-[#25AEA6] text-2xl mt-6"
          style={{ fontFamily: "Inter-Bold" }}
        >
          Nueva Rutina
        </Text>
      </View>

      {/* Contenedor para el nombre y la descripción */}
      <View className="justify-center items-center mt-7 mx-10">
        <View className="w-full">
          <Text
            className="text-white mb-1"
            style={{ fontFamily: "Inter-Bold" }}
          >
            Nombre
          </Text>
          <TextInput
            className="rounded-md p-2 text-left text-black bg-white"
            style={{ fontFamily: "Inter-SemiBold" }}
            onChangeText={setName}
          />
        </View>

        <View className="w-full mt-5">
          <Text
            className="text-white mb-1"
            style={{ fontFamily: "Inter-Bold" }}
          >
            Descripción
          </Text>
          <TextInput
            className="rounded-md p-2 text-left text-black bg-white"
            style={{ fontFamily: "Inter-SemiBold" }}
            numberOfLines={3}
            onChangeText={setDescription}
          />
        </View>
      </View>

      {/* Contenedor para elegir los ejercicios */}
      <View className="w-full">
        <View className="justify-center items-start mt-8 mx-10">
          <Text
            className="text-[#25AEA6] text-xl"
            style={{ fontFamily: "Inter-Bold" }}
          >
            Ejercicios
          </Text>

          <StyledPresable className="bg-[#25AEA6] rounded-md p-2 mt-3">
            <Text className="text-black" style={{ fontFamily: "Inter-Bold" }}>
              Añadir Ejercicio
            </Text>
          </StyledPresable>
        </View>
      </View>

      {/* Contenedor para visualizar los ejercicios de la rutina */}
      <View className="w-full">
        <View className="justify-center items-start mx-10 mt-5 bg-[#0f0f0f] rounded-lg p-3 border border-[#222]">
          <Text
            className="w-full text-white text-lg border-[#25AEA6] border-b"
            style={{ fontFamily: "Inter-Bold" }}
          >
            1. Press banca
          </Text>
          <View className="w-full flex-row mt-2">
            {["Sets", "Peso", "Reps"].map((col, i) => (
              <Text
                key={i}
                className="flex-1 text-white text-md text-center"
                style={{
                  fontFamily: "Inter-Bold",
                }}
              >
                {col}
              </Text>
            ))}
          </View>

          <View className="w-full flex-row mt-2">
            {[0, 1, 2].map((i) => (
              <TextInput
                key={i}
                className="flex-1 mx-1 text-white text-center bg-[#1c1c1c] rounded-md px-2 py-1"
                placeholder="0"
                placeholderTextColor="#777"
                keyboardType="numeric"
                style={{
                  fontFamily: "Inter-Regular",
                }}
              />
            ))}
          </View>
        </View>
      </View>
    </Screen>
  );
}
