import { Text, View, Pressable } from "react-native";
import { Screen } from "../Screen";
import { useRouter } from "expo-router";
import { styled } from "nativewind";
import { BackIcon } from "../../utils/Icons";

export function HistoryTraining() {
  const StyledPresable = styled(Pressable);
  const router = useRouter();

  return (
    <Screen>
      <View className="flex-row">
        <View className="items-start absolute" style={{ marginLeft: 30 }}>
          <StyledPresable onPress={() => router.push("/(main)/(tabs)/home")}>
            <BackIcon />
          </StyledPresable>
        </View>

        <View className="flex-1 items-center">
          <Text
            className="text-xl text-white"
            style={{ fontFamily: "Inter-Bold" }}
          >
            Historial
          </Text>
        </View>
      </View>
    </Screen>
  );
}
