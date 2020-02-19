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
import Row from "react-bootstrap/Row";
const ProfilePage = props => {
  const username = "dawgears";
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

  const test = 0;

  useEffect(() => {
    const getInfo = async () => {
      try {
        const apiRes = await fetch(
          `http://127.0.0.1:8000/api/account/${username}`,

          {
            mode: "cors",
            method: "GET"
          }
        );
        const resJSON = await apiRes.json();

        setProfile({
          email: resJSON.email,
          username: resJSON.username,
          firstName: resJSON.first_name,
          lastName: resJSON.last_name,
          profilePicture: resJSON.profile_picture,
          about: resJSON.about,
          allPosts: [...resJSON.all_posts],
          nbOfPosts: resJSON.all_post_count,
          nbOfFollowers: resJSON.get_num_of_followers,
          nbOfFollowing: resJSON.get_num_of_following
        });
      } catch (error) {
        console.log(error);
      }
    };
    getInfo();
  }, [setProfile]);

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
            <CardGroup>
              <Card>
                <Followers followers={profile.nbOfFollowers}></Followers>
              </Card>
              <Card>
                <Following following={profile.nbOfFollowing}></Following>
              </Card>
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
