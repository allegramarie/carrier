import Dropzone from "react-dropzone";
import React from "react";
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
      axios
        .post("/drop", {
          data: reader.result,
          campaign: that.props.campaign
        })
        .then(response => {
          that.props.dispatch(getContacts(that.props.campaign));
        })
        .catch(err => {
          console.log(err);
        });
    };
    reader.readAsText(files[0]);
  }
  render() {
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
