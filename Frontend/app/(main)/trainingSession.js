import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { Screen } from "../../components/Screen";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { fetchExerciseSets } from "../../context/api/sets";
import Toast from "react-native-toast-message";
import { fetchRoutineExercises } from "../../context/api/exercises";
import { PauseIcon, PlayIcon, RestartIcon } from "../../utils/Icons";
import { styled } from "nativewind";
import { ExerciseImages } from "../../utils/ExerciseImages";
import { createWorkout } from "../../context/api/trainings";

export default function TrainingSession() {
  const { routine_id } = useLocalSearchParams();
  const router = useRouter();
  const StyledPresable = styled(Pressable);

  const [exercises, setExercises] = useState([]);
  const [sets, setSets] = useState([]);

  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!running) return;

    const timer = global.setTimeout(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => global.clearTimeout(timer);
  }, [seconds, running]);

  const formatTime = (secs) => {
    const min = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const sec = (secs % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  useEffect(() => {
    if (routine_id) {
      const getRoutineExercises = async () => {
        const [data, res] = await fetchRoutineExercises(routine_id);

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

        const setsResponse = await Promise.all(
          data.exercises.map(async (ex) => {
            const [dataSet, resSet] = await fetchExerciseSets(ex.id);

            if (resSet) {
              Toast.show({
                type: "error",
                text1: "Error",
                text2: dataSet.message,
                text1Style: { fontFamily: "Inter-Bold", fontSize: 12 },
                text2Style: { fontFamily: "Inter-SemiBold", fontSize: 11 },
                position: "top",
                animation: true,
                visibilityTime: 2000,
              });
              return [];
            }
            return dataSet.routine_exercises_sets || [];
          }),
        );

        setSets(setsResponse);

        const enrichedExercises = data.exercises.map((ex, index) => {
          return { ...ex, sets: setsResponse[index] };
        });

        setExercises(enrichedExercises);

        console.log("Rutina", data.exercises);
        console.log("Ejercicios de la rutina", data.exercises[0].exercise.name);
        console.log("Sets: ", setsResponse);
      };
      getRoutineExercises();
    }
  }, [routine_id]);

  const getExerciseImage = (id) => {
    return (
      ExerciseImages[id] ||
      require("../../assets/images/exercises/default.webp")
    );
  };

  const handleSetChange = (exerciseId, setOrder, field, value) => {};

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const request = {
        date: new Date().toISOString().split("T")[0],
        name: "Prueba",
        duration: seconds.toString(),
        routine_id: routine_id,
        volume_training: 1000,
      };

      const [data, res] = await createWorkout(request);

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
        setLoading(false);
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

      router.push("/(main)/(tabs)/training");
    } catch (error) {
      console.error("Error al crear el entrenamiento", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Error al crear el entrenamiento",
        text1Style: { fontFamily: "Inter-Bold", fontSize: 12 },
        text2Style: { fontFamily: "Inter-SemiBold", fontSize: 11 },
        position: "top",
        animation: true,
        visibilityTime: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen>
      {loading ? (
        <View className="flex-1 justify-center items-center mb-20">
          <ActivityIndicator size="large" color="#25AEA6" />
          <Text
            className="text-white text-md text-center mt-2"
            style={{ fontFamily: "Inter-SemiBold" }}
          >
            Terminando el entrenamiento...
          </Text>
        </View>
      ) : (
        <View className="flex-1 mx-7 mt-3">
          <View className="justify-center items-center mb-5">
            <View className="flex-row w-40 justify-center items-center bg-[#222] rounded-md py-3">
              <Text
                className="text-lg text-white"
                style={{ fontFamily: "Inter-Bold" }}
              >
                {formatTime(seconds)}
              </Text>

              <Pressable
                className="ml-5"
                onPress={() => setRunning((prev) => !prev)}
              >
                {running ? <PauseIcon /> : <PlayIcon />}
              </Pressable>

              <Pressable className="ml-5" onPress={() => setSeconds(0)}>
                <RestartIcon />
              </Pressable>
            </View>
          </View>

          <View className="flex-1">
            <FlatList
              data={exercises}
              keyExtractor={(exercise) => exercise.id.toString()}
              renderItem={({ item }) => (
                <View className="mb-3 bg-[#0f0f0f] rounded-lg p-4 border border-[#222]">
                  <View className="flex-row items-center mb-4 pb-2 border-b border-[#25AEA6]">
                    <Image
                      source={getExerciseImage(item.exercise.id)}
                      className="w-12 h-12 rounded-lg mr-3"
                    />
                    <Text
                      className="text-white text-lg flex-1"
                      style={{ fontFamily: "Inter-Bold" }}
                    >
                      {item.order}. {item.exercise.name}
                    </Text>
                  </View>

                  <View className="w-full flex-row mb-1 justify-center items-center">
                    {["Set", "Reps", "Peso"].map((col, i) => (
                      <Text
                        key={i}
                        style={{ fontFamily: "Inter-SemiBold" }}
                        className="flex-1 text-white text-md text-center"
                      >
                        {col}
                      </Text>
                    ))}
                  </View>

                  {item.sets && item.sets.length > 0 ? (
                    item.sets.map((set) => (
                      <View
                        key={set.id}
                        className="flex-row w-full justify-center items-center pt-1"
                      >
                        <Text
                          className="w-24 text-white text-center"
                          style={{ fontFamily: "Inter-SemiBold" }}
                        >
                          {set.order}
                        </Text>

                        <TextInput
                          className="flex-1 mx-4 text-white text-center bg-[#1c1c1c] rounded px-2 py-1"
                          style={{ fontFamily: "Inter-Regular", fontSize: 13 }}
                          placeholderTextColor="#888"
                          placeholder={set.reps?.toString() || "0"}
                          keyboardType="numeric"
                          onChangeText={(value) =>
                            handleSetChange(item.id, set.order, "reps", value)
                          }
                        />

                        <TextInput
                          className="flex-1 mx-4 text-white text-center bg-[#1c1c1c] rounded px-2 py-1"
                          style={{ fontFamily: "Inter-Regular", fontSize: 13 }}
                          placeholderTextColor="#888"
                          placeholder={set.weight?.toString() || "0"}
                          keyboardType="numeric"
                          onChangeText={(value) =>
                            handleSetChange(item.id, set.order, "weight", value)
                          }
                        />
                      </View>
                    ))
                  ) : (
                    <Text
                      className="text-white text-center mt-2"
                      style={{ fontFamily: "Inter-Regular" }}
                    >
                      No hay series registradas
                    </Text>
                  )}
                </View>
              )}
            />
          </View>

          <View className="flex-row justify-center items-center py-3 gap-3">
            <Pressable
              className="bg-[#25AEA6] rounded-md px-4 py-2 items-center"
              onPress={handleSubmit}
            >
              <Text
                className="text-black text-lg"
                style={{ fontFamily: "Inter-Bold" }}
              >
                Terminar
              </Text>
            </Pressable>

            <Pressable
              className="bg-red-500 rounded-md px-4 py-2 items-center"
              onPress={() => router.push("/(main)/(tabs)/training")}
            >
              <Text
                className="text-black text-lg"
                style={{ fontFamily: "Inter-Bold" }}
              >
                Cancelar
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </Screen>
  );
}
