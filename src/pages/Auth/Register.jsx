import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register()
{
    const navigate = useNavigate();

    const [errors,setErrors] = useState({});

    const [formData,setFormData] = useState({
        full_name: '',
        username: '',
        bio: '',
        is_private: false,
        password: ''
    });

    const handleChange = (event) => {
        const {name,value,type,checked} = event.target;
        setFormData((prevdata) => ({
        ...prevdata,
        [name]: type === 'checkbox' ? checked : value
        }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
       try{
        const response = await axios.post(`http://127.0.0.1:8000/api/v1/auth/register`, formData)
    
        const { token } = response.data;

        localStorage.setItem('token', token);

        const { user } = response.data;

        const { username } = user;

        localStorage.setItem('username', username);

        console.log(response.data);

        navigate('/home');

       }catch(error){
        if(error.response.data.errors){
            setErrors(error.response.data.errors);
          }else{
            setErrors({ 'general': 'Register Failed'});
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
                        <h5 class="mb-0">Register</h5>
                    </div>
                    <div class="card-body">
                    {Object.values(errors).map((error) => (
                        <p id="error" className="text-danger">{error}</p>
                    ))}
                        <form onSubmit={handleSubmit}>
                            <div class="mb-2">
                                <label for="full_name">Full Name</label>
                                <input type="text" onChange={handleChange} value={formData.full_name} class="form-control" id="full_name" name="full_name"/>
                            </div>

                            <div class="mb-2">
                                <label for="username">Username</label>
                                <input type="text"  onChange={handleChange} value={formData.username} class="form-control" id="username" name="username"/>
                            </div>

                            <div class="mb-3">
                                <label for="password">Password</label>
                                <input type="password" onChange={handleChange} value={formData.password} class="form-control" id="password" name="password"/>
                            </div>

                            <div class="mb-3">
                                <label for="bio">Bio</label>
                                <textarea name="bio" onChange={handleChange} value={formData.bio} id="bio" cols="30" rows="3" class="form-control"></textarea>
                            </div>

                            <div class="mb-3 d-flex align-items-center gap-2">
                                <input type="checkbox" onChange={handleChange} checked={formData.is_private} id="is_private" name="is_private"/>
                                <label for="is_private">Private Account</label>
                            </div>

                            <button type="submit" class="btn btn-primary w-100">
                                Register
                            </button>
                        </form>
                    </div>
                </div>

                <div class="text-center mt-4">
                    Already have an account? <a href="/">Login</a>
                </div>

            </div>
        </div>
    </div>
</main>
        </>
    )
}

export default Register;