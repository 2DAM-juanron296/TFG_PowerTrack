import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { createRoutine } from "../api/routines";
import { createExercisesRoutine, fetchExercises } from "../api/exercises";
import { ExercisesTable } from "./ExercisesTable";
import { createExerciseSets } from "../api/sets";

export function CreateRoutine() {
  const navigate = useNavigate();
  const [exercises, setExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [sets, setSets] = useState([]);

  // Variables para el formulario
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const getExercises = async () => {
      try {
        const [data, res] = await fetchExercises();

        if (res) {
          toast.error(data.message, {
            style: {
              background: "#333",
              color: "#fff",
              fontFamily: "Inter",
              fontWeight: 400,
            },
          });
        }

        setExercises(data.exercises);
      } catch (error) {
        console.error("Error al obtener los usuarios", error);
        toast.error("Error al obtener los usuarios", {
          style: {
            background: "#333",
            color: "#fff",
            fontFamily: "Inter",
            fontWeight: 400,
          },
        });
      }
    };
    getExercises();
  }, []);

  const handleSubmit = async () => {
    try {
      if (!name) {
        toast.error("La Rutina debe tener un nombre", {
          style: {
            background: "#333",
            color: "#fff",
            fontFamily: "Inter",
            fontWeight: 400,
          },
        });
        return;
      }

      if (selectedExercises.length === 0) {
        toast.error("Debes añadir al menos un ejercicio a la rutina", {
          style: {
            background: "#333",
            color: "#fff",
            fontFamily: "Inter",
            fontWeight: 400,
          },
        });
        return;
      }

      const request = { name, description };

      const [data, res] = await createRoutine(request);

      if (res) {
        toast.error(data.message, {
          style: {
            background: "#333",
            color: "#fff",
            fontFamily: "Inter",
            fontWeight: 400,
          },
        });
        return;
      }

      toast.success(data.message, {
        style: {
          background: "#333",
          color: "#fff",
          fontFamily: "Inter",
          fontWeight: 400,
        },
      });

      //console.log("Data", data);

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
        toast.error(dataEx.message, {
          style: {
            background: "#333",
            color: "#fff",
            fontFamily: "Inter",
            fontWeight: 400,
          },
        });
        return;
      }

      toast.success(dataEx.message, {
        style: {
          background: "#333",
          color: "#fff",
          fontFamily: "Inter",
          fontWeight: 400,
        },
      });

      console.log("Ejercicios", dataEx.exercises);
      //return;

      const updatedSets = sets.map((set) => {
        const matching = dataEx.exercises.find(
          (ex) => ex.exercise_id === set.routine_exercise_id,
        );

        if (!matching) {
          console.warn("No se encontró routine_exercise_id para el set", set);
          return set;
        }

        return {
          ...set,
          routine_exercise_id: matching.id,
        };
      });

      const [dataSet, resSet] = await createExerciseSets({
        sets: updatedSets,
      });

      if (resSet) {
        toast.error(dataSet.message, {
          style: {
            background: "#333",
            color: "#fff",
            fontFamily: "Inter",
            fontWeight: 400,
          },
        });
        return;
      }

      toast.success(dataSet.message, {
        style: {
          background: "#333",
          color: "#fff",
          fontFamily: "Inter",
          fontWeight: 400,
        },
      });

      console.log("Ejercicios Laravel: ", dataEx.exercises);

      navigate("home/routines");
    } catch (error) {
      console.error("Error al crear la rutina", error);
      toast.error("Error al crear la rutina", {
        style: {
          background: "#333",
          color: "#fff",
          fontFamily: "Inter",
          fontWeight: 400,
        },
      });
    }
  };

  const handleCancel = () => {
    navigate("home");
  };

  return (
    <div className="p-8">
      <div className="flex justify-center items-center mb-10">
        <h2 className="text-[#25AEA6] text-3xl font-extrabold">
          Crear Nueva Rutina
        </h2>
      </div>
      <button
        className="bg-[#FF9811] text-black px-2 py-2 mb-4 rounded-md font-semibold hover:bg-[#e68a0f] cursor-pointer"
        onClick={() => {
          console.log("Ejercicios seleccionados", selectedExercises),
            console.log("Sets", sets);
        }}
      >
        Ver ejercicios seleccionados
      </button>

      <div className="grid-rows-2 gap-10 max-w-5xl mx-auto">
        {/* Columna izquierda: Nombre y Descripción */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-6"
        >
          {/* Campo Nombre */}
          <div>
            <label className="text-white text-sm font-medium">Nombre</label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-1 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#25AEA6]"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Campo Descripción */}
          <div>
            <label className="text-white text-sm font-medium">
              Descripción
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-1 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#25AEA6]"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Botones */}
          <div className="flex justify-center items-center gap-3">
            <button
              type="submit"
              className="bg-[#FF9811] text-black px-4 py-2 rounded-md font-semibold hover:bg-[#e68a0f] cursor-pointer"
            >
              Crear Rutina
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleCancel();
              }}
              className="bg-[#FF9811] text-black px-4 py-2 rounded-md font-semibold hover:bg-[#e68a0f] cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        </form>
        <div className="mt-15">
          <ExercisesTable
            exercises={exercises}
            selectedExercises={selectedExercises}
            setSelectedExercises={setSelectedExercises}
            sets={sets}
            setSets={setSets}
          />
        </div>
      </div>
    </div>
  );
}
