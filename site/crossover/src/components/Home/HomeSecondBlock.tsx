import React from "react";
import "./HomeSecondBlock.css";
import window1 from "../../resources/window1.png";
import window2 from "../../resources/window2.png";
import window3 from "../../resources/window3.png";

export default class HomeSecondBlock extends React.Component<any, any>{
    render() {
        return (
            <div className="Home-Second-Block">
               <div className="Row">
                   <div className="Column">
                       <h1>Наша продукция</h1>
                       <label>Мы предлагаем широкий ассортимент продукции, изготовленной <br/>
                           из различных материалов — от традиционного дерева до современных <br/>
                           металлопластиковых конструкций. Все наши изделия соответствуют <br/>
                           высоким стандартам качества и безопасности, что подтверждено <br/>
                           соответствующими сертификатами.
                       </label>
                       <div className="row About-Block">
                           <div className="col">
                               <h2>&gt; 10</h2>
                               <hr/>
                               <label>Лет на рынке</label>
                           </div>
                           <div className="col">
                               <h2>&gt; 40</h2>
                               <hr/>
                               <label>Лет прослужит <br/> наша продукция</label>
                           </div>
                           <div className="col">
                               <h2>&gt; 12 000</h2>
                               <hr/>
                               <label>Товаров произведено</label>
                           </div>
                       </div>
                   </div>
                   <div className="Second-Column">
                        <div className="Row">
                            <div className="col Second-Column-Block">
                                <h4>Пластиковые окна</h4>
                                <div className="Card-1">
                                    <img src={window1} alt=""/>
                                    <div className="Card-Text">
                                        <label>Простые окна</label><br/>
                                        <label>Окна с теплоизоляцией</label><br/>
                                        <label>Окно с солцнезащитой</label><br/>
                                        <label>Панорамное окно</label><br/>
                                        <label>Цветное окно</label><br/>
                                        <label>Черное окно</label><br/>
                                    </div>
                                </div>
                            </div>
                            <div className="col Second-Column-Block">
                                <h4>Пластиковые двери</h4>
                                <div className="Card-2">
                                    <img src={window2} alt=""/>
                                    <div className="Card-Text">
                                        <label>Входная дверь</label><br/>
                                        <label>Межкомнатная дверь</label><br/>
                                        <label>Балконная дверь</label><br/>
                                        <label>Арочная дверь</label><br/>
                                        <label>Сдвижная дверь</label><br/>
                                    </div>
                                </div>
                            </div>
                            <div className="col Second-Column-Block">
                                <h4>Комплектующие</h4>
                                <div  className="Card-3">
                                    <img src={window3} alt=""/>
                                    <div className="Card-Text">
                                        <label>Ламинация пластиковых окон</label><br/>
                                        <label>Фурнитура</label><br/>
                                        <label>Ограничитель</label><br/>
                                        <label>Детский замок</label><br/>
                                    </div>
                                </div>
                            </div>
                        </div>
                   </div>
               </div>
            </div>
        );
    }
}