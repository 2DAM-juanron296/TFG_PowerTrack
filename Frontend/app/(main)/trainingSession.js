import { FlatList, Pressable, Text, View } from "react-native";
import { Screen } from "../../components/Screen";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { fetchExerciseSets } from "../../context/api/sets";
import Toast from "react-native-toast-message";
import { fetchRoutineExercises } from "../../context/api/exercises";
import { BackIcon } from "../../utils/Icons";
import { styled } from "nativewind";

export default function TrainingSession() {
  const { routine_id } = useLocalSearchParams();
  const router = useRouter();
  const [exercises, setExercises] = useState([]);
  const StyledPresable = styled(Pressable);

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

  return (
    <Screen>
      <View className="mx-7 mt-5">
        <StyledPresable onPress={() => router.push("/(main)/(tabs)/training")}>
          <BackIcon />
        </StyledPresable>

        <View className="mt-5">
          <View className="justify-center items-center mb-5">
            <Text
              className="text-2xl text-[#25AEA6]"
              style={{ fontFamily: "Inter-Bold" }}
            >
              Entrenamiento
            </Text>
          </View>
          <FlatList
            data={exercises}
            keyExtractor={(exercise) => exercise.id}
            renderItem={({ item }) => (
              <View className="mb-5 border border-[#222] bg-[#0f0f0f] rounded-lg p-4">
                <View className="flex-row items-center">
                  <View className="flex-1">
                    <Text
                      className="text-white text-xl pb-3"
                      style={{ fontFamily: "Inter-SemiBold" }}
                    >
                      {item.order}. {item.exercise.name}
                    </Text>

                    {item.sets && item.sets.length > 0 ? (
                      item.sets.map((set) => (
                        <Text
                          key={set.id}
                          className="text-white pb-1"
                          style={{ fontFamily: "Inter-Regular", fontSize: 14 }}
                        >
                          Serie {set.order}: {set.reps} reps - {set.weight} kg
                        </Text>
                      ))
                    ) : (
                      <Text
                        className="text-white pb-1"
                        style={{ fontFamily: "Inter-Regular", fontSize: 14 }}
                      >
                        No hay series registradas
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </Screen>
  );
}
