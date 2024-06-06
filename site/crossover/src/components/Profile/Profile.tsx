import React from "react";
import "./Profile.css";
import {AuthWrapper} from "../../auth/AuthWrapper";
import IClient from "../../models/IClient";
import IOrder from "../../models/IOrder";
import AuthProvider from "../../provider/authProvider";
import OrderProvider from "../../provider/orderProvider";
import {Accordion, Form} from "react-bootstrap";
import Footer from "../Footer/Footer";


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

    myDateParse(s: string) {
        let b: string[] = s.split(/\D/);
        b[6] = b[6].substr(0, 3); // Microseconds to milliseconds
        // @ts-ignore
        return new Date(Date.UTC(...b));
    }

    calculateSum(order: IOrder) {
        let sum = 0;

        order.ordersProducts.forEach(
            item => {
                sum += item.product.price * item.count
            }
        )

        return sum;
    }

    render() {
        return (
            <div className="Profile">
                <div className="Profile-Content">
                    <h1>Мой профиль</h1>
                    <hr/>
                    <div className="Profile-Container">
                        <div className="Account">
                            <h3>Личная инфорация</h3>
                            <div className="Account-Container">
                                <div className="Account-Row">
                                    <div className="Account-Column">
                                        <img width="190px" height="190px"/>
                                        <button className="btn btn-primary">Загрузить</button>
                                    </div>
                                    <div className="Account-Column">
                                        <label>Ваше ФИО</label>
                                        <input value={this.state.client?.fullName} className="form-control" type="text"/>
                                        <label>Ваш email</label>
                                        <input value={this.state.client?.email} className="form-control" type="email"/>
                                        <label>Ваша дата рождения</label>
                                        <input value={this.state.client?.birthDate?.toString()} className="form-control"
                                               type="date"/>
                                        <label>Ваш телефон</label>
                                        <input value={this.state.client?.phone} className="form-control" type="tel"/>
                                    </div>
                                </div>
                                <div className="Account-Row">
                                    <div className="Account-Buttons">
                                        <button onClick={() => {
                                            AuthWrapper.userSignOut()
                                        }} className="btn btn-danger">Выйти
                                        </button>
                                        <button className="btn btn-success">Сохранить</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="Orders">
                            <h3>Заказы</h3>
                            {this.state.orders && (
                                <>
                                    {this.state.orders.map((item) => {
                                        return (
                                            <div className="mb-2">
                                                <Accordion defaultActiveKey="0">
                                                    <Accordion.Item eventKey="0">
                                                        <Accordion.Header>
                                                            <div className="Order-Header">
                                                                <div className="Order-Header-Data">
                                                                    <h5>Заказ N{item.id} </h5>
                                                                    <label>От {this.myDateParse(item.date.toString()).toDateString()}</label>
                                                                    <label>Статус: {item.status.name}</label>
                                                                </div>
                                                            </div>
                                                        </Accordion.Header>
                                                        <Accordion.Body>
                                                            <div className="Total-Sum">
                                                                <h4>Итого:</h4>
                                                                <h1>{this.calculateSum(item)}</h1>
                                                                <hr/>
                                                            </div>
                                                            <div>
                                                                {item.ordersProducts.map((product) => {
                                                                    return (<div className="Product">
                                                                        <div className="Product-Header">
                                                                            <img className="Product-Image"
                                                                                 src={product.product.image}/>
                                                                            <div className="Product-Header-Data">
                                                                                <h5>{product.product.name}</h5>
                                                                                <label>Код
                                                                                    товара: {product.productId}</label>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            {product.count} шт на
                                                                            сумму <h5>{product.product.price * product.count} Р</h5>
                                                                        </div>
                                                                    </div>);
                                                                })}
                                                            </div>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                </Accordion>
                                            </div>
                                        );
                                    })}
                                </>
                            )}
                            {this.state.orders.length == 0 && (
                                <div>
                                    <h1>Нет заказов</h1>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}