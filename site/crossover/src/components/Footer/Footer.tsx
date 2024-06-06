import React from "react";
import "./Foter.css";
import logo from "../../logo.svg";
import ICallRequest from "../../models/ICallRequest";
import {Form, Modal} from "react-bootstrap";
import NotificationManager from "../../tools/NotificationManager";
import WindowProvider from "../../provider/windowProvider";

interface IProps {

}

interface IState {
    showModal: boolean,
    request?: ICallRequest,
    modalAccepted: boolean
}

export default class Footer extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            showModal: false,
            request: undefined,
            modalAccepted: false
        }
    }

    componentDidMount() {
        this.setState({request: {name: "", phone: ""}})
    }

    showModal() {
        this.setState({showModal: true})
    }

    hideModal() {
        this.setState({showModal: false})
    }

    render() {
        return (
            <div className="Footer">
                {this.state.showModal && (
                    <Modal show={this.state.showModal} onHide={() => {
                        this.hideModal()
                    }}>
                        <Modal.Body>
                            <div className="Cart-Header">
                                <h1>Заявка на расчет</h1>
                                <button onClick={() => this.hideModal()} className="btn btn-outline-danger">X</button>
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
                            <div className="Form-Button">
                                <button className="btn btn-primary Form-Button"
                                        onClick={async () => {

                                            if (!this.state.modalAccepted) {
                                                NotificationManager.makeError("Прочтите политику конфедициальности")
                                                return;
                                            }

                                            if(!(this.state.request?.phone.match('[0-9]{11}'))){
                                                NotificationManager.makeError("Неверный формат номера")
                                                return;
                                            }

                                            let res = await WindowProvider.createCallRequest(this.state.request!);

                                            if (res) {
                                                NotificationManager.makeSuccess("Заявка создана!")
                                                this.setState({request: {name: "", phone: ""}})
                                                this.hideModal()
                                            } else {
                                                NotificationManager.makeError("Не удалось создать заявку")
                                            }

                                        }}>Получить расчет
                                </button>
                            </div>
                        </Modal.Body>
                    </Modal>
                )}
                <div className="Footer-Content">
                    <div className="Footer-First-Column">
                        <div className="Logo-Block">
                            <img src={logo}/>
                            <label>Производим окна <br/> по современным стандартам в России</label>
                        </div>
                        <div className="Data-Block">
                            <div>
                                <label>Круглосуточно</label>
                                <h3>+7 (925) 091-19-68</h3>
                            </div>
                            <button className="btn btn-primary" onClick={() => {
                                this.showModal()
                            }}>
                                Заказать звонок
                            </button>
                            <label>
                                Московская область, г. Пущино, <br/>
                                ул. Строителей, 1В (офис 3)
                            </label>
                        </div>
                    </div>
                    <div className="Footer-Column">
                        <h6>Пластиковые окна</h6>
                        <label>Простое окно</label>
                        <label>Окно с шумоизоляцией</label>
                        <label>Окно с солцнезащитой</label>
                        <label>Панорамное окно</label>
                        <label>Цветное окно</label>
                        <label>Черное окно</label>
                    </div>
                    <div className="Footer-Column">
                        <h6>Пластиковые двери</h6>
                        <label>Входная дверь</label>
                        <label>Межкомнатная дверь</label>
                        <label>Балконная дверь</label>
                        <label>Арочная дверь</label>
                        <label>Сдвижная дверь</label>
                    </div>
                    <div className="Footer-Column">
                        <h6>Комлектующие</h6>
                        <label>Ламинация пластиковых окон</label>
                        <label>Фурнитура</label>
                        <label>Ограничитель</label>
                        <label>Детский замок</label>
                    </div>
                </div>
                <hr/>
                <div className="Footer-Footer">
                    <div className="Footer-Start">
                        <label>@ 2024 Crossover</label>
                        <label>Все права защищены</label>
                    </div>
                    <label>Политика конфедициальности</label>
                </div>
            </div>
        );
    }
}