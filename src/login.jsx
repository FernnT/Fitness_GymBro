// REACT STUFF
import axios from "axios";
import React, { useEffect } from "react";
import {Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";

const check_if_already_logged_in = (navigate) => {
  const cookies = JSON.parse(document.cookie);

  console.log("CHECKING IF LOGGED IN");
  if (cookies.token) {
    console.log("CHECKED THE TOKEN");
    navigate("/workout");
  }
};

const sendData = async () => {
  
  //GET FORM DATA FROM INPUT
  const form_data = {
    "email":"temp_email",
    "password":"temp_password"
  }
  form_data.email = document.getElementById("email").value
  form_data.password = document.getElementById("password").value
  console.log('FORM DATA:', form_data);

  // GET CURRENCT COOKIES TO JSON
  const cookies = JSON.parse(document.cookie)
  console.log('COOKIES IN JSON', cookies)

  //API CALL
  try {
    const response = await axios.post(
      'http://localhost:3000/auth/login',
      form_data
    );
    console.log('Response:', response)
    if(response.status === 200){
      document.cookie = JSON.stringify(response.data)
      console.log("COOKIES IN PLAIN TEXT", document.cookie)
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const LogIn = ({token}) => {
  const navigate = useNavigate();
  useEffect(() => {
    check_if_already_logged_in(navigate);
  });


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