import React, { useState, useEffect } from "react";
import { Table, Form, Button, Container, Row, Col } from "react-bootstrap";
import { fetchTasks, createTask } from "../funciones/funciones";
import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    priority: 1,
  });

  const newTaskData = {
    name: newTask.name,
    description: newTask.description,
    priority: newTask.priority,
    completed: false,
  };

  useEffect(() => {
    fetchTasks()
      .then((data) => setTasks(data.results))
      .catch((error) => console.error("Error al obtener las tareas", error));
  }, []);

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("csrftoken"))
        .split("=")[1];

      const createdTask = await createTask(token, newTaskData);
      console.log("Tarea creada:", createdTask);
      // Actualiza el estado de tasks con la nueva tarea
      setTasks([...tasks, createdTask]);
      // Limpia el formulario
      setNewTask({ name: "", description: "", priority: 1, completed: false });
    } catch (error) {
      console.error("Error al agregar la tarea:", error);
    }
  };

  return (
    <Container>
      <h1>Tareas</h1>
      <Form onSubmit={handleTaskSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="formTaskName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa el nombre de la tarea"
                value={newTask.name}
                onChange={(e) =>
                  setNewTask({ ...newTask, name: e.target.value })
                }
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formTaskDescription">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                placeholder="Descripción de la tarea"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formTaskPriority">
              <Form.Label>Prioridad</Form.Label>
              <Form.Control
                type="number"
                placeholder="Prioridad de la tarea"
                value={newTask.priority}
                onChange={(e) =>
                  setNewTask({ ...newTask, priority: parseInt(e.target.value) })
                }
              />
            </Form.Group>
          </Col>
          <Col xs="auto">
            <Button variant="primary" type="submit" className="mb-2">
              Agregar Tarea
            </Button>
          </Col>
        </Row>
      </Form>
      <Table striped bordered hover>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Prioridad</th>
              <th>Completada</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.name}</td>
                <td>{task.description}</td>
                <td>{task.priority}</td>
                <td>{task.completed ? "Sí" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Table>
    </Container>
  );
};

export default Tasks;
