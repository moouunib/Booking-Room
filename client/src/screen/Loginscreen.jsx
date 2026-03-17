import React, { useState } from 'react'
import "../style/login.css";
import axios from 'axios';
import { useNavigate } from 'react-router';
const Loginscreen = () => {
  const navigate = useNavigate();
  const [form , setForm]=useState({
    userName:"",
    email:"",
    password:""
  })
  const [message, setMessage] = useState("");
  const handleChange = (e)=>{
    const {name , value}= e.target;
    setForm({
      ...form,
      [name] :value,
    })
  }
  const login =async (e)=>{

    e.preventDefault();
    
    const finalData = {
      userName:form.userName,
      email:form.email,
      password:form.password
    }
    try {
      const { data } = await axios.post("http://localhost:5000/auth/login",finalData);
      console.log(finalData);
      
      setMessage(data.message);
      console.log(message);
      alert(data.message);
      navigate("/employee" , {state:{user:data.user}} );
  } catch ( {error  } ) {
      console.log("An error occurred during login" + error);
     
      alert("An error occurred during login");
      
    }
  }
  return (
    <div className="screen-login">
      <div className="box-form">
        <form onSubmit={login} method="post">
          <h1 className="title">Login</h1>
          <input
            type="text"
            value={form.userName}
            onChange={handleChange}
            name="userName"
            placeholder="user name"
            id=""
          />
          <input
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="email"
            name="email"
            id="email"
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
}

export default Loginscreen
