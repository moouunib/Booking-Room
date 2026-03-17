import React from 'react';
import "../style/register.css"
import { Link, useNavigate } from "react-router";




const Signupscreen = () => {
  const navigate = useNavigate();
  const handelSubmit =(e)=>{
    e.preventDefault();
    const data = {
      nin: e.target.nin.value,
      lName: e.target.lName.value,
      fName: e.target.fName.value,
      dateBirth: e.target.dateBirth.value,
      placeBirth: e.target.placeBirth.value,
    };
    localStorage.setItem("step1",JSON.stringify(data) )
    navigate("/register/signup");
  }
  return (
    <div>
      <div className="box-register">
        <form onSubmit={handelSubmit} action="" method="post">
          <h2>Information of Employee</h2>
          <input required type="text" placeholder="nin*" name="nin" id="" />
          <input
            required
            type="text"
            placeholder="Last Name*"
            name="lName"
            id=""
          />
          <input
            type="text"
            required
            name="fName"
            placeholder="first name*"
            id=""
          />
          <input
            type="date"
            placeholder="date of birth"
            name="dateBirth"
            required
          />
          <input
            type="text"
            placeholder="Place of Birth"
            name="placeBirth"
            required
          />

          <input
            id="bttn"
            className="btn btn-primary"
            type="submit"
            value="Send Information"
          />
        </form>
      </div>
    </div>
  );
}

export default Signupscreen
