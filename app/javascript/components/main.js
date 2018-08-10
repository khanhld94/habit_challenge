import React from "react"
import PropTypes from "prop-types"
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'


class Main extends React.Component {

    getCSRFToken() {
        var metas = document.getElementsByTagName('meta');

        for (var i=0; i<metas.length; i++) {
            if (metas[i].getAttribute("name") == "csrf-token") {
                return metas[i].getAttribute("content");
            }
        }

        return "";

    }

  logOut() {
     fetch("/users/sign_out", { method: 'delete', headers: {
             'Content-Type': 'application/json',
             'X-CSRF-Token': this.getCSRFToken()
         }})
         .then(
             (res) => {
                 window.location.href = "/"
             }
         )
         .catch((error) => error.message)
  }
  render () {
    return (
        <Router>
            <div className="box box-shadow">
                <div className="profile">
                    <div className="user">
                        <div className="media">
                            <div className="media-left">
                                <img src="https://www.geek.com/wp-content/uploads/2017/07/saitama-625x352.png" className="media-object face" style={{ width: 82 + 'px' }}/>
                                <span className="idle"/>
                            </div>
                            <div className="media-body">
                                <h4 className="media-heading">{this.props.user_email}</h4>
                                <p>LDK</p>
                            </div>
                        </div>
                    </div>
                    <Route exact path="/" component={Index}/>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/explore" component={Explore}/>
                </div>
                <div className="menu-box">
                    <div className="icon-bar">
                        <NavLink to="/"><i className="fa fa-home" aria-hidden="true"/></NavLink>
                        <NavLink to="/explore"><i className="fa fa-paper-plane" aria-hidden="true"/></NavLink>
                        <NavLink to="/profile"><i className="fa fa-users" aria-hidden="true"/></NavLink>
                        <NavLink to="" onClick={this.logOut.bind(this)}><i className="fa fa-sign-out" aria-hidden="true"/></NavLink>
                    </div>
                </div>
            </div>
        </Router>
    );
  }
}
class NavLink extends React.Component{
    render() {
        var isActive = this.context.router.route.location.pathname === this.props.to;
        var className = isActive ? 'active' : '';
        return(
            <Link className={className} {...this.props}>
                {this.props.children}
            </Link>
        )
    }
}

NavLink.contextTypes = {
    router: PropTypes.object
};

class Index extends React.Component{
    constructor(props){
        super(props)
        this.state={
            challengers: []
        }

    }
    componentDidMount(){
        fetch("/challenger", {method: "GET", headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json'
            }}).then(response => { return response.json();})
            .then(data => {this.setState({challengers : data});})
    }
    render(){
        let challenger_list = this.state.challengers.map((item) => {
            return(
                <li className="survey-item" key={item.id}>
                     <span className="survey-country list-only">
                       <i className="fa fa-tasks"/>
                     </span>
                    <span className="survey-name">
                        {item.name}
                     </span>
                    <span className="survey-country grid-only">
                     UK
                     </span>
                    <div className="pull-right">
                        <span className="survey-progress">
                        <span className="survey-progress-bg">
                        <span className="survey-progress-fg" style = {{width: Math.round(item.longest*100/item.length) + '%'}}/>
                        </span>
                        <span className="survey-progress-labels">
                        <span className="survey-progress-label">
                            {Math.round(item.longest*100 / item.length) }%
                        </span>
                        <span className="survey-completes">
                            {item.longest} / {item.length}
                        </span>
                        </span>
                        </span>
                        <span className="survey-end-date ended">
                            {item.start_at.substr(0,10)}
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
        return(
            <div className="container">
                <span className="toggler" data-toggle="list"><span className="entypo-list"/></span>
                <ul className="surveys list">
                    {challenger_list}
                </ul>
            </div>
        )
    }
}

class Profile extends React.Component{
    render(){
        return(
            <div>
                <p>Hello This is my profile</p>
            </div>
        )
    }
}
class Explore extends React.Component{
    render(){
        return(
            <div>
                <p>This is explore tab</p>
            </div>
        )
    }
}
export default Main