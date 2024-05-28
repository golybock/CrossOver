import React from "react";
import {Button, Form} from "react-bootstrap";
import AuthProvider from "../../provider/authProvider";
import {NavLink} from "react-router-dom";
import "./Auth.css";
import ISignUpBlank from "../../models/ISignUpBlank";

interface IProps {
}

interface IState {
    signUpBlank: ISignUpBlank
}

export default class SignUp extends React.Component<IProps, IState>{

    constructor(props: IProps) {
        super(props);

        this.state = {
            signUpBlank: {email: "", phone: "", password: "", birthDate: "", fullName: "", login: ""},
        }
    }

    signUp = async () => {

        let res = await AuthProvider.signUp(this.state.signUpBlank)

        if (res) {
            console.log('authed')
        } else {
            // NotificationManager.makeError("Ошибка авторизации")
        }
    }

    render() {
        return (
            <div>
                <div className="App-Body">
                    <div className="App-Body-Header">
                        <h1>Sign In</h1>
                    </div>
                    <div className="App-Body-Content">
                        <Form>
                            <Form.Control type="email"
                                          className="Form-Control"
                                          placeholder="Enter email here..."
                                          value={this.state.signUpBlank.email}
                                          onChange={(e) => {
                                              this.setState({email: e.target.value})
                                          }}/>

                            <Form.Control type="password"
                                          className="Form-Control"
                                          placeholder="Enter password here..."
                                          value={this.state.signUpBlank.password}
                                          onChange={(e) => {
                                              this.setState({password: e.target.value})
                                          }}/>

                            <Button className="btn Primary-Button"
                                    onClick={async () => {
                                        await this.signUp();
                                    }}>
                                Continue
                            </Button>

                        </Form>
                    </div>

                    <div className="App-Body-Footer">
                        <NavLink to="/signUp">
                            <label>No account?</label>
                        </NavLink>
                        <label>Forgot pass?</label>
                        <label>privacy</label>
                    </div>

                </div>
            </div>
        );
    }
}