import {
  View,
  Text,
  Pressable,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Screen } from "../../../components/Screen";
import { styled } from "nativewind";
import { useState } from "react";
import { RoutineCard } from "../../../components/RoutineCard";
import { Link, useRouter } from "expo-router";

export default function Index() {
  const StyledPresable = styled(Pressable);
  const router = useRouter();

  const [routines, setRoutines] = useState(["buenas"]);
  const [loading, setLoading] = useState(false);

  const handleNavigation = (route) => {
    setLoading(true);

    global.setTimeout(() => {
      router.push(route);
    }, 200);
  };

  return (
    <Screen>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black",
          }}
        >
          <ActivityIndicator size="large" color="#25AEA6" />
        </View>
      ) : (
        <>
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
              onPress={() => handleNavigation("../createRoutine")}
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
              onPress={() => handleNavigation("../exploreRoutine")}
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
                keyExtractor={(r) => r}
                renderItem={() => (
                  <View className="items-center">
                    <ScrollView>
                      <RoutineCard />
                      <RoutineCard />
                    </ScrollView>
                  </View>
                )}
              />
            )}
          </View>
        </>
      )}
    </Screen>
  );
}
