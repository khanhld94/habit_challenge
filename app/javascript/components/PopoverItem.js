import React from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import dateFns from "date-fns"

class PopoverItem extends React.Component {
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
                        : dateFns.isSameDay(this.props.day, this.props.selectedDate) ? "done" : ""
                    }`}
                id={'Popover-' + this.props.id}
                onClick={() => this.toggle(this.props.id)}
            >
                <span className="number">{this.props.formattedDate}</span>
                <span className={`${this.props.length > 0 ? "finished" : "fail"}`}><i className={`fa ${
                    this.props.length > 0 ?
                        "fa-check-circle-o"
                        : "fa-ban"
                    }`}/></span>
                <span className="bg">{this.props.formattedDate}</span>
                <Popover placement="auto" isOpen={this.state.popoverOpen} target={'Popover-' + this.props.id} toggle={this.toggle}>
                    <PopoverHeader>Content</PopoverHeader>
                    { this.props.length > 0 ?
                        <PopoverBody>
                            <p>Well Done!</p>
                            <img src="../images/1QS7o8C.jpg"/>
                        </PopoverBody>
                        : <PopoverBody>
                            <p>Failed!</p>
                            <img src="../images/un2I60i.jpg"/>
                        </PopoverBody>
                    }

                </Popover>
            </div>

        );
    }
}
export default PopoverSuccessItem