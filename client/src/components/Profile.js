import React from "react";
import { Header, Heading, Section, Article, Box } from "grommet";

const Profile = () => {
  console.log("This runs when profile is rendered");
  return (
    <Box justify="center" align="start" pad="medium">
      <Article pad="none">
        <Section key="utilization" pad="medium" full="horizontal">
          <Header justify="between">
            <Heading tag="h2" margin="none">
              Profile
            </Heading>
          </Header>
        </Section>
      </Article>
    </Box>
  );
};

export default Profile;
