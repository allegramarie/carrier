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
import Tiles from "grommet/components/Tiles";
import Tile from "grommet/components/Tile";
import axios from "axios";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      bio: ""
    };
    this.getUserProfile = this.getUserProfile.bind(this);
  }
  componentDidMount() {
    this.getUserProfile();
  }

  getUserProfile() {
    // console.log('here')
    axios
      .get("/getProfile", {
        params: {
          userID: this.props.match.params.id
        }
      })
      .then(response => {
        // console.log(response)
        this.setState({
          email: response.data.email,
          name: response.data.name,
          bio: response.data.bio
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    console.log("This runs when profile is rendered");
    console.log(this.props);
    return (
      <div>
        <Box
          direction="row"
          justify="start"
          align="center"
          wrap={true}
          pad="medium"
          margin="small"
          colorIndex="light-1"
        >
          <Value value={`Name: ${this.state.name}`} />
        </Box>
        <Box
          direction="row"
          justify="start"
          align="center"
          wrap={true}
          pad="medium"
          margin="small"
          colorIndex="light-1"
        >
          <Value value={`Email: ${this.state.email}`} />
        </Box>
        <Box
          direction="row"
          justify="start"
          align="center"
          wrap={true}
          pad="medium"
          margin="small"
          colorIndex="light-1"
        >
          <Value value={`Bio: ${this.state.bio}`} />
        </Box>
        <Button label="Edit" path={`/edit/${this.props.match.params.id}`} />
      </div>
    );
  }
}

export default Profile;
