import React from "react";
import "./HomeFourBlock.css";
import {NavLink} from "react-router-dom";
import calc from "../../resources/calc.png";

export default class HomeFourBlock extends React.Component<any, any>{
    render() {
        return (
            <div className="Four-Block">
                <div className="Four-Header">
                    <h1>Расчитайте стоимость</h1>
                    <label>Быстро и удобно рассчитайте стоимость <br/> Вашего заказа с помощью калькулятора!</label>
                    <NavLink to={"/calc"}>
                        <button className="btn btn-outline-primary Primary">Калькулятор</button>
                    </NavLink>
                </div>
                <img src={calc}/>
            </div>
        );
    }
}