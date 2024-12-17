// PAGE SPECIFIC
import './App.css'
import axios from "axios";
import Cookies from 'js-cookie';
import React, { useEffect, useState} from "react";

//COMPONENTS
import Main_nav_bar from './main-nav-bar.jsx'

const Stats = () => {

  const [data, setData] = useState([]);
  const [bestDistance, setBestDistance] = useState("NaN")
  const [bestWeight, setBestWeight] = useState("NaN")
  const [bestReps, setBestReps] = useState("NaN")
  const [bestSets, setBestSets] = useState("NaN")


  useEffect(() => {
    const getWorkoutPlans = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/records/getRecords',
          { headers: { Authorization: `Bearer ${Cookies.get('token')}` } }
        );
  
        console.log('Response:', response.data);
        setData(response.data);
  
        // BEST WEIGHT
        let sortedData = response.data.sort((a, b) => b.weight - a.weight);
        if (sortedData.length > 0) {
          setBestWeight(sortedData[0].weight);
          console.log('Best Weight:', sortedData[0].weight);
        }

        // BEST WEIGHT
        sortedData = response.data.sort((a, b) => b.distance - a.distance);
        if (sortedData.length > 0) {
          setBestDistance(sortedData[0].distance);
          console.log('Best Distance:', sortedData[0].distance);
        }

        // BEST REPS
        sortedData = response.data.sort((a, b) => b.repsCompleted - a.repsCompleted);
        if (sortedData.length > 0) {
          setBestReps(sortedData[0].repsCompleted);
          console.log('Best Reps:', sortedData[0].repsCompleted);
        }

        // BEST SETS
        sortedData = response.data.sort((a, b) => b.setsCompleted - a.setsCompleted);
        if (sortedData.length > 0) {
          setBestSets(sortedData[0].setsCompleted);
          console.log('Best Sets:', sortedData[0].setsCompleted);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    getWorkoutPlans();
  }, []);

  return (
    <>
      <h1>STATISTICS</h1>
      <h2>personal bests</h2>
      <p>longest distance travelled: {bestDistance}km</p>
      <p>heaviest weight lifted: {bestWeight}kg</p>
      <p>most reps done: {bestReps}</p>
      <p>most sets done: {bestSets}</p>
      <Main_nav_bar/>
    </>
  );
};

export default Stats