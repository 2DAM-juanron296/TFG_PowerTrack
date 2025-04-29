import { Route, Routes, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { useAuth } from "./context/useAuth";

export default function App() {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={!isLoggedIn ? <Login /> : <Navigate to="/home" replace />}
        />
        <Route
          path="/home"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/home" : "/login"} replace />}
        />
      </Routes>
    </>
  );
}
