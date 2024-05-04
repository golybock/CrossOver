import React from "react";
import "./Calculator.css";
import {Accordion, Form} from "react-bootstrap";

import one from "../../resources/window_types/one.svg";
import oneSelected from "../../resources/window_types/one_selected.svg";

import two from "../../resources/window_types/two.svg";
import twoSelected from "../../resources/window_types/two_selected.svg";

import three from "../../resources/window_types/three.svg";
import threeSelected from "../../resources/window_types/three_selected.svg";

import four from "../../resources/window_types/four.svg";
import fourSelected from "../../resources/window_types/four_selected.svg";

import five from "../../resources/window_types/five.svg";
import fiveSelected from "../../resources/window_types/five_selected.svg";

import six from "../../resources/window_types/six.svg";
import sixSelected from "../../resources/window_types/six_selected.svg";

import window from "../../resources/window.png";
import AsyncSelect from "react-select/async";
import WindowProvider from "../../provider/windowProvider";
import {SingleValue} from "react-select";
import IOption from "../../provider/IOption";
import IWindow from "../../models/IWindowRequestWindow";
import WindowTypeIcon from "./WindowTypeIcon";

interface IProps {

}

interface IState {
    window?: IWindow,
    selectedColor?: IOption,
    selectedPacket?: IOption,
    selectedSectionOne?: IOption,
    selectedSectionTwo?: IOption,
    selectedSectionThree?: IOption,
    selectedSectionFour?: IOption,
    availableSections: number,
    showModal: boolean
}

export default class Calculator extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            window: this.getEmptyWindow(),
            selectedColor: undefined,
            selectedPacket: undefined,
            selectedSectionOne: undefined,
            selectedSectionFour: undefined,
            selectedSectionThree: undefined,
            selectedSectionTwo: undefined,
            availableSections: 1,
            showModal: false
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

    async getSectionTypes() {
        return await WindowProvider.getSectionTypes();
    }

    async getWindowTypes() {
        return await WindowProvider.getWindowTypes();
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

    typeSelected(e: number) {
        if (this.state.window != undefined) {
            this.setState({
                window: {
                    ...this.state.window,
                    windowType: e
                }
            })
        }
    }

    sectionSelected(e: SingleValue<IOption>, number: number) {
        const sections = [this.state.selectedSectionOne, this.state.selectedSectionTwo, this.state.selectedSectionThree, this.state.selectedSectionFour]
        sections[number] = e as IOption;

        if (this.state.window != undefined) {
            this.setState({
                window: {
                    ...this.state.window,
                    windowSections: sections.map(val => {
                        return {sectionType: Number(val?.value)}
                    })
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
                                        <WindowTypeIcon sourceImage={one}
                                                        sourceSelectedImage={oneSelected}
                                                        sectionNumber={1}
                                                        selected={this.state.window?.windowType == 1}
                                                        setSelected={() => {
                                                            this.typeSelected(1)
                                                            this.setState({availableSections: 1})
                                                        }}/>
                                        <WindowTypeIcon sourceImage={two}
                                                        sourceSelectedImage={twoSelected}
                                                        sectionNumber={2}
                                                        selected={this.state.window?.windowType == 2}
                                                        setSelected={() => {
                                                            this.typeSelected(2)
                                                            this.setState({availableSections: 2})
                                                        }}/>
                                        <WindowTypeIcon sourceImage={three}
                                                        sourceSelectedImage={threeSelected}
                                                        sectionNumber={3}
                                                        selected={this.state.window?.windowType == 3}
                                                        setSelected={() => {
                                                            this.typeSelected(3)
                                                            this.setState({availableSections: 3})
                                                        }}/>
                                        <WindowTypeIcon sourceImage={four}
                                                        sourceSelectedImage={fourSelected}
                                                        sectionNumber={4}
                                                        selected={this.state.window?.windowType == 4}
                                                        setSelected={() => {
                                                            this.typeSelected(4)
                                                            this.setState({availableSections: 4})
                                                        }}/>
                                        <WindowTypeIcon sourceImage={five}
                                                        sourceSelectedImage={fiveSelected}
                                                        sectionNumber={5}
                                                        selected={this.state.window?.windowType == 5}
                                                        setSelected={() => {
                                                            this.typeSelected(5)
                                                            this.setState({availableSections: 4})
                                                        }}/>
                                        <WindowTypeIcon sourceImage={six}
                                                        sourceSelectedImage={sixSelected}
                                                        sectionNumber={6}
                                                        selected={this.state.window?.windowType == 6}
                                                        setSelected={() => {
                                                            this.typeSelected(6)
                                                            this.setState({availableSections: 4})
                                                        }}/>
                                    </div>
                                </div>
                                <div className="Block">
                                    <h4>Створки</h4>
                                    <div className="Sections">
                                        <div className="Section">
                                            <label>1 створка</label>
                                            <AsyncSelect isMulti={false}
                                                         className="Select"
                                                         cacheOptions
                                                         defaultOptions
                                                         value={this.state.selectedSectionOne}
                                                         onChange={(e: SingleValue<IOption>) => this.sectionSelected(e, 0)}
                                                         loadOptions={this.getSectionTypes}/>
                                        </div>
                                        <div className="Section">
                                            <label>2 створка</label>
                                            <AsyncSelect isMulti={false}
                                                         className="Select"
                                                         isDisabled={this.state.availableSections < 2}
                                                         cacheOptions
                                                         defaultOptions
                                                         value={this.state.selectedSectionTwo}
                                                         onChange={(e: SingleValue<IOption>) => this.sectionSelected(e, 1)}
                                                         loadOptions={this.getSectionTypes}/>
                                        </div>
                                        <div className="Section">
                                            <label>3 створка</label>
                                            <AsyncSelect isMulti={false}
                                                         className="Select"
                                                         isDisabled={this.state.availableSections < 3}
                                                         cacheOptions
                                                         defaultOptions
                                                         value={this.state.selectedSectionThree}
                                                         onChange={(e: SingleValue<IOption>) => this.sectionSelected(e, 2)}
                                                         loadOptions={this.getSectionTypes}/>
                                        </div>
                                        <div className="Section">
                                            <label>4 створка</label>
                                            <AsyncSelect isMulti={false}
                                                         className="Select"
                                                         isDisabled={this.state.availableSections < 4}
                                                         cacheOptions
                                                         defaultOptions
                                                         value={this.state.selectedSectionFour}
                                                         onChange={(e: SingleValue<IOption>) => this.sectionSelected(e, 3)}
                                                         loadOptions={this.getSectionTypes}/>
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
                                        {/*<div className="Option">*/}
                                        {/*<label>Тип дома</label>*/}
                                        {/*<AsyncSelect isMulti={false}*/}
                                        {/*             cacheOptions*/}
                                        {/*             defaultOptions*/}
                                        {/*             value={this.state.selectedSectionTwo}*/}
                                        {/*             onChange={(e: SingleValue<IOption>) => this.sectionSelected(e, 1)}*/}
                                        {/*             loadOptions={this.getSectionTypes}/>*/}
                                        {/*</div>*/}
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
                    <div className="Calc-Button">
                        <button className="btn btn-primary" onClick={async () => {
                            await WindowProvider.createRequest();
                        }}>Получить расчет
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}