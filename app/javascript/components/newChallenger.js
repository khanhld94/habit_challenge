import React from "react";
import axios from "axios"
import {BrowserRouter as Redirect} from 'react-router-dom'

class NewChallenger extends React.Component {

    constructor(props){
        super(props)
        this.redirect = this.redirect.bind(this)
    }

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

    redirect(){
        this.props.redirect()
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
            var self = this
            axios.post("/challenger", {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': this.getCSRFToken()
                },
                challenger: challenger
            })
            .then(function (response) {
                self.redirect()
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

export default NewChallenger;