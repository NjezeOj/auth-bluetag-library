import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import {ProtectedRoute} from './ProtectedRoute'
import {LendReturn} from '../books/LendReturn'



export const Navbar = () => {  
   
    const [user, setUser] = useState(false);
    
    const getUser = async () => {
        const res = await axios.get("http://localhost:5000/user/getuser", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        (res.data.role === 'User') ? setUser(true) : setUser(false)
            
    }

    //we want to call getUser to setUser whenever the component mounts
    useEffect(() => {
        getUser();
    }, [])
    return(
        <nav className=" text-white h-full bg-teal-400 fixed top-0 left-0 overflow-x-hidden w-40">
            <div id="sidenav" className="flex flex-col items-center">
                <div className="pt-8">
                    <ul>
                        <li className="text-xl pb-8">
                            <Link to="/home">BlueTag Library</Link>
                        </li>
                        <li>
                            <Link className={user ? 'hidden' : ''} to="/registercategory">Register Category</Link>
                        </li>
                        <li>
                            <Link className={user ? 'hidden' : ''} to="/policy">Book Lending Policy</Link>
                        </li>
                        <li>
                            <Link className={user ? 'hidden' : ''} to="/registerbook">Register Book</Link>
                        </li>
                        <li>
                            <Link to="/lendreturn">Lend/Return Book</Link>
                        </li>
                        
                        
                    </ul>
                </div>
            </div>
        </nav>    
    )
}