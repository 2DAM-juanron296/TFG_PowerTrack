import { Text, View, Pressable } from "react-native";
import { styled } from "nativewind";
import { useEffect, useState } from "react";
import { fetchRoutineName } from "../../context/api/routines";
import { useRouter } from "expo-router";
import { DeleteIcon } from "../../utils/Icons";
import { deleteWorkout } from "../../context/api/trainings";
import Toast from "react-native-toast-message";

const routineNameCache = {};

export function TrainingCard({ workout, history, setTrainings }) {
  const StyledPresable = styled(Pressable);
  const router = useRouter();

  const [name, setName] = useState(
    routineNameCache[workout.routine_id] ?? null,
  );

  useEffect(() => {
    if (routineNameCache[workout.routine_id]) return;

    async function getRoutineName() {
      const [data, res] = await fetchRoutineName(workout.routine_id);

      if (res) {
        console.log("Error obteniendo el nombre de la rutina");
        return;
      }

      routineNameCache[workout.routine_id] = data.name;
      setName(data.name);
    }

    getRoutineName();
  }, [workout.routine_id]);

  const handleDelete = async () => {
    try {
      const [data, res] = await deleteWorkout(workout.id);

      if (res) {
        console.log("Error al obtener los entrenamientos", data.message);
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

      setTrainings((prev) => prev.filter((item) => item.id !== workout.id));

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
    } catch (e) {
      console.error("Error: ", e);
    }
  };

  return (
    <View className="w-full">
      <StyledPresable
        onPress={() =>
          router.push({
            pathname: `/(main)/${workout.id}`,
            params: {
              work: "workout",
              volume: workout.volume_training,
              duration: workout.duration,
              date: workout.date,
              type: name,
              workoutName: workout.name,
              history: history,
            },
          })
        }
        className="border border-[#222] mb-2 bg-[#0f0f0f] rounded-lg p-4"
        style={{ minWidth: "100%" }}
      >
        <View className="flex-row justify-between items-center">
          <View>
            <Text
              className="text-white text-lg"
              style={{ fontFamily: "Inter-SemiBold" }}
            >
              {workout.name ?? "Entreno..."}
            </Text>
            <Text
              className="text-white text-xs pt-1"
              style={{ fontFamily: "Inter-SemiBold" }}
            >
              {history
                ? `${name || "Rutina..."} - ${workout.date}`
                : name || "Rutina..."}
            </Text>
          </View>

          {history ? (
            <Pressable
              onPress={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              className="bg-red-500 rounded-md p-1 justify-center items-center"
              style={{ fontFamily: "Inter-SemiBold" }}
            >
              <DeleteIcon />
            </Pressable>
          ) : (
            <Text
              className="text-white text-md"
              style={{ fontFamily: "Inter-SemiBold" }}
            >
              {workout.date}
            </Text>
          )}
        </View>
      </StyledPresable>
    </View>
  );
}
