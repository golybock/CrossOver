import React from "react";
import "./Profile.css";
import {AuthWrapper} from "../../auth/AuthWrapper";
import IClient from "../../models/IClient";
import IOrder from "../../models/IOrder";
import AuthProvider from "../../provider/authProvider";
import OrderProvider from "../../provider/orderProvider";

interface IProps {

}

interface IState {
    client?: IClient,
    orders: IOrder[]
}

export default class Profile extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            client: undefined,
            orders: []
        }
    }

    async componentDidMount() {
        const client = await AuthProvider.getMe();

        this.setState({client: client});

        const orders = await OrderProvider.getOrders();

        this.setState({orders: orders});
    }

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
                                <input value={this.state.client?.phone} className="form-control" type="tel"/>
                            </div>
                            <div className="Account-Column">
                                <label>Ваше ФИО</label>
                                <input value={this.state.client?.fullName} className="form-control" type="text"/>
                                <label>Ваш email</label>
                                <input value={this.state.client?.email} className="form-control" type="email"/>
                                <label>Ваша дата рождения</label>
                                <input value={this.state.client?.birthDate?.toString()} className="form-control" type="date"/>
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