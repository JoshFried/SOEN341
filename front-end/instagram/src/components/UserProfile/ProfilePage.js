// this component includes all the components of the user profile : profile pic, username, followers,following
import React from "react";
import ProfilePic from "./profilepic";
import Username from "./username";
import Followers from "./followers";
import Following from "./following";
import Post from "./post";
import Bio from "./bio";
import Card from "react-bootstrap/Card";
const ProfilePage = props => {
  return (
    <Card style={{ width: "75%" }}>
      <div className="card">
        <ProfilePic></ProfilePic>
        <Username></Username>
        <Bio></Bio>
        <Followers></Followers>
        <Following></Following>
        <Post></Post>
      </div>
    </Card>
  );
};

export default ProfilePage;
