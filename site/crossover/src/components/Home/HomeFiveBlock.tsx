import React from "react";
import "./HomeFiveBlock.css";
import {Form} from "react-bootstrap";
import pchel from "../../resources/pchel.png"
import telegram from "../../resources/telegram.svg"
import watsapp from "../../resources/watsapp.svg"
import instagram from "../../resources/instagram.svg"

export default class HomeFiveBlock extends React.Component<any, any> {
    render() {
        return (
            <div className="Five-Block">
                <div className="col">
                    <h1>Как заказать окна?</h1>
                    <label>
                        Оставьте заявку на сайтк и к Вам придет наш <br/>
                        замерщик абсолютно бесплнто!
                    </label>
                    <Form>
                        <Form.Control type="text" placeholder="Ваше имя"></Form.Control>
                        <Form.Control className="mt-2" type="tel" placeholder="Ваш телефон"></Form.Control>
                        <button className="btn btn-primary mt-2">Заказать замер</button>
                    </Form>
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