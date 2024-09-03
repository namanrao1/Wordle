import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ isLoggedIn, setisLoggedIn ,username,setUsername,score,setScore}) {
    // State for form inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();  // useNavigate hook for programmatic navigation


    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const user = { name: email, password };
        
        axios.post("http://localhost:3000/users/login", user)
        .then((response) => {
            if (response.data.pos) {
                setisLoggedIn(true);
                setUsername(email);  // Assuming setUsername is defined
                setScore(response.data.score);  // Accessing the score from response.data
                navigate("/second-page");
            } else {
                alert("Invalid credentials!!!");
            }
        })
        .catch((error) => {
            console.error("Error during login", error);
            alert("Invalid credentials!!!");
        });
    
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: '#F8F9FA' }}>
            <div className="card p-4 shadow-lg" style={{ width: '100%', maxWidth: '400px' }}>
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
