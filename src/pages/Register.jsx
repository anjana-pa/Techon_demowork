import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/register", form);
      alert("Registered successfully. Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    // Reusing the 'login-container' class for the full-screen background
    <div className="login-container">
      {/* Reusing 'login-card' styles for the form container */}
      <div className="login-card register-card-fix">
        
        <h2 className="card-title">
          Create Account
        </h2>
        <p className="card-subtitle">
          Join our employee system
        </p>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              name="name"
              placeholder="Your Full Name"
              value={form.name}
              onChange={handleChange}
              className="form-input" 
              required
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              placeholder="user@company.com"
              value={form.email}
              onChange={handleChange}
              className="form-input" 
              required
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="form-input" 
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="submit-btn register-btn-style" 
          >
            REGISTER
          </button>
        </form>
      </div>
    </div>
  );
}