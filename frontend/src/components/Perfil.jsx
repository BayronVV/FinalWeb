import React, { useState } from "react";
import { registerUser } from "../funciones/funciones";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Perfil = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    biography: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser(formData);
      Swal.fire({
        title: "¡Éxito!",
        text: "Usuario registrado",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
      setFormData({
        username: "",
        password: "",
        email: "",
        biography: "",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No se pudo registrar el usuario",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-3">
        <Navbar.Brand href="/">Mi Aplicación</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/otra-pagina">Otra Página</Nav.Link>
          </Nav>
          <Link to="/login">
            <Button variant="primary">Inicia Sesión</Button>
          </Link>
        </Navbar.Collapse>
      </Navbar>
      <div className="text-center">
        <h2>Registro de Usuarios</h2>
        <form onSubmit={handleSubmit} className="container mt-5">
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Nombre de usuario
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo electrónico
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="biography" className="form-label">
              Biografía
            </label>
            <textarea
              className="form-control"
              id="biography"
              name="biography"
              value={formData.biography}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Registrarse
          </button>
        </form>
      </div>
    </>
  );
};

export default Perfil;
