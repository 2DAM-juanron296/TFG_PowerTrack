import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import { createUser } from "../api/users";

export function CreateUser() {
  const navigate = useNavigate();

  // Variables para el formulario
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const is_admin = false;

  const handleSubmit = async () => {
    try {
      if (!username || !password || !name || !password) {
        toast.error("Debe completar todos los campos", {
          style: {
            background: "#333",
            color: "#fff",
            fontFamily: "Inter",
            fontWeight: 400,
          },
        });
        return;
      }

      const request = { name, username, email, password, is_admin };

      const [data, res] = await createUser(request);

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

      navigate("home");
    } catch (error) {
      console.error("Error al crear el usuario", error);
      toast.error("Error al crear el usuario", {
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
        <h2 className="text-[#25AEA6] text-3xl" style={{ fontWeight: 800 }}>
          Crear Nuevo Usuario
        </h2>
      </div>

      <div className="flex w-3xl justify-center items-center">
        <form
          className="w-full max-w-md"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {/* Campo Nombre */}
          <div className="mb-6">
            <label className="block text-white text-sm font-medium mb-2">
              Nombre
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#25AEA6]"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Campo Username */}
          <div className="mb-6">
            <label className="block text-white text-sm font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#25AEA6]"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Campo Email */}
          <div className="mb-6">
            <label className="block text-white text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#25AEA6]"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Campo Contraseña */}
          <div className="mb-8">
            <label className="block text-white text-sm font-medium mb-2">
              Contraseña
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#25AEA6]"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-center items-center gap-2">
            {/* Botón de Submit */}
            <button
              type="submit"
              className="bg-[#FF9811] text-black px-3 py-2 rounded-md cursor-pointer hover:bg-[#e68a0f] transition-colors"
              style={{ fontWeight: 600 }}
            >
              Crear Usuario
            </button>
            {/* Botón de Cancelar */}
            <button
              className="bg-[#FF9811] text-black px-3 py-2 rounded-md cursor-pointer hover:bg-[#e68a0f] transition-colors"
              style={{ fontWeight: 600 }}
              onClick={(e) => {
                e.preventDefault();
                handleCancel();
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
