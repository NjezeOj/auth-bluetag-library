import React from 'react';
import './App.css';
import { Navbar } from './features/components/Navbar'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {CategoryPage} from "./features/category/CategoryPage"
import {HomePage} from "./features/HomePage"
import {BookLending} from "./features/booklending/BookLending"
import {Books} from "./features/books/Books"
import {LendReturn} from "./features/books/LendReturn"
import {User} from './features/User/User'
import Register from './features/components/Register'
import { Login } from './features/components/Login'
import FeaturesComp  from './features/components/FeaturesComp'

const App = () => {
  return (   

    <BrowserRouter>      
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />


        <Route component={FeaturesComp} />
      </Switch>      
    </BrowserRouter>
    
    
     
    

  );
}

export default App;
