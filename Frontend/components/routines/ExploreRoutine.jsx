import { Text, View, Pressable, FlatList } from "react-native";
import { Screen } from "../Screen";
import { useRouter } from "expo-router";
import { styled } from "nativewind";
import { BackIcon } from "../Icons";
import { useEffect, useState } from "react";
import { fetchDefaultRoutines } from "../../context/api/routines";
import Toast from "react-native-toast-message";
import { DefaultRoutineCard } from "./DefaultRoutineCard";

export function ExploreRoutine() {
  const [routines, setRoutines] = useState([]);
  const StyledPresable = styled(Pressable);
  const router = useRouter();

  useEffect(() => {
    const getDefaultRoutines = async () => {
      const [data, res] = await fetchDefaultRoutines();

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

      setRoutines(data.routines);
    };

    getDefaultRoutines();
  }, []);

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
          Rutinas Predefinidas
        </Text>
      </View>

      <View className="mx-8 justify-center items-start">
        {routines.length === 0 ? (
          <View className="flex-row justify-center items-center w-full mt-10">
            <Text
              className="text-white text-md"
              style={{ fontFamily: "Inter-Bold" }}
            >
              NO HAY RUTINAS ACTUALMENTE
            </Text>
          </View>
        ) : (
          <FlatList
            className="mt-10"
            data={routines}
            keyExtractor={(routine) => routine.id}
            renderItem={({ item }) => (
              <View className="items-center">
                <DefaultRoutineCard
                  name={item.name}
                  description={item.description}
                  id={item.id}
                />
              </View>
            )}
          />
        )}
      </View>
    </Screen>
  );
}
