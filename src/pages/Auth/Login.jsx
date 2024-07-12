import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login()
{
    const navigate = useNavigate();

    const [errors,setErrors] = useState({});

    const [formData,setFormData] = useState({
    username: '',
    password: ''
    }); 

    const handleChange = (event) => {
        const { name, value} = event.target;
        setFormData((prevdata) => ({
        ...prevdata,
        [name]: value
        }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
        
            const response = await axios.post(`http://127.0.0.1:8000/api/v1/auth/login`, formData);
           
            const { token } = response.data;

            localStorage.setItem('token', token);

            const { user } = response.data;

            const { username } = user;

            localStorage.setItem('username', username);

            console.log(username);
            console.log(token);

            navigate('/home');

        }catch(error){
            if(error.response.data.errors){
                setErrors(error.response.data.errors);
            }else{
                setErrors({'general': 'login Failed'});
            }
        }
    }

    return (
        <>
       
<nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
    <div class="container">
        <a class="navbar-brand m-auto" href="index.html">Facegram</a>
    </div>
</nav>

<main class="mt-5">
    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-md-5">
                <div class="card">
                    <div class="card-header d-flex align-items-center justify-content-between bg-transparent py-3">
                        <h5 class="mb-0">Login</h5>
                    </div>
                    <div class="card-body">
                    {Object.values(errors).map((error) => (
                        <p id="error" className="text-danger">{error}</p>
                    ))}
                        <form onSubmit={handleSubmit}>
                            <div class="mb-2">
                                <label for="username">Username</label>
                                <input type="text" onChange={handleChange} value={formData.username} class="form-control" id="username" name="username"/>
                            </div>

                            <div class="mb-3">
                                <label for="password">Password</label>
                                <input type="password" class="form-control" onChange={handleChange} value={formData.password} id="password" name="password"/>
                            </div>

                            <button type="submit" class="btn btn-primary w-100">
                                Login
                            </button>
                        </form>
                    </div>
                </div>

                <div class="text-center mt-4">
                    Don't have account? <a href="/register">Register</a>
                </div>

            </div>
        </div>
    </div>
</main>
        </>
    )
}

export default Login;