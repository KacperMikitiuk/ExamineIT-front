import React from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import CommentService from "../services/comment.service";
import { Component } from 'react';

import AuthService from "../services/auth.service";

const vdesc = value => {
    if (value.length < 2) {
        return (
            <div className="alert alert-danger" role="alert">
                The description must be more than 2.
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

export default class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.onChangeDesc = this.onChangeDesc.bind(this);
        this.handleRegister = this.handleRegister.bind(this);

        this.state = {
            token: props.token,
            desc: "",
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
          CommentService.addComment(
            this.state.desc,
            this.state.currentUser.username,
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

    onChangeDesc(e) {
        this.setState({
            desc: e.target.value
        });
    }

    render() {
        var HandleChange = e => {
            this.setState({ divcontainer: !this.state.divcontainer })
        }
        const show = this.state.divcontainer;
        return (
            <div>
                <button onClick={HandleChange} className="btn btn-success">Add a comment</button>
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
                                        <label htmlFor="text">Enter a comment</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="desc"
                                            value={this.state.desc}
                                            onChange={this.onChangeDesc}
                                            validations={[required, vdesc]}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn-primary">Add</button>
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
