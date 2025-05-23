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
    <View className="justify-center items-center mt-3 mx-10">
      <View className="w-full">
        <Text className="text-white mb-1" style={{ fontFamily: "Inter-Bold" }}>
          Nombre
        </Text>
        <TextInput
          className="rounded-md p-2 text-left text-black bg-white"
          style={{ fontFamily: "Inter-SemiBold" }}
          onChangeText={setName}
        />
      </View>

      <View className="w-full mt-10">
        <Text
          className="text-white mb-4 text-start text-lg"
          style={{ fontFamily: "Inter-Bold" }}
        >
          Resumen del entrenamiento
        </Text>
        <Text
          className="text-white mb-1 text-start"
          style={{ fontFamily: "Inter-Bold" }}
        >
          Duración: {formatTime(seconds)}
        </Text>
        <Text
          className="text-white mb-1 text-start"
          style={{ fontFamily: "Inter-Bold" }}
        >
          Volumen de entrenamiento: {volume} kg
        </Text>
        <Text
          className="text-white mb-1 text-start"
          style={{ fontFamily: "Inter-Bold" }}
        >
          Fecha: {new Date().toISOString().split("T")[0]}
        </Text>
        <Text
          className="text-white mb-1 text-start"
          style={{ fontFamily: "Inter-Bold" }}
        >
          Rutina id: {routine_id}
        </Text>
      </View>

      {/* Botón Finalizar */}
      <Pressable
        className="mt-10 bg-[#25AEA6] px-5 py-3 rounded-md"
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
