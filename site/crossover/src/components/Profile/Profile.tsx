import React from "react";
import "./Profile.css";
import {AuthWrapper} from "../../auth/AuthWrapper";

interface IProps {

}

interface IState {

}

export default class Profile extends React.Component<IProps, IState> {
    render() {
        return (
            <div className="Profile">
                <h1>Мой профиль</h1>
                <hr/>
                <div className="Profile-Container">
                    <div className="Account">
                        <h5>Личная инфорация</h5>
                        <div className="Account-Container">
                            <div className="Account-Column">
                                <img width="190px" height="190px"/>
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
                            <button onClick={() => {AuthWrapper.userSignOut()}} className="btn btn-outline-danger">Выйти</button>
                            <button className="btn btn-outline-success">Сохранить</button>
                        </div>
                    </div>
                    <div className="Orders">

                    </div>
                </div>
            </div>
        );
    }
}