import React from 'react'
import { Link } from "react-router-dom"


export const Navbar = () => {  
   
    return(
        <nav className=" text-white h-full bg-teal-400 fixed top-0 left-0 overflow-x-hidden w-40">
            <div id="sidenav" className="flex flex-col items-center">
                <div className="pt-8">
                    <ul>
                        <li className="text-xl pb-8">
                            <Link to="/">BlueTag Library</Link>
                        </li>
                        <li>
                            <Link to="/registercategory">Register Category</Link>
                        </li>
                        <li>
                            <Link to="/policy">Book Lending Policy</Link>
                        </li>
                        <li>
                            <Link to="/registerbook">Register Book</Link>
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