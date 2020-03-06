import React from "react";
import Figure from "react-bootstrap/Figure";
import CardGroup from "react-bootstrap/CardGroup";
import Card from "react-bootstrap/Card";

const Post = picture => {
  const url = "http://127.0.0.1:8000" + Object.values(picture);
  return (
    <Figure
      style={{
        height: "310px",
        width: "310px"
        
      }}
    >
      <CardGroup>
        <Card
          style={{
            marginBottom: 0,
            borderColor:'white'
          }}
        >
          <Figure.Image
            style={{
              height: "328px",
              width: "328px",
              paddingLeft:'8px',
              objectFit: 'cover'
            }}
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
