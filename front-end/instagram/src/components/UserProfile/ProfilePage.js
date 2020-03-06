// this component includes all the components of the user profile : profile pic, username, followers,following
import React, { useState, useEffect } from "react";
import ProfilePic from "./profilepic";
import UpdateProfile from "./UpdateProfile";
import Username from "./username";
import Posts from "./posts";
import Post from "./post";
import Bio from "./bio";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { Button, Modal } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import { useAuth } from "../../context/auth";
import { useModal } from "../../context/modal";
import { useParams, Redirect } from "react-router-dom";
import { getUsername, getInfo } from "../../modules/UserService";
import { followAccount } from "../../actions/Follow";
import ListModal from "./ListModal/ListModal";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const [visitor, setVisitor] = useState(true);
  const [username, setUsername] = useState(useParams().username);

  const [typeModal, setTypeModal] = useState("");
  const [modalData, setModalData] = useState([]);

  const [name, setName] = useState("");
  const { showModal } = useModal();
  const { setShowModal } = useModal();
  const usernameParam = useParams().username;
  const token = localStorage.getItem("token");
  const [is404, set404] = useState(false);

  if (username != usernameParam && usernameParam != undefined) {
    setUsername(usernameParam);
  }
  useEffect(() => {
    getUsername(token).then(name => {
      if (username == undefined || username == "undefined") {
        setUsername(name);
      } else {
        setName(name);

        setVisitor(name.toLowerCase !== username.toLowerCase);
      }
    });
  }, [username, visitor]);
  const [isFollower, setFollower] = useState(false);

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
    allFollowers: [],
    nbOfFollowing: 0,
    allFollowing: []
  });

  const [visitorProfile, setVisitorProfile] = useState({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    profilePicture: "",
    about: "",
    allPosts: [],
    nbOfPosts: 0,
    nbOfFollowers: 0,
    allFollowers: [],
    nbOfFollowing: 0,
    allFollowing: []
  });

  useEffect(() => {
    if (username != undefined) {
      getInfo(username).then(person => {
        if (person === "404 error") set404(true);
        setProfile({ ...person });
      });
    }
    if (visitor) {
      getInfo(name).then(person => {
        setVisitorProfile({ ...person });
      });
    }
  }, [username, visitor, usernameParam, isFollower, showModal, token]);

  useEffect(() => {
    {
      profile.allFollowers &&
        setFollower(
          profile.allFollowers.filter(e => e.username !== JSON.stringify(name))
            .length > 0
        );
    }
  }, [profile]);

  return (
    <div>
      {is404 && <Redirect to="/error/404"></Redirect>}
      <Row className="justify-content-md-center " md={10}>
        <Card style={{ width: "50%" }}>
          <CardGroup>
            <Card>
              <ProfilePic profilePicture={profile.profilePicture}></ProfilePic>
            </Card>
            <Card>
              <Username username={profile.username}></Username>
              <Bio about={profile.about}></Bio>
              {!visitor && (
                <Link to="/editprofile" role="button" variant="dark">
                  Edit Profile
                </Link>
              )}
              <CardGroup>
                <Card>
                  <a
                    style={{ cursor: "pointer" }}
                    role="button"
                    onClick={() => {
                      setShowModal();
                      setTypeModal("followers");
                      setModalData(profile.allFollowers);
                    }}
                  >
                    {profile.nbOfFollowers} Followers
                  </a>
                </Card>
                <Card>
                  <a
                    style={{ cursor: "pointer" }}
                    role="button"
                    onClick={() => {
                      setShowModal();
                      console.log(showModal);
                      setTypeModal("following");
                      setModalData(profile.allFollowing);
                    }}
                  >
                    {profile.nbOfFollowing} Following
                  </a>
                </Card>
                {visitor && (
                  <Card>
                    <Button
                      variant="dark"
                      type="submit"
                      onClick={() => {
                        followAccount(JSON.parse(token), username);
                        setFollower(!isFollower);
                      }}
                    >
                      {!isFollower && "follow"}
                      {isFollower && "unfollow"}
                    </Button>
                  </Card>
                )}
                <Card>
                  <Posts posts={profile.nbOfPosts}></Posts>
                </Card>
              </CardGroup>
            </Card>
          </CardGroup>
          {profile.allPosts && (
            <div>
              {profile.allPosts.map(item => (
                <Post post={item.picture} key={item.picture}></Post>
              ))}
            </div>
          )}
        </Card>
        {showModal && (
          <div>
            <ListModal
              data={modalData}
              type={typeModal}
              user={visitor ? visitorProfile : profile}
            ></ListModal>
          </div>
        )}
      </Row>
    </div>
  );
};

export default ProfilePage;
