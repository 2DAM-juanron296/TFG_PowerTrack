import { View, Text, Pressable, FlatList } from "react-native";
import { Screen } from "../../../components/Screen";
import { styled } from "nativewind";
import { useEffect, useState } from "react";
import { RoutineCard } from "../../../components/routines/RoutineCard";
import { useRouter } from "expo-router";
import { fetchUserRoutines } from "../../../context/api/user";
import Toast from "react-native-toast-message";

export default function Index() {
  const StyledPresable = styled(Pressable);
  const router = useRouter();

  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    const getRoutines = async () => {
      const [data, res] = await fetchUserRoutines();

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

    getRoutines();
  }, []);

  return (
    <Screen>
      <View className="justify-start items-start mx-10 mt-16">
        <Text
          className="text-2xl mb-8 text-[#25AEA6]"
          style={{ fontFamily: "Inter-SemiBold" }}
        >
          Rutinas
        </Text>
      </View>

      <View className="flex flex-row justify-center items-center w-full">
        <StyledPresable
          onPress={() => router.push("/(main)/createRoutine")}
          className="flex-1 justify-center items-center border bg-[#0f0f0f] rounded-lg p-4 ml-10"
        >
          <Text
            className="text-white text-lg"
            style={{ fontFamily: "Inter-SemiBold" }}
          >
            Nueva Rutina
          </Text>
        </StyledPresable>

        <StyledPresable
          onPress={() => router.push("/(main)/exploreRoutine")}
          className="flex-1 justify-center items-center border bg-[#0f0f0f] rounded-lg p-4 ml-6 mr-10"
        >
          <Text
            className="text-white text-lg"
            style={{ fontFamily: "Inter-SemiBold" }}
          >
            Explorar
          </Text>
        </StyledPresable>
      </View>

      <View className="justify-start items-start mx-10 mt-20">
        <Text
          className="text-2xl mb-8 text-[#25AEA6]"
          style={{ fontFamily: "Inter-SemiBold" }}
        >
          Mis Rutinas
        </Text>

        {routines.length === 0 ? (
          <View className="flex-row justify-center items-center w-full mt-5">
            <Text
              className="text-white text-md"
              style={{ fontFamily: "Inter-Bold" }}
            >
              NO HAY RUTINAS ACTUALMENTE
            </Text>
          </View>
        ) : (
          <FlatList
            data={routines}
            keyExtractor={(routine) => routine}
            renderItem={({ item }) => (
              <View className="items-center">
                <RoutineCard
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
