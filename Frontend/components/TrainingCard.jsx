import { useEffect, useRef } from "react";
import { Link } from "expo-router";
import { Text, View, Animated, Pressable } from "react-native";
import { styled } from "nativewind";

export function TrainingCard() {
  const StyledPresable = styled(Pressable);

  return (
    <View>
      <StyledPresable className="border border-[#222] mb-3 bg-[#0f0f0f] rounded-lg p-4 w-80">
        <Text
          className="text-white text-lg"
          style={{ fontFamily: "Inter-SemiBold" }}
        >
          Entrenamiento...
        </Text>
      </StyledPresable>
    </View>
  );
}
