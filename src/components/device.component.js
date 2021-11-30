import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";
import Chart from "./chart.component";
import Table from "../components/table.component";
import CommentForm from "./comment-form.component";
import CommentList from "./comment-list.component";
import UsersPermitted from "./users-permitted-list.component";

export default class Device extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: props.match.params.token,
      items: [],
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
      loading: true,
      person: null
    };
  }

async componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
      let url = "https://examine-it-back.herokuapp.com/api/device/" + this.state.token;
      let response = await fetch(url);
      let data = await response.json();
      this.setState({items: data, loading: false});
    ;
}

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    return (
      <div>
        {this.state.loading ? <div>loading....</div>:
        <div>
        {((this.state.userReady) && this.state.items.data!=null) ?
        <div>
          <UsersPermitted token={this.state.token}/>
            <h3 className="p-3 text-center">DATA</h3>
            <Table items={this.state.items} />
            <Chart chartData={this.state.items.data} />
            <CommentForm token={this.state.token}/>
            <CommentList token={this.state.token}/>
        </div>: <div>There is no data here. Please go to User board to check how to upload data.</div>}
      </div>}
      </div>
    );
  }
}


