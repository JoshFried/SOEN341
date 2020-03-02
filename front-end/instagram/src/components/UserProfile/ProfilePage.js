// this component includes all the components of the user profile : profile pic, username, followers,following
import React, { useState, useEffect } from "react";
import ProfilePic from "./profilepic";
import Username from "./username";
import Followers from "./followers";
import Following from "./following";
import Posts from "./posts";
import Post from "./post";
import Bio from "./bio";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import useAuth from "../../context/auth";
import { useParams } from "react-router-dom";
import { getUsername, getInfo } from "../../modules/UserService";
import { followAccount } from "../../actions/Follow";

const ProfilePage = () => {
  const token = localStorage.getItem("token");
  const [visitor, setVisitor] = useState(false);
  const [username, setUsername] = useState(useParams().username);
  useEffect(() => {
    getUsername(token).then(name => {
      if (username == undefined) {
        setUsername(name);
      } else {
        setVisitor(name != username);
      }
    });
  }, [username, visitor]);

  const [profile, setProfile] = useState({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    profilePicture: "",
    about: "",
    allPosts: [],
    nbOfPosts: 0,
    nbOfFollowers: 0,
    nbOfFollowing: 0
  });

  useEffect(() => {
    if (username) {
      getInfo(username).then(person => {
        setProfile({ ...person });
      });
    }
  }, [username]);

  return (
    <Row className="justify-content-md-center " md={10}>
      <Card style={{ width: "50%" }}>
        <CardGroup>
          <Card>
            <ProfilePic profilePicture={profile.profilePicture}></ProfilePic>
          </Card>
          <Card>
            <Username username={profile.username}></Username>
            <Bio about={profile.about}></Bio>
            {!visitor && <Button variant="dark">Edit Profile</Button>}
            <CardGroup>
              <Card>
                <Followers followers={profile.nbOfFollowers}></Followers>
              </Card>
              <Card>
                <Following following={profile.nbOfFollowing}></Following>
              </Card>
              {visitor && (
                <Card>
                  <Button
                    variant="dark"
                    onClick={() => followAccount(JSON.parse(token), username)}
                  >
                    Follow
                  </Button>
                </Card>
              )}
              <Card>
                <Posts posts={profile.nbOfPosts}></Posts>
              </Card>
            </CardGroup>
          </Card>
        </CardGroup>
        <div>
          {profile.allPosts.map(item => (
            <Post post={item.picture} key={item.picture}></Post>
          ))}
        </div>
      </Card>
    </Row>
  );
};

export default ProfilePage;
