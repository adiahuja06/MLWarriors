import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSucess } from '../util';

function Login() {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    }); // This is used to store the information of the form temporarily

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    };

    console.log('loginInfo->', loginInfo);

    // Make sure to split terminal and run back end on one terminal and front end on the other
    const handleSignup = async (e) => {
        e.preventDefault(); // Page is automatically refreshing so we need to prevent it and we need to make an API call
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('Email and password are required');
        }
        try {
            const url = "http://localhost:8080/auth/login";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, role, error } = result;
            if (success) {
                handleSucess(message);
                localStorage.setItem('token', jwtToken); // Just to set the token value
                localStorage.setItem('loggedInUser', name); // Just to keep track of the logged-in user
                setTimeout(() => {
                    if (role === '0') {
                        window.location.href = 'http://localhost:8501';
                    } else if (role === '1') {
                        navigate('/doctor');
                    }
                }, 1000);
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError(err);
        }
    };

    return (
        <div className='container'>
            <h1>Login</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        autoFocus
                        placeholder='Enter your Email ID...'
                        value={loginInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter your Password...'
                        value={loginInfo.password}
                    />
                </div>
                <button type='submit'>Login</button>
                <span>Don't have an account? <Link to='/signup'>Signup</Link></span>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Login;
