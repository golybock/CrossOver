import React from "react";
import "./HomeFirstBlock.css";

export default class HomeFirstBlock extends React.Component<any, any>{
    render() {
        return (
            <div className="Home-First-Block">
                <div className="Home-First-Block-Header">
                    <h1>Производим окна <br/> по современным <br/> стандартам в России</h1>
                </div>
                <div className="Home-First-Block-Under-Header">
                    <label>
                        Мы заботимся о комфорте и уюте вашего дома, <br/> поэтому производим только качественные
                        и <br/> надежные окна и двери.
                    </label>
                </div>
                <div className="Home-First-Block-Toolbar">

                    <button className="btn btn-primary Primary">Заказать звонок</button>

                    <button className="btn btn-outline-primary">Расчитать стоимость</button>

                </div>
            </div>
        );
    }
}