import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Screen } from "./Screen";
import { NotIcon, UserDefaultIcon } from "../utils/Icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { TrainingCard } from "../components/training/TrainingCard";
import { Link } from "expo-router";
import { fetchLastWorkouts } from "../context/api/trainings";
import Toast from "react-native-toast-message";

export function Main() {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState("");

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      try {
        const user = await AsyncStorage.getItem("username");
        if (user !== null) {
          setUsername(user);
        }

        const [data, res] = await fetchLastWorkouts();

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
      <View className="flex-1 justify-between">
        {/* Header usuario */}
        <View className="justify-center items-center text-center pb-12 mt-10">
          <UserDefaultIcon />
          <View>
            <Text
              className="text-white text-lg pt-2"
              style={{ fontFamily: "Inter-SemiBold" }}
            >
              {username ? `Bienvenido, ${username}` : "Bienvenido, User"}
            </Text>
          </View>
        </View>

        {/* Título */}
        <View className="justify-start items-start mx-10 mb-4">
          <Text
            className="text-2xl text-[#25AEA6]"
            style={{ fontFamily: "Inter-Bold" }}
          >
            Entrenamientos
          </Text>
        </View>

        {/* Aquí va la sección que cambia (loading, vacío o lista) */}
        <View className="flex-1 mx-10">
          {loading ? (
            <View className="flex-1 justify-center items-center">
              <ActivityIndicator size="large" color="#25AEA6" />
              <Text
                className="text-white text-md text-center mt-2"
                style={{ fontFamily: "Inter-SemiBold" }}
              >
                Cargando...
              </Text>
            </View>
          ) : trainings.length === 0 ? (
            <View className="flex-1 justify-center items-center">
              <NotIcon />
              <Text
                className="text-[#505050] text-md text-center"
                style={{ fontFamily: "Inter-Bold" }}
              >
                Sin entrenos
              </Text>
            </View>
          ) : (
            <FlatList
              data={trainings}
              keyExtractor={(item) => `${item.id}`}
              renderItem={({ item }) => (
                <View className="items-center">
                  <TrainingCard workout={item} history={false} />
                </View>
              )}
            />
          )}
        </View>

        {trainings.length !== 0 && (
          <View className="justify-center items-center mb-4">
            <Link asChild href="../trainHistory">
              <Pressable>
                <Text
                  className="text-white"
                  style={{ fontFamily: "Inter-SemiBold" }}
                >
                  Ver más...
                </Text>
              </Pressable>
            </Link>
          </View>
        )}
      </View>
    </Screen>
  );
}
