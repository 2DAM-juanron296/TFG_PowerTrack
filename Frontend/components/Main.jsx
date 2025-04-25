import { View, Text, FlatList, ScrollView, Pressable } from "react-native";
import { Screen } from "./Screen";
import { UserDefaultIcon } from "./Icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { TrainingCard } from "../components/TrainingCard";
import { Link, useRouter } from "expo-router";

export function Main() {
  const [trainings, setTrainings] = useState(["buenas"]);
  const [username, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    const getUsername = async () => {
      const user = await AsyncStorage.getItem("username");
      setUsername(user);
    };

    getUsername();
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
        <FlatList
          data={trainings}
          keyExtractor={(train) => train}
          renderItem={() => (
            <View className="items-center">
              <ScrollView>
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
              </ScrollView>
            </View>
          )}
        />
      )}
    </Screen>
  );
}
