import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; 

// Import your pages
import SecondPage from "./Components/SecondPage";

import FirstPage from "./Components/FirstPage";
import LeaderBoard from "./Components/LeaderBoard";
import Signup from "./Components/Signup";
import Login from "./Components/Login";

function App() {
  const [isLoggedIn,setisLoggedIn]=useState(false);
  const [isGuest,setGuest]=useState(false);
  const [username,setUsername]=useState("Guest");
  const [score,setScore]=useState(0);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<FirstPage isGuest={isGuest} setGuest={setGuest} />} />
           <Route path="/signup" element={<Signup />} />
           <Route path="/login" element={<Login score={score} setScore={setScore} isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} username={username}
           setUsername={setUsername}/>} />
          <Route path="/second-page" element={<SecondPage score={score} isLoggedIn={isLoggedIn} isGuest={isGuest} username={username}/>} />
          <Route path="/leaderboard" element={<LeaderBoard />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
