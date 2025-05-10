import { Text, View, Pressable } from "react-native";
import { Screen } from "./Screen";
import { useRouter } from "expo-router";
import { styled } from "nativewind";
import { HomeIcon } from "../components/Icons";

export function HistoryTraining() {
  const StyledPresable = styled(Pressable);
  const router = useRouter();

  return (
    <Screen>
      <View className="flex-row">
        <View className="items-start absolute" style={{ marginLeft: 30 }}>
          <StyledPresable
            onPress={() => router.back()}
            style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
          >
            <HomeIcon />
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
