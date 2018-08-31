import React from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import dateFns from "date-fns"

class PopoverFailItem extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            popoverOpen: false
        };
    }

    toggle() {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    }

    render() {
        return (
            <div
                className={`col cell ${
                    !dateFns.isSameMonth(this.props.day, this.props.monthStart)
                        ? "disabled"
                        : dateFns.isSameDay(this.props.day, this.props.selectedDate) ? "checked" : ""
                    }`}
                id={'Popover-' + this.props.id}
                onClick={() => this.toggle(this.props.id)}>
                <span className="number">{this.props.formattedDate}</span>
                <span className="fail"><i className="fa fa-ban"/></span>
                <span className="bg">{this.props.formattedDate}</span>
                <Popover placement="auto" isOpen={this.state.popoverOpen} target={'Popover-' + this.props.id} toggle={this.toggle}>
                    <PopoverHeader>{this.props.day.toISOString().substr(0,10)}</PopoverHeader>
                    <PopoverBody>
                        <p>Failed!</p>
                        <img src="../images/un2I60i.jpg"/>
                    </PopoverBody>
                </Popover>
            </div>

        );
    }
}
export default PopoverFailItem;