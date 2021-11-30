import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";
import "../App.css";

export default class CommentList extends Component {
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
    
    const url = "https://examine-it-back.herokuapp.com/api/showComments/"+this.state.token;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({items: data, loading: false});
  }

  
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    
    return (
      <div className='commentSection'>
        {this.state.loading ? <div>No comments</div> :
        <div className="container-fluid">
        {((this.state.userReady) && this.state.items!=null) ?
        <div>
            <h3 className="p-3 text-left">Comments:</h3>
            <table className="comment-table table-striped table-bordered">
            <thead>
                    <tr>
                        <th>Author</th>
                        <th>Description</th>
                        <th>Creation date</th>                          
                    </tr>
            </thead>
            <tbody>
                    {this.state.items.map(item => (
                        <tr key={item.id}>
                            <td>{item.creator}</td>
                            <td class="wrap">{item.desc}</td>
                            <td>{item.time}</td>
                        </tr>
                    ))}
                </tbody>
                </table>
        </div>: <div>No comments</div>}
      </div>}
      
      </div>
                  
    );
  }
}
