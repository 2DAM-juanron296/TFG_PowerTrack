import { Text, TextInput, View, Pressable } from "react-native";

export function CreateWorkout({
  setName,
  volume,
  seconds,
  muscles,
  formatTime,
  handleSubmit,
}) {
  return (
    <View className="flex-1 mx-7 mt-3 relative">
      <View className="flex-grow mb-20">
        <View className="w-full bg-[#0f0f0f] p-4 rounded-xl shadow-md mb-5">
          <Text
            className="text-white mb-2 text-md"
            style={{ fontFamily: "Inter-Bold" }}
          >
            Nombre
          </Text>
          <TextInput
            className="rounded-md p-3 text-black bg-white"
            style={{ fontFamily: "Inter-SemiBold" }}
            placeholder="Introduce el nombre"
            onChangeText={setName}
          />
        </View>

        <View className="w-full bg-[#0f0f0f] p-4 rounded-xl shadow-md mb-5 space-y-2">
          <Text
            className="text-[#25AEA6] mb-4 text-xl"
            style={{ fontFamily: "Inter-Bold" }}
          >
            Resumen del entrenamiento
          </Text>

          <View className="mb-2">
            <Text
              className="text-white mb-1 text-lg"
              style={{ fontFamily: "Inter-SemiBold" }}
            >
              Duración:
            </Text>
            <Text
              className="text-white text-md"
              style={{ fontFamily: "Inter-Bold" }}
            >
              {formatTime(seconds)}
            </Text>
          </View>

          <View className="mb-2">
            <Text
              className="text-white mb-1 text-lg"
              style={{ fontFamily: "Inter-SemiBold" }}
            >
              Volumen:
            </Text>
            <Text
              className="text-white text-md"
              style={{ fontFamily: "Inter-Bold" }}
            >
              {volume} kg
            </Text>
          </View>

          <View className="mb-2">
            <Text
              className="text-white mb-1 text-lg"
              style={{ fontFamily: "Inter-SemiBold" }}
            >
              Fecha:
            </Text>
            <Text
              className="text-white text-md"
              style={{ fontFamily: "Inter-Bold" }}
            >
              {new Date().toISOString().split("T")[0]}
            </Text>
          </View>

          <View className="mb-2">
            <Text
              className="text-white mb-1 text-lg"
              style={{ fontFamily: "Inter-Bold" }}
            >
              Músculos trabajados:
            </Text>

            {muscles.map((item, index) => (
              <Text
                key={`${item.id}-${index}`}
                className="text-white text-base"
                style={{ fontFamily: "Inter-SemiBold" }}
              >
                • {item.name}
              </Text>
            ))}
          </View>
        </View>
      </View>

      <View className="absolute bottom-5 left-0 right-0 py-3 px-24">
        <Pressable
          className="bg-[#25AEA6] rounded-md px-6 py-3 items-center"
          onPress={handleSubmit}
        >
          <Text
            className="text-black text-lg"
            style={{ fontFamily: "Inter-Bold" }}
          >
            Finalizar
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
