import { Text, View, Pressable, TextInput, ScrollView } from "react-native";
import { Screen } from "../Screen";
import { useLocalSearchParams, useRouter } from "expo-router";
import { styled } from "nativewind";
import { BackIcon } from "../../utils/Icons";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { fetchExercises } from "../../context/api/exercises";
import ExerciseList from "../../app/(main)/exerciseList";

export function CreateRoutine() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [exercises, setExercises] = useState([]);
  const [sets, setSets] = useState([]);

  const StyledPresable = styled(Pressable);
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState([]);

  useEffect(() => {
    const getExercises = async () => {
      const [data, res] = await fetchExercises();

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

      setExercises(data.exercises);
    };

    getExercises();
  }, []);

  const handleSelectedExercise = (id) => {
    const exercise = exercises.find((ex) => ex.id === id);
    if (!exercise) return;

    if (!selectedExercises.some((ex) => ex.id === id)) {
      setSelectedExercises((prev) => [...prev, exercise]);
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No puede elegir el mismo ejercicio 2 veces",
        text1Style: { fontFamily: "Inter-Bold", fontSize: 12 },
        text2Style: { fontFamily: "Inter-SemiBold", fontSize: 11 },
        position: "top",
        animation: true,
        visibilityTime: 2000,
      });
      return;
    }

    console.log("Ejercicios: ", selectedExercises);
  };

  return (
    <Screen>
      <View className="items-start mx-10">
        <StyledPresable onPress={() => router.push("/(main)/(tabs)/training")}>
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

      {/* Contenedor para los ejercicios y la rutina */}
      <View className="w-full">
        <View className="justify-center items-start mt-8 mx-10">
          <Text
            className="text-[#25AEA6] text-xl"
            style={{ fontFamily: "Inter-Bold" }}
          >
            Ejercicios
          </Text>

          <StyledPresable
            className="bg-[#25AEA6] rounded-md p-2 mt-3 pressed:opacity-60"
            onPress={() => setIsModalVisible(true)}
          >
            <Text className="text-black" style={{ fontFamily: "Inter-Bold" }}>
              Añadir Ejercicio
            </Text>
          </StyledPresable>

          {/* Modal con la lista de ejercicios para elegir */}
          <ExerciseList
            visible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            exercises={exercises}
            onSelect={handleSelectedExercise}
          />
        </View>

        <ScrollView className="flex-1 mt-5 pb-80">
          {selectedExercises.map((ex, index) => (
            <View
              key={ex.id}
              className="justify-center items-start mx-10 mb-3 bg-[#0f0f0f] rounded-lg p-3 border border-[#222]"
            >
              <Text
                className="w-full text-white text-lg border-[#25AEA6] border-b"
                style={{ fontFamily: "Inter-Bold" }}
              >
                {index + 1}. {ex.name}
              </Text>
              <View className="w-full flex-row mt-2">
                {["Sets", "Peso", "Reps"].map((col, i) => (
                  <Text
                    key={i}
                    className="flex-1 text-white text-md text-center"
                    style={{ fontFamily: "Inter-Bold" }}
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
                    style={{ fontFamily: "Inter-Regular" }}
                  />
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </Screen>
  );
}
