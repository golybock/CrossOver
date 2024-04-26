import React from "react";
import "./Profile.css";

interface IProps{

}

interface IState{

}

export default class Profile extends React.Component<IProps, IState>{
    render() {
        return (
            <div className="Profile">
                <h1>Мой профиль</h1>
                <hr/>
                <div className="Profile-Container">
                    <div className="Account">
                        <label>Личная инфорация</label>
                        <div className="Account-Container">
                            <div className="Account-Column">
                                <img width="100px" height="100px"/>
                                <label>Ваш телефон</label>
                                <input type="tel"/>
                            </div>
                            <div className="Account-Column">
                                <label>Ваше ФИО</label>
                                <input type="text"/>
                                <label>Ваш email</label>
                                <input type="email"/>
                                <label>Ваша дата рождения</label>
                                <input type="date"/>
                            </div>
                        </div>
                        <div className="Account-Buttons">
                            <button className="btn btn-primary"></button>
                            <button className="btn btn-primary"></button>
                        </div>
                    </div>
                    <div className="Orders">

                    </div>
                </div>
            </div>
        );
    }
}