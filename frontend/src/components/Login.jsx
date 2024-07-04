import React, { useState } from "react";
import { login } from "../funciones/funciones";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Nav,
  Navbar,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(credentials);
      setToken(data.token);

      navigate("/bienvenida");
    } catch (error) {
      console.error("Error de autenticación", error);
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
          <Link to="/perfil">
            <Button variant="primary">Registrarse</Button>
          </Link>
        </Navbar.Collapse>
      </Navbar>

      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <Row>
          <Col md={12} className="mx-auto">
            <Card>
              <Card.Body>
                <h2 className="text-center mb-4">Iniciar Sesión</h2>
                <Form onSubmit={handleSubmit}>
                  <Form.Group id="username">
                    <Form.Label htmlFor="usernameInput">
                      Nombre de usuario
                    </Form.Label>
                    <Form.Control
                      id="usernameInput"
                      type="text"
                      name="username"
                      value={credentials.username}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group id="password">
                    <Form.Label htmlFor="passwordInput">Contraseña</Form.Label>
                    <Form.Control
                      id="passwordInput"
                      type="password"
                      name="password"
                      value={credentials.password}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Button className="w-100 mt-3" type="submit">
                    Iniciar Sesión
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
