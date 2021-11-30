import React from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import DeviceService from '../services/device.service';
import { Component } from 'react';

import AuthService from "../services/auth.service";

const vdesc = value => {
    if (value.length < 2) {
        return (
            <div className="alert alert-danger" role="alert">
                The description must be more than 3.
            </div>
        );
    }
};

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

export default class ShareForm extends Component {

    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.handleRegister = this.handleRegister.bind(this);

        this.state = {
            token: props.token,
            name: "",
            currentUser: { username: "" },
            successful: false,
            message: "",
            divcontainer: false
        };
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
    
        if (!currentUser) this.setState({ redirect: "/home" });
        this.setState({ currentUser: currentUser, userReady: true })
      }
      
    handleRegister(e) {
        e.preventDefault();
    
        this.setState({
          message: "",
          successful: false
        });
    
        if (this.checkBtn.context._errors.length === 0) {
          DeviceService.addUserPermitted(
            this.state.name,
            this.state.token
          ).then(
            response => {
              this.setState({
                message: response.data.message,
                successful: true
              });
              window.location.reload();
            },
            error => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
    
              this.setState({
                successful: false,
                message: resMessage
              });
            }
          );
        }
      }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    render() {
        var HandleChange = e => {
            this.setState({ divcontainer: !this.state.divcontainer })
        }
        const show = this.state.divcontainer;
        return (
            <div>
                <button onClick={HandleChange} className="btn btn-success">Share</button>
                {
                    show &&
                    <div>
                        <Form
                        onSubmit={this.handleRegister}
                            ref={c => {
                                this.form = c;
                            }}>
                            {!this.state.successful && (
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="text">Enter a username</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={this.state.name}
                                            onChange={this.onChangeName}
                                            validations={[required, vdesc]}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn-primary">Permit</button>
                                    </div>

                                </div>
                            )}

                            {this.state.message && (
                                <div className="form-group">
                                    <div
                                        className={
                                            this.state.successful
                                                ? "alert alert-success"
                                                : "alert alert-danger"
                                        }
                                        role="alert"
                                    >
                                        {this.state.message}
                                    </div>
                                </div>
                            )}
                            <CheckButton
                                style={{ display: "none" }}
                                ref={c => {
                                    this.checkBtn = c;
                                }}
                            />
                        </Form>
                    </div>
                }
            </div>
        )
    }
}
