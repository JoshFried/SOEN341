import React from "react";
import Figure from "react-bootstrap/Figure";
import CardGroup from "react-bootstrap/CardGroup";
import Card from "react-bootstrap/Card";

const Post = picture => {
  const url = "http://127.0.0.1:8000" + Object.values(picture);
  return (
    <Figure
      style={{
        height: "33%",
        width: "33%"
      }}
    >
      <CardGroup>
        <Card
          style={{
            marginBottom: 0
          }}
        >
          <Figure.Image
            style={{ maxHeight: 188 }}
            className="posts"
            src={url}
            alt="Posts"
          />
        </Card>
      </CardGroup>
    </Figure>
  );
};

export default Post;
