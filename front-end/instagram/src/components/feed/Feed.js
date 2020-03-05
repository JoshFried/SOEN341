import React, { useState, useEffect } from "react";
import FeedPost from "./FeedPost";
import { useAuth } from "../../context/auth";
import { getPosts } from "../../modules/UserService";
import { useComment } from "../../context/comment";
import { useModal } from "../../context/modal";
const Feed = () => {
  const { createdComment } = useComment();
  const { newLike } = useComment();

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
  const { showModal } = useModal();

  useEffect(() => {
    getPosts(authTokens).then(feed => {
      setFeed({ ...feed });
    });
  }, [setFeed, createdComment, newLike]);

  return (
    <div>
      {feed.allPosts &&
        feed.allPosts.map(item => (
          <FeedPost
            key={item.id}
            post={item}
            user={feed.username}
            likes={item.all_likes}
          ></FeedPost>
        ))}
    </div>
  );
};

export default Feed;
