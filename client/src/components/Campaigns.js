import React, { Component } from "react";
import { Link } from "react-router-dom";

class Campaigns extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleBack = this.handleBack.bind(this);
  }
  // handleBack(){
  //   // console.log(this.props.router,'router')
  //   this.props.router.goBack()
  // }

  render() {
    // console.log('here campaigns',this.props.router)
    return (
      <div>
        <div className="navigationButtonsLeft">
          <Link to="/">Back</Link>
        </div>
        <div />
        <div />
      </div>
    );
  }
}

export default Campaigns;
