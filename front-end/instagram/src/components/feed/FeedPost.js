import React, { Fragment, useState, useEffect } from "react";
import { Card, Button, Row, Col, Container } from "react-bootstrap";

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
  
  const outlineHeart = require("../../images/feed/heart.svg")
  const redHeart = require("../../images/feed/redheart.svg")
  const hearts = { outlineHeart, redHeart }
  const [selectedHeart, setSelectedHeart] = useState(hearts.outlineHeart)

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
    <Container
    style={{
      maxWidth: '660px',
      marginLeft: "auto",
      marginRight: "auto",
      paddingTop: "5%"
    }}
    >
    <Row>
     <Col>
      <CardGroup>
        <Card 
          style={{
            marginBottom: 0,
           
          }}
        >
          <Figure.Image
            style={{
              height: '600px',
              width: '660px',
            }}
            className="posts"
            src={"http://127.0.0.1:8000".concat(post.picture)}
            alt="Posts"
          />
          <a 
           onClick={() => {
            likePost(JSON.parse(authTokens), post.id);
            setLiked(!liked);
            if(liked){
              setSelectedHeart(hearts.outlineHeart);
            }
            else if(!liked){
              setSelectedHeart(hearts.redHeart);
            }
          }}
          >
           <img src={selectedHeart} style={{ marginLeft: '15px', width:'26px', height: '26px'}} alt=''></img>
          </a>
        
       
          <Card.Body>
            <Card.Text>{post.content}</Card.Text>
           
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
    </Col>
   </Row>
  </Container>
  );
};

export default Post;
