import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const token = localStorage.getItem("userToken");

        const response = await fetch("http://192.168.1.132:8000/api/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
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

        setUsers(data.users);
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
    getUsers();
  }, []);

  return (
    <div className="p-8">
      <div
        className="text-[#25AEA6] text-3xl mb-6 text-center"
        style={{ fontWeight: 800 }}
      >
        Lista de Usuarios
      </div>

      {users.length === 0 ? (
        <div className="text-center text-white text-lg mt-10">
          No hay usuarios registrados.
        </div>
      ) : (
        <div className="flex justify-center mt-10">
          <table className="w-4xl mx-auto text-white border border-[#fff] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-[#0F0F0F]">
                <th className="px-6 py-4 border-b border-[#333] text-center">
                  Nombre
                </th>
                <th className="px-6 py-4 border-b border-[#333] text-center">
                  Username
                </th>
                <th className="px-6 py-4 border-b border-[#333] text-center">
                  Email
                </th>
                <th className="px-6 py-4 border-b border-[#333] text-center">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-[#1d1d1d]">
                  <td className="px-6 py-4 border-b border-[#333] text-center">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 border-b border-[#333] text-center">
                    {user.username}
                  </td>
                  <td className="px-6 py-4 border-b border-[#333] text-center">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 border-b border-[#333] text-center">
                    <button
                      className="bg-[#FF9811] text-black p-2 rounded-md cursor-pointer"
                      style={{ fontWeight: 600 }}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-[#FF9811] text-black p-2 rounded-md ml-10 cursor-pointer"
                      style={{ fontWeight: 600 }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
