// REACT STUFF
import {Link} from 'react-router-dom'

// PAGE SPECIFIC
import './App.css'

const Stats = () => {
  return (
    <>
      <div className="bottom-navigation">
        <span className="nav-icon"><Link to = "/statistics">🏠</Link> </span>
        <span className="nav-icon"><Link to = "/workout">🏋️</Link></span>
        <span className="nav-icon active"><Link to = "/settings">⚙️</Link></span>
      </div>
    </>
  );
};

export default Stats