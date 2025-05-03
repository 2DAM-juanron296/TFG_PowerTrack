import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/useAuth";
import { loginUser } from "../api/auth";

export function Login() {
  const { login } = useAuth();
  const [isDisabled, setIsDisabled] = useState(false);

  // Variables para el Login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    setIsDisabled(true);

    if (!username || !password) {
      toast.error("Debe completar ambos campos", {
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

    console.log("Username: ", username);
    console.log("Password: ", password);

    try {
      const [data, res] = await loginUser(username, password);

      if (res) {
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

      console.log("Login exitoso");
      console.log("Token:", data.token);
      console.log("User:", data.user);

      login(data.token, data.user.id);
    } catch (error) {
      console.error("Error al iniciar sesión", error);
      toast.error("Error de conexión con el servidor", {
        style: {
          background: "#333",
          color: "#fff",
          fontFamily: "Inter",
          fontWeight: 400,
        },
      });
      setIsDisabled(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen text-white p-5">
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
        <div className="border-2 border-[#25AEA6] rounded-xl bg-[#0F0F0F] w-xl py-14">
          <form
            className="flex flex-col justify-center items-center"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            {/* Username Input */}
            <input
              type="text"
              className="bg-[#54807D] text-black rounded-md p-4 w-80 mb-4 text-left placeholder-[#222] focus:outline-none"
              style={{ fontWeight: 600 }}
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            {/* Password Input */}
            <input
              type="password"
              className="bg-[#54807D] text-black rounded-md mt-6 mb-6 w-80 p-4 text-left placeholder-[#222] focus:outline-none"
              style={{ fontWeight: 600 }}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Login Button */}
            <button
              className={`bg-[#25AEA6] text-black hover:bg-[#1d8d87] transition-colors rounded-md mt-8 w-96 py-3 flex justify-center items-center text-lg cursor-pointer ${isDisabled ? "opacity-50" : ""}`}
              style={{
                fontWeight: 800,
                transition: "opacity 0.3s ease",
              }}
              disabled={isDisabled}
            >
              {isDisabled ? "Iniciando Sesión..." : "LOGIN"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
