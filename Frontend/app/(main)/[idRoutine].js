import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, View, Pressable, FlatList, Image } from "react-native";
import { styled } from "nativewind";
import { fetchRoutineExercises } from "../../context/api/exercises";
import Toast from "react-native-toast-message";
import { BackIcon } from "../../components/Icons";
import { fetchExerciseSets } from "../../context/api/sets";

export default function DetailRoutine() {
  const StyledPresable = styled(Pressable);
  const { idRoutine } = useLocalSearchParams();

  const router = useRouter();

  const [exercises, setExercises] = useState([]);

  const exerciseImages = {
    1: require("../../assets/images/exercises/1.webp"),
    2: require("../../assets/images/exercises/2.webp"),
    3: require("../../assets/images/exercises/3.webp"),
    4: require("../../assets/images/exercises/4.webp"),
    5: require("../../assets/images/exercises/5.webp"),
    6: require("../../assets/images/exercises/6.webp"),
    7: require("../../assets/images/exercises/7.webp"),
    8: require("../../assets/images/exercises/8.webp"),
    9: require("../../assets/images/exercises/9.webp"),
    10: require("../../assets/images/exercises/10.webp"),
    11: require("../../assets/images/exercises/11.webp"),
    12: require("../../assets/images/exercises/12.webp"),
    13: require("../../assets/images/exercises/13.webp"),
    14: require("../../assets/images/exercises/14.webp"),
    15: require("../../assets/images/exercises/15.webp"),
    16: require("../../assets/images/exercises/16.webp"),
    17: require("../../assets/images/exercises/17.webp"),
    18: require("../../assets/images/exercises/18.webp"),
    19: require("../../assets/images/exercises/19.webp"),
    20: require("../../assets/images/exercises/20.webp"),
  };

  const getExerciseImage = (id) => {
    return (
      exerciseImages[id] ||
      require("../../assets/images/exercises/default.webp")
    );
  };

  useEffect(() => {
    if (idRoutine) {
      const getRoutineExercises = async () => {
        const [data, res] = await fetchRoutineExercises(idRoutine);

        if (res) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: data.message,
            text1Style: { fontFamily: "Inter-Bold", fontSize: 12 },
            text2Style: { fontFamily: "Inter-SemiBold", fontSize: 11 },
            position: "top",
            animation: true,
            visibilityTime: 5000,
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
          visibilityTime: 5000,
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
                visibilityTime: 5000,
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
  }, [idRoutine]);

  return (
    <View className="mx-7 mt-5">
      <StyledPresable
        onPress={() => router.back()}
        style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
      >
        <BackIcon />
      </StyledPresable>

      <View className="mt-10">
        <View className="justify-start items-start mb-5">
          <Text
            className="text-2xl text-[#25AEA6]"
            style={{ fontFamily: "Inter-Bold" }}
          >
            Ejercicios
          </Text>
        </View>
        <FlatList
          data={exercises}
          keyExtractor={(exercise) => exercise.id}
          renderItem={({ item }) => (
            <View className="mb-5 border border-[#222] bg-[#0f0f0f] rounded-lg p-4">
              <View className="flex-row items-center">
                <Image
                  source={getExerciseImage(item.exercise.id)}
                  className="w-24 h-24 rounded-lg mr-[15px]"
                />

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
  );
}
