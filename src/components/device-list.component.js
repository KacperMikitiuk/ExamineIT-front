import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";

export default class DeviceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
      loading: true
    };
  }

  async componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true });
    
    const url = "https://examine-it-back.herokuapp.com/api/showList/"+currentUser.username;
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
        {(this.state.userReady) ?
        <div className="container">
            <h3 className="p-3 text-center">List of devices:</h3>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Token</th>
                        <th>Time zone</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.items.map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.token}</td>
                            <td>{item.timeZone}</td>
                            <td><a href={'/device/'+item.token}>Check</a></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>: null}
      </div>}
      
      </div>
                  
    );
  }
}
