import React, { Component } from "react";
import { Header } from "grommet";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Navbar />
        <Sidebar />
      </div>
    );
  }
}

export default Dashboard;
