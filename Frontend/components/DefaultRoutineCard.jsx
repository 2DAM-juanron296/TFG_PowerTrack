import { Link } from "expo-router";
import { Text, View, Pressable } from "react-native";
import { styled } from "nativewind";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveDefaultRoutinetoUser } from "../context/api/routines";
import Toast from "react-native-toast-message";

export function DefaultRoutineCard({ name, description, id }) {
  const StyledPresable = styled(Pressable);

  const handleSaveRoutine = async (id) => {
    const id_user = await AsyncStorage.getItem("id_user");
    const request = { id_user: id_user, id_routine: id };

    const [data, res] = await saveDefaultRoutinetoUser(request);

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
  };

  return (
    <View className="w-full">
      <Link href={`/(main)/${id}`} asChild>
        <StyledPresable
          className="border border-[#222] mb-3 bg-[#0f0f0f] rounded-lg p-3"
          style={{ minWidth: "100%" }}
        >
          <View className="flex-row justify-between items-center">
            <View className="flex-1">
              <Text
                className="text-white text-lg"
                style={{ fontFamily: "Inter-SemiBold" }}
              >
                {name}
              </Text>
              <Text
                className="text-gray-200 text-sm mt-1"
                style={{ fontFamily: "Inter-Regular" }}
                numberOfLines={2}
              >
                {description}
              </Text>
            </View>
            <StyledPresable
              onPress={() => handleSaveRoutine(id)}
              className="bg-[#25AEA6] rounded-md p-2"
            >
              <Text className="text-black" style={{ fontFamily: "Inter-Bold" }}>
                Guardar
              </Text>
            </StyledPresable>
          </View>
        </StyledPresable>
      </Link>
    </View>
  );
}
