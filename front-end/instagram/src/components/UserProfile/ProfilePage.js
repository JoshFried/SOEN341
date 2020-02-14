// this component includes all the components of the user profile : profile pic, username, followers,following
import React from "react";
import ProfilePic from "./profilepic";
import Username from "./username";
import Followers from "./followers";
import Following from "./following";
import Post from "./post";
import Bio from "./bio";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Row from "react-bootstrap/Row";
const ProfilePage = props => {
  return (
    <Row className="justify-content-md-center " md={10}>
      <Card style={{ width: "50%" }}>
        <CardGroup>
          <Card>
            <ProfilePic></ProfilePic>
          </Card>
          <Card>
            <Username></Username>
            <Bio></Bio>
            <CardGroup>
              <Card>
                <Followers></Followers>
              </Card>
              <Card>
                <Following></Following>
              </Card>
            </CardGroup>
          </Card>
        </CardGroup>
        <Post></Post>
      </Card>
    </Row>
  );
};

export default ProfilePage;
