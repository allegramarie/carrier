import React from "react";
import {
  Header,
  Heading,
  Section,
  Article,
  Box,
  Split,
  Form,
  FormField,
  FormFields,
  Footer,
  TextInput,
  Value,
  Card,
  Button
} from "grommet";
import Sidebar from "./Sidebar";
import axios from "axios";

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      bio: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  handleSave() {
    axios
      .post("/saveProfile", {
        data: this.state,
        user: this.props.match.params.id
      })
      .then(response => {})
      .catch(err => {
        console.log(err);
      });
  }

  handleInputChange(event) {
    const target = event.target;
    // Get the name of the inputfield
    const { name, value } = target;

    // This assigns the changed value to state using the name of the changed
    // input fiel
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <Split flex="right" separator={false} fixed={false}>
        <Sidebar />
        <Box justify="center" align="start" pad="medium">
          <Form>
            <Header>
              <Heading>Edit Profile</Heading>
            </Header>
            <FormFields>
              <FormField>
                <TextInput
                  placeHolder="Name"
                  onDOMChange={e => this.handleInputChange(e)}
                  name="name"
                />
              </FormField>

              <FormField>
                <TextInput
                  placeHolder="Email"
                  onDOMChange={e => this.handleInputChange(e)}
                  name="email"
                />
              </FormField>
              <FormField>
                <TextInput
                  placeHolder="Bio"
                  onDOMChange={e => this.handleInputChange(e)}
                  name="bio"
                  size="large"
                />
              </FormField>
            </FormFields>
            <Footer pad={{ vertical: "medium" }}>
              <Button
                label="save"
                onClick={() => {
                  this.handleSave();
                }}
                path="/"
              />
            </Footer>
          </Form>
        </Box>
      </Split>
    );
  }
}

export default Edit;
