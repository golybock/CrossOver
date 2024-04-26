import React from "react";
import {Button, Container, Navbar} from "react-bootstrap";
import {Link, Outlet} from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import logo from "../logo.svg";
import profile from "../resources/profile.svg";
import cart from "../resources/cart.svg";
import arrowDown from "../resources/arrow_down.svg";

export default class TopNavbar extends React.Component<any, any> {
    render() {
        return (
            <div>
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
                                <Link className="Navbar-Item" to="/catalog">
                                    <label>Окна</label>
                                    <img src={arrowDown}/>
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link className="Navbar-Item" to="/catalog">
                                    <label>Двери</label>
                                    <img src={arrowDown}/>
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link className="Navbar-Item" to="/catalog">
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
                                <button className="btn btn-outline-primary">Расчитать стоимость</button>
                            </Nav.Link>

                            <Nav.Link>
                                <button className="btn btn-primary Primary">Заказать звонок</button>
                            </Nav.Link>

                            <Nav.Link>
                                <Link className="Navbar-Icons" to="/">
                                    <img
                                        src={cart}
                                        alt=""
                                    />
                                </Link>
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
                </main>
            </div>
        );
    }
}