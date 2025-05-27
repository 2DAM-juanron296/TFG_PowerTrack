import {
  Text,
  View,
  Pressable,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Screen } from "../Screen";
import { Link, useRouter } from "expo-router";
import { styled } from "nativewind";
import { BackIcon, NotIcon } from "../../utils/Icons";
import { fetchWorkouts } from "../../context/api/trainings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import { TrainingCard } from "./TrainingCard";

export function HistoryTraining() {
  const StyledPresable = styled(Pressable);
  const router = useRouter();

  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      try {
        const [data, res] = await fetchWorkouts();

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

        setTrainings(data.workouts);
      } catch (error) {
        console.error("Error al obtener datos de AsyncStorage", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <Screen>
      <View className="flex-1 mt-3 mx-10">
        <Pressable
          className="mb-4"
          onPress={() => router.push("/(main)/(tabs)/home")}
        >
          <BackIcon />
        </Pressable>
        <View className="justify-start items-start mb-5">
          <Text
            className="text-2xl text-[#25AEA6]"
            style={{ fontFamily: "Inter-Bold" }}
          >
            Lista de Entrenos
          </Text>
        </View>

        {loading ? (
          <View className="justify-center items-center mt-10">
            <ActivityIndicator size="large" color="#25AEA6" />
            <Text
              className="text-white text-md text-center mt-2 ml-2"
              style={{ fontFamily: "Inter-SemiBold" }}
            >
              Cargando...
            </Text>
          </View>
        ) : trainings.length === 0 ? (
          <View className="flex-1 justify-center items-center mb-32">
            <NotIcon />
            <Text
              className="text-[#505050] text-md text-center"
              style={{ fontFamily: "Inter-Bold" }}
            >
              Sin entrenos
            </Text>
          </View>
        ) : (
          <View className="flex-1 pb-5">
            <FlatList
              data={trainings}
              keyExtractor={(item) => `${item.id}`}
              renderItem={({ item }) => (
                <View className="items-center">
                  <TrainingCard workout={item} history={true} />
                </View>
              )}
            />
          </View>
        )}
      </View>
    </Screen>
  );
}
