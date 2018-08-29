import React from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import dateFns from "date-fns"

class PopoverSuccessItem extends React.Component {
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
                onClick={() => this.toggle(this.props.id)}
            >
                <span className="number">{this.props.formattedDate}</span>
                <span className="finished"><i className="fa fa-check-circle-o"/></span>
                <span className="bg">{this.props.formattedDate}</span>
                <Popover placement="auto" isOpen={this.state.popoverOpen} target={'Popover-' + this.props.id} toggle={this.toggle}>
                    <PopoverHeader>Content</PopoverHeader>
                    <PopoverBody>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        <hr/>
                        <img src="../images/1QS7o8C.jpg"/>
                    </PopoverBody>
                </Popover>
            </div>

        );
    }
}
export default PopoverSuccessItem;