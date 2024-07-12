import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Anotherprofile(){
    
    const [detail,setDetail] = useState([]);

    const [isFollowing, setIsFollowing] = useState(false);

    const {username} = useParams();

    const fetch = async () => {
        try{
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://127.0.0.1:8000/api/v1/users/${username}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
            });

            if(response.data){
                setDetail(response.data);
                setIsFollowing(response.data.is_following);
            }
        }catch(error){
            console.log(error.response.data);
        }
    }

    const followUser = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        const response = await axios.post(`http://127.0.0.1:8000/api/v1/users/${username}/follow`, {},{
        headers: {
            'Authorization' : `Bearer ${token}`
        }
        });

        setIsFollowing(true);
        console.log(response.data);
    }

    const unfollowUser = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        const response = await axios.post(`http://127.0.0.1:8000/api/v1/users/${username}/unfollow`, {},{
        headers: {
            'Authorization' : `Bearer ${token}`
        }
        });

        setIsFollowing(false);
        console.log(response.data);
    }

    useEffect(() => {
        fetch();
    }, [username]);

    const aj = localStorage.getItem('username');

    return(
    <>
    <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
    <div class="container">
        <a class="navbar-brand" href="homepage.html">Facegram</a>
        <div class="navbar-nav">
            <a class="nav-link" href="my-profile.html">@{aj}</a>
            <a class="nav-link" href="index.html">Logout</a>
        </div>
    </div>
</nav>


<main class="mt-5">
    

    <div class="container py-5">

    <div class="px-5 py-4 bg-light mb-4 d-flex align-items-center justify-content-between">
            <div>
                <div class="d-flex align-items-center gap-2 mb-1">
                    <h5 class="mb-0">{detail.full_name}</h5>
                    <span>@{detail.username}</span>
                </div>
                <small class="mb-0 text-muted">
                {detail.bio}
                </small>
            </div>
            <div>
            <a href="#" 
             onClick={isFollowing ? unfollowUser : followUser} 
              className={`btn ${isFollowing ? 'btn-secondary' : 'btn-primary'} w-100 mb-2`}
             >
             {isFollowing ? 'Following' : 'Follow'}
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
                                        <a href="my-profile.html">@tomsgat</a>
                                    </div>
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
    {detail.is_private ? ( <div className="card py-4">
                            <div className="card-body text-center">
                                &#128274; This account is private
                            </div>
                        </div>) : (
                            <>
      
        <div class="row justify-content-center">
            {detail.posts?.map((post) => (
            <div class="col-md-4">
                <div class="card mb-4">
                   
                    <div class="card-body">
                        <div class="card-images mb-2">
                            {post.attachments.map((attach) => (
                            <img src={`http://localhost:8000/storage/${attach.storage_path}`} alt="image" class="w-100"/>
                        ))}
                        </div>
                        <p class="mb-0 text-muted">{post.caption}</p>
                    </div>
                </div>
            </div>
             ))}
        </div>
        </>
          )}
    </div>
</main>

    </>
    );
}

export default Anotherprofile;