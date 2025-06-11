import { API_BASE } from "../../config";

const getToken = () => localStorage.getItem("userToken");
const getUserId = () => localStorage.getItem("user_id");

export async function fetchRoutines() {
  try {
    const token = getToken();

    let res = false;
    let info = [];

    const response = await fetch(`${API_BASE}/routines`, {
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

export async function createRoutine(request) {
  try {
    const token = getToken();
    const user_id = getUserId();

    let res = false;
    let info = [];

    const response = await fetch(`${API_BASE}/createRoutine`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...request, user_id }),
    });

    const data = await response.json();
    !response.ok ? (res = true) : (res = false);
    info = [data, res];
    return info;
  } catch (error) {
    return [{ data: error }, true];
  }
}

export async function deleteRoutine(id) {
  try {
    const token = getToken();
    let res = false;
    let info = [];

    const response = await fetch(`${API_BASE}/deleteRoutine/${id}`, {
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

export async function fetchWorkoutsToday() {
  try {
    const token = getToken();

    let res = false;
    let info = [];

    const response = await fetch(`${API_BASE}/workoutsToday`, {
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
