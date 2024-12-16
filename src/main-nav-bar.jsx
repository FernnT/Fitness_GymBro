// REACT STUFF
import {Link} from 'react-router-dom'

// PAGE SPECIFIC
import './App.css'

const Stats = () => {
  return (
    <>
      <ul>
        <li><Link to = "/statistics">Statistics</Link></li>
        <li><Link to = "/workout">Workout</Link></li>
        <li><Link to = "/settings">Settings</Link></li>
      </ul>
    </>
  );
};

export default Stats