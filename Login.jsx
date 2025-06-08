import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost/react-auth-api/login.php", {
        email,
        password,
      });
      if (res.data.success) {
        localStorage.setItem("user", email);
        navigate("/todo");
      } else {
        setMsg(res.data.message);
      }
    } catch {
      setMsg("Server error");
    }
  };

  return (
    <div className="login-wrapper">
      <nav className="navbar">
        <h2 className="app-title">Todo</h2>
        <Link to="/register">
          <button className="register-button">Register</button>
        </Link>
      </nav>

      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Login</button>
          {msg && <p className="error">{msg}</p>}
        </form>
      </div>
    </div>
  );
}
