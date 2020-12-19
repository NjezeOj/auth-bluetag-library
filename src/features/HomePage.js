import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'


export const HomePage = (props) => {
    const [user, setUser] = useState({});

    const getUser = async () => {
        const res = await axios.get("http://localhost:5000/user/getuser", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        setUser(res.data)
    }

    //we want to call getUser to setUser whenever the component mounts
    useEffect(() => {
        getUser();
    }, [])

    const logout = () => {
        localStorage.removeItem('token')                
        props.history.push('/login')
        window.location.reload()
    }

    if (!localStorage.getItem('token')) {
        props.history.push('/login')
    }
    return (
        <div>
            <button className="ml-40" onClick={logout}>Logout</button>
            <img class="background" src="https://images.unsplash.com/photo-1533285860212-c85e7140a408?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" alt="libraryImage" />

        </div>
    )
}