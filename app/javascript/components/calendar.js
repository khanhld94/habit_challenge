import React from "react";
import dateFns from "date-fns"
import PopoverFailItem from "../components/PopoverFailItem"
import PopoverSuccessItem from "../components/PopoverSuccessItem"
import PopoverPendingItem from "../components/PopoverPendingItem"


class Calendar extends React.Component {
    constructor(props, context){
       super(props, context)
       this.toggle = this.toggle.bind(this)
       this.state = {
         currentMonth: new Date(),
         selectedDate: new Date(),
         renderStatus: 1,
         event: [],
       }
    }

    toggle(id){
        let button = document.getElementById("Popover-"+id)
        button.click()
    }

    renderCalendarHeader() {
        const dateFormat = "MMMM YYYY"

        return (
            <div className="header row flex-middle">
                <div className="col col-start">
                    <div className="icon" onClick={this.prevMonth}>
                        chevron_left
                    </div>
                </div>
                <div className="col col-center">
                <span>
                  {dateFns.format(this.state.currentMonth, dateFormat)}
                </span>
                </div>
                <div className="col col-end" onClick={this.nextMonth}>
                    <div className="icon">chevron_right</div>
                </div>
            </div>
        )
    }

    renderEventHeader() {
        const dateFormat = "DD MMMM YYYY"

        return (
            <div className="header row flex-middle">
                <div className="col col-start">
                    <div className="icon">
                        chevron_left
                    </div>
                </div>
                <div className="col col-center">
                <span>
                  {dateFns.format(this.state.event[0].day, dateFormat)}
                </span>
                </div>
                <div className="col col-end">
                    <div className="icon">chevron_right</div>
                </div>
            </div>
        )
    }

    renderDay() {
        const dateFormat = "dddd";
        const days = [];

        let startDate = dateFns.startOfWeek(this.state.currentMonth);

        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="col col-center" key={i}>
                    {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
                </div>
            );
        }

        return <div className="days row">{days}</div>;
    }

    filterDay(dayList, day){
        let rs = dayList.filter(function (event) {
            let tmp = new Date(event.day)
            if( tmp.getFullYear() === day.getFullYear() && tmp.getMonth() === day.getMonth() && tmp.getDate() === day.getDate()){
                return event
            }
        })
        return rs
    }

    renderDetail(){
        return(
            <div>
                <div className="col-md-9 col-sm-9">
                    <div className="container">
                        {this.state.event[0].content}
                    </div>
                </div>
                <div className="col-md-3">
                    <img src="../images/1QS7o8C.jpg"/>
                </div>
            </div>
        )
    }
    checkBetween(dayStart, day){
        if(dayStart != undefined){
            dayStart = dayStart.substring(0,10) + " 00:00:00"
        }
        let dayEnd = new Date()
        let pDayStart = new Date(dayStart)
        let pDay = new Date(day)
        return pDay.valueOf() <= dayEnd.valueOf() && pDay.valueOf() >= pDayStart.valueOf()
    }
    renderCells() {
        let { currentMonth, selectedDate } = this.state;
        let monthStart = dateFns.startOfMonth(currentMonth);
        let monthEnd = dateFns.endOfMonth(monthStart);
        let startDate = dateFns.startOfWeek(monthStart);
        let endDate = dateFns.endOfWeek(monthEnd);

        let dateFormat = "D";
        let rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = "";
        let challengerDay = this.props.challengerDay

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = dateFns.format(day, dateFormat);
                let cloneDay = day;
                let checkHabitDay = this.filterDay(challengerDay, day)
                if(this.checkBetween(this.props.challenger.start_at, day)){
                    if(dateFns.isSameDay(day, selectedDate)){
                        if(checkHabitDay.length > 0){
                            days.push(
                                <PopoverSuccessItem day={day} monthStart={monthStart} id={day.valueOf()} formattedDate={formattedDate} selectedDate={selectedDate}
                                content={checkHabitDay[0].content}/>
                            )
                        }
                        else {
                            days.push(
                                <PopoverPendingItem day={day} monthStart={monthStart} id={day.valueOf()} formattedDate={formattedDate} selectedDate={selectedDate}
                                challenger_id={this.props.challenger.id}/>
                            )
                        }
                    }
                    else {
                        if(checkHabitDay.length > 0){
                            days.push(
                                <PopoverSuccessItem day={day} monthStart={monthStart} id={day.valueOf()} formattedDate={formattedDate} selectedDate={selectedDate}
                                                    content={checkHabitDay[0].content}/>
                            )
                        }
                        else {
                            days.push(
                                <PopoverFailItem day={day} monthStart={monthStart} id={day.valueOf()} formattedDate={formattedDate} selectedDate={selectedDate}/>
                            )
                        }
                    }

                }
                else {
                    days.push(
                        <div
                            className={`col cell ${
                                !dateFns.isSameMonth(day, monthStart)
                                    ? "disabled"
                                    : dateFns.isSameDay(day, selectedDate) ? "checked" : ""
                                }`}
                            key={day}
                        >
                            <span className="number">{formattedDate}</span>
                            <span className="bg">{formattedDate}</span>
                        </div>
                    )
                }

                day = dateFns.addDays(day, 1);
            }
            rows.push(
                <div className="row" key={day}>
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="body">{rows}</div>;
    }

    onDateClick = day => {
        this.setState({
            selectedDate: day,
            renderStatus: 2,
            event: this.filterDay(this.props.challengerDay, day)
        });
    }
    nextMonth = () => {
        this.setState({
            currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
        });
    }
    prevMonth = () => {
        this.setState({
            currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
        });
    }

    render() {
        return (
            <div className="calendar">
                {this.renderCalendarHeader()}
                {this.renderDay()}
                {this.renderCells()}
            </div>
        )
    }
}

export default Calendar