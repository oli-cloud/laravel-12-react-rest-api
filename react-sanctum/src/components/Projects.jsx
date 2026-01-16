import React, { useState, useEffect } from "react";
import api from "../api"; // adjust path

function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await api.get("/projects");
    setProjects(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.id) {
      await api.put(`/projects/${form.id}`, form);
    } else {
      await api.post("/projects", form);
    }
    setForm({ name: "", description: "" });
    fetchProjects();
  };

  const handleEdit = (project) => setForm(project);

  const handleDelete = async (id) => {
    await api.delete(`/projects/${id}`);
    fetchProjects();
  };

  return (
    <div>
      <h1>Projects</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <button type="submit">{form.id ? "Update" : "Create"}</button>
      </form>

      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <button onClick={() => handleEdit(project)}>Edit</button>
            <button onClick={() => handleDelete(project.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Projects;
