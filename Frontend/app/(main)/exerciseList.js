import { FlatList, Image, Modal, Pressable, Text, View } from "react-native";
import { ExerciseImages } from "../../utils/ExerciseImages";

export default function ExerciseList({
  visible,
  onClose,
  exercises,
  onSelect,
}) {
  return (
    <Modal visible={visible} animationType="slide">
      <View className="flex-1 bg-[#0f0f0f] pt-10 pb-10 px-4">
        <Text
          className="text-2xl text-center text-[#25AEA6] mb-5"
          style={{ fontFamily: "Inter-Bold" }}
        >
          Elige un Ejercicio
        </Text>

        <FlatList
          data={exercises}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                onSelect(item.id);
                onClose();
              }}
              className="mb-4 bg-[#1a1a1a] p-3 rounded-lg border border-[#333]"
            >
              <View className="flex-row items-center">
                <Image
                  source={
                    ExerciseImages[item.id] ||
                    require("../../assets/images/exercises/default.webp")
                  }
                  className="w-20 h-20 rounded-lg mr-4"
                />
                <View className="flex-1">
                  <Text className="text-white text-xl font-semibold">
                    {item.name}
                  </Text>
                  <Text className="text-gray-400 text-sm">
                    {item.description}
                  </Text>
                </View>
              </View>
            </Pressable>
          )}
        />

        <Pressable
          onPress={onClose}
          className="bg-[#25AEA6] rounded-md py-3 mt-6"
        >
          <Text
            className="text-black text-center text-base"
            style={{ fontFamily: "Inter-Bold" }}
          >
            Cerrar
          </Text>
        </Pressable>
      </View>
    </Modal>
  );
}
