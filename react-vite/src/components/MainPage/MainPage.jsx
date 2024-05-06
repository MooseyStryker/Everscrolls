import React, { useState } from 'react';
import { thunkLogin, thunkSignup } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import './MainPage.css'

export default function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [isNewUser, setIsNewUser] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const sessionUser = useSelector((state) => state.session.user);


    if (sessionUser) navigate('/home')

    const [errors, setErrors] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });




    const switchLoginSignup = () => {
        setIsNewUser(!isNewUser)
        setErrors({})
        setFirstName("")
        setLastName("")
        setEmail("")
        setUsername("")
    }


    const validateSignupInput = () => {
        const newErrors = {};

        if (!username) {
            newErrors.username = 'Username is required.';
        } else if (username.length < 3 || username.length > 20) {
            newErrors.username = 'Username must be between 3 and 20 characters.';
        } else if (username.toLowerCase() === 'stryker') {
            newErrors.username = 'The username "Stryker" is not allowed. Seriously.';
        }

        if (!firstName) {
            newErrors.firstName = 'First name is required.';
        } else if (firstName.toLowerCase() === 'stryker') {
            newErrors.firstName = 'The first name "Stryker" is not allowed. I mean is that even real?';
        }
        if (!lastName) newErrors.lastName = 'Last name is required.';

        if (!email) {
            newErrors.email = 'Email is required.';
        } else if (!email.includes('@')) {
            newErrors.email = 'Email must include an @ symbol.';
        }

        if (!password) {
            newErrors.password = 'Password is required.';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters.';
        }

        if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords must match.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const validateLoginInput = () => {
        const newErrors = {};

        if (!email) {
            newErrors.email = 'Email is required.';
        } else if (!email.includes('@')) {
            newErrors.email = 'Email must include an @ symbol.';
        }

        if (!password) {
            newErrors.password = 'Password is required.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleDemoUser = async() => {
        setEmail('captainjames@starfleet.com')
        setPassword('password123')
    }


    const handleLogin = async(e) => {
        e.preventDefault();

        if (!validateLoginInput()) return;



        const serverResponse = await dispatch(
          thunkLogin({
            email,
            password,
          })
        );

        if (serverResponse) {

          setErrors(serverResponse);
        } else {
          navigate("/home");
          window.localStorage.clear();
          window.location.reload();
        }
    }

    const handleSignup = async(e) => {
        e.preventDefault();

        if (!validateSignupInput()) return;

        if (password !== confirmPassword) {
          return setErrors({
            confirmPassword:
              "Confirm Password field must be the same as the Password field",
          });
        }

        const serverResponse = await dispatch(
          thunkSignup({
            username,
            first_name: firstName,
            last_name: lastName,
            email,
            role: "Bucket swabbler",
            password
          })
        );

        if (serverResponse) {
          setErrors(serverResponse);
        } else {
          navigate("/home");
          window.localStorage.clear();
          window.location.reload();
        }
    }

    return (
        <div className="login-signup-container">
            {isNewUser ? (

                 <form onSubmit={handleSignup} className='signupform'>
                    <h2>Signup Page</h2>
                    <label className='input-group'>
                        Username:
                        <input
                            className='input-indiv'
                            style={{ border: errors.username ? '1px solid red' : '1px solid black' }}
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <p className={`p-errors ${errors.username ? 'visible' : ''}`}>{errors.username}</p>

                    </label>
                    <label className='input-group'>
                        First Name:
                        <input className='input-indiv' style={{ border: errors.firstName ? '1px solid red' : '1px solid black' }} type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        <p className={`p-errors ${errors.firstName ? 'visible' : ''}`}>{errors.firstName}</p>
                    </label>
                    <label className='input-group'>
                        Last Name:
                        <input className='input-indiv' style={{ border: errors.lastName ? '1px solid red' : '1px solid black' }} type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        <p className={`p-errors ${errors.lastName ? 'visible' : ''}`}>{errors.lastName}</p>
                    </label>
                    <label className='input-group'>
                        Email:
                        <input className='input-indiv' style={{ border: errors.email ? '1px solid red' : '1px solid black' }} type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <p className={`p-errors ${errors.email ? 'visible' : ''}`}>{errors.email}</p>
                    </label>
                    <label className='input-group'>
                        Password:
                        <input className='input-indiv' style={{ border: errors.password ? '1px solid red' : '1px solid black' }} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <p className={`p-errors ${errors.password ? 'visible' : ''}`}>{errors.password}</p>
                    </label>
                    <label className='input-group'>
                        Confirm Password:
                        <input className='input-indiv' style={{ border: errors.confirmPassword ? '1px solid red' : '1px solid black' }} type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        <p className={`p-errors ${errors.confirmPassword ? 'visible' : ''}`}>{errors.confirmPassword}</p>
                    </label>
                    <input className='input-indiv-submit' type="submit" value="Signup" />
                    <button onClick={() => switchLoginSignup()}>Existing User? Login
                    </button>
                </form>

            ) : (

                <form onSubmit={handleLogin} className='loginform'>
                    <h2>Login Page</h2>
                    <label className='input-group'>
                        Email:
                        <input className='input-indiv' style={{ border: errors.email ? '1px solid red' : '1px solid black' }} type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                        {/* {errors.email && <p className='p-errors'>{errors.email}</p>} */}
                        <p className={`p-errors ${errors.email ? 'visible' : ''}`}>{errors.email}</p>
                    </label>
                    <label className='input-group'>
                        Password:
                        <input className='input-indiv' style={{ border: errors.password ? '1px solid red' : '1px solid black' }} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <p className={`p-errors ${errors.password ? 'visible' : ''}`}>{errors.password}</p>
                    </label>
                    <input className='input-indiv-submit' type="submit" value="Login" />
                    <button onClick={() => switchLoginSignup()}>New User? Signup</button>
                    <p style={{borderBottom:'1px solid grey', marginTop:"10px", marginBottom:'10px'}}></p>
                    <button onClick={() => handleDemoUser()}>Login as Demo User</button>
                </form>

            )}
        </div>
    );
}
