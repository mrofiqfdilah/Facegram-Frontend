import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home(){

    const Navigate = useNavigate();

    const [posts,setPosts] = useState([]);

    const [explore,setExplore] = useState([]);

    const [username,setUsername] = useState('');

    const fetchPosts = async () => {
        try{
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://127.0.0.1:8000/api/v1/posts`, {
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            })
    
            if(response.data['posts']){
                setPosts(response.data['posts']);
            }
        }catch(error)
        {
            if(error.response.status === 401){
                Navigate('/');
            }else{
                console.log('error fetch');
            }
        }
     }

     useEffect(() => {

        const getusername = localStorage.getItem('username');
        setUsername(getusername);

        fetchPosts();
        fetchExplore();
       
     })

     const fetchExplore = async () => {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/users`, {
        headers: {
            'Authorization' : `Bearer ${token}`
        }
        });

        if(response.data['users']){
            setExplore(response.data['users']);
        }
     }

     const handleLogout = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        const response = await axios.post(`http://127.0.0.1:8000/api/v1/auth/logout`,{}, {
        headers: {
            'Authorization' : `Bearer ${token}`
        }
        });

        console.log(response.data);

        Navigate('/');

        localStorage.removeItem('token');
     }


    const handleProfile = () => {
        Navigate(`/userprofile/${username}`);
    }

    const handleAnother = (username) => {
        Navigate(`/anotherprofile/${username}`)
    }
    return (
        <>
        <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
    <div class="container">
        <a class="navbar-brand" href="homepage.html">Facegram</a>
        <div class="navbar-nav">
            <a class="nav-link" href="#" onClick={handleProfile}>@{username}</a>
            <a class="nav-link" href="#" onClick={handleLogout}>Logout</a>
        </div>
    </div>
</nav>

<main class="mt-5">
    <div class="container py-5">
        <div class="row justify-content-between">
            <div class="col-md-8">
                <h5 class="mb-3">News Feed</h5>
                {posts.map((post) => (
                <div class="card mb-4">
                    <div class="card-header d-flex align-items-center justify-content-between bg-transparent py-3">
                        <h6 class="mb-0">Lay Christian</h6>
                        <small class="text-muted">5 days ago</small>
                    </div>
                    <div class="card-body">
                    <div class="card-images mb-2">
                    {post.attachments.map((attach) => (
                            <img src={`http://localhost:8000/storage/${attach.storage_path}`} alt="image" class="w-100"/>
                        
                     ))}
                     </div>
                        <p class="mb-0 text-muted"><b><a href="user-profile.html">laychristian92</a></b>{post.caption}</p>
                    </div>
                </div>
                ))}
             
            </div>
            <div class="col-md-4">
                <div class="request-follow mb-4">
                    <h6 class="mb-3">Follow Requests</h6>
                    <div class="request-follow-list">
                        <div class="card mb-2">
                            <div class="card-body d-flex align-items-center justify-content-between p-2">
                                <a href="user-profile-private.html">@laychristian92</a>
                                <a href="" class="btn btn-primary btn-sm">
                                    Confirm
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="explore-people">
                    <h6 class="mb-3">Explore People</h6>
                    <div class="explore-people-list" >
                        
                        {explore.slice(0, 5).map((exp) => (
                            <div class="card mb-2" onClick={() => handleAnother(exp.username)}>
                            <div class="card-body p-2">
                          
                                <a href="#">@{exp.username}</a>
                           
                            </div>
                            </div>
                         ))}
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
        </>
    )
}

export default Home;