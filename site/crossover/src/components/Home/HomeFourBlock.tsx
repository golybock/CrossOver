import React from "react";
import "./HomeFourBlock.css";

export default class HomeFourBlock extends React.Component<any, any>{
    render() {
        return (
            <div className="Four-Block">
                <h1>Расчитайте стоимость</h1>
                <label>Быстро и удобно рассчитайте стоимость <br/> Вашего заказа с помощью калькулятора!</label>
                <button className="btn btn-outline-primary Primary">Калькулятор</button>
            </div>
        );
    }
}