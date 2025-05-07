import { useEffect, useRef, useState } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import { Text, View, Animated, Pressable, FlatList } from "react-native";
import { styled } from "nativewind";
import { fetchRoutineExercises } from "../../context/api/exercises";
import Toast from "react-native-toast-message";
import { HomeIcon } from "../../components/Icons";

export default function DetailRoutine() {
  const StyledPresable = styled(Pressable);
  const { idRoutine } = useLocalSearchParams();

  const [exercises, setExercises] = useState([]);

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
            position: "bottom",
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
          position: "bottom",
          animation: true,
          visibilityTime: 5000,
        });

        console.log("Rutina", data.exercises);
        console.log("Ejercicios de la rutina", data.exercises[0].exercise.name);

        setExercises(data.exercises);
      };
      getRoutineExercises();
    }
  }, [idRoutine]);

  return (
    <View className="mx-7 mt-5">
      <Link asChild href="/">
        <StyledPresable
          style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
        >
          <HomeIcon />
        </StyledPresable>
      </Link>

      <View className="mt-10">
        <FlatList
          data={exercises}
          keyExtractor={(exercise) => exercise.id}
          renderItem={({ item }) => (
            <View className="items-center mb-5">
              <Text
                className="text-white text-xl"
                style={{ fontFamily: "Inter-SemiBold" }}
              >
                {item.order}. {item.exercise.name}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}
