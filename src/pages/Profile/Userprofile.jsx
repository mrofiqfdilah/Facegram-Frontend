import axios from "axios";
import React, { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";

function Userprofile(){
    
    const Navigate = useNavigate();

    const [detail,setDetail] = useState([]);

    const username = localStorage.getItem('username');

    const fetch = async () => {
        try{
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/users/${username}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
        })
        
        if(response.data){
            setDetail(response.data);
        }
        }catch(error)
        {
            if(error.response.status === 401){
                Navigate('/');
            }
        }

    }

    const handleLogout = async (event) => {
       
        event.preventDefault();
        const token = localStorage.getItem('token');
        const response = await axios.post(`http://127.0.0.1:8000/api/v1/auth/logout`, {}, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
        });

        console.log(response.data);

        Navigate('/');

        localStorage.removeItem('token');
    }

    useEffect(() => {
        fetch();  
    }, [username]);

   
    

    return (
    <>
   <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
    <div class="container">
        <a class="navbar-brand" href="homepage.html">Facegram</a>
        <div class="navbar-nav">
            <a class="nav-link" href="#">@{username}</a>
            <a class="nav-link" href="#" onClick={handleLogout}>Logout</a>
        </div>
    </div>
</nav>

<main class="mt-5">
    <div class="container py-5">
        <div class="px-5 py-4 bg-light mb-4 d-flex align-items-center justify-content-between">
            <div>
                <div class="d-flex align-items-center gap-2 mb-2">
                    <h5 class="mb-0">{detail.full_name}</h5>
                    <span>@{detail.username}</span>
                </div>
                <small class="mb-0 text-muted">
                {detail.bio}
                </small>
            </div>
            <div>
                <a href="/createpost" class="btn btn-primary w-100 mb-2">
                    + Create new post
                </a>
                <div class="d-flex gap-3">
                    <div>
                        <div class="profile-label"><b>{detail.posts_count}</b> posts</div>
                    </div>
                    <div class="profile-dropdown">
                        <div class="profile-label"><b>{detail.followers_count}</b> followers</div>
                        <div class="profile-list">
                            <div class="card">
                                <div class="card-body">
                                    <div class="profile-user">
                                        <a href="user-profile-private.html">@davidnaista</a>
                                    </div>
                                    <div class="profile-user">
                                        <a href="user-profile-private.html">@superipey</a>
                                    </div>
                                    <div class="profile-user">
                                        <a href="user-profile-private.html">@lukicenturi</a>
                                    </div>
                                    <div class="profile-user">
                                        <a href="user-profile-private.html">@_erik3010</a>
                                    </div>
                                    <div class="profile-user">
                                        <a href="user-profile-private.html">@asawgi</a>
                                    </div>
                                    <div class="profile-user">
                                        <a href="user-profile-private.html">@irfnmaulaa</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="profile-dropdown">
                        <div class="profile-label"><b>{detail.following_count}</b> following</div>
                        <div class="profile-list">
                            <div class="card">
                                <div class="card-body">
                                    <div class="profile-user">
                                        <a href="user-profile-private.html">@davidnaista</a>
                                    </div>
                                    <div class="profile-user">
                                        <a href="user-profile-private.html">@superipey</a>
                                    </div>
                                    <div class="profile-user">
                                        <a href="user-profile-private.html">@lukicenturi</a>
                                    </div>
                                    <div class="profile-user">
                                        <a href="user-profile-private.html">@_erik3010</a>
                                    </div>
                                    <div class="profile-user">
                                        <a href="user-profile-private.html">@asawgi</a>
                                    </div>
                                    <div class="profile-user">
                                        <a href="user-profile-private.html">@irfnmaulaa</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row justify-content-center">
            
                {detail.posts?.map((post) => (
                    <div class="col-md-4">
                <div class="card mb-4">
                    <div class="card-body">
                        <div class="card-images mb-2">
                            {post.attachments.map((gambar) => (
                            <img src={`http://localhost:8000/storage/${gambar.storage_path}`} alt="image" class="w-100"/>
                        ))}
                            </div>
                        <p class="mb-0 text-muted">{post.caption}</p>
                    </div>
                    </div>
                    </div>
                    ))}
             
        </div>
    </div>
</main>

    </>
    );
}

export default Userprofile;