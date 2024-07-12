import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Createpost() {
    const username = localStorage.getItem('username');
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        caption: '',
        attachments: null
    });

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        setFormData((prevdata) => ({
            ...prevdata,
            [name]: files ? files : value
        }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let isUnauthorized = false;
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`http://127.0.0.1:8000/api/v1/posts`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data' // Set header untuk unggahan file
                }
            });

            console.log(response.data);
            navigate(`/userprofile/${username}`);
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    isUnauthorized = true;
                } else if (error.response.data.errors) {
                    setErrors(error.response.data.errors);
                } else {
                    setErrors({ 'general': 'Create post fail' });
                }
            } else {
                setErrors({ 'general': 'Create post fail' });
            }
        }

        if (isUnauthorized) {
            navigate('/');
        }
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
                <div className="container">
                    <a className="navbar-brand" href="homepage.html">Facegram</a>
                    <div className="navbar-nav">
                        <a className="nav-link" href="my-profile.html">@{username}</a>
                        <a className="nav-link" href="index.html">Logout</a>
                    </div>
                </div>
            </nav>

            <main className="mt-5">
                <div className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-md-5">
                            <div className="card">
                                <div className="card-header d-flex align-items-center justify-content-between bg-transparent py-3">
                                    <h5 className="mb-0">Create new post</h5>
                                </div>
                                <div className="card-body">
                                    {Object.values(errors).map((error, index) => (
                                        <p key={index} id="error" className="text-danger">{error}</p>
                                    ))}
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-2">
                                            <label htmlFor="caption">Caption</label>
                                            <textarea className="form-control" onChange={handleChange} value={formData.caption} name="caption" id="caption" cols="30" rows="3"></textarea>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="attachments">Image(s)</label>
                                            <input type="file" className="form-control" onChange={handleChange} id="attachments" name="attachments" multiple />
                                        </div>

                                        <button type="submit" className="btn btn-primary w-100">
                                            Share
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Createpost;
