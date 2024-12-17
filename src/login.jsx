// REACT STUFF
import axios from "axios";
import React, { useEffect } from "react";
import {Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const check_if_already_logged_in = (navigate) => {
  
  try{
    if(document.cookie){
      const token = Cookies.get('token');
      console.log("CHECKING IF LOGGED IN")
      if (token) {
        console.log("CHECKED THE TOKEN")
        navigate("/workout")
      }
    }
  }catch (error) {
    console.error('Error:', error);
  }
  
};

const sendData = async (navigate) => {
  
  //GET FORM DATA FROM INPUT
  const form_data = {
    "email":"temp_email",
    "password":"temp_password"
  }
  form_data.email = document.getElementById("email").value
  form_data.password = document.getElementById("password").value
  console.log('FORM DATA:', form_data)

  // GET CURRENCT COOKIES TO JSON

  const token = Cookies.get('token');
  if(token){
    console.log('RAW COOKIES', token)
  }
  

  //API CALL
  try {
    const response = await axios.post(
      'http://localhost:3000/auth/login',
      form_data
    );
    console.log('Response:', response)
    if(response.status === 200){
      Cookies.set('token', response.data.token, { expires: 7 })
      console.log("COOKIES IN PLAIN TEXT", document.cookie)
      check_if_already_logged_in(navigate)
    }
  } catch (error) {
    console.error('Error:', error)
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

      <button onClick={() => sendData(navigate)}>
        SUBMIT
      </button>
    </>
  );
};

export default LogIn