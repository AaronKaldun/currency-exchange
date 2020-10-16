import React from "react";
import Header from "./components/Header";
import Route from "./components/Route";
import ConversionDisplay from "./components/ConversionDisplay";

const App = () => {
    return (
        <div>
            <Header />
            <Route path="/">
                <ConversionDisplay type="latest" />
            </Route>
            <Route path="/past">
                <ConversionDisplay type="past" />
            </Route>
        </div>
    );
};

export default App;
