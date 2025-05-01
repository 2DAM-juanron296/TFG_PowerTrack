import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import toast from "react-hot-toast";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

export function Header() {
  const { logout } = useAuth();
  const [isDisabled, setIsDisabled] = useState(false);
  const location = useLocation();

  const isUsersActive =
    location.pathname === "/home" || location.pathname === "/home/users";
  const isRoutinesActive = location.pathname === "/home/routines";

  const handleLogout = async () => {
    try {
      setIsDisabled(true);
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
        setIsDisabled(false);
        return;
      }

      console.log("Logout exitoso");
      console.log("Token:", data.token);
      console.log("User:", data.user);

      localStorage.setItem("userToken", data.token);

      logout(data.token);
    } catch (error) {
      console.error("Error al iniciar sesión", error);
      toast.error("Error de conexión con el servidor", {
        style: {
          background: "#333",
          color: "#fff",
          fontWeight: 400,
        },
      });
      setIsDisabled(false);
    }
  };

  return (
    <header className="pt-12">
      <div className="grid grid-cols-3 items-center px-12">
        {/* LOGO */}
        <div className="flex items-center gap-3">
          <img
            src="/images/PowerTrackIcon.png"
            alt="PowerTrack Logo"
            className="w-16 h-16"
          />
          <div className="text-white text-4xl" style={{ fontWeight: 600 }}>
            PowerTrack
          </div>
        </div>

        {/* NAVEGACIÓN */}
        <nav className="flex justify-center gap-80 pt-2">
          <NavLink
            to="/home/users"
            className={`text-xl transition-colors ${isUsersActive ? "text-[#25AEA6]" : "text-white hover:text-[#25AEA6]"}`}
            style={{ fontWeight: 600 }}
          >
            Usuarios
          </NavLink>
          <NavLink
            to="/home/routines"
            className={`text-xl transition-colors ${isRoutinesActive ? "text-[#25AEA6]" : "text-white hover:text-[#25AEA6]"}`}
            style={{ fontWeight: 600 }}
          >
            Rutinas
          </NavLink>
        </nav>

        {/* Botón LOGOUT */}
        <div className="flex justify-end">
          <button
            className={`bg-[#25AEA6] text-black rounded-md px-6 py-2 text-lg cursor-pointer hover:bg-[#1d8d87] transition-colors  ${isDisabled ? "opacity-50" : ""}`}
            style={{ fontWeight: 800, transition: "opacity 0.3s ease" }}
            onClick={handleLogout}
            disabled={isDisabled}
          >
            {isDisabled ? "Cerrando Sesión..." : "LOGOUT"}
          </button>
        </div>
      </div>
    </header>
  );
}
