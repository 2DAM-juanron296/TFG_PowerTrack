import { Route, Routes, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Layout } from "./pages/Layout";
import { useAuth } from "./context/useAuth";
import { Users } from "./components/Users";
import { Routines } from "./components/Routines";
import { CreateUser } from "./components/CreateUser";
import { CreateRoutine } from "./components/CreateRoutine";
import { UserRoutines } from "./components/UserRoutines";
//import { useEffect } from "react";

export default function App() {
  const { isLoggedIn } = useAuth();

  /*useEffect(() => {
    const handleClosedApp = () => {
      localStorage.clear();
    };

    window.addEventListener("beforeunload", handleClosedApp);

    return () => {
      window.removeEventListener("beforeunload", handleClosedApp);
    };
  }, []);*/

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={!isLoggedIn ? <Login /> : <Navigate to="/home" replace />}
        />
        <Route
          path="/home"
          element={isLoggedIn ? <Layout /> : <Navigate to="/login" replace />}
        >
          <Route index element={<Users />} />
          <Route path="routines" element={<Routines />} />
          <Route path="routines/create" element={<CreateRoutine />} />
          <Route path="users" element={<Users />} />
          <Route path="users/create" element={<CreateUser />} />
          <Route path="users/routines" element={<UserRoutines />} />
        </Route>
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/home" : "/login"} replace />}
        />
      </Routes>
    </>
  );
}
