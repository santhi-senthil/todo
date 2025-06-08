import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost/react-auth-api/register.php", {
        email,
        password,
      });
      setMsg(res.data.message);
      if (res.data.success) {
        setTimeout(() => navigate("/"), 2000);
      }
    } catch {
      setMsg("Server error");
    }
  };

  return (
    <div className="login-container">
      <h2 className="title">Register</h2>
      <form onSubmit={handleRegister} className="form">
        <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Register</button>
        {msg && <p className="error">{msg}</p>}
      </form>
    </div>
  );
}
