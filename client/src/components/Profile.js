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
import Image from "grommet/components/Image";
import icon from "./user-128.png";

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

    return (
      <div>
        <Image src={icon} size="small" onClick={console.log("click")} />
        <Box
          direction="row"
          justify="start"
          align="center"
          wrap={false}
          colorIndex="light-1"
          size="full"
        >
          <Value
            style={{ fontSize: "10px" }}
            value={`Name: ${this.state.name}`}
          />
        </Box>
        <Box
          direction="row"
          justify="start"
          align="center"
          wrap={false}
          colorIndex="light-1"
        >
          <Value value={`Email: ${this.state.email}`} />
        </Box>
        <Box
          direction="row"
          justify="start"
          align="center"
          wrap={false}
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
