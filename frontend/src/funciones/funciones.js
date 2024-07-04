// funciones.js
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;
const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

function Max() {
  const [currentUser, setCurrentUser] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function submitLogout(e) {
    e.preventDefault();
    client.post("/api/logout", { withCredentials: true }).then(function (res) {
      setCurrentUser(false);
    });
  }
}
export default Max;

const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/register/",
      userData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { registerUser };

const API_BASE_URL = "http://127.0.0.1:8000";

export const login = async (credentials) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/login/`,
      credentials
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchTasks = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/tasks/`, {
      headers: { Authorization: `Token ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createTask = async (token, newTaskData) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/tasks/",

      newTaskData,
      {
        headers: { Authorization: `Token ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const Bienvenidas = () => {
  const [currentUser, setCurrentUser] = useState();
  const handleLogout = async () => {
    try {
      await axios
        .post("/api/logout", { withCredentials: true })
        .then(function (res) {
          setCurrentUser(false);
        });
      window.location.href = "/login";
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };
};
