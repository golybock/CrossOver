import React from "react";
import "./Foter.css";
import logo from "../../logo.svg";

export default class Footer extends React.Component<any, any>{
    render() {
        return (
            <div className="Footer">
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
                            <button className="btn btn-primary">
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