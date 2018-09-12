import React from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import dateFns from "date-fns"
import axios from "axios"
class PopoverPendingItem extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.submit = this.submit.bind(this);
        this.getChallengerDayData = this.getChallengerDayData.bind(this)
        this.state = {
            popoverOpen: false
        };
    }

    toggle() {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    }

    getChallengerDayData(id){
        this.props.getChallengerDayData(id)
    }

    submit(){
        let content = this.refs.contentBody.value
        if( content === "" ){
            alert("Input Pls!!!!")
        }
        else {
            let challengerDay = {
                status: 1,
                day: new Date(),
                challenger_id: this.props.challenger_id,
                content: content
            }
            var self = this
            axios.post("/challenger_day",{
                challenger_day: challengerDay
            }).then(function (response) {
                self.setState({
                    popoverOpen: false
                })
                self.getChallengerDayData(self.props.challenger_id)
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        }

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
                <span className="pending"><i className="fa fa-exclamation-triangle"/></span>
                <span className="bg">{this.props.formattedDate}</span>
                <Popover placement="auto" isOpen={this.state.popoverOpen} target={'Popover-' + this.props.id} toggle={this.toggle} style={{textAlign: "center"}}>
                    <PopoverHeader>{this.props.day.toISOString().substr(0,10)}</PopoverHeader>
                    <PopoverBody>
                        <div>
                            <div className="form-group">
                                <label>Today Content</label>
                                <textarea className="form-control" rows="10" ref="contentBody"/>
                            </div>
                            <button className="btn btn-primary" onClick={this.submit}>Submit</button>
                        </div>
                        <hr/>
                        <p>Hurry Up!</p>
                        <img src="../images/YNQ7Svn.jpg"/>
                    </PopoverBody>
                </Popover>
            </div>

        );
    }
}
export default PopoverPendingItem;