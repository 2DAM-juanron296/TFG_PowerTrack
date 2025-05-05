import { useState } from "react";
import toast from "react-hot-toast";

export function ExercisesTable({
  exercises,
  selectedExercises,
  setSelectedExercises,
  //sets,
  //setSets,
}) {
  const [selectedExerciseId, setSelectedExerciseId] = useState("");

  const setExercisetoRoutine = (id) => async () => {
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
  };

  return (
    <div className="flex gap-10 w-4xl">
      {/* Selector de ejercicios */}
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
          className="px-4 py-2 bg-[#25AEA6] text-black rounded font-semibold hover:bg-[#1f978f]
    cursor-pointer"
          onClick={setExercisetoRoutine(selectedExerciseId)}
        >
          Añadir Ejercicio
        </button>

        {/* Tabla de ejercicios - Rutina */}
        <div className="mt-8">
          <h3 className="text-lg text-white font-semibold mb-2">
            Ejercicios Añadidos
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-white bg-[#1e1e1e] rounded-lg overflow-hidden">
              <thead className="bg-[#333] text-left">
                <tr>
                  <th className="px-4 py-2">Orden</th>
                  <th className="px-4 py-2">Ejercicio</th>
                  <th className="px-4 py-2">Set</th>
                  <th className="px-4 py-2">Repeticiones</th>
                  <th className="px-4 py-2">Peso (kg)</th>
                  <th className="px-4 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {selectedExercises.map((ex, index) => (
                  <tr key={ex.id} className="border-t border-gray-700">
                    {/* Mostrar el orden del ejercicio */}
                    <td className="px-4 py-2">{ex.order}</td>

                    {/* Nombre del ejercicio */}
                    <td className="px-4 py-2">{ex.name}</td>

                    {/* Sets */}
                    <td className="px-4 py-2">{index + 1}</td>

                    {/* Repeticiones */}
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        defaultValue={0}
                        className="w-16 px-2 py-1 rounded bg-gray-800 text-white border border-gray-600"
                      />
                    </td>

                    {/* Peso */}
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        defaultValue={0}
                        className="w-20 px-2 py-1 rounded bg-gray-800 text-white border border-gray-600"
                      />
                    </td>

                    {/* Acciones */}
                    <td className="px-4 py-2">
                      <button className="bg-red-400 p-2 text-black rounded-md font-bold cursor-pointer">
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
