// this component includes all the components of the user profile : profile pic, username, followers,following
import React from "react";
import ProfilePic from "./profilepic";
import Username from "./username";
import Followers from "./followers";
import Following from "./following";
import Post from "./post";
import Bio from "./bio";
import Card from "react-bootstrap/Card";

import Row from "react-bootstrap/Row";
const ProfilePage = props => {
  return (
    <Row className="justify-content-md-center" md={10}>
      <Card style={{ width: "50%" }}>
        <ProfilePic></ProfilePic>
        <Username></Username>
        <Bio></Bio>
        <Followers></Followers>
        <Following></Following>
        <Post></Post>
      </Card>
    </Row>
  );
};

export default ProfilePage;
