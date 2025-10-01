import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import api from "../api/axios";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", form);
      localStorage.setItem("token", res.data.token);
      alert("Login successful");
      navigate("/departments");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="card-title">Sign In</h2>
        <p className="card-subtitle">Access your employee dashboard</p>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              placeholder="user@company.com"
              value={form.email}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          {/* Password with eye toggle */}
          <div className="form-group relative">
            <label className="form-label">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} 
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
                className="form-input pr-10" 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Remember Me + Forgot */}
          <div className="form-controls">
            <label className="checkbox-label">
              <input type="checkbox" className="form-checkbox" />
              Keep me logged in
            </label>
            <button
              type="button"
              className="forgot-password-btn"
              onClick={() => alert("Forgot Password functionality will be implemented soon!")}
            >
              Reset Password?
            </button>
          </div>

          {/* Submit */}
          <button type="submit" className="submit-btn">
            LOGIN SECURELY
          </button>
        </form>
      </div>
    </div>
  );
}
