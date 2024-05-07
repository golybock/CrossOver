import React from "react";

interface IProps {
    startValue: number,
    onChange: Function
}

interface IState {
    value: number
}

export default class CartCounter extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            value: this.props.startValue
        }
    }

    render() {
        return (
            <div className="Counter">
                <button onClick={() => {
                    if(this.state.value>1) {
                        this.setState({value: this.state.value-1})
                        this.props.onChange(this.state.value)
                    }
                }} className="Counter-Button">-
                </button>
                <div className="Counter-Number">{this.state.value}</div>
                <button onClick={() => {
                    this.setState({value: this.state.value+1})
                    this.props.onChange(this.state.value)
                }
                } className="Counter-Button">+
                </button>
            </div>
        );
    }
}