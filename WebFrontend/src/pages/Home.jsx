// src/pages/App.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import toast from "react-hot-toast";

export function Home() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    if (!localStorage.getItem("userToken")) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("userToken");

      const response = await fetch("http://192.168.1.132:8000/api/logout", {
        method: "POST",
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

      console.log("Login exitoso");
      console.log("Token:", data.token);
      console.log("User:", data.user);

      localStorage.setItem("userToken", data.token);

      logout(data.token);
    } catch (error) {
      console.error("Error al iniciar sesión", error);
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <div>
      <h1 className="text-white">Bienvenido a tu aplicación</h1>
      <button
        className="bg-[#25AEA6] text-black rounded-md mt-8 w-96 py-3 flex justify-center items-center text-lg"
        style={{ fontFamily: "Inter", fontWeight: 800, cursor: "pointer" }}
        onClick={handleLogout}
      >
        LOGOUT
      </button>
    </div>
  );
}
