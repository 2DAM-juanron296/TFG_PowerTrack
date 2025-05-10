import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { deleteUser, fetchUsers } from "../api/users";
import ClipLoader from "react-spinners/ClipLoader";

export function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    getUsers();
    return () => {};
  }, []);

  const getUsers = async () => {
    setLoading(true);
    try {
      const storedUsers = localStorage.getItem("users");

      if (storedUsers && storedUsers.length !== 0) {
        setUsers(JSON.parse(storedUsers));
      } else {
        const [data, res] = await fetchUsers();

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

        setUsers(data.users);
        localStorage.setItem("users", JSON.stringify(data.users));
      }
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
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => async () => {
    const result = await MySwal.fire({
      title: "¿Estás seguro de eliminar a este usuario?",
      icon: "warning",
      showCancelButton: true,
      background: "#010410",
      confirmButtonColor: "#25AEA6",
      cancelButtonColor: "#ff0000",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      color: "white",
    });

    if (!result.isConfirmed) return;

    try {
      const [data, res] = await deleteUser(id);

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

      localStorage.removeItem("users");
      await getUsers();
    } catch (error) {
      console.error("Error al eliminar el usuario", error);
      toast.error("Error al eliminar el usuario", {
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
        Lista de Usuarios
      </div>

      <div className="flex justify-end mb-2 me-2">
        <button
          className="bg-[#FF9811] text-black px-3 py-2 rounded-md cursor-pointer"
          style={{ fontWeight: 600 }}
          onClick={(e) => {
            e.preventDefault();
            navigate("/home/users/create");
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
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  <div className="flex justify-center items-center gap-4 py-4">
                    <ClipLoader color="#25AEA6" size={35} />
                    <span className="text-white text-lg">
                      Cargando usuarios...
                    </span>
                  </div>
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  <div className="flex justify-center items-center py-4">
                    <span className="text-white font-bold text-lg">
                      No hay usuarios actualmente
                    </span>
                  </div>
                </td>
              </tr>
            ) : (
              users.map((user) => (
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
                      className="bg-[#FF9811] text-black px-3 py-2 rounded-md cursor-pointer"
                      style={{ fontWeight: 600 }}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-[#FF9811] text-black p-2 rounded-md ml-10 cursor-pointer"
                      style={{ fontWeight: 600 }}
                      onClick={handleDelete(user.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
