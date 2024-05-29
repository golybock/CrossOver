import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import TopNavbar from "./components/TopNavbar";
import Catalog from "./components/Catalog/Catalog";
import {ProtectedRoute} from "./auth/AuthWrapper";
import Auth from "./components/Auth/Auth";
import Profile from "./components/Profile/Profile";
import Calculator from "./components/Calculator/Calculator";
import SignUp from "./components/Auth/SignUp";

function App() {
    return (
        <div className="App">
            <div>
                <Routes>
                    <Route element={<TopNavbar/>}>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/profile" element={<ProtectedRoute outlet={<Profile/>}/>}/>
                        <Route path="/signIn" element={<Auth/>}/>
                        <Route path="/signUp" element={<SignUp/>}/>
                        <Route path="/catalog" element={<Catalog/>}/>
                        <Route path="/calc" element={<Calculator/>}/>
                        <Route path="*" element={<PageNotFound/>}/>
                    </Route>
                </Routes>
            </div>
        </div>
    );
}

export default App;
