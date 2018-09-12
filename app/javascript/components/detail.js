import React from "react";
import axios from "axios";
import Calendar from "../components/calendar"

class Detail extends React.Component {
    constructor() {
        super()
        this.state = {
            challenger: {},
            challengerDay: []
        }
        this.getChallengerDayData = this.getChallengerDayData.bind(this)
    }

    componentDidMount() {
        this.getChallengerDayData(this.props.match.params.id)
    }

    getChallengerDayData(cId){
        axios.get("/challenger/" + cId)
            .then((res) => {
                console.log(res)
                this.setState({
                    challenger: res.data.challenger,
                    challengerDay: res.data.challenger_day
                })
            })
            .catch((err) => console.log(err))
    }

    render() {
        return (
            <div className="container" style={{padding: 10 + "px"}}>
                <Calendar challengerDay={this.state.challengerDay}
                          challenger ={this.state.challenger}
                          getChallengerDayData={this.getChallengerDayData}/>
            </div>
        )
    }
}

export default Detail;