import React, { Component } from "react";
import UserService from "../services/user.service";
import DeviceForm from "./device-form.component";
import DeviceList from "./device-list.component";

export default class BoardDevices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }
  componentDidMount() {
    UserService.getDevicesBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>
        <div>
          <DeviceList />
          <DeviceForm />
          </div>
      </div>
    );
  }
}
