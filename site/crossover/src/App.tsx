import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import PageNotFound from "./components/PageNotFound";
import TopNavbar from "./components/TopNavbar";
import Catalog from "./components/Catalog/Catalog";

function App() {
    return (
        <div className="App">
            <div>
                <Routes>
                    <Route element={<TopNavbar/>}>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/catalog" element={<Catalog/>}/>
                        <Route path="*" element={<PageNotFound/>}/>
                    </Route>
                </Routes>
            </div>
        </div>
    );
}

export default App;
