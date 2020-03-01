import React, { useState, useEffect } from "react";
import FeedPost from "./FeedPost";
import { useAuth } from "../../context/auth";

const Feed = props => {
  const token = localStorage.getItem("token");
  const [feed, setFeed] = useState({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    profilePicture: "",
    about: "",
    allPosts: []
  });

  const { authTokens } = useAuth();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const apiRes = await fetch(
          "http://127.0.0.1:8000/api/account/feed",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Token " + JSON.parse(token)
            }
          },

          {
            mode: "cors",
            method: "GET"
          }
        );
        const resJSON = await apiRes.json();

        setFeed({
          email: resJSON.email,
          username: resJSON.username,
          firstName: resJSON.first_name,
          lastName: resJSON.last_name,
          profilePicture: resJSON.profile_picture,
          about: resJSON.about,
          allPosts: [...resJSON.all_posts]
        });
      } catch (error) {
        console.log(error);
      }
    };
    getPosts();
  }, [setFeed]);

  return (
    <div>
      {feed.allPosts.map(item => (
        <FeedPost post={item}> </FeedPost>
      ))}
    </div>
  );
};

export default Feed;
