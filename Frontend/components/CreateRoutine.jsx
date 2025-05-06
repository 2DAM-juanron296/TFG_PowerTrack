import { useEffect, useRef } from "react";
import { Text, View, Pressable } from "react-native";
import { Screen } from "./Screen";
import { Link } from "expo-router";
import { styled } from "nativewind";
import { HomeIcon } from "../components/Icons";

export function CreateRoutine() {
  const StyledPresable = styled(Pressable);

  return (
    <Screen>
      <View className="flex-row">
        <View className="items-start absolute" style={{ marginLeft: 30 }}>
          <Link asChild href="/">
            <StyledPresable
              style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
            >
              <HomeIcon />
            </StyledPresable>
          </Link>
        </View>

        <View className="flex-1 items-center">
          <Text
            className="text-xl text-white"
            style={{ fontFamily: "Inter-Bold" }}
          >
            Pantalla para crear rutinas
          </Text>
        </View>
      </View>
    </Screen>
  );
}
