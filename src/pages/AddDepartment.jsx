import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function AddDepartment() {
  const [form, setForm] = useState({ name: "", description: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
          alert("Unauthorized. Please log in.");
          navigate("/login");
          return;
      }

      await api.post("/departments", form, {
          headers: { Authorization: `Bearer ${token}` }
      });
      
      alert(`Department "${form.name}" added successfully!`);
      navigate("/departments");
    } catch (err) {
      console.error("Department addition failed:", err.response ? err.response.data : err.message);
      
      const errorDetail = err.response?.data?.message || "Verify your API path is /api/departments and server is running.";
      alert(`Failed to add department. Detail: ${errorDetail}`);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        
        <h2 className="card-title">
          Add New Department
        </h2>
        <p className="card-subtitle">
          Enter details for the new department
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Department Name</label>
            <input
              name="name"
              placeholder="e.g., Human Resources"
              value={form.name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              placeholder="Brief overview of department's role and function."
              value={form.description}
              onChange={handleChange}
              className="form-input form-textarea"
              rows="4"
              required
            />
          </div>

          <button
            type="submit"
            className="submit-btn add-btn-style" 
          >
            ADD DEPARTMENT
          </button>
        </form>
      </div>
    </div>
  );
}