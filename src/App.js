import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from './features/components/Register'
import { Login } from './features/components/Login'
import {RegisterAdmin} from './features/components/RegisterAdmin'
import FeaturesComp  from './features/components/FeaturesComp'

const App = () => {
  return (   

    <BrowserRouter>      
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={Login} />
        <Route exact path="/register/Admin/105" component={RegisterAdmin} />


        <Route component={FeaturesComp} />
      </Switch>      
    </BrowserRouter>
    
    
     
    

  );
}

export default App;
