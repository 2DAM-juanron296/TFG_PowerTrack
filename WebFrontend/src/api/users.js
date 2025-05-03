import { API_BASE } from "../../config";

const getToken = () => localStorage.getItem("userToken");

export async function fetchUsers() {
  try {
    const token = getToken();
    let res = false;
    let info = [];

    const response = await fetch(`${API_BASE}/users`, {
      method: "GET",
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

export async function deleteUser(id) {
  try {
    const token = getToken();
    let res = false;
    let info = [];

    const response = await fetch(`${API_BASE}/deleteUser/${id}`, {
      method: "DELETE",
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

export async function createUser(request) {
  try {
    const token = getToken();
    let res = false;
    let info = [];

    const response = await fetch(`${API_BASE}/createUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(request),
    });

    const data = await response.json();
    !response.ok ? (res = true) : (res = false);
    info = [data, res];
    return info;
  } catch (error) {
    return [{ data: error }, true];
  }
}
