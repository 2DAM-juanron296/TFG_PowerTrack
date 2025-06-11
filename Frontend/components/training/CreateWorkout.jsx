import { Text, TextInput, View, Pressable } from "react-native";

export function CreateWorkout({
  setName,
  volume,
  seconds,
  routine_id,
  formatTime,
  handleSubmit,
}) {
  return (
    <View className="justify-center items-center mt-16 mx-5">
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
            className="text-white text-sm"
            style={{ fontFamily: "Inter-SemiBold" }}
          >
            Duración:
          </Text>
          <Text
            className="text-white text-lg"
            style={{ fontFamily: "Inter-Bold" }}
          >
            {formatTime(seconds)}
          </Text>
        </View>

        <View className="mb-2">
          <Text
            className="text-white text-sm"
            style={{ fontFamily: "Inter-SemiBold" }}
          >
            Volumen de entrenamiento:
          </Text>
          <Text
            className="text-white text-lg"
            style={{ fontFamily: "Inter-Bold" }}
          >
            {volume} kg
          </Text>
        </View>

        <View className="mb-2">
          <Text
            className="text-white text-sm"
            style={{ fontFamily: "Inter-SemiBold" }}
          >
            Fecha:
          </Text>
          <Text
            className="text-white text-lg"
            style={{ fontFamily: "Inter-Bold" }}
          >
            {new Date().toISOString().split("T")[0]}
          </Text>
        </View>
      </View>

      <Pressable
        className="mt-5 bg-[#25AEA6] px-6 py-3 rounded-md"
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
  );
}
