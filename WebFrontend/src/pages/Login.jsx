import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/useAuth";

export function Login() {
  const { login } = useAuth();

  // Variables para el Login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      toast.error("Debe completar ambos campos", {
        style: {
          background: "#333",
          color: "#fff",
          fontFamily: "Inter",
          fontWeight: 400,
        },
      });
      return;
    }

    console.log("Username: ", username);
    console.log("Password: ", password);

    try {
      const response = await fetch("http://192.168.1.132:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
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

      login(data.token);
    } catch (error) {
      console.error("Error al iniciar sesión", error);
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#010410] text-white p-5">
      <div className="flex flex-col items-center mb-14">
        {/* Logo */}
        <div className="mb-5">
          <img
            src="/images/PowerTrackIcon.png"
            alt="PowerTrack Logo"
            className="w-24 h-24"
          />
        </div>

        {/* Login Box */}
        <div className="border-2 border-[#25AEA6] rounded-xl bg-[#0F0F0F] w-xl py-14 flex flex-col justify-center items-center">
          {/* Username Input */}
          <input
            type="text"
            className="bg-[#54807D] text-black rounded-md p-4 w-80 mb-4 text-left placeholder-[#222] focus:outline-none"
            style={{ fontFamily: "Inter", fontWeight: 600 }}
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          {/* Password Input */}
          <input
            type="password"
            className="bg-[#54807D] text-black rounded-md mt-6 mb-6 w-80 p-4 text-left placeholder-[#222] focus:outline-none"
            style={{ fontFamily: "Inter", fontWeight: 600 }}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Login Button */}
          <button
            className="bg-[#25AEA6] text-black rounded-md mt-8 w-96 py-3 flex justify-center items-center text-lg"
            style={{ fontFamily: "Inter", fontWeight: 800, cursor: "pointer" }}
            onClick={handleLogin}
          >
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
}
