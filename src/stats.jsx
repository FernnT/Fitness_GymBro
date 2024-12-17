// PAGE SPECIFIC
import './App.css'
import axios from "axios";
import Cookies from 'js-cookie';
import React, { useEffect, useState} from "react";

//COMPONENTS
import Main_nav_bar from './main-nav-bar.jsx'

const Stats = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    // GET CURRENCT COOKIES TO JSON THEN GET TOKEN

    //API CALL
    const getWorkoutPlans = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/records/getRecords', 
          {headers: { Authorization: `Bearer ${Cookies.get('token')}` }}
        );
        console.log('Response:', response)
        setData(response.data)
      } catch (error) {
        console.error('Error:', error)
      }
    }
    getWorkoutPlans()
  }, []);

  return (
    <>
      <h1>STATISTICS</h1>
      <h2>personal bests</h2>
      <Main_nav_bar/>
    </>
  );
};

export default Stats