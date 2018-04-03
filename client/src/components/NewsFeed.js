import React, { Component } from "react";
import Anchor from "grommet/components/Anchor";
import Box from "grommet/components/Box";
import Card from "grommet/components/Card";
import Columns from "grommet/components/Columns";
import Heading from "grommet/components/Heading";
import SocialTwitterIcon from "grommet/components/icons/base/SocialTwitter";
import SocialFacebookIcon from "grommet/components/icons/base/SocialFacebook";
import SocialInstagramIcon from "grommet/components/icons/base/SocialInstagram";
import LinkNextIcon from "grommet/components/icons/base/LinkNext";

export default class NewsFeed extends Component {
  _onClickCard(path, event) {
    event.preventDefault();
    window.location.href = path;
  }

  render() {
    const twitterIconBox = (
      <Box align="end">
        <SocialTwitterIcon />
      </Box>
    );

    const facebookIconBox = (
      <Box align="end">
        <SocialFacebookIcon />
      </Box>
    );

    const instagramIconBox = (
      <Box align="end">
        <SocialInstagramIcon />
      </Box>
    );

    const twitterFeedCard1 = (
      <Card
        colorIndex="light-1"
        margin="small"
        contentPad="medium"
        onClick={this._onClickCard.bind(this, "http://www.twitter.com")}
        direction="column"
        label="Social"
      >
        <Heading tag="h2">Follow Us On Twitter</Heading>
        {twitterIconBox}
      </Card>
    );

    const facebookFeedCard2 = (
      <Card
        colorIndex="light-1"
        margin="small"
        contentPad="medium"
        thumbnail="https://ei.marketwatch.com/Multimedia/2016/04/11/Photos/ZH/MW-EJ989_facebo_20160411150229_ZH.jpg?uuid=f022c7e4-0017-11e6-9671-0015c588dfa6"
        onClick={this._onClickCard.bind(this, "http://www.facebook.com")}
        direction="column"
        label="Social"
      >
        <Heading tag="h2">Follow Us On Facebook</Heading>
        {facebookIconBox}
      </Card>
    );

    const instagramFeedCard3 = (
      <Card
        colorIndex="light-1"
        margin="small"
        contentPad="medium"
        thumbnail="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6q2FuxCA8Y3LaF_7aLBW_juCsna-MX6v0EpbJDSex47D4oBDp"
        onClick={this._onClickCard.bind(this, "http://www.instagram.com")}
        direction="column"
        label="Social"
      >
        <Heading tag="h2">Follow Us on Instagram</Heading>
        {instagramIconBox}
      </Card>
    );

    const blogPostCard = (
      <Card
        colorIndex="light-1"
        margin="small"
        contentPad="medium"
        onClick={this._onClickCard.bind(this, "/signup")}
        thumbnail="http://www.mayatechnosoft.com/images/slider/email-marketing.jpg"
        direction="column"
        label="Featured Post"
        link={<Anchor label="Learn More" icon={<LinkNextIcon />} />}
      >
        <Heading tag="h2">Send Custom Templated Emails in 3 Steps</Heading>
      </Card>
    );

    const featuredPostCard = (
      <Card
        colorIndex="light-1"
        margin="small"
        contentPad="medium"
        onClick={this._onClickCard.bind(this, "https:www.hackreactor.com")}
        thumbnail="https://scontent-sea1-1.cdninstagram.com/vp/f88286294fc87fd7f34f844a6e3a67b2/5B00643B/t51.2885-15/s480x480/e35/c135.0.809.809/16230225_651402525043606_7862890074390659072_n.jpg?ig_cache_key=MTQ0NDc0NzY3MTQzNzEwMTM5MA%3D%3D.2.c"
        direction="column"
        label="Featured"
        link={<Anchor label="Learn More" icon={<LinkNextIcon />} />}
      >
        <Heading tag="h2">This Project was Created in HackReactor NYC</Heading>
      </Card>
    );

    const featuredPostCard2 = (
      <Card
        colorIndex="light-1"
        margin="small"
        contentPad="medium"
        onClick={this._onClickCard.bind(this, "/signup")}
        thumbnail="https://techfrag.com/wp-content/uploads/2017/04/MacBook-Pro.jpg"
        direction="column"
        label="Featured"
        link={
          <Anchor href="/signup" label="Learn More" icon={<LinkNextIcon />} />
        }
      >
        <Heading tag="h2">Join Now!</Heading>
      </Card>
    );

    return (
      <Box
        className="columns-container"
        colorIndex="light-2"
        pad={{ horizontal: "large" }}
        full="horizontal"
      >
        <Columns
          size="medium"
          justify="center"
          masonry={true}
          maxCount={3}
          responsive={true}
        >
          {featuredPostCard}
          {twitterFeedCard1}
          {facebookFeedCard2}
          {blogPostCard}
          {featuredPostCard2}
          {instagramFeedCard3}
        </Columns>
      </Box>
    );
  }
}
