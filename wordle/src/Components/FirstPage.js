import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';


function FirstPage({isGuest,setGuest}) {
    // Get current date
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString(undefined, options);

    function onclick(){
        setGuest(isGuest=true);
    }

    return (
        <div className="App text-center" style={{ backgroundColor: '#E6E2D4', padding: '140px' }}>
            <img src={require("../images/wordle.png")} alt="Wordle Logo" className="img-fluid" />
            <h1>Wordle</h1>
           
            <h1>Go ahead, add another</h1>
            <h1>day to your 1 day streak.</h1>
            <span >
            <Link to="/signup">
           
                <button className="btn btn-secondary m-2">Signup</button>
        
      </Link>
      <Link to="/login">
           
                <button className="btn btn-secondary m-2">Login</button>
        
      </Link>
      <Link to="/second-page">
           
           <button className="btn btn-secondary m-2" onClick={onclick}>Guest</button>
   
 </Link>
      
                
            </span>
            <h2>{formattedDate}</h2> {/* Display day, date, and year */}
            <h1>By Naman Rao</h1>
        </div>
    );
}

export default FirstPage;
