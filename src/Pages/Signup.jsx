import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import '../style.css';
import Glogo from '../assets/google.png';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import { registerAPI } from '../Services/allAPI';

function Signup() {
    const [userInputs, setUserInputs] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();

  
    
    const handleSignup = async (e) => {
        e.preventDefault();
    
        const { name, email, password } = userInputs;
    
        // Email validation: Check if it's a valid Gmail address
        const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        const isValidGmail = gmailPattern.test(email);
    
        // Password validation: Check if it's at least 8 characters long
        const isPasswordValid = password.length >= 8;
    
        if (!name || !email || !password) {
            alert("Please fill out the form completely.");
            return;
        }
    
        if (!isValidGmail) {
            alert("Please enter a valid Gmail address.");
            return;
        }
    
        if (!isPasswordValid) {
            alert("Password must be at least 8 characters long.");
            return;
        }
    
        try {
            const result = await registerAPI(userInputs);
    
            if (result.status === 200) {
                alert('Welcome User');
                sessionStorage.setItem("existingUser", JSON.stringify(result.data.newUser)); 
                sessionStorage.setItem("token", result.data.token);
                setUserInputs({ name: "", email: "", password: "" });
    
                // Navigate after successful registration
                setTimeout(() => {
                    navigate('/dashboard');
                }, 2000);
            } else {
                alert(result.data); 
                setUserInputs({ name: "", email: "", password: "" });
            }
        } catch (err) {
            console.log(err);
            alert("An error occurred during registration.");
        }
    };
    
    

    return (
        <>
            <Header />
            <div className="mainDiv mt-5">
                <div className="d-flex flex-column align-items-center container w-75 ">
                    <h2 className='ft mt-3'>Sign up for Employee</h2>
                    <div className="formDiv w-40 p-5 rounded">
                        <Form onSubmit={handleSignup}>
                            <div className="btnDivGoogle mb-5 w-100 justify-content-center d-flex rounded ft">
                                <button className='btn btn-google w-100' type="button">
                                    <img className='me-1' src={Glogo} width={'15px'} height={'15px'} alt="Google Logo" />
                                    Continue with Google
                                </button>
                            </div>
                            <hr />
                            <Form.Group className="mb-3 mt-5" controlId="exampleForm.ControlInput1">
                                <Form.Control
                                    className='rounded text-field ft'
                                    value={userInputs.name}
                                    onChange={e => setUserInputs({ ...userInputs, name: e.target.value })}
                                    type="text"
                                    placeholder="Name"
                                    style={{ borderColor: '#2b2b2b' }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                <Form.Control
                                    className='text-field rounded ft'
                                    value={userInputs.email}
                                    onChange={e => setUserInputs({ ...userInputs, email: e.target.value })}
                                    type="email"
                                    placeholder="Email"
                                    style={{ borderColor: '#2b2b2b' }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                <Form.Control
                                    className='text-field rounded ft'
                                    value={userInputs.password}
                                    onChange={e => setUserInputs({ ...userInputs, password: e.target.value })}
                                    type="password"
                                    placeholder="Password"
                                    style={{ borderColor: '#2b2b2b' }}
                                />
                            </Form.Group>
                            <div className="btnDiv w-100 justify-content-center d-flex mt-5 rounded">
                                <button className='btn btn-create w-100' type="submit">Create account</button>
                            </div>
                            <div className="bottomDiv text-center mt-3">
                                <p>Already have an account? <Link to="/signin">Sign in</Link></p>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signup;
