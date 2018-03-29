import React from "react";
import {
  Header,
  Heading,
  Section,
  Article,
  Box,
  Form,
  FormField,
  TextInput,
  Value,
  Card,
  Button
} from "grommet";
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
    console.log("save");
    axios
      .post("/saveProfile", {
        data: this.state,
        user: this.props.match.params.id
      })
      .then(response => {
        // console.log(response)
      })
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
    console.log(this.state);
    return (
      <div>
        <div style={{ fontSize: "30px" }}>Edit Profile</div>
        <div>
          <Form>
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
          </Form>

          <Button
            label="save"
            onClick={() => {
              this.handleSave();
            }}
            path="/"
          />
        </div>
      </div>
    );
  }
}
export default Edit;
