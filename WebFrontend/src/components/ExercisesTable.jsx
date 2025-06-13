import { useState } from "react";
import toast from "react-hot-toast";

export function ExercisesTable({
  exercises,
  selectedExercises,
  setSelectedExercises,
  sets,
  setSets,
}) {
  const [selectedExerciseId, setSelectedExerciseId] = useState("");

  const setExercise = (id) => async () => {
    const exer = exercises.find((e) => e.id.toString() === id.toString());

    if (!exer) {
      toast.error("No se encuentra el ejercicio por el ID", {
        style: {
          background: "#333",
          color: "#fff",
          fontFamily: "Inter",
          fontWeight: 400,
        },
      });
      return;
    }

    if (selectedExercises.some((e) => e.id.toString() === exer.id.toString())) {
      toast.error("Este ejercicio ya está añadido en la rutina", {
        style: {
          background: "#333",
          color: "#fff",
          fontFamily: "Inter",
          fontWeight: 400,
        },
      });
      return;
    }

    console.log("Ejercicio seleccionado:", exer.name);

    setSelectedExercises((prev) => [
      ...prev,
      { ...exer, order: prev.length + 1 },
    ]);

    setSets((prev) => [
      ...prev,
      {
        order: 1,
        reps: 0,
        weight: 0,
        routine_exercise_id: exer.id,
      },
    ]);
  };

  const addSet = (idExercise) => {
    const nextOrder =
      sets.filter(
        (set) => set.routine_exercise_id.toString() === idExercise.toString(),
      ).length + 1;

    const newSet = {
      routine_exercise_id: idExercise,
      order: nextOrder,
      reps: 0,
      weight: 0,
    };

    setSets([...sets, newSet]);
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

  const deleteSet = (idExercise, order) => {
    setSets((prev) =>
      prev.filter(
        (set) =>
          !(
            set.routine_exercise_id.toString() === idExercise.toString() &&
            set.order === order
          ),
      ),
    );
  };

  const handleSetChange = (idExercise, order, field, value) => {
    const parsedValue =
      field === "weight" ? parseFloat(value) : parseInt(value, 10);

    setSets((prevSets) =>
      prevSets.map((set) => {
        if (
          set.routine_exercise_id.toString() === idExercise.toString() &&
          set.order === order
        ) {
          return {
            ...set,
            [field]: isNaN(parsedValue) ? 0 : parsedValue,
          };
        }
        return set;
      }),
    );
  };

  return (
    <div className="w-3xl">
      {/* Selector de ejercicios */}
      <div className="grid-rows-2">
        <div>
          <label className="text-white text-sm font-medium">
            Añadir ejercicio
          </label>
          <select
            value={selectedExerciseId}
            onChange={(e) => setSelectedExerciseId(e.target.value)}
            className="w-full px-4 py-2 mt-1 rounded bg-white text-black cursor-pointer mb-4"
          >
            <option value="" disabled>
              Selecciona un ejercicio
            </option>
            {exercises.map((exercise) => (
              <option key={exercise.id} value={exercise.id}>
                {exercise.name}
              </option>
            ))}
          </select>
          <button
            className="px-4 py-2 bg-[#25AEA6] text-black rounded font-semibold cursor-pointer hover:bg-[#1d8d87] hover:opacity-80 transition-all"
            style={{
              transition: "opacity 0.3s ease",
            }}
            onClick={setExercise(selectedExerciseId)}
          >
            Añadir Ejercicio
          </button>
        </div>

        {/* Tabla de ejercicios - Rutina */}
        <div className="mt-10">
          {selectedExercises.length !== 0 ? (
            <h3 className="text-lg text-white font-semibold mb-2">
              Ejercicios Añadidos
            </h3>
          ) : (
            ""
          )}

          <div className="overflow-x-auto">
            {selectedExercises.map((ex) => {
              const exerciseSets = sets.filter(
                (set) =>
                  set.routine_exercise_id.toString() === ex.id.toString(),
              );

              return (
                <div key={ex.id}>
                  <div className="flex justify-between items-center mx-1 mb-2 mt-5">
                    <h3 className="text-white font-bold">
                      {ex.order}. {ex.name}
                    </h3>
                    <div className="flex gap-2 justify-end items-end">
                      <button
                        className="bg-green-400 p-2 ml-2 text-black rounded-md font-bold cursor-pointer hover:bg-green-500 hover:opacity-80 transition-all"
                        style={{
                          transition: "opacity 0.3s ease",
                        }}
                        onClick={() => addSet(ex.id)}
                      >
                        + Set
                      </button>
                      <button
                        className="bg-red-500 p-2 text-black rounded-md font-bold cursor-pointer hover:bg-red-600 hover:opacity-80 transition-all"
                        style={{
                          transition: "opacity 0.3s ease",
                        }}
                        onClick={() => handleDeleteExercise(ex.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                  <table className="min-w-full mb-5 text-sm text-white bg-[#1e1e1e] rounded-lg overflow-hidden">
                    <thead className="bg-[#333] text-left">
                      <tr>
                        <th className="px-4 py-2">Set</th>
                        <th className="px-4 py-2">Repeticiones</th>
                        <th className="px-4 py-2">Peso (kg)</th>
                        <th className="px-4 py-2">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {exerciseSets.map((set) => (
                        <tr
                          key={`${ex.id}-${set.order}`}
                          className="border-t border-gray-700"
                        >
                          <td className="px-4 py-2">{set.order}</td>

                          {/* Repeticiones */}
                          <td className="px-4 py-2">
                            <input
                              type="number"
                              defaultValue={set.reps || 0}
                              min={0}
                              className="w-16 px-2 py-1 rounded text-white border border-gray-600"
                              onChange={(e) =>
                                handleSetChange(
                                  ex.id,
                                  set.order,
                                  "reps",
                                  e.target.value,
                                )
                              }
                            />
                          </td>

                          {/* Peso */}
                          <td className="px-4 py-2">
                            <input
                              type="number"
                              step="0.01"
                              defaultValue={set.weight || 0}
                              min={0}
                              className="w-20 px-2 py-1 rounded text-white border border-gray-600"
                              onChange={(e) =>
                                handleSetChange(
                                  ex.id,
                                  set.order,
                                  "weight",
                                  e.target.value,
                                )
                              }
                            />
                          </td>

                          {/* Acciones */}
                          <td className="px-4 py-2">
                            <button
                              className="bg-red-500 p-2 text-black rounded-md font-bold cursor-pointer hover:bg-red-600 hover:opacity-80 transition-all"
                              style={{
                                transition: "opacity 0.3s ease",
                              }}
                              onClick={() => deleteSet(ex.id, set.order)}
                            >
                              <img
                                width="24"
                                height="24"
                                src="https://img.icons8.com/fluency-systems-regular/24/filled-trash.png"
                                alt="filled-trash"
                              />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
