import React from "react";
import "./Home.css";
import HomeFirstBlock from "./Home/HomeFirstBlock";
import HomeSecondBlock from "./Home/HomeSecondBlock";
import HomeThirdBlock from "./Home/HomeThirdBlock";
import HomeFourBlock from "./Home/HomeFourBlock";
import HomeFiveBlock from "./Home/HomeFiveBlock";
import Footer from "./Footer/Footer";
import {Form, Modal} from "react-bootstrap";
import NotificationManager from "../tools/NotificationManager";
import WindowProvider from "../provider/windowProvider";
import ICallRequest from "../models/ICallRequest";

interface IProps{

}

interface IState{
    showModal: boolean,
    request?: ICallRequest,
    modalAccepted: boolean
}

export default class Home extends React.Component<IProps, IState> {

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

    showModal(){
        this.setState({showModal: true})
    }

    hideModal(){
        this.setState({showModal: false})
    }

    render() {
        return (
            <div className="Home">
                {this.state.showModal && (
                    <Modal show={this.state.showModal} onHide={() => {
                        this.hideModal()
                    }}>
                        <Modal.Body className="Cart">
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

                                            if(!this.state.modalAccepted){
                                                NotificationManager.makeError("Прочтите политику конфедициальности")
                                                return;
                                            }

                                            let res = await WindowProvider.createCallRequest(this.state.request!);

                                            if(res){
                                                NotificationManager.makeSuccess("Заявка создана!")
                                                this.setState({request: {name: "", phone: ""}})
                                                this.hideModal()
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
                <HomeFirstBlock showModal={() => this.showModal()}/>
                <HomeSecondBlock/>
                <HomeThirdBlock/>
                <HomeFourBlock/>
                <HomeFiveBlock/>
                <Footer/>
            </div>
        );
    }
}