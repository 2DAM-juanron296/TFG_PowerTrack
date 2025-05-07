import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { deleteRoutine, fetchRoutines } from "../api/routines";
import { fetchRoutineExercises } from "../api/exercises";
import { fetchExerciseSets } from "../api/sets";
import ClipLoader from "react-spinners/ClipLoader";

export function Routines() {
  const [routines, setRoutines] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [modalExercises, setModalExercises] = useState([]);

  useEffect(() => {
    getRoutines();
    return () => {};
  }, []);

  const getRoutines = async () => {
    setLoading(true);
    try {
      const [data, res] = await fetchRoutines();

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

      setRoutines(data.routines);
    } catch (error) {
      console.error("Error al obtener las rutinas", error);
      toast.error("Error al obtener las rutinas", {
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

  const handleDelete = (id) => async () => {
    try {
      const [data, res] = await deleteRoutine(id);

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

      await getRoutines();
    } catch (error) {
      console.error("Error al eliminar la rutina", error);
      toast.error("Error al eliminar la rutina", {
        style: {
          background: "#333",
          color: "#fff",
          fontFamily: "Inter",
          fontWeight: 400,
        },
      });
    }
  };

  const handleSeeExercises = (id) => async () => {
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
    <div className="p-8">
      <div
        className="text-[#25AEA6] text-3xl mb-6 text-center"
        style={{ fontWeight: 800 }}
      >
        Lista de Rutinas
      </div>

      <div className="flex justify-end mb-2 me-2">
        <button
          className="bg-[#FF9811] text-black px-3 py-2 rounded-md cursor-pointer"
          style={{ fontWeight: 600 }}
          onClick={(e) => {
            e.preventDefault();
            navigate("/home/routines/create");
          }}
        >
          Crear
        </button>
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
                Usuario
              </th>
              <th className="px-6 py-4 border-b border-[#333] text-center">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center py-6">
                  <div className="flex justify-center items-center gap-4 py-5">
                    <ClipLoader color="#25AEA6" size={35} />
                    <span className="text-white text-lg">
                      Cargando rutinas...
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
                    {routine.user_username}
                  </td>
                  <td className="px-6 py-4 border-b border-[#333] text-center">
                    <button
                      className="bg-[#FF9811] text-black px-3 py-2 rounded-md cursor-pointer"
                      style={{ fontWeight: 600 }}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-[#FF9811] text-black p-2 rounded-md ml-5 cursor-pointer"
                      style={{ fontWeight: 600 }}
                      onClick={handleDelete(routine.id)}
                    >
                      Eliminar
                    </button>
                    <button
                      className="bg-[#FF9811] text-black p-2 rounded-md ml-5 cursor-pointer"
                      style={{ fontWeight: 600 }}
                      onClick={handleSeeExercises(routine.id)}
                    >
                      Ver ejercicios
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="relative bg-[#1e1e1e]/90 text-white p-6 rounded-lg max-w-xl w-full overflow-y-auto max-h-[90vh]">
            <button
              className="absolute top-4 right-4 text-white font-bold text-lg cursor-pointer"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">Ejercicios de la Rutina</h2>
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
    </div>
  );
}
