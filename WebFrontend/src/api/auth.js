import { API_BASE } from "../../config";

const getToken = () => localStorage.getItem("userToken");

export async function loginUser(username, password) {
  try {
    let res = false;
    let info = [];

    const response = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    !response.ok ? (res = true) : (res = false);
    info = [data, res];
    return info;
  } catch (error) {
    return [{ data: error }, true];
  }
}

export async function logoutUser() {
  try {
    const token = getToken();
    let res = false;
    let info = [];

    const response = await fetch(`${API_BASE}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    !response.ok ? (res = true) : (res = false);
    info = [data, res];
    return info;
  } catch (error) {
    return [{ data: error }, true];
  }
}
