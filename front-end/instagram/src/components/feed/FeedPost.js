import React, { Fragment, useState, useEffect } from "react";
import { Card, Button, Form } from "react-bootstrap";

import Figure from "react-bootstrap/Figure";
import CardGroup from "react-bootstrap/CardGroup";
import likePost from "../../actions/Like";
import { createComment } from "..//../actions/Comment";
import PostComment from "./PostComment";
import { useAuth } from "../../context/auth";
import { useComment } from "../../context/comment";

const Post = ({ post, user }) => {
  const { setCreatedComment } = useComment();
  const token = localStorage.getItem("token");
  const [text, setText] = useState({ text: "" });
  const { authTokens } = useAuth();
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(post.all_likes.filter(e => e.username === user).length > 0);
  }, [setLiked]);

  useEffect(() => {
    setComments(post.post_comments);
  });

  const handleChange = event => {
    setText({ ...text, [event.target.name]: event.target.value });
  };
  // const url = "http://127.0.0.1:8000" + Object.values(post.picture);
  return (
    <Figure
      style={{
        height: "100%",
        width: "100%"
      }}
    >
      <CardGroup>
        <Card
          style={{
            marginBottom: 0
          }}
        >
          <Figure.Image
            className="posts"
            src={"http://127.0.0.1:8000".concat(post.picture)}
            alt="Posts"
          />
          <Card.Body>
            <Card.Text>{post.content}</Card.Text>
            <Button
              variant="dark"
              onClick={() => {
                likePost(JSON.parse(authTokens), post.id);
                setLiked(!liked);
              }}
            >
              {liked && "unlike"}
              {!liked && "like"}
            </Button>
            <br></br>
            {comments.map(item => (
              <PostComment comment={item} postID={post.id}></PostComment>
            ))}
            <input
              type="textArea"
              rows="34"
              onChange={handleChange}
              placeholder="Add a comment..."
              name="text"
            ></input>
            <Button
              variant="dark"
              type="submit"
              onChange={handleChange}
              onClick={() => {
                createComment(token, post.id, text);
                setCreatedComment();
              }}
            >
              Post
            </Button>
          </Card.Body>
        </Card>
      </CardGroup>
    </Figure>
  );
};

export default Post;
