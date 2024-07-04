import React from "react";
import { useState } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Bienvenidas } from "../funciones/funciones";
import Max from "../funciones/funciones";
import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;
const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});
const Bienvenida = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState();
  const handleLogout = async () => {
    try {
      await Bienvenidas();
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };
  function submitLogout(e) {
    e.preventDefault();
    client.post("/api/logout/", { withCredentials: true }).then(function (res) {
      setCurrentUser(false);
      navigate("/login");
    });
  }

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-3">
        <Navbar.Brand href="/">Mi Aplicación</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/otra-pagina">Otra Página</Nav.Link>
          </Nav>
          <Button variant="primary" onClick={submitLogout}>
            Salir
          </Button>
          <Button a href="http://127.0.0.1:3000/tasks">
            Tareas
          </Button>
        </Navbar.Collapse>
      </Navbar>

      <h1>¡Estás logueado!</h1>
    </>
  );
};

export default Bienvenida;
