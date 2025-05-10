import { useEffect, useRef } from "react";
import { Link, useRouter } from "expo-router";
import { Text, View, Animated, Pressable } from "react-native";
import { styled } from "nativewind";

export function RoutineCard({ name, description, id }) {
  const StyledPresable = styled(Pressable);
  const router = useRouter();

  return (
    <View className="w-full">
      <StyledPresable
        onPress={() => router.push(`/(main)/${id}`)}
        className="mb-3 bg-[#0f0f0f] rounded-lg p-4"
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
          <StyledPresable className="bg-[#25AEA6] rounded-md p-2">
            <Text className="text-black" style={{ fontFamily: "Inter-Bold" }}>
              Comienzo
            </Text>
          </StyledPresable>
        </View>
      </StyledPresable>
    </View>
  );
}
