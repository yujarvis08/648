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
import PasswordRecovery from "./Pages/PasswordRecovery";
import AccountInfo from './AccountInfo';
import RestaurantMenu from './Pages/RestaurantMenu';
import Restaurant from './Pages/Restaurant';

const Main = ({ isLoggedIn, userType, handleLogout, handleLogin }) => {

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
                <Route exact path="/terms-of-use">
                    <TermsOfUse />
                </Route>
                <Route exact path="/account">
                    <AccountInfo
                        handleLogout={handleLogout}
                    />
                </ Route >
                <Route exact path="/search/restaurant">
                    <BrowseRestaurants />
                </Route>
                {/* Restaurant Profile */}
                <Route exact path="/restaurant-menu" >
                    <RestaurantMenu
                        isLoggedIn={isLoggedIn}
                        handleLogin={handleLogin}
                    />
                </Route>
                <Route exact path="/password-recovery">
                    <PasswordRecovery />
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

                {/* Customer specific routes */}
                {userType === "customer" &&
                    <React.Fragment>
                        <Route exact path="/checkout">
                            <Checkout />
                        </Route>
                    </React.Fragment>
                }
                {/* Restaurant Owner specific routes */}
                {userType === "restaurantOwner" &&
                    <React.Fragment>

                        <Route exact path="/restaurant">
                            <Restaurant />
                        </Route>
                    </ React.Fragment>

                }
                {/* Delivery Driver specific routes */}
                {userType === "deliveryDriver" &&
                    < React.Fragment >
                        <Route exact path="/orders-to-deliver">
                            <OrdersToDeliver />
                        </Route>
                        <Route exact path="/campus-map">
                            <CampusMap />
                        </Route>
                    </React.Fragment>
                }
            </Switch>
        </React.Fragment >
    );
}

export default Main;
