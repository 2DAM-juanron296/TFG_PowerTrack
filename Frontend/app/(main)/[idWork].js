import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, View, Pressable, FlatList, Image } from "react-native";
import { styled } from "nativewind";
import {
  fetchRoutineExercises,
  fetchWorkoutExercises,
} from "../../context/api/exercises";
import Toast from "react-native-toast-message";
import { BackIcon } from "../../utils/Icons";
import {
  fetchExerciseSets,
  fetchWorkoutExerciseSets,
} from "../../context/api/sets";
import { ExerciseImages } from "../../utils/ExerciseImages";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { deleteRoutine } from "../../context/api/routines";

export default function Detail() {
  const StyledPresable = styled(Pressable);
  const {
    idWork,
    from,
    routineName,
    work,
    date,
    type,
    workoutName,
    volume,
    duration,
    history,
  } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [reps, setReps] = useState(0);
  const [exercises, setExercises] = useState([]);

  const parsedHistory = history === "true";

  const getExerciseImage = (id) => {
    return (
      ExerciseImages[id] ||
      require("../../assets/images/exercises/default.webp")
    );
  };

  useEffect(() => {
    if (idWork && work !== "workout") {
      const getRoutineExercises = async () => {
        const [data, res] = await fetchRoutineExercises(idWork);

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
      };
      getRoutineExercises();
    } else if (work === "workout") {
      const getWorkoutExercises = async () => {
        const [data, res] = await fetchWorkoutExercises(idWork);

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

        const setsResponse = await Promise.all(
          data.exercises.map(async (ex) => {
            const [dataSet, resSet] = await fetchWorkoutExerciseSets(ex.id);

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
            return dataSet.workout_exercise_sets || [];
          }),
        );

        const totalReps = setsResponse
          .flat()
          .reduce((sum, set) => sum + (set.reps || 0), 0);

        setReps(totalReps);

        const enrichedExercises = data.exercises.map((ex, index) => {
          return { ...ex, sets: setsResponse[index] };
        });

        setExercises(enrichedExercises);
      };
      getWorkoutExercises();
    }
  }, [idWork, work]);

  const formatTime = (secs) => {
    const min = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const sec = (secs % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  const formatDate = (dateString) => {
    const months = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiempre",
      "octubre",
      "noviembre",
      "diciembre",
    ];

    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} de ${month} de ${year}`;
  };

  const handleDeleteRoutine = async (id) => {
    try {
      const [data, res] = await deleteRoutine(id);
    } catch (error) {
      console.error("Error al eliminar la rutina: ", error);
    }
  };

  const handleBack = () => {
    if (from === "training" && work !== "workout" && parsedHistory === false) {
      router.push("/(main)/(tabs)/training");
    } else if (work !== "workout" && parsedHistory === false) {
      router.push("/(main)/exploreRoutine");
    } else if (parsedHistory === false) {
      router.push("/(main)/(tabs)/home");
    } else {
      router.push("/(main)/trainHistory");
    }
  };

  return (
    <View className="flex-1 mx-7 mt-5">
      <StyledPresable onPress={handleBack}>
        <BackIcon />
      </StyledPresable>

      {work === "workout" ? (
        <View>
          <Text
            className="text-2xl text-white mt-5"
            style={{ fontFamily: "Inter-Bold" }}
          >
            {workoutName}
          </Text>
          <Text
            className="text-md text-white mt-1"
            style={{ fontFamily: "Inter-Bold" }}
          >
            {type}
          </Text>
          <Text
            className="text-md text-[#999] mt-2 mb-3"
            style={{ fontFamily: "Inter-SemiBold" }}
          >
            {formatDate(date)}
          </Text>
          <View className="mb-3 border-b border-gray-600" />
        </View>
      ) : (
        <>
          <View className="flex-row justify-between items-center mt-7 mb-4">
            <Text
              className="text-2xl text-white"
              style={{ fontFamily: "Inter-Bold" }}
            >
              {routineName}
            </Text>

            <Pressable
              className="bg-red-500 justify-center items-center px-2 py-1 rounded-md"
              onPress={handleDeleteRoutine}
            >
              <Text
                className="text-black text-md"
                style={{ fontFamily: "Inter-Bold" }}
              >
                Eliminar
              </Text>
            </Pressable>
          </View>

          <View className="mb-4 border-b border-gray-600 pb-2">
            <Text
              className="text-xl text-white"
              style={{ fontFamily: "Inter-Bold" }}
            >
              Ejercicios
            </Text>
          </View>
        </>
      )}

      {work === "workout" ? (
        <View className="flex-row justify-between mt-1 mb-6 p-2 rounded-lg border border-[#222] bg-[#0f0f0f]">
          <View>
            <Text
              className="text-md text-[#999]"
              style={{ fontFamily: "Inter-SemiBold" }}
            >
              Volumen Total
            </Text>
            <Text
              className="text-md text-white"
              style={{ fontFamily: "Inter-SemiBold" }}
            >
              {volume} kg
            </Text>
          </View>

          <View>
            <Text
              className="text-md text-[#999]"
              style={{ fontFamily: "Inter-SemiBold" }}
            >
              Repeticiones
            </Text>
            <Text
              className="text-md text-white"
              style={{ fontFamily: "Inter-SemiBold" }}
            >
              {reps}
            </Text>
          </View>

          <View>
            <Text
              className="text-md text-[#999]"
              style={{ fontFamily: "Inter-SemiBold" }}
            >
              Duración
            </Text>
            <Text
              className="text-md text-white"
              style={{ fontFamily: "Inter-SemiBold" }}
            >
              {formatTime(duration)} min
            </Text>
          </View>
        </View>
      ) : (
        ""
      )}

      <FlatList
        data={exercises}
        keyExtractor={(exercise) => exercise.id.toString()}
        contentContainerStyle={{ paddingBottom: insets.bottom }}
        renderItem={({ item }) => (
          <View className="mb-3 border border-[#222] bg-[#0f0f0f] rounded-lg p-4">
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
                {item.sets?.length > 0 ? (
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
  );
}
