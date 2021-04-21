/** This is where all main routes within our app will be defined */
import React from 'react';
import { Route, Switch } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import BrowseRestaurants from './Pages/BrowseRestaurants';
import DriverReg from './DriverReg';
import RestaurantReg from './RestaurantReg';
import CustomerReg from './CustomerReg';

const Main = () => {
    return (
        <React.Fragment>
            <Switch>
                {/* Homepage */}
                <Route exact path="/">
                    <Homepage />
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

            </Switch>
        </React.Fragment>
    );
}

export default Main;