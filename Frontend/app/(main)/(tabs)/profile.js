import { View, Text } from "react-native";
import { Screen } from "../../../components/Screen";
import { SettingsIcon, UserIcon } from "../../../utils/Icons";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const [username, setUsername] = useState("Username");

  const durationWeek = 0;
  const durationMonth = 0;
  const durationYear = 0;

  useEffect(() => {
    const getData = async () => {
      const user = await AsyncStorage.getItem("username");
      if (user !== null) {
        setUsername(user);
      }
    };

    getData();
  }, []);

  return (
    <Screen>
      <View className="mx-10">
        <View className="flex-row justify-start items-center border bg-[#0f0f0f] rounded-lg p-3 space-x-5 mt-2">
          <UserIcon />
          <View>
            <Text
              className="text-white text-lg"
              style={{ fontFamily: "Inter-SemiBold" }}
            >
              {username}
            </Text>
            <Text
              className="text-md text-[#999]"
              style={{ fontFamily: "Inter-SemiBold" }}
            >
              Entrenos
            </Text>
            <Text
              className="text-md text-white"
              style={{ fontFamily: "Inter-SemiBold" }}
            >
              0
            </Text>
          </View>

          <View className="absolute right-5">
            <SettingsIcon />
          </View>
        </View>

        <View className="justify-start items-start mb-2 mt-8">
          <Text
            className="text-2xl text-[#25AEA6]"
            style={{ fontFamily: "Inter-Bold" }}
          >
            Estadísticas
          </Text>
        </View>

        <View className="mt-2">
          <Text
            className="text-xl text-[#25AEA6] mb-3"
            style={{ fontFamily: "Inter-Bold" }}
          >
            Duración
          </Text>
          <View className="justify-center items-start border bg-[#0f0f0f] rounded-lg p-3 space-y-2">
            <View className="w-full flex-row justify-between">
              <Text
                className="text-md text-white"
                style={{ fontFamily: "Inter-Bold" }}
              >
                Esta semana
              </Text>
              <Text
                className="text-md text-white"
                style={{ fontFamily: "Inter-Bold" }}
              >
                {durationWeek}
              </Text>
            </View>
            <View className="w-full flex-row justify-between">
              <Text
                className="text-md text-white"
                style={{ fontFamily: "Inter-Bold" }}
              >
                Este mes
              </Text>
              <Text
                className="text-md text-white"
                style={{ fontFamily: "Inter-Bold" }}
              >
                {durationMonth}
              </Text>
            </View>
            <View className="w-full flex-row justify-between">
              <Text
                className="text-md text-white"
                style={{ fontFamily: "Inter-Bold" }}
              >
                Este año
              </Text>
              <Text
                className="text-md text-white"
                style={{ fontFamily: "Inter-Bold" }}
              >
                {durationYear}
              </Text>
            </View>
          </View>
        </View>

        <View className="mt-4">
          <Text
            className="text-xl text-[#25AEA6] mb-3"
            style={{ fontFamily: "Inter-Bold" }}
          >
            Volumen
          </Text>
          <View className="justify-center items-start border bg-[#0f0f0f] rounded-lg p-3 space-y-2">
            <View className="w-full flex-row justify-between">
              <Text
                className="text-md text-white"
                style={{ fontFamily: "Inter-Bold" }}
              >
                Esta semana
              </Text>
              <Text
                className="text-md text-white"
                style={{ fontFamily: "Inter-Bold" }}
              >
                {durationWeek}
              </Text>
            </View>
            <View className="w-full flex-row justify-between">
              <Text
                className="text-md text-white"
                style={{ fontFamily: "Inter-Bold" }}
              >
                Este mes
              </Text>
              <Text
                className="text-md text-white"
                style={{ fontFamily: "Inter-Bold" }}
              >
                {durationMonth}
              </Text>
            </View>
            <View className="w-full flex-row justify-between">
              <Text
                className="text-md text-white"
                style={{ fontFamily: "Inter-Bold" }}
              >
                Este año
              </Text>
              <Text
                className="text-md text-white"
                style={{ fontFamily: "Inter-Bold" }}
              >
                {durationYear}
              </Text>
            </View>
          </View>
        </View>

        <View className="mt-4">
          <Text
            className="text-xl text-[#25AEA6] mb-3"
            style={{ fontFamily: "Inter-Bold" }}
          >
            Top - RM
          </Text>
          <View className="justify-center items-start border bg-[#0f0f0f] rounded-lg p-3 space-y-2">
            <View className="w-full flex-row justify-between">
              <Text
                className="text-md text-white"
                style={{ fontFamily: "Inter-Bold" }}
              >
                1.
              </Text>
              <Text
                className="text-md text-white"
                style={{ fontFamily: "Inter-Bold" }}
              >
                {durationWeek}
              </Text>
            </View>
            <View className="w-full flex-row justify-between">
              <Text
                className="text-md text-white"
                style={{ fontFamily: "Inter-Bold" }}
              >
                2.
              </Text>
              <Text
                className="text-md text-white"
                style={{ fontFamily: "Inter-Bold" }}
              >
                {durationMonth}
              </Text>
            </View>
            <View className="w-full flex-row justify-between">
              <Text
                className="text-md text-white"
                style={{ fontFamily: "Inter-Bold" }}
              >
                3.
              </Text>
              <Text
                className="text-md text-white"
                style={{ fontFamily: "Inter-Bold" }}
              >
                {durationYear}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Screen>
  );
}
