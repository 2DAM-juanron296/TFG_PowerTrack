import { useEffect, useRef } from "react";
import { Link } from "expo-router";
import { Text, View, Animated, Pressable } from "react-native";
import { styled } from "nativewind";

export function RoutineCard() {
  const StyledPresable = styled(Pressable);

  return (
    <View className="w-full">
      <StyledPresable
        className="mb-3 bg-[#0f0f0f] rounded-lg p-4"
        style={{ minWidth: "100%" }}
      >
        <View className="flex-row justify-between items-center">
          <Text
            className="text-white text-lg"
            style={{ fontFamily: "Inter-SemiBold" }}
          >
            Rutina
          </Text>
          <StyledPresable className="bg-[#25AEA6] rounded-md p-2">
            <Text className="text-black font-bold" style={{ fontSize: 15 }}>
              Comienzo
            </Text>
          </StyledPresable>
        </View>
      </StyledPresable>
    </View>
  );
}
