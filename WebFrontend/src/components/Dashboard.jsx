import { useEffect, useState } from "react";
import { fetchTopExercises } from "../api/exercises";
import toast from "react-hot-toast";

export function Dashboard() {
  const [top, setTop] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const [data, res] = await fetchTopExercises();

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

        console.log("Ejercicios: ", data.top);
        setTop(data.top);
      } catch (error) {
        console.error("Error al obtener los ejercicios más usados", error);
        toast.error("Error al obtener los ejercicios más usados", {
          style: {
            background: "#333",
            color: "#fff",
            fontFamily: "Inter",
            fontWeight: 400,
          },
        });
      }
    };

    getData();
  }, []);

  return (
    <div className="p-8">
      <div
        className="text-[#25AEA6] text-3xl mb-6 text-center"
        style={{ fontWeight: 800 }}
      >
        Dashboard
      </div>

      <div className="flex justify-center">
        <div className="rounded-lg bg-[#0f0f0f] p-5">
          <div
            className="text-[#25AEA6] text-lg mb-3"
            style={{ fontWeight: 800 }}
          >
            Ejercicios más usados
          </div>
          {top.length !== 0 ? (
            <ul>
              {top.map((ex, index) => (
                <li key={index} className="text-white mb-2">
                  {++index}. {ex.name}
                </li>
              ))}
            </ul>
          ) : (
            <div className="ustify-center items-center py-4">
              <span className="text-white font-bold text-lg">
                No hay ejercicios actualmente
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
