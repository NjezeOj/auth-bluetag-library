import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CategoryPage } from "../category/CategoryPage"
import { HomePage } from "../HomePage"
import { BookLending } from "../booklending/BookLending"
import { Books } from "../books/Books"
import { LendReturn } from "../books/LendReturn"
import {ProtectedRoute} from "../components/ProtectedRoute"
import {Navbar} from './Navbar'
import axios from 'axios'



const FeaturesComp = () => {
    const [user, setUser] = useState(false);
    const [nav, setNav] = useState(false)

    const getUser = async () => {
        const res = await axios.get("http://localhost:5000/user/getuser", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        (res.data.role === 'Admin') ? setUser(true) : setUser(false)

        setNav(true)
    }

    //we want to call getUser to setUser whenever the component mounts
    useEffect(() => {
        getUser();
    }, [])
    return (
        
        <Router>  
            <ProtectedRoute
                component={Navbar}
                auth={nav} />   
            <Switch>
                <Route exact path="/home" component={HomePage} />
                
                <ProtectedRoute
                    path='/registercategory'
                    component={CategoryPage}
                    auth={user} />
                <ProtectedRoute
                    path='/policy'
                    component={BookLending}
                    auth={user} />
                <ProtectedRoute
                    path='/registerbook'
                    component={Books}
                    auth={user} />

                <Route exact path='/lendreturn' component={LendReturn}/>
            </Switch>
        </Router>





    );
}

export default FeaturesComp;
