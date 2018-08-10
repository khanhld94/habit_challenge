import React from "react"
import PropTypes from "prop-types"
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'


class Main extends React.Component {

    getCSRFToken() {
        var metas = document.getElementsByTagName('meta');

        for (var i=0; i<metas.length; i++) {
            if (metas[i].getAttribute("name") == "csrf-token") {
                console.log(metas[i].getAttribute("content"));
                return metas[i].getAttribute("content");
            }
        }

        return "";

    }

  logOut() {
     fetch(this.props.logoutUrl, { method: 'delete', headers: {
             'Content-Type': 'application/json',
             'X-CSRF-Token': this.getCSRFToken()
         }})
         .then(
             (res) => {
                 console.log(res.ok)
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
                                <h4 className="media-heading">Khanh</h4>
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
                        <Link to="/" className="active"><i className="fa fa-home" aria-hidden="true"/></Link>
                        <Link to="/explore"><i className="fa fa-paper-plane" aria-hidden="true"/></Link>
                        <Link to="/profile"><i className="fa fa-users" aria-hidden="true"/></Link>
                        <a href="#" onClick={this.logOut.bind(this)}><i className="fa fa-sign-out" aria-hidden="true"/></a>
                    </div>
                </div>
            </div>
        </Router>
    );
  }
}
class Index extends React.Component{
    render(){
        return(
            <div className="container">
                <span className="toggler" data-toggle="list"><span className="entypo-list"/></span>
                <ul className="surveys list">
                    <li className="survey-item">
                     <span className="survey-country list-only">
                     UK
                     </span>
                        <span className="survey-name">
                     UK Beer May 2014
                     </span>
                        <span className="survey-country grid-only">
                     UK
                     </span>
                        <div className="pull-right">
                        <span className="survey-progress">
                        <span className="survey-progress-bg">
                        <span className="survey-progress-fg" style = {{width: 88 + '%'}}/>
                        </span>
                        <span className="survey-progress-labels">
                        <span className="survey-progress-label">
                        88%
                        </span>
                        <span className="survey-completes">
                        490 / 500
                        </span>
                        </span>
                        </span>
                            <span className="survey-end-date ended">
                        2014 - May 10
                        </span>
                            <span className="survey-stage">
                        <span className="stage draft">Draft</span>
                        <span className="stage awarded">Awarded</span>
                        <span className="stage live">Live</span>
                        <span className="stage ended active">Ended</span>
                        </span>
                        </div>
                    </li>
                    <li className="survey-item">
                     <span className="survey-country list-only">
                     UK
                     </span>
                        <span className="survey-name">
                     UK Beer May 2014
                     </span>
                        <span className="survey-country grid-only">
                     UK
                     </span>
                        <div className="pull-right">
                        <span className="survey-progress">
                        <span className="survey-progress-bg">
                        <span className="survey-progress-fg" style={{width: 88 + '%'}}/>
                        </span>
                        <span className="survey-progress-labels">
                        <span className="survey-progress-label">
                        88%
                        </span>
                        <span className="survey-completes">
                        490 / 500
                        </span>
                        </span>
                        </span>
                            <span className="survey-end-date ended">
                        2014 - May 10
                        </span>
                            <span className="survey-stage">
                        <span className="stage draft">Draft</span>
                        <span className="stage awarded">Awarded</span>
                        <span className="stage live">Live</span>
                        <span className="stage ended active">Ended</span>
                        </span>
                        </div>
                    </li>
                    <li className="survey-item">
                     <span className="survey-country list-only">
                     UK
                     </span>
                        <span className="survey-name">
                     UK Beer May 2014
                     </span>
                        <span className="survey-country grid-only">
                     UK
                     </span>
                        <div className="pull-right">
                        <span className="survey-progress">
                        <span className="survey-progress-bg">
                        <span className="survey-progress-fg" style={{width: 88 + '%'}} />
                        </span>
                        <span className="survey-progress-labels">
                        <span className="survey-progress-label">
                        88%
                        </span>
                        <span className="survey-completes">
                        490 / 500
                        </span>
                        </span>
                        </span>
                            <span className="survey-end-date ended">
                        2014 - May 10
                        </span>
                            <span className="survey-stage">
                        <span className="stage draft">Draft</span>
                        <span className="stage awarded">Awarded</span>
                        <span className="stage live">Live</span>
                        <span className="stage ended active">Ended</span>
                        </span>
                        </div>
                    </li>
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
