// REACT STUFF
import axios from "axios";
import React from "react";
import {Link} from 'react-router-dom'

const sendData = async () => {
  const form_data = {
    "username":"guyNum19",
    "email":"imguy10@email.com",
    "password":"december",
    "age":"24",
    "gender":"Male",
    "height":"5.6",
    "weight":"60"
  }

  form_data.username = document.getElementById("username").value
  form_data.email = document.getElementById("email").value
  form_data.password = document.getElementById("password").value
  form_data.age = document.getElementById("age").value
  form_data.gender = document.getElementById("gender").value
  form_data.height = document.getElementById("height").value
  form_data.weight = document.getElementById("weight").value

  console.log('FORM DATA:', form_data);

  try {
    const response = await axios.post(
      'http://localhost:3000/auth/register',
      form_data
    );
    
    console.log('Response:', response)
    if(response.status === 200){
      Cookies.set('token', response.data.token, { expires: 7 })
      console.log(document.cookie)
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const LogIn = () => {
  return (
    <>
      <h1>GYMBRO</h1>
      <h1><Link to = "/log-in">LOGIN</Link> | SIGNUP</h1>

      <label>Username:</label>
      <input type="text" id="username" name="username" required/><br></br>
      <label>Email:</label>
      <input type="email" id="email" name="email" required/><br></br>
      <label>Password:</label>
      <input type="password" id="password" name="password" required/><br></br>
      <label>age:</label>
      <input type="age" id="age" name="age" required/><br></br>
      <label>gender:</label>
      <input type="gender" id="gender" name="gender" required/><br></br>
      <label>height:</label>
      <input type="height" id="height" name="height" required/><br></br>
      <label>weight:</label>
      <input type="weight" id="weight" name="weight" required/><br></br>

      <button onClick={() => sendData()}>
        SUBMIT
      </button>
    </>
  );
};

export default LogIn