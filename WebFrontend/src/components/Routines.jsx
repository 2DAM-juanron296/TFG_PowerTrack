import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { deleteRoutine, fetchRoutines } from "../api/routines";
import { fetchRoutineExercises } from "../api/exercises";

export function Routines() {
  const [routines, setRoutines] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getRoutines();
    return () => {};
  }, []);

  const getRoutines = async () => {
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

      console.log("Ejercicios de la rutina", data.routine_exercises);
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
            {routines.map((routine) => (
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
                    Ver ejercicios Consola
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
