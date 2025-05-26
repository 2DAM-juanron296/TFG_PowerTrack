import { Text, View, Pressable } from "react-native";
import { styled } from "nativewind";
import { useEffect, useState } from "react";
import { fetchRoutineName } from "../../context/api/routines";
import { useRouter } from "expo-router";

export function TrainingCard({ workout }) {
  const StyledPresable = styled(Pressable);
  const router = useRouter();

  const [name, setName] = useState(null);

  useEffect(() => {
    async function getRoutineName() {
      const [data, res] = await fetchRoutineName(workout.routine_id);

      if (res) {
        console.log("Error obteniendo el nombre de la rutina");
        return;
      }

      setName(data.name);
    }

    getRoutineName();
  }, [workout.routine_id]);

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
              {name || "Rutina..."}
            </Text>
          </View>

          <Text
            className="text-white text-md"
            style={{ fontFamily: "Inter-SemiBold" }}
          >
            {workout.date}
          </Text>
        </View>
      </StyledPresable>
    </View>
  );
}
