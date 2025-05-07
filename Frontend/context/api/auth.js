import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE } from "../../config";

const getToken = async () => await AsyncStorage.getItem("userToken");
//const getUser = async () => await AsyncStorage.getItem("username");

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

export async function logoutUser() {
  try {
    const token = await getToken();
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

    //const datat = await response.text();
    //console.log("Text: ", datat);
    //return;

    const data = await response.json();

    if (!response.ok) {
      res = true;
    } else {
      res = false;
    }

    info = [data, res];

    return info;
  } catch (error) {
    console.error("Error during logout request:", error);
    return [{ data: error.message || error }, true];
  }
}

export async function registerUser(username, password, email, name) {
  try {
    let res = false;
    let info = [];

    console.log("URL de la petición:", `${API_BASE}/register`); // Verifica la URL
    console.log("Datos enviados:", { username, password, email, name });

    const response = await fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ username, password, email, name }),
    });

    console.log("Respuesta HTTP recibida. Status:", response.status);

    console.log("Hola");
    const data = await response.json();

    console.log("Data: ", data.message);

    if (!response.ok) {
      res = true;
      console.log("Hola 2");
    } else {
      res = false;
      console.log("Todo bien");
    }

    info = [data, res];

    return info;
  } catch (error) {
    return [{ data: error }, true];
  }
}
