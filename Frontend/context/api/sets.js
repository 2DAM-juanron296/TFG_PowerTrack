import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE } from "../../config";

const getToken = async () => await AsyncStorage.getItem("userToken");

export async function fetchExerciseSets(idRoutineExercise) {
  try {
    const token = await getToken();

    let res = false;
    let info = [];

    const response = await fetch(
      `${API_BASE}/routineExerciseSets/${idRoutineExercise}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

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

export async function createExerciseSets(request) {
  try {
    const token = await getToken();

    let res = false;
    let info = [];

    const response = await fetch(`${API_BASE}/createRoutineExerciseSet`, {
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
