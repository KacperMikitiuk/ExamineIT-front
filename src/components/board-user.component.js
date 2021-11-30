import React, { Component } from "react";

import UserService from "../services/user.service";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getUserBoard().then(
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
          <h2>{this.state.content}</h2>
        </header>
        <p class="text-justify">
        <h3 lineHeight='30'>How to create a new device?</h3>
        <h7>To get start with ExamineIT you need to go to DEVICE tab. You will find there a button <b>Add new device</b>.
        You need to set a title for your device and press <b>Add</b>. After that on the List of devices will appear created device with
        automatically generated token.
        </h7>
        <h3>How to add data to your device?</h3>
        Data can be added only with HTTP protocols. To add data from your device to platform you need to use this url: 
        <b> <ul><li>https://examine-it-back.herokuapp.com/api/addData/(token)/(data) ,</li> </ul></b> where token is can be taken from List of devices and example of data looks like
        "(token)/x=1,y=2,z=3 ". You can add up to 5 variables to one device in ExamineIT. Please notice that if you start with sending one variable, 
        you need to always send one variable to the same device. Similar if you send 5 variables, you always have to send 5 variables. Variables can be described with:
        [x, y, z, a, b] . It is recommended that after sending first data, put in a comment descrption of it.
        
        <h3>How to check data from your device?</h3>
        <h7>Data can be displayed by clicking <b>Check</b> button from List of devices. You can find there users who can access this device,
        table with corresponding data, as well as chart and comments put by users.
        </h7>
        <h3>How to add a comment to your device?</h3>
        <h7>To add a comment to your device go to List of device and click on the <b>Check</b> button. At the bottom of a page there is
        a comment section. Click on a <b>Add a comment</b> button to add a new comment.
        </h7>
        <h3>How to share your device with other users?</h3>
        <h7>To share your device go to List of devices and check choosed device. Click on a button <b>Share</b> and put a username
        of the user who you want to grant an access.
        </h7>
        <h3>How to export data from table?</h3>
        <h7>To share your device go to List of devices and check choosed device. Under the table you will find <b>Export</b> button which 
        allows you to export a data from table to Excel sheet. Export button allows exporting up to 100 rows (choosed inside a table).
        </h7>
        </p>
      </div>
    );
  }
}
