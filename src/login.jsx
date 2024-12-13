// REACT STUFF
import axios from "axios";
import React from "react";
import {Link} from 'react-router-dom'



const sendData = async () => {
  const form_data = {
    "email":"temp_email",
    "password":"temp_password"
  }

  form_data.email = document.getElementById("email").value
  form_data.password = document.getElementById("password").value
  console.log('FORM DATA:', form_data);

  try {
    const response = await axios.post(
      'http://localhost:3000/auth/login',
      form_data
    );
    
    console.log('Response:', response)
    if(response.status === 200){
      document.cookie = response.data.token
      console.log(document.cookie)
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const LogIn = ({token}) => {
  return (
    <>
      <h1>GYMBRO</h1>
      <h1>LOGIN | <Link to = "/sign-up">SIGNUP</Link></h1>

      <label>Email:</label>
      <input type="text" id="email" name="email" required/><br></br>
      <label>Password:</label>
      <input type="password" id="password" name="password" required/><br></br>

      <button onClick={() => sendData()}>
        SUBMIT
      </button>
    </>
  );
};

export default LogIn