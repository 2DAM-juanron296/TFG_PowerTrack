import { useEffect, useState } from "react";
import { fetchTopExercises } from "../api/exercises";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

export function Dashboard() {
  const [top, setTop] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const storedTop = localStorage.getItem("top");

        if (storedTop && storedTop.length !== 0) {
          setTop(JSON.parse(storedTop));
        } else {
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
          localStorage.setItem("top", JSON.stringify(data.top));
        }
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
      } finally {
        setLoading(false);
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

      <main className="flex justify-center mt-10 gap-20">
        <div className="rounded-lg bg-[#0f0f0f] p-5">
          <div
            className="text-[#25AEA6] text-xl mb-3"
            style={{ fontWeight: 800 }}
          >
            Ejercicios más usados
          </div>
          {loading ? (
            <div className="flex justify-center items-center gap-4 py-4">
              <ClipLoader color="#25AEA6" size={35} />
              <span className="text-white text-lg">Cargando ejercicios...</span>
            </div>
          ) : top.length !== 0 ? (
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

        <div className="rounded-lg bg-[#0f0f0f] p-5">
          <div
            className="text-[#25AEA6] text-xl mb-3"
            style={{ fontWeight: 800 }}
          >
            Usuarios más activos (semana / mes / año)
          </div>
        </div>

        <div className="rounded-lg bg-[#0f0f0f] p-5">
          <div
            className="text-[#25AEA6] text-xl mb-3"
            style={{ fontWeight: 800 }}
          >
            Nº entrenos realizados
          </div>
        </div>
      </main>
    </div>
  );
}
