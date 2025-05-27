import {
  Text,
  View,
  Pressable,
  FlatList,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { Screen } from "../Screen";
import { BackIcon, NotIcon } from "../../utils/Icons";
import { fetchWorkouts } from "../../context/api/trainings";
import { useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import { TrainingCard } from "./TrainingCard";
import { useRouter } from "expo-router";

export function HistoryTraining() {
  const router = useRouter();

  const [searchText, setSearchText] = useState("");
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

        console.log("Entrenamientos obtenidos:", data.workouts);
        setTrainings(data.workouts);
      } catch (error) {
        console.error("Error al obtener datos de AsyncStorage", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const filteredTrainings =
    searchText.trim() === ""
      ? trainings
      : trainings.filter((item) =>
          item.name.toLowerCase().includes(searchText.toLowerCase()),
        );

  return (
    <Screen>
      <View className="flex-1 mt-3 mx-10">
        <View className="flex-row items-center mb-4 space-x-3">
          {/* Botón de retroceso */}
          <Pressable onPress={() => router.push("/(main)/(tabs)/home")}>
            <BackIcon />
          </Pressable>

          {/* Input de búsqueda */}
          <TextInput
            className="flex-1 bg-[#1E1E1E] text-white px-4 py-2 rounded-lg"
            placeholderTextColor="#999"
            placeholder="Buscar entrenos..."
            style={{ fontFamily: "Inter-SemiBold" }}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

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
              data={filteredTrainings}
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
