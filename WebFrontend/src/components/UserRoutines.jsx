import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchUserRoutine } from "../api/users";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { fetchExerciseSets } from "../api/sets";
import { fetchRoutineExercises } from "../api/exercises";

export function UserRoutines() {
  const location = useLocation();
  const { userId, username } = location.state || {};

  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [modalExercises, setModalExercises] = useState([]);
  const [nameRoutine, setNameRoutine] = useState("");

  useEffect(() => {
    setLoading(true);
    const getUserRoutines = async () => {
      try {
        const [data, res] = await fetchUserRoutine(userId);

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

        console.log("Rutinas de usuario: ", data.routines);

        setRoutines(data.routines);
      } catch (error) {
        console.error("Error al eliminar el usuario", error);
        toast.error(error, {
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

    getUserRoutines();
  }, [userId]);

  const handleSeeExercises = (id, name) => async () => {
    try {
      const [data, res] = await fetchRoutineExercises(id);

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

      console.log("Ejercicios de la rutina", data);

      const setsResponse = await Promise.all(
        data.exercises.map(async (ex) => {
          const [dataSets, resSets] = await fetchExerciseSets(ex.id);
          if (resSets) {
            toast.error(`Error al traer sets del ejercicio ${ex.id}`, {
              style: {
                background: "#333",
                color: "#fff",
                fontFamily: "Inter",
                fontWeight: 400,
              },
            });
            return [];
          }
          return dataSets.routine_exercises_sets || [];
        }),
      );

      console.log("Series: ", setsResponse);

      const enrichedExercises = data.exercises.map((ex, index) => {
        return { ...ex, sets: setsResponse[index] };
      });

      setModalExercises(enrichedExercises);
      setNameRoutine(name);
      setShowModal(true);
    } catch (error) {
      console.error("Error al obtener los ejercicios de la rutina", error);
      toast.error("Error al obtener los ejercicios de la rutina", {
        style: {
          background: "#333",
          color: "#fff",
          fontFamily: "Inter",
          fontWeight: 400,
        },
      });
    }
  };

  return (
    <>
      <div className="p-8">
        <div
          className="text-[#25AEA6] text-3xl mb-6 text-center"
          style={{ fontWeight: 800 }}
        >
          Rutinas de {username}
        </div>

        <div className="flex justify-center">
          <table className="w-4xl mx-auto text-white border border-[#fff] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-[#0F0F0F]">
                <th className="px-6 py-4 border-b border-[#333] text-center">
                  Nombre
                </th>
                <th className="px-6 py-4 border-b border-[#333] text-center">
                  Descripción
                </th>
                <th className="px-6 py-4 border-b border-[#333] text-center">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    <div className="flex justify-center items-center gap-4 py-4">
                      <ClipLoader color="#25AEA6" size={35} />
                      <span className="text-white text-lg">
                        Cargando rutinas...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : routines.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    <div className="flex justify-center items-center py-4">
                      <span className="text-white font-bold text-lg">
                        No hay rutinas actualmente
                      </span>
                    </div>
                  </td>
                </tr>
              ) : (
                routines.map((routine) => (
                  <tr key={routine.id} className="hover:bg-[#1d1d1d]">
                    <td className="px-6 py-4 border-b border-[#333] text-center">
                      {routine.name}
                    </td>
                    <td className="px-6 py-4 border-b border-[#333] text-center">
                      {routine.description}
                    </td>
                    <td className="px-6 py-4 border-b border-[#333] text-center">
                      <div className="flex flex-wrap justify-center gap-2">
                        <button
                          className="bg-[#1a8783] text-black px-3 py-2 rounded-md text-sm cursor-pointer"
                          style={{ fontWeight: 600 }}
                          onClick={handleSeeExercises(routine.id, routine.name)}
                        >
                          Ver ejercicios
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black/70"
            onClick={() => setShowModal(false)}
          ></div>

          <div className="relative z-50 bg-[#1e1e1e] text-white p-6 rounded-lg max-w-xl w-full max-h-[70vh] overflow-y-auto">
            <button
              className="absolute top-4 right-4 text-white font-bold text-lg cursor-pointer"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            <h2 className="text-xl text-white font-bold mb-4">
              Ejercicios de {nameRoutine}
            </h2>
            {modalExercises.map((exercise) => (
              <div key={exercise.id} className="mt-8">
                <h3 className="text-lg font-semibold mb-2">
                  {exercise.order}. {exercise.exercise.name}
                </h3>
                {exercise.sets?.length > 0 ? (
                  <table className="min-w-full text-sm bg-[#2e2e2e] rounded-md">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left">Set</th>
                        <th className="px-4 py-2 text-left">Repeticiones</th>
                        <th className="px-4 py-2 text-left">Peso</th>
                      </tr>
                    </thead>
                    <tbody>
                      {exercise.sets.map((set) => (
                        <tr key={set.id}>
                          <td className="px-4 py-2">{set.order}</td>
                          <td className="px-4 py-2">{set.reps}</td>
                          <td className="px-4 py-2">{set.weight} kg</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-gray-400">
                    Este ejercicio no tiene series.
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
