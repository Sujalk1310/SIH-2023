import React from "react";
import './css/Signup.css'
import { Link } from 'react-router-dom'

function Signup() {
    return (
    <div className="signup template d-flex justify-content-center align-items-center vh-100 back">
        <div className="form_container px-5 pt-4 pb-2 rounded bg-white">
            <form>
                <h3 className="text-center">Sign up</h3>
                <div className="mb-2">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" placeholder="Enter fullname" className="form-control"/>
                </div>
                <div className="mb-2">
                    <label htmlFor="aadhaar">Aadhaar</label>
                    <input type="text" placeholder="Enter Aadhaar" className="form-control"/>
                </div>
                <div className="mb-2">
                    <label htmlFor="contact">Contact No.</label>
                    <input type="text" placeholder="Enter Contact No." className="form-control"/>
                </div>
                <div className="mb-2">
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Enter Password" className="form-control"/>
                </div>
                <div className="mb-2">
                    <label htmlFor="confirmpassword">Confirm Password</label>
                    <input type="password" placeholder="Confirm Password" className="form-control"/>
                </div>
                
                <div className="d-grid">
                    <button className="btn btn-outline-warning">Sign Up</button>
                </div>
                <p className="text-center mt-3">
                    Already Registered? <Link to="/login" className="ms-2 color">Sign in</Link>
                </p>
            </form>
        </div>
    </div>
    )
}
export default Signup