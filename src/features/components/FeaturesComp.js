import React from 'react';
import { Navbar } from './Navbar'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CategoryPage } from "../category/CategoryPage"
import { HomePage } from "../HomePage"
import { BookLending } from "../booklending/BookLending"
import { Books } from "../books/Books"
import { LendReturn } from "../books/LendReturn"


const FeaturesComp = () => {
    return (

        <Router>
            <Navbar />
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/registercategory" component={CategoryPage} />
                <Route exact path="/policy" component={BookLending} />
                <Route exact path="/registerbook" component={Books} />
                <Route exact path="/lendreturn" component={LendReturn} />
            </Switch>
        </Router>





    );
}

export default FeaturesComp;
