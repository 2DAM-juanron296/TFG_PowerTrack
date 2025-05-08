import { View, Text, FlatList, Pressable } from "react-native";
import { Screen } from "./Screen";
import { UserDefaultIcon } from "./Icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { TrainingCard } from "../components/TrainingCard";
import { Link } from "expo-router";

export function Main() {
  const [trainings, setTrainings] = useState(["buenas"]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("userToken");
        const user = await AsyncStorage.getItem("username");

        if (user !== null) {
          const user = await AsyncStorage.getItem("username");
          setUsername(user);
        }
        console.log("Token:", value, " Username: ", user);
      } catch (error) {
        console.error("Error al obtener datos de AsyncStorage", error);
      }
    };

    getData();
  }, []);

  return (
    <Screen>
      <View className="justify-center items-center text-center pb-14 mt-16">
        <UserDefaultIcon />
        <View>
          <Text
            className="text-white text-md pt-2"
            style={{ fontFamily: "Inter-SemiBold" }}
          >
            {username ? `Bienvenido, ${username}` : "Bienvenido, User"}
          </Text>
        </View>
      </View>
      <View className="justify-start items-start mx-10 mb-12">
        <Text
          className="text-2xl text-[#25AEA6]"
          style={{ fontFamily: "Inter-Bold" }}
        >
          Entrenamientos
        </Text>
      </View>
      {trainings.length === 0 ? (
        <View className="justify-center items-center">
          <Text
            className="text-red-600 text-md"
            style={{ fontFamily: "Inter-Bold" }}
          >
            NO HAY ENTRENAMIENTOS ACTUALMENTE
          </Text>
        </View>
      ) : (
        <View className="mx-10">
          <FlatList
            data={trainings}
            keyExtractor={(train) => train}
            renderItem={() => (
              <View className="items-center">
                <TrainingCard />
                <TrainingCard />
                <TrainingCard />
                <TrainingCard />
                <View className="justify-center items-center mt-5">
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
              </View>
            )}
          />
        </View>
      )}
    </Screen>
  );
}
