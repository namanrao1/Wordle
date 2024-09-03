import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


function Signup() {
    // State for form inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const user = { name: email, password };
    
        if (password === confirmPassword) {
            axios.post("http://localhost:3000/users/signup", user)
                .then((response) => {
                    // Handle successful signup
                    alert(response.data); // Assuming the server sends a success message
                    // Redirect or perform other actions
                })
                .catch((error) => {
                    // Handle errors
                    console.error("Error during signup", error);
                    alert("Error during signup. Please try again.");
                });
        } else {
            alert('Passwords do not match');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: '#F8F9FA' }}>
            <div className="card p-4 shadow-lg" style={{ width: '100%', maxWidth: '400px' }}>
                <h2 className="text-center mb-4">Signup</h2>
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
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Signup</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
