import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";
import ShareForm from "./share-form.component";
import "../App.css";

export default class UsersPermitted extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: props.token,
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
    this.setState({ currentUser: currentUser, userReady: true });
    
    const url = "https://examine-it-back.herokuapp.com/api/showUsersPermitted/"+this.state.token;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({items: data, loading: false});
  }

  
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    
    return (
      <div>
        {this.state.loading ? <div>loading....</div> :
        <div className="container">
        {((this.state.userReady) && this.state.items!=null) ?
        <div id="shortlist" className="container">
            <h3 className="p-3">Content shared with:</h3>
            <table className="table table-striped table-bordered">
            <thead>
                    <tr>
                        <th>Username</th>                          
                    </tr>
            </thead>
            <tbody>
                    {this.state.items.map(item => (
                        <tr key={item.id}>
                          <td>{item}</td>
                        </tr>
                    ))}
                </tbody>
                </table>
                
          <ShareForm token={this.state.token}/>
        </div>: <div>No comments</div>}
      </div>}
      
      </div>
                  
    );
  }
}
