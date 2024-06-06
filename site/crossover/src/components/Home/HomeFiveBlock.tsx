import React from "react";
import "./HomeFiveBlock.css";
import {Form} from "react-bootstrap";
import pchel from "../../resources/pchel.jpg"
import telegram from "../../resources/telegram.svg"
import watsapp from "../../resources/watsapp.svg"
import instagram from "../../resources/instagram.svg"
import NotificationManager from "../../tools/NotificationManager";
import WindowProvider from "../../provider/windowProvider";


interface IState {
    phone: string,
    name: string
}

export default class HomeFiveBlock extends React.Component<any, IState> {

    constructor(props: any) {
        super(props);

        this.state = {
            name: "",
            phone: ""
        }
    }

    render() {
        return (
            <div className="Five-Block">
                <div className="col">
                    <h1>Как заказать окна?</h1>
                    <label>
                        Оставьте заявку на сайтк и к Вам придет наш <br/>
                        замерщик абсолютно бесплнто!
                    </label>
                    <div className="Form">
                        <Form.Control className="Square"
                                      type="text"
                                      placeholder="Ваше имя"
                                      value={this.state.name}
                                      onChange={(e) => {
                                          this.setState({name: e.target.value})
                                      }}/>
                        <Form.Control className="mt-2 Square"
                                      type="tel"
                                      placeholder="Ваш телефон"
                                      value={this.state.phone}
                                      onChange={(e) => {
                                          this.setState({phone: e.target.value})
                                      }}/>
                        <button className="btn btn-primary mt-2 Primary" onClick={async () => {

                            if(this.state.phone == "" || this.state.name == ""){
                                NotificationManager.makeError("Введите имя и телефон!")
                            }

                            if(!(this.state.phone.match('[0-9]{11}'))){
                                NotificationManager.makeError("Неверный формат номера")
                                return;
                            }

                            let res = await WindowProvider.createCallRequest({name: this.state.name, phone: this.state.phone});

                            if(res){
                                NotificationManager.makeSuccess("Заявка создана!")
                                this.setState({phone: ""})
                                this.setState({name: ""})
                            }
                            else{
                                NotificationManager.makeError("Не удалось создать заявку")
                            }

                        }}>
                            <label>Заказать замер</label>
                        </button>
                    </div>
                </div>
                <div className="col">
                    <img className="Image" src={pchel}/>
                </div>
                <div className="col">
                    <label>Позвоните в контакт центр Crossover</label><br/>
                    <label>Круглосуточкно, бесплатно</label>
                    <h1>+7 (925) 091-19-68</h1>
                    <div className="row Social">
                        <img src={telegram}/>
                        <img src={watsapp}/>
                        <img src={instagram}/>
                    </div>
                </div>
            </div>
        );
    }
}