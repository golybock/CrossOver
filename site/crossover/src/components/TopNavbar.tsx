import React from "react";
import {Container, Form, Modal, Navbar} from "react-bootstrap";
import {Link, Outlet} from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import logo from "../logo.svg";
import profile from "../resources/profile.svg";
import cart from "../resources/cart.svg";
import arrowDown from "../resources/arrow_down.svg";
import ICart from "../models/ICart";
import CartProvider from "../provider/cartProvider";
import "./TopNavbar.css";
import {ReactNotifications} from "react-notifications-component";
import 'react-notifications-component/dist/theme.css'
import CartCounter from "./Cart/CartCounter";
import OrderProvider from "../provider/orderProvider";
import WindowProvider from "../provider/windowProvider";
import NotificationManager from "../tools/NotificationManager";
import IWindowRequest from "../models/IWindowRequest";
import ICallRequest from "../models/ICallRequest";

interface IProps {

}

interface IState {
    showCart: boolean,
    showCallModal: boolean,
    request?: ICallRequest,
    cartItems: ICart[],
    modalAccepted: boolean
}

export default class TopNavbar extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            showCart: false,
            showCallModal: false,
            request: undefined,
            cartItems: [],
            modalAccepted: false
        }
    }

    componentDidMount() {
        this.setState({request: {name: "", phone: ""}})
    }

    calculateSum() {
        let sum = 0;

        this.state.cartItems.forEach(
            item => {
                sum += item.product.price * item.count
            }
        )

        return sum;
    }

    async showCart() {
        this.setState({showCart: true})

        const cart = await CartProvider.getCarts();

        this.setState({cartItems: cart});
    }

    hideCart() {
        this.setState({showCart: false})
    }

    showCallModal() {
        this.setState({showCallModal: true})
    }

    hideCallModal() {
        this.setState({showCallModal: false})
    }

    render() {
        return (
            <div className="Navbar">

                <ReactNotifications/>

                <Navbar sticky="top" expand="lg" className="bg-body-tertiary Nav-panel">
                    <Container className="justify-content-start">
                        <Navbar.Brand>
                            <Link className="Navbar-Logo" to="/">
                                <img
                                    src={logo}
                                    className="d-inline-block align-top Navbar-Logo"
                                    alt=""
                                />
                            </Link>
                        </Navbar.Brand>
                        <div className="First-Block">
                            <Nav.Link>
                                <Link className="Navbar-Item" to="/catalog#Окна">
                                    <label>Окна</label>
                                    <img src={arrowDown}/>
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link className="Navbar-Item" to="/catalog#Двери">
                                    <label>Двери</label>
                                    <img src={arrowDown}/>
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link className="Navbar-Item" to="/catalog#Комплектующие">
                                    <label>Комплектующие</label>
                                    <img src={arrowDown}/>
                                </Link>
                            </Nav.Link>
                        </div>
                    </Container>
                    <Container>
                        <Nav.Link>
                            <div className="Call-Block">
                                <label>Круглосуточно</label>
                                <h2>+7 (925) 091-19-68</h2>
                            </div>
                        </Nav.Link>
                    </Container>
                    <Container className="justify-content-end">
                        <div className="End-Block">
                            <Nav.Link>
                                <Link to="/calc">
                                    <button className="btn btn-outline-primary">Расчитать стоимость</button>
                                </Link>
                            </Nav.Link>

                            <Nav.Link>
                                <button className="btn btn-primary Primary" onClick={() => {
                                    this.showCallModal()
                                }}>Заказать звонок</button>
                            </Nav.Link>

                            <Nav.Link>
                                <img
                                    onClick={async () => await this.showCart()}
                                    src={cart}
                                    alt=""
                                />
                            </Nav.Link>

                            <Nav.Link>
                                <Link className="Navbar-Icons" to="/profile">
                                    <img
                                        src={profile}
                                        alt=""
                                    />
                                </Link>
                            </Nav.Link>

                        </div>
                    </Container>
                </Navbar>

                <main className="Navbar-Container-Content">
                    <Outlet/>
                    {this.state.showCart && (
                        <Modal show={this.state.showCart} onHide={() => {
                            this.hideCart()
                        }}>
                            <Modal.Body className="Cart">
                                <div className="Cart-Header">
                                    <h1>Коризна</h1>
                                    <button onClick={() => this.hideCart()} className="btn btn-outline-danger">X
                                    </button>
                                </div>
                                <div>
                                    {this.state.cartItems.map((item) => {
                                        return (<div className="Cart-Item">
                                            <div>
                                                <img src={item.product.image}/>
                                            </div>
                                            <div className="Cart-Item-Content">
                                                <div className="Cart-Item-Body">
                                                    <h3>{item.product.name}</h3>
                                                    <h2>{item.product.price} Р</h2>
                                                </div>
                                                <div className="Cart-Item-Toolbar">
                                                    {item.count && (
                                                        <div>
                                                            <CartCounter startValue={item.count}
                                                                         onChange={(e: number) => {
                                                                             item.count = e;
                                                                         }}/>
                                                            <button className="btn btn-outline-danger" onClick={async () => {
                                                                await CartProvider.removeFromCart(item.productId)

                                                                const cart = await CartProvider.getCarts();

                                                                this.setState({cartItems: cart});
                                                            }}>Удалить
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>)
                                    })}
                                </div>
                                <div className="Cart-Footer">
                                    <div>
                                        <label>Товаров на сумму</label>
                                        <h3>{this.calculateSum()} Р</h3>
                                    </div>
                                    <button className="btn btn-primary" onClick={async () => {
                                        const res = await OrderProvider.createOrder();

                                       if(res) {
                                           this.hideCart()

                                           const cart = await CartProvider.getCarts();

                                           this.setState({cartItems: cart});
                                       }

                                    }}>Оформить заказ</button>
                                </div>
                            </Modal.Body>
                        </Modal>
                    )}
                    {this.state.showCallModal && (
                        <Modal show={this.state.showCallModal} onHide={() => {
                            this.hideCallModal()
                        }}>
                            <Modal.Body className="Cart">
                                <div className="Cart-Header">
                                    <h1>Заявка на расчет</h1>
                                    <button onClick={() => this.hideCallModal()} className="btn btn-outline-danger">X</button>
                                </div>
                                <div className="Form-Data">
                                    <Form.Control className="Form-Label"
                                                  placeholder="Выше имя"
                                                  value={this.state.request?.name}
                                                  onChange={(e) => {
                                                      if (this.state.request != undefined) {
                                                          this.setState({
                                                              request: {
                                                                  ...this.state.request,
                                                                  name: e.target.value!
                                                              }
                                                          })
                                                      }
                                                  }}/>
                                    <Form.Control className="Form-Label"
                                                  placeholder="Ваш телефон"
                                                  value={this.state.request?.phone}
                                                  onChange={(e) => {
                                                      if (this.state.request != undefined) {
                                                          this.setState({
                                                              request: {
                                                                  ...this.state.request,
                                                                  phone: e.target.value!
                                                              }
                                                          })
                                                      }
                                                  }}/>
                                    <Form.Check label="Ознаколен с Политиой конфедициальности"
                                                checked={this.state.modalAccepted}
                                                onChange={() => this.setState({modalAccepted: !this.state.modalAccepted})}/>
                                </div>
                                <div>
                                    <button className="btn btn-primary Form-Button"
                                            onClick={async () => {

                                                if(!this.state.modalAccepted){
                                                    NotificationManager.makeError("Прочтите политику конфедициальности")
                                                    return;
                                                }

                                                let res = await WindowProvider.createCallRequest(this.state.request!);

                                                if(res){
                                                    NotificationManager.makeSuccess("Заявка создана!")
                                                    this.setState({request: {name: "", phone: ""}})
                                                    this.hideCallModal()
                                                }
                                                else{
                                                    NotificationManager.makeError("Не удалось создать заявку")
                                                }

                                            }}>Получить расчет
                                    </button>
                                </div>
                            </Modal.Body>
                        </Modal>
                    )}
                </main>

            </div>
        );
    }
}