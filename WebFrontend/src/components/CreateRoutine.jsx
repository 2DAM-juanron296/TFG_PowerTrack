import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import { createRoutine } from "../api/routines";

export function CreateRoutine() {
  const navigate = useNavigate();

  // Variables para el formulario
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

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
        <h2 className="text-[#25AEA6] text-3xl" style={{ fontWeight: 800 }}>
          Crear Nueva Rutina
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

          {/* Campo Descripción */}
          <div className="mb-6">
            <label className="block text-white text-sm font-medium mb-2">
              Descripción
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#25AEA6]"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex justify-center items-center gap-2">
            {/* Botón de Submit */}
            <button
              type="submit"
              className="bg-[#FF9811] text-black px-3 py-2 rounded-md cursor-pointer hover:bg-[#e68a0f] transition-colors"
              style={{ fontWeight: 600 }}
            >
              Crear Rutina
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
