import Dropzone from "react-dropzone";
import React from "react";
import ReactFileReader from "react-file-reader";
import axios from "axios";
import { getContacts } from "../actions";
import { connect } from "react-redux";

class Drop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.drop = this.drop.bind(this);
  }

  drop(files) {
    var reader = new FileReader();
    let that = this;
    reader.onload = function(e) {
      // this.setState({
      //   file: 'hey'
      // })
      // console.log(reader.result)
      // console.log(that.props)
      // console.log(this.state)
      // this.props.dispatch(
      //   dragDrop(
      //     reader.result,
      //     this.props.match.params.id
      //   )
      // );
      axios
        .post("/drop", {
          data: reader.result,
          campaign: that.props.campaign
        })
        .then(response => {
          //    if (response.data.name === "error") {
          // alert("duplicate email");
          // else{
          // }
          // console.log("after drop");
          that.props.dispatch(getContacts(that.props.campaign));
        })
        .catch(err => {
          console.log(err);
        });
    };
    reader.readAsText(files[0]);
    // console.log('heeh')
  }
  render() {
    // console.log(this.props, "here");
    return (
      <div>
        <section>
          <div className="dropzone">
            <Dropzone accept="text/csv, text/plain" onDrop={this.drop}>
              <p>
                Try dropping some files here, or click to select files to
                upload.
              </p>
              <p>Only *.txt and *.csv images will be accepted</p>
            </Dropzone>
          </div>
          <aside />
        </section>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    contact: state.contact
  };
}

export default connect(mapStateToProps)(Drop);
