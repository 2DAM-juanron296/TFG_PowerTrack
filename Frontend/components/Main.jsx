import { View, Text } from "react-native";
import { Screen } from "./Screen";

export function Main() {
  return (
    <Screen>
      <View className="justify-center items-center text-center">
        <Text className="text-white text-lg">Pantalla Principal</Text>
      </View>
    </Screen>
  );
}
