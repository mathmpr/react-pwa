import React from 'react';
import {Route} from "react-router-dom";
import Home from "./components/pages/home/Home";
import Details from "./components/pages/details/Details";

function App() {

    return (
        <div className="App">
            <Route exact path="/" component={Home}/>
            <Route exact path="/details/:id" component={Details}/>
        </div>
    );
}


export default App;
