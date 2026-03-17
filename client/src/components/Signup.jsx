import React, { useState } from 'react';
import axios from "axios";

const Signup = () => {
  
  const[confirmPassword, setConfirmPassword]=useState();
  const step1 = JSON.parse(localStorage.getItem("step1"));
  const [form2 , setForm2]= useState({
    userName : "",
    email :"",
    password :"",
    status :"active",
    role:"admin2"
    });
 const handleChange = (e) => {
   const { name, value } = e.target;
   setForm2({
     ...form2,
     [name]: value,
   });
 };
    
    
  
  const register=async(e)=>{
    
    e.preventDefault();
    const finalData = {
      nin: step1.nin,
      lName: step1.lName,
      fName: step1.fName,
      dateBirth: step1.dateBirth,
      placeBirth: step1.placeBirth,
      userName: form2.userName,
      email: form2.email,
      password: form2.password,
      status: form2.status,
      role: form2.role,
    };
    if (form2.password == confirmPassword) console.log("password correct");
    else  return alert("this password is not matched");
    try {
       
      const {data} = await axios.post("http://localhost:5000/auth/register",finalData)
      console.log(localStorage.getItem("step1"))
      
      
      localStorage.removeItem("step1");
      alert(data.message);
      console.log(data.userResponse);
    } catch (error) {
      console.log("An error occurred during registration"+error);
      alert("An error occurred during registration");
    }
    

  }
  return (
    <div>
      <div className="box-form2">
        <form onSubmit={register} action="" method="post">
          <h2 className="title">Complete Signup</h2>
          <input
            type="text"
            onChange={handleChange}
            value={form2.userName}
            name="userName"
            placeholder="user name"
            required
          />
          <input
            type="email"
            onChange={handleChange}
            value={form2.email}
            placeholder="email*"
            name="email"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={handleChange}
            value={form2.password}
            required
          />
          <input
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            value={confirmPassword}
            type="text"
            name="confirmPassword"
            required
            placeholder="confirm password"
          />
          <label htmlFor="">status :</label>
          <select
            onChange={handleChange}
            value={form2.status}
            name="status"
            required
            id="sel"
          >
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>
          <label htmlFor="">Role :</label>
          <select
            name="role"
            value={form2.role}
            onChange={handleChange}
            id="sel"
            required
          >
            <option value="admin1"> Admin 1 </option>
            <option value="admin2"> Admin 2 </option>
            <option value="manager"> Manager </option>
          </select>
          <button type="submit" id="bttn" className="btn btn-primary">
            Create New Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup
