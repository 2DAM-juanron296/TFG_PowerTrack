import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE } from "../../config";

const getToken = async () => await AsyncStorage.getItem("userToken");
const getUserId = async () => await AsyncStorage.getItem("id_user");

export async function fetchDefaultRoutines() {
  try {
    const token = await getToken();

    let res = false;
    let info = [];

    const response = await fetch(`${API_BASE}/user/${1}/routines`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      res = true;
    } else {
      res = false;
    }

    info = [data, res];

    return info;
  } catch (error) {
    return [{ data: error }, true];
  }
}

export async function saveDefaultRoutinetoUser(request) {
  try {
    const token = await getToken();

    let res = false;
    let info = [];

    const response = await fetch(`${API_BASE}/saveRoutine`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(request),
    });

    const data = await response.json();

    if (!response.ok) {
      res = true;
    } else {
      res = false;
    }

    info = [data, res];

    return info;
  } catch (error) {
    return [{ data: error }, true];
  }
}

export async function createUserRoutine(request) {
  try {
    const token = await getToken();
    const user_id = await getUserId();

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
    if (!response.ok) {
      res = true;
    } else {
      res = false;
    }

    info = [data, res];

    return info;
  } catch (error) {
    return [{ data: error }, true];
  }
}

export async function fetchRoutineName(id) {
  try {
    const token = await getToken();

    let res = false;
    let info = [];

    const response = await fetch(`${API_BASE}/routine/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      res = true;
    } else {
      res = false;
    }

    info = [data, res];

    return info;
  } catch (error) {
    return [{ data: error }, true];
  }
}

export async function deleteRoutine(idRoutine) {
  try {
    const token = await getToken();

    let res = false;
    let info = [];

    const response = await fetch(`${API_BASE}/deleteRoutine/${idRoutine}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      res = true;
    } else {
      res = false;
    }

    info = [data, res];

    return info;
  } catch (error) {
    return [{ data: error }, true];
  }
}
