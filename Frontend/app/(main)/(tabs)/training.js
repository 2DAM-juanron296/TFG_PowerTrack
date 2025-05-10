import { View, Text, Pressable, ScrollView, FlatList } from "react-native";
import { Screen } from "../../../components/Screen";
import { styled } from "nativewind";
import { useState } from "react";
import { RoutineCard } from "../../../components/RoutineCard";
import { Link, useRouter } from "expo-router";

export default function Index() {
  const StyledPresable = styled(Pressable);
  const router = useRouter();

  const [routines, setRoutines] = useState(["buenas"]);

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
        <Link asChild href="/createRoutine">
          <StyledPresable className="flex-1 justify-center items-center border bg-[#0f0f0f] rounded-lg p-4 ml-10">
            <Text
              className="text-white text-lg"
              style={{ fontFamily: "Inter-SemiBold" }}
            >
              Nueva Rutina
            </Text>
          </StyledPresable>
        </Link>

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
    </Screen>
  );
}
