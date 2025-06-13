import {
  Text,
  View,
  Pressable,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Screen } from "../Screen";
import { useRouter } from "expo-router";
import { styled } from "nativewind";
import { BackIcon, DeleteIcon } from "../../utils/Icons";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import {
  createExercisesRoutine,
  fetchExercises,
} from "../../context/api/exercises";
import ExerciseList from "../../app/(main)/exerciseList";
import { createUserRoutine } from "../../context/api/routines";
import { createExerciseSets } from "../../context/api/sets";

export function CreateRoutine() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [exercises, setExercises] = useState([]);
  const [sets, setSets] = useState([]);

  const StyledPresable = styled(Pressable);
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const getExercises = async () => {
      try {
        setLoading(true);
        const [data, res] = await fetchExercises();

        if (res) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: data.message,
            text1Style: { fontFamily: "Inter-Bold", fontSize: 12 },
            text2Style: { fontFamily: "Inter-SemiBold", fontSize: 11 },
            position: "top",
            animation: true,
            visibilityTime: 2000,
          });
          return;
        }

        setExercises(data.exercises);
      } catch (error) {
        console.error("Error al cargar los ejercicios", error);
        Toast.error("Error al cargar los ejercicios", {
          style: {
            background: "#333",
            color: "#fff",
            fontFamily: "Inter",
            fontWeight: 400,
          },
        });
      } finally {
        setLoading(false);
      }
    };

    getExercises();
  }, []);

  const handleSelectedExercise = (id) => {
    const exercise = exercises.find((ex) => ex.id === id);
    if (!exercise) return;

    if (!selectedExercises.some((ex) => ex.id === id)) {
      setSelectedExercises((prev) => [
        ...prev,
        { ...exercise, order: prev.length + 1 },
      ]);

      setSets((prev) => [
        ...prev,
        {
          routine_exercise_id: exercise.id,
          order: 1,
          reps: 0,
          weight: 0,
        },
      ]);
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No puede elegir el mismo ejercicio 2 veces",
        text1Style: { fontFamily: "Inter-Bold", fontSize: 12 },
        text2Style: { fontFamily: "Inter-SemiBold", fontSize: 11 },
        position: "top",
        animation: true,
        visibilityTime: 2000,
      });
      return;
    }

    console.log("Ejercicios: ", selectedExercises);
  };

  const handleDeleteExercise = (idExercise) => {
    setSelectedExercises((prev) => {
      const filtered = prev.filter((ex) => ex.id !== idExercise);
      const reordered = filtered.map((ex, index) => ({
        ...ex,
        order: index + 1,
      }));

      return reordered;
    });

    setSets((prev) =>
      prev.filter((set) => set.routine_exercise_id !== idExercise),
    );
  };

  const addSet = (idExercise) => {
    const nextOrder =
      sets.filter((set) => set.routine_exercise_id === idExercise).length + 1;

    const newSet = {
      routine_exercise_id: idExercise,
      order: nextOrder,
      reps: 0,
      weight: 0,
    };

    setSets([...sets, newSet]);
  };

  const deleteSet = (idExercise, order) => {
    setSets((prev) =>
      prev.filter(
        (set) =>
          !(set.routine_exercise_id === idExercise && set.order === order),
      ),
    );
  };

  const handleSetChange = (idExercise, order, field, value) => {
    setSets((prevSets) =>
      prevSets.map((set) => {
        if (set.routine_exercise_id === idExercise && set.order === order) {
          return {
            ...set,
            [field]: value,
          };
        }
        return set;
      }),
    );
  };

  const handleSubmit = async () => {
    try {
      setIsCreating(true);

      if (!name) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "La Rutina debe tener un nombre",
          text1Style: { fontFamily: "Inter-Bold", fontSize: 12 },
          text2Style: { fontFamily: "Inter-SemiBold", fontSize: 11 },
          position: "top",
          animation: true,
          visibilityTime: 2000,
        });
        setIsCreating(false);
        return;
      }

      if (selectedExercises.length === 0) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Debes añadir al menos un ejercicio a la rutina",
          text1Style: { fontFamily: "Inter-Bold", fontSize: 12 },
          text2Style: { fontFamily: "Inter-SemiBold", fontSize: 11 },
          position: "top",
          animation: true,
          visibilityTime: 2000,
        });
        setIsCreating(false);
        return;
      }

      const requestData = { name, description };

      const [data, res] = await createUserRoutine(requestData);

      if (res) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: data.message,
          text1Style: { fontFamily: "Inter-Bold", fontSize: 12 },
          text2Style: { fontFamily: "Inter-SemiBold", fontSize: 11 },
          position: "top",
          animation: true,
          visibilityTime: 2000,
        });
        setIsCreating(false);
        return;
      }

      Toast.show({
        type: "success",
        text1: "Éxito",
        text2: data.message,
        text1Style: { fontFamily: "Inter-Bold", fontSize: 12 },
        text2Style: { fontFamily: "Inter-SemiBold", fontSize: 11 },
        position: "top",
        animation: true,
        visibilityTime: 2000,
      });

      const routineId = data.routine.id;

      const requestExercise = selectedExercises.map((exercise) => ({
        order: exercise.order,
        routine_id: routineId,
        exercise_id: exercise.id,
      }));

      const [dataEx, resEx] = await createExercisesRoutine({
        exercises: requestExercise,
      });

      if (resEx) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: dataEx.message,
          text1Style: { fontFamily: "Inter-Bold", fontSize: 12 },
          text2Style: { fontFamily: "Inter-SemiBold", fontSize: 11 },
          position: "top",
          animation: true,
          visibilityTime: 2000,
        });
        setIsCreating(false);
        return;
      }

      Toast.show({
        type: "success",
        text1: "Éxito",
        text2: dataEx.message,
        text1Style: { fontFamily: "Inter-Bold", fontSize: 12 },
        text2Style: { fontFamily: "Inter-SemiBold", fontSize: 11 },
        position: "top",
        animation: true,
        visibilityTime: 2000,
      });

      const updatedSets = sets.map((set) => {
        const matching = dataEx.exercises.find(
          (ex) => ex.exercise_id === set.routine_exercise_id,
        );

        if (!matching) {
          console.warn("No se encontró routine_exercise_id para el set", set);
          setIsCreating(false);
          return set;
        }

        return {
          ...set,
          routine_exercise_id: matching.id,
          reps: parseInt(set.reps) || 0,
          weight: parseFloat(set.weight) || 0,
        };
      });

      const [dataSet, resSet] = await createExerciseSets({
        sets: updatedSets,
      });

      if (resSet) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: dataSet.message,
          text1Style: { fontFamily: "Inter-Bold", fontSize: 12 },
          text2Style: { fontFamily: "Inter-SemiBold", fontSize: 11 },
          position: "top",
          animation: true,
          visibilityTime: 2000,
        });
        setIsCreating(false);
        return;
      }

      Toast.show({
        type: "success",
        text1: "Éxito",
        text2: dataSet.message,
        text1Style: { fontFamily: "Inter-Bold", fontSize: 12 },
        text2Style: { fontFamily: "Inter-SemiBold", fontSize: 11 },
        position: "top",
        animation: true,
        visibilityTime: 2000,
      });

      router.push("/(main)/(tabs)/training");
    } catch (error) {
      console.error("Error al crear la rutina", error);
      Toast.show({
        type: "error",
        text1: "Error al crear la rutina",
        text1Style: { fontFamily: "Inter-Bold", fontSize: 12 },
        text2Style: { fontFamily: "Inter-SemiBold", fontSize: 11 },
        position: "top",
        animation: true,
        visibilityTime: 2000,
      });
      setIsCreating(false);
    }
  };

  return (
    <Screen>
      {isCreating ? (
        <View className="flex-1 justify-center items-center mb-20">
          <ActivityIndicator size="large" color="#25AEA6" />
          <Text
            className="text-white text-md text-center mt-1"
            style={{ fontFamily: "Inter-SemiBold" }}
          >
            Creando Rutina...
          </Text>
        </View>
      ) : (
        <>
          <View className="items-start mx-10">
            <StyledPresable
              onPress={() => router.push("/(main)/(tabs)/training")}
            >
              <BackIcon />
            </StyledPresable>

            <Text
              className="text-[#25AEA6] text-2xl mt-6"
              style={{ fontFamily: "Inter-Bold" }}
            >
              Nueva Rutina
            </Text>
          </View>

          {/* Contenedor para el nombre y la descripción */}
          <View className="justify-center items-center mt-3 mx-10">
            <View className="w-full">
              <Text
                className="text-white mb-1"
                style={{ fontFamily: "Inter-Bold" }}
              >
                Nombre
              </Text>
              <TextInput
                className="rounded-md p-2 text-left text-black bg-white"
                style={{ fontFamily: "Inter-SemiBold" }}
                onChangeText={setName}
              />
            </View>

            <View className="w-full mt-5">
              <Text
                className="text-white mb-1"
                style={{ fontFamily: "Inter-Bold" }}
              >
                Descripción
              </Text>
              <TextInput
                className="rounded-md p-2 text-left text-black bg-white"
                style={{ fontFamily: "Inter-SemiBold" }}
                numberOfLines={3}
                onChangeText={setDescription}
              />
            </View>
          </View>

          {/* Contenedor para los ejercicios y la rutina */}
          <View className="w-full">
            <View className="justify-center items-start mt-6 mx-10">
              <Text
                className="text-[#25AEA6] text-xl"
                style={{ fontFamily: "Inter-Bold" }}
              >
                Ejercicios
              </Text>

              <StyledPresable
                className="bg-[#25AEA6] rounded-md p-2 mt-3 pressed:opacity-60"
                onPress={() => setIsModalVisible(true)}
              >
                <Text
                  className="text-black"
                  style={{ fontFamily: "Inter-Bold" }}
                >
                  Añadir Ejercicio
                </Text>
              </StyledPresable>

              {/* Modal con la lista de ejercicios para elegir */}
              <ExerciseList
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                exercises={exercises}
                onSelect={handleSelectedExercise}
                loading={loading}
              />
            </View>

            <ScrollView
              className="flex-1 mt-4"
              style={{
                paddingBottom: 298,
              }}
            >
              {selectedExercises.map((ex) => {
                const exerciseSets = sets.filter(
                  (set) => set.routine_exercise_id === ex.id,
                );

                return (
                  <View
                    key={ex.id}
                    className="mx-4 mb-4 bg-[#0f0f0f] rounded-lg p-4 border border-[#222]"
                  >
                    <View className="flex-row justify-between items-start mb-4 pb-2 border-b border-[#25AEA6] flex-wrap gap-y-2">
                      <Text
                        className="text-white text-lg flex-1 pr-2"
                        style={{ fontFamily: "Inter-Bold" }}
                      >
                        {ex.order}. {ex.name}
                      </Text>

                      <View className="flex-row gap-x-2 flex-wrap">
                        <Pressable
                          onPress={() => addSet(ex.id)}
                          className="bg-green-500 justify-center items-center px-2 py-1 rounded-md"
                        >
                          <Text
                            className="text-black text-sm"
                            style={{ fontFamily: "Inter-Bold" }}
                          >
                            + Set
                          </Text>
                        </Pressable>

                        <Pressable
                          onPress={() => handleDeleteExercise(ex.id)}
                          className="bg-red-500 justify-center items-center px-2 py-1 rounded-md"
                        >
                          <Text
                            className="text-black text-sm"
                            style={{ fontFamily: "Inter-Bold" }}
                          >
                            Eliminar
                          </Text>
                        </Pressable>
                      </View>
                    </View>

                    <View className="w-full flex-row mb-1 justify-center">
                      {["Set", "Reps", "Peso", "Acciones"].map((col, i) => (
                        <Text
                          key={i}
                          style={{ fontFamily: "Inter-SemiBold" }}
                          className="flex-1 text-white text-xs text-center"
                        >
                          {col}
                        </Text>
                      ))}
                    </View>

                    {exerciseSets.map((set) => (
                      <View
                        key={`${ex.id}-${set.order}`}
                        className="flex-row w-full pt-1 items-center"
                      >
                        <Text
                          className="w-20 text-white text-center"
                          style={{ fontFamily: "Inter-SemiBold" }}
                        >
                          {set.order}
                        </Text>

                        <TextInput
                          className="flex-1 mx-2 bg-[#1c1c1c] text-white rounded text-center px-2 py-1"
                          style={{ fontFamily: "Inter-SemiBold" }}
                          placeholder="0"
                          keyboardType="numeric"
                          defaultValue={set.reps.toString()}
                          onChangeText={(value) =>
                            handleSetChange(ex.id, set.order, "reps", value)
                          }
                        />

                        <TextInput
                          className="flex-1 mx-2 bg-[#1c1c1c] text-white rounded text-center px-2 py-1"
                          style={{ fontFamily: "Inter-SemiBold" }}
                          placeholder="0"
                          keyboardType="numeric"
                          defaultValue={set.weight.toString()}
                          onChangeText={(value) =>
                            handleSetChange(ex.id, set.order, "weight", value)
                          }
                        />

                        <Pressable
                          onPress={() => deleteSet(ex.id, set.order)}
                          className="bg-red-500 rounded px-2 py-1 mx-1 items-center justify-center"
                          style={{
                            width: 75,
                          }}
                        >
                          <Text
                            className="text-black text-sm"
                            style={{ fontFamily: "Inter-Bold" }}
                          >
                            <DeleteIcon />
                          </Text>
                        </Pressable>
                      </View>
                    ))}
                  </View>
                );
              })}
            </ScrollView>

            <View className="justify-center items-center pt-3">
              <Pressable
                className="bg-[#25AEA6] rounded-md px-4 py-2 items-center"
                onPress={handleSubmit}
              >
                <Text
                  className="text-black text-lg"
                  style={{ fontFamily: "Inter-Bold" }}
                >
                  Crear Rutina
                </Text>
              </Pressable>
            </View>
          </View>
        </>
      )}
    </Screen>
  );
}
