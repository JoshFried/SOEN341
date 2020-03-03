import React, { useState, useEffect } from "react";
import FeedPost from "./FeedPost";
import { useAuth } from "../../context/auth";
import { getPosts } from "../../modules/UserService";
import { useComment } from "../../context/comment";

const Feed = () => {
  const { createdComment } = useComment();

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
    getPosts(authTokens).then(feed => {
      setFeed({ ...feed });
    });
  }, [setFeed, createdComment]);

  return (
    <div>
      {feed.allPosts &&
        feed.allPosts.map(item => <FeedPost post={item}> </FeedPost>)}
    </div>
  );
};

export default Feed;
