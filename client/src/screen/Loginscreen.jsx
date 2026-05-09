import React, { useState } from "react";
import "../style/login.css";
import axios from "axios";
import { useNavigate } from "react-router";
const Loginscreen = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    userName: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const login = async (e) => {
    e.preventDefault();

    const finalData = {
      userName: form.userName,
      password: form.password,
    };
    try {
      const { data } = await axios.post(
        "http://localhost:5000/auth/login",
        finalData,
      );
      localStorage.setItem("token", JSON.stringify(data.token));
      localStorage.setItem("user", JSON.stringify(data.user));
      console.log(finalData);

      setMessage(data.message);
      console.log(message);
      alert(data.message);
      navigate("/employee", { state: { user: data.user } });
    } catch (error) {
      console.error("Login error:", error);
      // محاولة استخراج الرسالة من رد الخطأ إذا كان موجوداً
      const errorMessage =
        error.response?.data?.message || "An error occurred during login";
      alert(errorMessage);
    }
  };
  return (
    <div className="screen-login">
      <div className="box-form">
        <form onSubmit={login} method="post">
          <h1 className="title">Employee Login</h1>
          <input
            type="text"
            value={form.userName}
            onChange={handleChange}
            name="userName"
            placeholder="user name"
            id=""
          />

          <input
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="password"
            name="password"
            id="password"
          />

          <button id="bttn" className="btn btn-primary" type="submit">
            Login
          </button>
          {message && <p> {message} </p>}
        </form>
      </div>
    </div>
  );
};

export default Loginscreen;
