import React from "react";
import "./HomeThirdBlock.css";
import third from "../../resources/third.png";

export default class HomeThirdBlock  extends React.Component<any, any>{
    render() {
        return (
            <div className="Third-Block">
                <div className="Third-First-Block">
                    <div className="col">
                        <div className="Header-Container">
                            <h2 className="Header-Text">Профильная система ПВХ</h2>
                            <img src={third}/>
                        </div>
                        <div className="Content-Container">
                            В сочетании с большим ассортиментом стеклопакетов и фурнитуры каждый
                            наш клиент найдет себе окна под индивидуальные пожелания и особенности
                            объекта остекления. Кроме стандартных вариантов окон у нас можно
                            заказать конструкции, имеющие повышенные параметры по тепло- и звукоизоляции.
                        </div>
                    </div>
                </div>
                <div className="Third-Second-Block">
                    <h1>Высокие стандарты качества</h1>
                    <label>
                        Высокое качество нашей продукции достигается грамотным подходом к комплектующим, профессионализмом мастеров, точностью сборки и слаженностью всех производственных процессов. Благодаря этому конечный продукт получается тёплым, прочным и надёжным. На все окна и двери мы даём гарантию и полностью уверены, что они прослужат вам долго. На каждом этапе производства мы ведём тщательный контроль качества и соблюдения технологии изготовления.
                    </label>
                    <button className="btn btn-primary Primary">Получить консультацию</button>
                </div>
            </div>
        );
    }
}