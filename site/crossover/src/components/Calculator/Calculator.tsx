import React from "react";
import "./Calculator.css";
import {Accordion, Form, FormSelect} from "react-bootstrap";
import one from "../../resources/window_types/one.svg";
import two from "../../resources/window_types/two.svg";
import three from "../../resources/window_types/three.svg";
import four from "../../resources/window_types/four.svg";
import five from "../../resources/window_types/five.svg";
import six from "../../resources/window_types/six.svg";
import window from "../../resources/window.png";
import AsyncSelect from "react-select/async";
import WindowProvider from "../../provider/windowProvider";
import {SingleValue} from "react-select";
import IOption from "../../provider/IOption";
import IWindow from "../../models/IWindowRequestWindow";

interface IProps {

}

interface IState {
    window?: IWindow,
    selectedColor?: IOption,
    selectedPacket?: IOption,
}

export default class Calculator extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            window: this.getEmptyWindow(),
            selectedColor: undefined,
        }
    }

    // getEmptyRequest() {
    //     return {
    //         city: "",
    //         name: "",
    //         phone: "",
    //         email: "",
    //         description: "",
    //         windowRequest: this.getEmptyWindow()
    //     }
    // }

    getEmptyWindow() {
        return {
            height: 0,
            width: 0,
            color: 1,
            packet: 1,
            windowType: 1,
            hasWindowsill: false,
            hasLattice: false,
            windowSections: []
        }
    }

    async getColors() {
        return await WindowProvider.getColors();
    }

    async getPackets() {
        return await WindowProvider.getPackets();
    }

    colorSelected(e: SingleValue<IOption>) {
        this.setState({selectedColor: (e as IOption)})

        if (this.state.window != undefined) {
            this.setState({
                window: {
                    ...this.state.window,
                    color: Number(e!.value)
                }
            })
        }
    }

    widthChanged(e: number) {
        if (this.state.window != undefined) {
            this.setState({
                window: {
                    ...this.state.window,
                    width: Number(e)
                }
            })
        }
    }

    heightChanged(e: number) {
        if (this.state.window != undefined) {
            this.setState({
                window: {
                    ...this.state.window,
                    height: Number(e)
                }
            })
        }
    }

    packetSelected(e: SingleValue<IOption>) {
        this.setState({selectedPacket: (e as IOption)})

        if (this.state.window != undefined) {
            this.setState({
                window: {
                    ...this.state.window,
                    packet: Number(e!.value)
                }
            })
        }
    }

    render() {
        return (
            <div className="Calc">
                <div className="Calc-Body">
                    <h1>Калькулятор <br/>
                        пластиковых окон</h1>
                    <label>Сформируйте заявку, на основе которой наш <br/>
                        менеджер выполнит предварительный расчет</label>
                    <Accordion defaultActiveKey="0">
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
                                <div className="Block">
                                    <h4>Створки</h4>
                                    <div className="Sections">
                                        <div className="Section">
                                            <label>1 створка</label>
                                            <FormSelect></FormSelect>
                                        </div>
                                        <div className="Section">
                                            <label>2 створка</label>
                                            <FormSelect></FormSelect>
                                        </div>
                                        <div className="Section">
                                            <label>3 створка</label>
                                            <FormSelect></FormSelect>
                                        </div>
                                        <div className="Section">
                                            <label>4 створка</label>
                                            <FormSelect></FormSelect>
                                        </div>
                                    </div>
                                </div>
                                <div className="Block">
                                    <h4>Параметры окна</h4>
                                    <div className="Parameters">
                                        <div className="Parameter">
                                            <label>Ширина мм</label>
                                            <Form.Control value={this.state.window?.width}
                                                          onChange={(e) => this.widthChanged(Number(e.target.value))}/>
                                            <label>Стеклопакет</label>
                                            <AsyncSelect isMulti={false}
                                                         cacheOptions
                                                         defaultOptions
                                                         value={this.state.selectedPacket}
                                                         onChange={(e: SingleValue<IOption>) => this.packetSelected(e)}
                                                         loadOptions={this.getPackets}/>
                                        </div>
                                        <div className="Parameter">
                                            <label>Высота мм</label>
                                            <Form.Control value={this.state.window?.height}
                                                          onChange={(e) => this.heightChanged(Number(e.target.value))}/>
                                            <label>Цвет</label>
                                            <AsyncSelect isMulti={false}
                                                         cacheOptions
                                                         defaultOptions
                                                         value={this.state.selectedColor}
                                                         onChange={(e: SingleValue<IOption>) => this.colorSelected(e)}
                                                         loadOptions={this.getColors}/>
                                        </div>
                                    </div>

                                    <h4>Дополнительные опции</h4>
                                    <div className="Options">
                                        <div className="Option">
                                            <label>Тип дома</label>
                                            <FormSelect></FormSelect>
                                        </div>
                                        <div className="Option">
                                            <Form.Check
                                                checked={this.state.window?.hasWindowsill ?? false}
                                                label="Подоконник"></Form.Check>
                                            <Form.Check
                                                checked={this.state.window?.hasLattice ?? false}
                                                label="Москитная сетка"></Form.Check>
                                        </div>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
                <div className="Calc-Info">
                    <div className="Window">
                        <img src={window}/>
                    </div>
                </div>
            </div>
        );
    }
}