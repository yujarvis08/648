/** This is where all main routes within our app will be defined */
import React from "react";
import { Route, Switch } from "react-router-dom";
import Checkout from "./Checkout";
import Homepage from "./Pages/Homepage";

import BrowseRestaurants from "./Pages/BrowseRestaurants";
import DriverReg from "./Pages/DriverReg";
import RestaurantReg from "./Pages/RestaurantReg";
import CustomerReg from "./Pages/CustomerReg";
import AboutUs from "./Pages/AboutUs";
import TermsOfUse from "./Pages/TermsOfUse";
import OrdersToDeliver from "./OrdersToDeliver";
import CampusMap from "./CampusMap";
import OrderConfirmation from "./OrderConfirmation";
import TestModal from './TestModal';
import AccountInfo from './AccountInfo';
import ResturantMenu from './Pages/RestaurantMenu';
import AccountChangePassword from "./AccountChangePassword";

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

                <Route exact path="/checkout">
                    <Checkout />
                </Route>

                {/* Browse Restaurants */}
                <Route exact path="/search/restaurant">
                    <BrowseRestaurants />
                </Route>

                <Route exact path="/terms-of-use">
                    <TermsOfUse />
                </Route>

                <Route exact path="/test-modal">
                    <TestModal />
                </Route>

                <Route path="/account" component={AccountInfo} />
                <Route path="/restaurant-menu" component={ResturantMenu} />
                <Route path="/AccountChangePassword" component={AccountChangePassword} />

                <Route exact path="/orders-to-deliver">
                    <OrdersToDeliver />
                </Route>
                <Route exact path="/order-confirmation">
                    <OrderConfirmation />
                </Route>

                <Route exact path="/campus-map">
                    <CampusMap />
                </Route>

            </Switch>
        </React.Fragment>
    );
}

export default Main;
