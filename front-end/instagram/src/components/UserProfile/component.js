// this component includes all the components of the user profile : profile pic, username, followers,following
import React from "react";
import ProfilePic from "./profilepic";
import Username from "./username";
import Followers from "./followers";
import Following from "./following";
import Post from "./post";
const Component = props => {
  return (
    <div className="card">
      <ProfilePic></ProfilePic>
      <Username></Username>
      <Followers></Followers>
      <Following></Following>
      <Post></Post>
    </div>
  );
};

export default Component;
