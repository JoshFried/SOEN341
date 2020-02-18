import React from "react";
import Figure from "react-bootstrap/Figure";
import CardGroup from "react-bootstrap/CardGroup";
import Card from "react-bootstrap/Card";

const Post = picture => {
  const url = "http://127.0.0.1:8000" + Object.values(picture);
  return (
    <Figure>
      <CardGroup>
        <Card style={{ marginBottom: 0 }}>
          <Figure>
            <Figure.Image
              width={300}
              height={300}
              className="posts"
              src={url}
              alt="Posts"
            />
          </Figure>
        </Card>
      </CardGroup>
    </Figure>
  );
};

export default Post;
