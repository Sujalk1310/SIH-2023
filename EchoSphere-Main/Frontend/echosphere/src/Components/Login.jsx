import React, { useState } from "react";
import './css/Login.css';
import { Link } from 'react-router-dom';
import { postDataToAPI } from "./apiService";

function Login() {
    const [aadhar, setAadhar] = useState("");
    const [password, setPassword] = useState("");
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [loginFail, setLoginFail] = useState(false);

    function login(e) {
        postDataToAPI('login', {"aadhar": aadhar, "password": password})
        .then(data => {
            if (typeof data.message === 'number') {
                localStorage.setItem('user_id', data.message);
                setLoginSuccess(true);
                window.location.href="/dashboard";
            } else {
                setLoginFail(true);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }

    return (
        <div className="login template d-flex justify-content-center align-items-center vh-100 back">
            <div className="form_container px-5 pt-4 pb-2 rounded bg-white">
                <form>
                    <h3 className="text-center">Login</h3>
                    <div className="mb-2">
                        <label htmlFor="aadhar">Aadhaar</label>
                        <input 
                            type="text" 
                            placeholder="Enter Aadhaar" 
                            className="form-control" 
                            value={aadhar}
                            onChange={(e) => setAadhar(e.target.value)}
                        required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            placeholder="Enter Password" 
                            className="form-control" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        required />
                    </div>
                    <div className="d-grid">
                        <button className="btn btn-outline-warning text-white" onClick={login}>Sign in</button>
                    </div>
                    {loginSuccess && (
                        <p className="text-center my-2 text-success">
                            Login successful! Redirecting...
                        </p>
                    )}
                    {loginFail && (
                        <p className="text-center my-2 text-danger">
                            Incorrect Credentials!!
                        </p>
                    )}
                    <div className="d-grid">
                        <p className="text-center mt-3">
                            Not Registered? <Link to="/register" className="ms-2 color">Sign up</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;
