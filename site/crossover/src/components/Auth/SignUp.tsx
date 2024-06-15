import React from "react";
import {Button, Form} from "react-bootstrap";
import AuthProvider from "../../provider/authProvider";
import {NavLink} from "react-router-dom";
import "./Auth.css";
import ISignUpBlank from "../../models/ISignUpBlank";
import NotificationManager from "../../tools/NotificationManager";

interface IProps {
}

interface IState {
    signUpBlank: ISignUpBlank
}

export default class SignUp extends React.Component<IProps, IState>{

    constructor(props: IProps) {
        super(props);

        this.state = {
            signUpBlank: {email: "", phone: "", password: "", birthDate: null, fullName: "", login: ""},
        }
    }

    signUp = async () => {

        let res = await AuthProvider.signUp(this.state.signUpBlank)

        if (res) {
            console.log('authed')
        } else {
            NotificationManager.makeError("Ошибка регистрации")
        }
    }

    render() {
        return (
            <div>
                <div className="App-Body">
                    <div className="App-Body-Header">
                        <h1>Регистрация</h1>
                    </div>
                    <div className="App-Body-Content">
                        <Form>
                            <Form.Control type="email"
                                          className="Form-Control"
                                          placeholder="Почта"
                                          value={this.state.signUpBlank.email}
                                          onChange={(e) => {
                                              this.setState({
                                                  signUpBlank: {
                                                      ...this.state.signUpBlank,
                                                      email: e.target.value
                                                  }
                                              })
                                          }}/>

                            <Form.Control type="password"
                                          className="Form-Control"
                                          placeholder="Пароль"
                                          value={this.state.signUpBlank.password}
                                          onChange={(e) => {
                                              this.setState({
                                                  signUpBlank: {
                                                      ...this.state.signUpBlank,
                                                      password: e.target.value
                                                  }
                                              })
                                          }}/>

                            <Form.Control type="text"
                                          className="Form-Control"
                                          placeholder="Номер телефона"
                                          value={this.state.signUpBlank.phone}
                                          onChange={(e) => {
                                              this.setState({
                                                  signUpBlank: {
                                                      ...this.state.signUpBlank,
                                                      phone: e.target.value
                                                  }
                                              })
                                          }}/>

                            <Form.Control type="text"
                                          className="Form-Control"
                                          placeholder="Логин"
                                          value={this.state.signUpBlank.login}
                                          onChange={(e) => {
                                              this.setState({
                                                  signUpBlank: {
                                                      ...this.state.signUpBlank,
                                                      login: e.target.value
                                                  }
                                              })
                                          }}/>

                            <Form.Control type="text"
                                          className="Form-Control"
                                          placeholder="ФИО"
                                          value={this.state.signUpBlank.fullName}
                                          onChange={(e) => {
                                              this.setState({
                                                  signUpBlank: {
                                                      ...this.state.signUpBlank,
                                                      fullName: e.target.value
                                                  }
                                              })
                                          }}/>

                            <Button className="btn Primary-Button"
                                    onClick={async () => {
                                        await this.signUp();
                                    }}>
                                Регистрация
                            </Button>

                        </Form>
                    </div>

                    <div className="App-Body-Footer">
                        <NavLink to="/signIn">
                            <label>Вход</label>
                        </NavLink>
                    </div>

                </div>
            </div>
        );
    }
}