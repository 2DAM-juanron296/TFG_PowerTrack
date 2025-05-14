import { useRouter } from "expo-router";
import { Text, View, Pressable } from "react-native";
import { styled } from "nativewind";

export function RoutineCard({ name, description, id }) {
  const StyledPresable = styled(Pressable);
  const router = useRouter();

  return (
    <View className="w-full">
      {/* Card que redirige al detalle del ejercicio */}
      <StyledPresable
        onPress={() =>
          router.push({
            pathname: `/(main)/${id}`,
            params: { from: "training" },
          })
        }
        className="border border-[#222] mb-4 bg-[#0f0f0f] rounded-lg p-3"
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
            onPress={(e) => {
              e.stopPropagation();
              router.push({
                pathname: "/(main)/trainingSession",
                params: { routine_id: id },
              });
            }}
            className="bg-[#25AEA6] rounded-md p-2"
          >
            <Text className="text-black" style={{ fontFamily: "Inter-Bold" }}>
              Comienzo
            </Text>
          </StyledPresable>
        </View>
      </StyledPresable>
    </View>
  );
}
