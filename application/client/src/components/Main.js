import React from 'react';
import { Route, Switch } from "react-router-dom";
import Homepage from "./Homepage";

const Main = () => {
    return (
        <React.Fragment>
            <Switch>

                <Route exact path="/">
                    <Homepage />
                </Route>

            </Switch>
        </React.Fragment>
    );
}

export default Main;