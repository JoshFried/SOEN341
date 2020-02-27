import React, { Fragment } from "react";
import { Card, Button } from "react-bootstrap";

import Figure from "react-bootstrap/Figure";
import CardGroup from "react-bootstrap/CardGroup";

const Post = post => {
  // const url = "http://127.0.0.1:8000" + Object.values(post.picture);
  console.log(post);
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
            src={"http://127.0.0.1:8000".concat(post.post.picture)}
            alt="Posts"
          />
          <Card.Body>
            <Card.Text>{post.content}</Card.Text>
            <Button variant="dark">Like</Button>
          </Card.Body>
        </Card>
      </CardGroup>
    </Figure>
  );
};

export default Post;
