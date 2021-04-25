/** This is where all main routes within our app will be defined */
import React from 'react';
import { Route, Switch } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import BrowseRestaurants from './Pages/BrowseRestaurants';
import DriverReg from './Pages/DriverReg';
import RestaurantReg from './Pages/RestaurantReg';
import CustomerReg from './Pages/CustomerReg';
import AboutUs from './Pages/AboutUs';
import TermsOfUse from './Pages/TermsOfUse';


const Main = () => {
    return (
        <React.Fragment>
            <Switch>
                {/* Homepage */}
                <Route exact path="/">
                    <Homepage />
                </Route>

                <Route exact path="/about-us">
                    <AboutUs />
                </Route>

                {/* Registrations */}
                <Route exact path="/restaurant-registration">
                    <RestaurantReg />
                </Route>
                <Route exact path="/customer-registration">
                    <CustomerReg />
                </Route>
                <Route exact path="/driver-registration">
                    <DriverReg />
                </Route>

                <Route exact path="/ping">
                    <h1>Pong</h1>
                </Route>

                {/* Browse Restaurants */}
                <Route exact path="/search/restaurant">
                    <BrowseRestaurants />
                </Route>

                <Route exact path="/terms-of-use">
                    <TermsOfUse />
                </Route>

            </Switch>
        </React.Fragment>
    );
}

export default Main;