import React, { Fragment, useState } from "react";
import { Card, Button, Form } from "react-bootstrap";

import Figure from "react-bootstrap/Figure";
import CardGroup from "react-bootstrap/CardGroup";
import likePost from "../../actions/Like";
import { createComment } from "..//../actions/Comment";
import PostComment from "./PostComment";

const Post = ({ post }) => {
  const token = localStorage.getItem("token");
  const [text, setText] = useState({ text: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

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
              onClick={() => likePost(JSON.parse(token), post.id)}
            >
              Like
            </Button>
            <br></br>
            {post.post_comments.map(item => (
              <PostComment comment={item}> </PostComment>
            ))}
            <input
              onChange={handleChange}
              type="textArea"
              rows="34"
              placeholder="Add a comment..."
              name="text"
            ></input>
            <Button
              variant="dark"
              type="submit"
              onClick={() => createComment(token, post.id, text)}
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
