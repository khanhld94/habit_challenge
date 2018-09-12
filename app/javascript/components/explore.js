import React from "react";

class Explore extends React.Component {
    render() {
        return (
            <div className="container">
                <h4 className="explore-title">Let's try</h4>
                <div className="container card-list">
                    <div className="card blue">
                        <div className="title">Do exercise</div><span className="glyphicon glyphicon-upload"></span>
                        <div className="value">100 days</div>
                        <div className="stat"><b>90</b>% pass</div>
                    </div>
                    <div className="card green">
                        <div className="title">Readbook</div><span className="glyphicon glyphicon-upload"></span>
                        <div className="value">52 weeks</div>
                        <div className="stat"><b>6</b>% pass</div>
                    </div>
                    <div className="card orange">
                        <div className="title">Learn Japanese</div><span className="glyphicon glyphicon-download"></span>
                        <div className="value">365 days</div>
                        <div className="stat"><b>13</b>% pass</div>
                    </div>
                    <div className="card red">
                        <div className="title">No Fap</div><span className="glyphicon glyphicon-download"></span>
                        <div className="value">90 days</div>
                        <div className="stat"><b>0</b>% pass</div>
                    </div>
                </div>
                <div className="container card-list">
                    <div className="card blue">
                        <div className="title">Do exercise</div><span className="glyphicon glyphicon-upload"></span>
                        <div className="value">100 days</div>
                        <div className="stat"><b>90</b>% pass</div>
                    </div>
                    <div className="card green">
                        <div className="title">Readbook</div><span className="glyphicon glyphicon-upload"></span>
                        <div className="value">52 weeks</div>
                        <div className="stat"><b>6</b>% pass</div>
                    </div>
                    <div className="card orange">
                        <div className="title">Learn Japanese</div><span className="glyphicon glyphicon-download"></span>
                        <div className="value">365 days</div>
                        <div className="stat"><b>13</b>% pass</div>
                    </div>
                    <div className="card red">
                        <div className="title">No Fap</div><span className="glyphicon glyphicon-download"></span>
                        <div className="value">90 days</div>
                        <div className="stat"><b>0</b>% pass</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Explore;