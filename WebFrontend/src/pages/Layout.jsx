// src/pages/App.jsx
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "../components/Header";

export function Layout() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex mt-16 justify-center items-center">
          <Outlet />
        </main>
      </div>
    </>
  );
}
