import React from "react";
import dateFns from "date-fns"

class Calendar extends React.Component {
    state = {
        currentMonth: new Date(),
        selectedDate: new Date()
    }

    renderHeader() {
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
        console.log("rs : " + rs)
        return rs
    }

    renderCells() {
        const { currentMonth, selectedDate } = this.state;
        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart);
        const endDate = dateFns.endOfWeek(monthEnd);

        const dateFormat = "D";
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = "";
        let challengerDay = this.props.challengerDay

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = dateFns.format(day, dateFormat);
                let cloneDay = day;
                let checkHabitDay = this.filterDay(challengerDay, day)
                if(checkHabitDay.length > 0){
                    days.push(
                        <div
                            className={`col cell ${
                                !dateFns.isSameMonth(day, monthStart)
                                    ? "disabled"
                                    : dateFns.isSameDay(day, selectedDate) ? "done" : ""
                                }`}
                            key={day}
                            onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
                        >
                            <span className="number">{formattedDate}</span>
                            <span className={`${checkHabitDay[0].content.length > 0 ? "finished" : "fail"}`}><i className={`fa ${
                                    checkHabitDay[0].content.length > 0 ?
                                    "fa-check-circle-o"
                                    : "fa-ban"
                                }`}/></span>
                            <span className="bg">{formattedDate}</span>
                        </div>
                    );
                }
                else {
                    days.push(
                        <div
                            className={`col cell ${
                                !dateFns.isSameMonth(day, monthStart)
                                    ? "disabled"
                                    : dateFns.isSameDay(day, selectedDate) ? "done" : ""
                                }`}
                            key={day}
                            onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
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
            selectedDate: day
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
                {this.renderHeader()}
                {this.renderDay()}
                {this.renderCells()}
            </div>
        )
    }
}

export default Calendar