/** This is where all main routes within our app will be defined */
import React from 'react';
import { Route, Switch } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import BrowseRestaurants from './Pages/BrowseRestaurants';

const Main = () => {
    return (
        <React.Fragment>
            <Switch>

                <Route exact path="/">
                    <Homepage />
                </Route>

                <Route exact path="/ping">
                    <h1>Pong</h1>
                </Route>

                <Route exact path="/search/restaurant">
                    <BrowseRestaurants />
                </Route>

            </Switch>
        </React.Fragment>
    );
}

export default Main;