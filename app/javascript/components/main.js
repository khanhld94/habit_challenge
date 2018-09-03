import React from "react"
import PropTypes from "prop-types"
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import axios from "axios"
import Calendar from "../components/calendar"

class Main extends React.Component {

    getCSRFToken() {
        var metas = document.getElementsByTagName('meta');

        for (var i = 0; i < metas.length; i++) {
            if (metas[i].getAttribute("name") == "csrf-token") {
                return metas[i].getAttribute("content");
            }
        }

        return "";

    }

    logOut() {
        fetch("/users/sign_out", {
            method: 'delete', headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': this.getCSRFToken()
            }
        })
            .then(
                (res) => {
                    window.location.href = "/"
                }
            )
            .catch((error) => error.message)
    }

    render() {
        return (
            <Router>
                <div className="box box-shadow">
                    <div className="profile">
                        <div className="user">
                            <div className="media">
                                <div className="media-left">
                                    <img src="https://www.geek.com/wp-content/uploads/2017/07/saitama-625x352.png"
                                         className="media-object face" style={{width: 82 + 'px'}}/>
                                    <span className="idle"/>
                                </div>
                                <div className="media-body">
                                    <h4 className="media-heading">{this.props.user_email}</h4>
                                    <p>LDK</p>
                                </div>
                            </div>
                        </div>
                        <Route exact path="/" component={Index}/>
                        <Route path="/new" render={() => (<Profile user_id={this.props.user_id}/>)}/>
                        <Route path="/explore" component={Explore}/>
                        <Route path="/detail/:id" component={Detail}/>
                    </div>
                    <div className="menu-box">
                        <div className="icon-bar">
                            <NavLink to="/"><i className="fa fa-home" aria-hidden="true"/></NavLink>
                            <NavLink to="/new"><i className="fa fa-plus-square-o" aria-hidden="true"/></NavLink>
                            <NavLink to="/explore"><i className="fa fa-paper-plane" aria-hidden="true"/></NavLink>
                            <NavLink to="" onClick={this.logOut.bind(this)}><i className="fa fa-sign-out"
                                                                               aria-hidden="true"/></NavLink>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

class NavLink extends React.Component {
    render() {
        var isActive = this.context.router.route.location.pathname === this.props.to;
        var className = isActive ? 'active' : '';
        return (
            <Link className={className} {...this.props}>
                {this.props.children}
            </Link>
        )
    }
}

NavLink.contextTypes = {
    router: PropTypes.object
};

class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            challengers: []
        }

    }

    componentWillMount() {
        axios.get("/challenger", {
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                console.log(res)
                this.setState({challengers: res.data});
            })
    }

    render() {
        let challenger_list = this.state.challengers.map((item) => {
            let successDays = item.challengerDay.length
            item = item.challenger
            return (
                <li className="survey-item" key={item.id}>
                     <span className="survey-country list-only">
                       <i className="fa fa-tasks"/>
                     </span>
                    <span className="survey-name">
                        <Link to={"/detail/" + item.id}>{item.name}</Link>
                     </span>
                    <span className="survey-country grid-only">
                     UK
                     </span>
                    <div className="pull-right">
                        <span className="survey-progress">
                        <span className="survey-progress-bg">
                        <span className="survey-progress-fg"
                              style={{width: Math.round(successDays * 100 / item.length) + '%'}}/>
                        </span>
                        <span className="survey-progress-labels">
                        <span className="survey-progress-label">
                            {Math.round(successDays * 100 / item.length)}%
                        </span>
                        <span className="survey-completes">
                            {successDays} / {item.length}
                        </span>
                        </span>
                        </span>
                        <span className="survey-end-date ended">
                            {item.start_at.substr(0, 10)}
                        </span>
                        <span className="survey-stage">
                        <span className="stage draft">Draft</span>
                        <span className="stage awarded">Awarded</span>
                        <span className="stage live">Live</span>
                        <span className="stage ended active">Ended</span>
                        </span>
                    </div>
                </li>
            )
        })
        return (
            <div className="container">
                <span className="toggler" data-toggle="list"><span className="entypo-list"/></span>
                <ul className="surveys list">
                    {challenger_list}
                </ul>
            </div>
        )
    }
}

class Profile extends React.Component {

    getCSRFToken() {
        var metas = document.getElementsByTagName('meta');

        for (var i = 0; i < metas.length; i++) {
            if (metas[i].getAttribute("name") == "csrf-token") {
                return metas[i].getAttribute("content");
            }
        }

        return "";

    }

    addNewItem(item) {
        this.props.addNewItem(item);
    }

    submit() {
        let name = this.refs.name.value;
        let length = this.refs.length.value;
        let time = new Date();
        let start_at = time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate() + " "
            + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()
        let user_id = this.props.user_id;
        let challenger = {
            name: name,
            length: length,
            user_id: user_id,
            start_at: start_at,
            status: 0,
            longest: 0
        }
        if (name === "") {
            alert("Please fill name field");
        }
        else if (length === "") {
            alert("Please fill the length field");
        }
        else {
            axios.post("/challenger", {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': this.getCSRFToken()
                },
                challenger: challenger
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    }

    render() {
        return (
            <div id="create_form">
                <h4 className="create-form-label">Create new challenger</h4>
                <div className="inline-picture">
                    <img className="gif-img" src="../images/batman.gif"/>
                </div>
                <div className="inline-form">
                    <form name="createForm">
                        <div className="form-group">
                            <label>Name: </label>
                            <input type="text" placeholder="Enter Name" name="name" className="form-control" ref="name"/>
                        </div>
                        <div className="form-group">
                            <label>Length: </label>
                            <input className="form-control" name="length" placeholder="Enter length (days) of challenger" ref="length"/>
                        </div>
                        <a className="btn btn-primary" onClick={this.submit.bind(this)}>Submit</a>
                    </form>
                </div>
                <div className="inline-picture">
                    <img className="gif-img" src="../images/brother.gif"/>
                </div>
            </div>
        )
    }
}

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

export default Main