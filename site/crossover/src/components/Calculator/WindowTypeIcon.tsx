import React from "react";
import one from "../../resources/window_types/one.svg";

interface IProps {
    sourceImage: string,
    sourceSelectedImage: string,
    selected: boolean
    setSelected: Function,
    sectionNumber: number
}

interface IState {
}

export default class WindowTypeIcon extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
        }
    }

    render() {
        return (
            <>
                {!this.props.selected ?
                    (<img src={this.props.sourceImage} onClick={() => this.props.setSelected()}></img>) :
                    (<img src={this.props.sourceSelectedImage}></img>)
                }
            </>
        );
    }

}