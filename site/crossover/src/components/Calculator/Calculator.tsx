import React from "react";
import "./Calculator.css";
import {Accordion} from "react-bootstrap";
import one from "../../resources/window_types/one.svg";
import two from "../../resources/window_types/two.svg";
import three from "../../resources/window_types/three.svg";
import four from "../../resources/window_types/four.svg";
import five from "../../resources/window_types/five.svg";
import six from "../../resources/window_types/six.svg";

export default class Calculator extends React.Component<any, any>{
    render() {
        return (
            <div className="Calc">
                <div className="Calc-Body">
                    <h1>Калькулятор <br/>
                        пластиковых окон</h1>
                    <label>Сформируйте заявку, на основе которой наш <br/>
                        менеджер выполнит предварительный расчет</label>
                    <Accordion  defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Окно 1</Accordion.Header>
                            <Accordion.Body>
                                <div className="Block">
                                    <h4>Тип окна</h4>
                                    <div className="Window-Types">
                                        <img src={one}></img>
                                        <img src={two}></img>
                                        <img src={three}></img>
                                        <img src={four}></img>
                                        <img src={five}></img>
                                        <img src={six}></img>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
                <div className="Calc-Info"></div>
            </div>
        );
    }
}