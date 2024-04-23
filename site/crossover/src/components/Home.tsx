import React from "react";
import "./Home.css";
import HomeFirstBlock from "./Home/HomeFirstBlock";
import HomeSecondBlock from "./Home/HomeSecondBlock";
import HomeThirdBlock from "./Home/HomeThirdBlock";
import HomeFourBlock from "./Home/HomeFourBlock";
import HomeFiveBlock from "./Home/HomeFiveBlock";
import Footer from "./Footer/Footer";

export default class Home extends React.Component<any, any> {
    render() {
        return (
            <div className="Home">
                <HomeFirstBlock/>
                <HomeSecondBlock/>
                <HomeThirdBlock/>
                <HomeFourBlock/>
                <HomeFiveBlock/>
                <Footer/>
            </div>
        );
    }
}