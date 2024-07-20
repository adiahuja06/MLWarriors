import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSucess } from '../util' 


function Signup(){
    const [signupInfo,setsignininfo]=useState({
        name:'',
        email:'',
        password:'',
        role:''
    }) //this is used to store the information of the form temporarily

    const navigate=useNavigate();
    const handlechange=(e)=>{
       const {name,value}=e.target;
       console.log(name,value);
       const copysignupInfo={...signupInfo};
       copysignupInfo[name]=value;
       setsignininfo(copysignupInfo);

    }
    console.log('signupInfo->', signupInfo)
    //make sure to split terminal and run back end on one terminal and front end on the other
    const handleSignup= async (e)=>{
        e.preventDefault(); //page is automatically refreshing so we need to prevent it and we need to make an API call
        const {name,email,password,role}=signupInfo;
        if(!name || !email || !password || !role){
            return handleError('name,email,password and role are required')
        }
        try{
            const url="http://localhost:8080/auth/signup";
            const response=await fetch(url,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(signupInfo)
            });
            const  result=await response.json();
            const {success,message,error}=result;
            if(success)
            {
                handleSucess(message);
                setTimeout(()=>{
                    navigate('/login');
                },1000)
            }
            else if(error)
            {
                const details=error?.details[0].message;
                handleError(details);
            }
            else if(!success)
            {
                handleError(message);
            }
            console.log(result);
        }
        catch(err){
            handleError(err);
        }
    }
    return(
        <div className='container'>
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input
                      onChange={handlechange}
                      type='text'
                      name='name'
                      autoFocus
                      placeholder='Enter your name...'
                      value={signupInfo.name}
                    
                    
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                      onChange={handlechange}
                      type='email'
                      name='email'
                      autoFocus
                      placeholder='Enter your Emailid...'
                      value={signupInfo.email}
                    
                    
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                      onChange={handlechange}
                      type='password'
                      name='password'
                      autoFocus
                      placeholder='Enter your Password...'
                      value={signupInfo.password}
                    
                    />
                </div>
                <div>
                    <label htmlFor='role'>Role</label>
                    <input
                      onChange={handlechange}
                      type='text'
                      name='role'
                      autoFocus
                      placeholder='Enter your role 0 for user and 1 for for doctor...'
                      value={signupInfo.role}
                    
                    
                    />
                </div>

                <button type='submit'>Signup</button>
                <span>Already have an account?
                    <Link to='/login'>Login</Link>
                </span>
            </form>
            <ToastContainer/>
        </div>
    )
}

export default Signup