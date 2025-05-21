import { Text, View, Pressable } from "react-native";
import { styled } from "nativewind";

export function TrainingCard({ workout }) {
  const StyledPresable = styled(Pressable);

  return (
    <View className="w-full">
      <StyledPresable
        className="border border-[#222] mb-3 bg-[#0f0f0f] rounded-lg p-4"
        style={{ minWidth: "100%" }}
      >
        <View className="flex-row justify-between items-center">
          <View>
            <Text
              className="text-white text-lg"
              style={{ fontFamily: "Inter-SemiBold" }}
            >
              Pecho
            </Text>
            <Text
              className="text-white text-xs pt-1"
              style={{ fontFamily: "Inter-SemiBold" }}
            >
              {workout.name}
            </Text>
          </View>

          <Text
            className="text-white text-md"
            style={{ fontFamily: "Inter-SemiBold" }}
          >
            {workout.date}
          </Text>
        </View>
      </StyledPresable>
    </View>
  );
}
