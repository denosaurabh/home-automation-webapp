/* eslint-disable react/destructuring-assignment */

import React from "react";
import "./App.scss";

import Header from "./components/header/header.component";
import MessageBox from "./components/messagebox/messagebox.xomponent";
import HomeControlBtnBox from "./components/control-btn-box/control-btn-box.component";
import USdistance from './components/USDistance/usdistance.component';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      status: "disconnected",
      statusColor: "red",
      allMessages: ['Hello, welcome to the app where you can control your Home 🏡'],
      distance: 26.5
    };
    this.getConnectionStatus = this.getConnectionStatus.bind(this);
    this.getMessagefromMqtt = this.getMessagefromMqtt.bind(this);
    this.getDistance = this.getDistance.bind(this);
  }

  getConnectionStatus(status) {
    this.setState({ status });

    if (status === "disconnected") {
      this.setState({ statusColor: "red" });
    } else if (status === "UnAuthenticated") {
      this.setState({ statusColor: "grey" });
    } else if (status === "connected") {
      this.setState({ statusColor: "lightgreen" });
    }
  }
  
  getDistance(distance) {
    this.setState({distance})
  }
  
  getMessagefromMqtt(message) {
    this.setState(prevState => prevState.allMessages.push(message))
  } 

  render() {
    return (
      <div className="App">
        <Header />
        <h1 className="status-heading">
          Status:
          <span style={{ color: this.state.statusColor }}>
            {this.state.status}
          </span>
        </h1>
        <MessageBox allmessages={this.state.allMessages} />
        <HomeControlBtnBox
          getStatus={this.getConnectionStatus}
          getMessage={this.getMessagefromMqtt}
          getUSdistance={this.getDistance}
        />
      </div>
    );
  }
}

export default App;
