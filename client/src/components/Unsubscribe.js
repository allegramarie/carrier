import React, { Component } from "react";
import {
  Box,
  Article,
  Section,
  Header,
  Heading,
  Form,
  Paragraph
} from "grommet";
import axios from "axios";
import { connect } from "react-redux";

class Unsubscribe extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.unsubscribe = this.unsubscribe.bind(this);
  }

  componentDidMount() {
    this.unsubscribe(this.props.match.params.id);
  }

  unsubscribe(id) {
    axios
      .post(`/unsubscribe/${id}`)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <Box justify="center" align="start" pad="medium">
        <Article ref="content" pad="none" style={{ marginLeft: "2%" }}>
          <Section key="utilization" pad="medium" full="horizontal">
            <Header>
              <Heading tag="h2">Unsubscribe Successful</Heading>
            </Header>
            <Paragraph size="large">
              We have received your request to unsubscribe. We'll miss you.
            </Paragraph>
          </Section>
        </Article>
      </Box>
    );
  }
}

const mapStateToProps = state => {
  return {
    contacts: state.contacts
  };
};

export default connect(mapStateToProps)(Unsubscribe);
