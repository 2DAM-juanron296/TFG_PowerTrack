import { Text, View, Pressable, FlatList, ScrollView } from "react-native";
import { Screen } from "./Screen";
import { Link } from "expo-router";
import { styled } from "nativewind";
import { HomeIcon } from "../components/Icons";
import { useEffect, useState } from "react";
import { fetchDefaultRoutines } from "../context/api/routines";
import Toast from "react-native-toast-message";
import { DefaultRoutineCard } from "./DefaultRoutineCard";

export function ExploreRoutine() {
  const [routines, setRoutines] = useState([]);
  const StyledPresable = styled(Pressable);

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

      setRoutines(data.routines);
    };

    getDefaultRoutines();
  }, []);

  return (
    <Screen>
      <View className="items-start mx-10">
        <Link asChild href="/">
          <StyledPresable
            style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
          >
            <HomeIcon />
          </StyledPresable>
        </Link>

        <Text
          className="text-[#25AEA6] text-2xl mt-10"
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
