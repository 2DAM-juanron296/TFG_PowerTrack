import { useEffect, useState } from "react";
import { fetchTopExercises } from "../api/exercises";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { fetchTopUsers } from "../api/users";
import { fetchWorkoutsToday } from "../api/routines";

export function Dashboard() {
  const [topExercises, setTopExercises] = useState([]);
  const [topUsersWeek, setTopUsersWeek] = useState([]);
  const [topUsersMonth, setTopUsersMonth] = useState([]);
  const [countWorkoutsToday, setCountWorkoutsToday] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const storedTopExercises = localStorage.getItem("topExercises");

        if (storedTopExercises && storedTopExercises.length !== 0) {
          setTopExercises(JSON.parse(storedTopExercises));
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
          setTopExercises(data.top);
          localStorage.setItem("topExercises", JSON.stringify(data.top));
        }

        const storedTopUsersWeek = localStorage.getItem("topUsersWeek");
        const storedTopUsersMonth = localStorage.getItem("topUsersMonth");

        if (
          storedTopUsersWeek &&
          storedTopUsersWeek.length !== 0 &&
          storedTopUsersMonth &&
          storedTopUsersMonth.length !== 0
        ) {
          setTopUsersWeek(JSON.parse(storedTopUsersWeek));
          setTopUsersMonth(JSON.parse(storedTopUsersMonth));
        } else {
          const [data, res] = await fetchTopUsers();

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

          console.log("Usuario Semana: ", data.topWeek);
          console.log("Usuario Mes: ", data.topMonth);

          setTopUsersWeek(data.topWeek);
          setTopUsersMonth(data.topMonth);
        }

        const storedCountWorkouts = localStorage.getItem("workouts_today");

        if (storedCountWorkouts && storedCountWorkouts.length !== 0) {
          setCountWorkoutsToday(JSON.parse(storedCountWorkouts));
        } else {
          const [data, res] = await fetchWorkoutsToday();

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

          console.log("Entrenos realizados en el día: ", data.workouts);
          setCountWorkoutsToday(data.workouts);
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

      <main className="flex justify-center mt-10 gap-16">
        {/* TOP EJERCICIOS USADOS */}
        <div className="rounded-lg bg-[#0f0f0f] p-5">
          <div
            className="text-[#25AEA6] text-center text-xl mb-3"
            style={{ fontWeight: 800 }}
          >
            Ejercicios más usados
          </div>
          {loading ? (
            <div className="flex justify-center items-center gap-4 py-4">
              <ClipLoader color="#25AEA6" size={35} />
              <span className="text-white text-lg">Cargando ejercicios...</span>
            </div>
          ) : topExercises.length !== 0 ? (
            <ul className="mt-5">
              {topExercises.map((ex, index) => (
                <li key={ex.id} className="text-white mb-2">
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

        {/* TOP USUARIOS SEMANAL */}
        <div className="rounded-lg bg-[#0f0f0f] p-5">
          <div
            className="text-[#25AEA6] text-center text-xl mb-3"
            style={{ fontWeight: 800 }}
          >
            Usuarios más activos
          </div>
          {loading ? (
            <div className="flex justify-center items-center gap-4 py-4">
              <ClipLoader color="#25AEA6" size={35} />
              <span className="text-white text-lg">Cargando usuarios...</span>
            </div>
          ) : topUsersWeek.length !== 0 && topUsersMonth.length !== 0 ? (
            <div className="flex items-center gap-x-20 mt-5">
              <div>
                <h5
                  className="text-[#25AEA6] text-lg mb-3"
                  style={{ fontWeight: 800 }}
                >
                  Semanal
                </h5>
                <ul>
                  {topUsersWeek.map((us, index) => (
                    <li
                      key={`week-${us.id}-${index}`}
                      className="flex items-center text-white mb-2 gap-x-1"
                    >
                      {++index}. {us.username}
                      {index === 1 && (
                        <img
                          width="24"
                          height="24"
                          src="https://img.icons8.com/color/24/fire-element--v1.png"
                          alt="fire-element--v1"
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h5
                  className="text-[#25AEA6] text-lg mb-3"
                  style={{ fontWeight: 800 }}
                >
                  Mensual
                </h5>
                <ul>
                  {topUsersMonth.map((us, index) => (
                    <li
                      key={`month-${us.id}-${index}`}
                      className="flex items-center text-white mb-2 gap-x-1"
                    >
                      {++index}. {us.username}
                      {index === 1 && (
                        <img
                          width="24"
                          height="24"
                          src="https://img.icons8.com/color/24/fire-element--v1.png"
                          alt="fire-element--v1"
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="ustify-center items-center py-4">
              <span className="text-white font-bold text-lg">
                No hay usuarios actualmente
              </span>
            </div>
          )}
        </div>

        {/* ENTRENOS REALIZADOS EN EL DÍA */}
        <div className="rounded-lg bg-[#0f0f0f] p-5">
          <div
            className="text-[#25AEA6] text-center text-xl mb-3"
            style={{ fontWeight: 800 }}
          >
            Nº entrenos realizados
          </div>
          {loading ? (
            <div className="flex justify-center items-center gap-4 py-4">
              <ClipLoader color="#25AEA6" size={35} />
              <span className="text-white text-lg">Cargando ejercicios...</span>
            </div>
          ) : (
            <h4
              className="text-white text-center text-xl mt-5"
              style={{ fontWeight: 800 }}
            >
              {countWorkoutsToday}
              {countWorkoutsToday === 1 ? " entreno" : " entrenos"}
            </h4>
          )}
        </div>
      </main>
    </div>
  );
}
