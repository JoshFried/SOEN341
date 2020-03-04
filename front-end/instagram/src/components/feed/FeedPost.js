import React, { Fragment, useState, useEffect } from "react";
import { Card, Row, Col, Container} from "react-bootstrap";
import "../../App.css";
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
    <Fragment>
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
          <a style={{width: '26px', height:'26px'}}
           onClick={() => {
            likePost(JSON.parse(authTokens), post.id);
            setLiked(!liked);       
          }}
          >
            {liked &&  <img src={redHeart} style={{ marginLeft: '15px', width:'26px', height: '26px'}} alt=''></img>} 
            {!liked &&  <img src={outlineHeart} style={{ marginLeft: '15px', width:'26px', height: '26px'}} alt=''></img>} 
          </a>
          <p>{post.content}</p>
          
          <Card.Body>
            <Card.Text>{post.content}</Card.Text>
     
            <a style={{fontWeight:'bold', color:'black', fontSize:'16px'}} href='' data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
              View all comments
              </a>
           
              <div class="collapse" id="collapseExample">
            {comments.map(item => (
            
              <PostComment comment={item} postID={post.id}></PostComment>
            ))}
            </div>
            <hr></hr>
            <input
              className='postText'
              style={{width:'90%', border:'none', fontStyle: "italic"}}
              type="textArea"
              rows="34"
              onChange={handleChange}
              placeholder="Add a comment..."
              name="text"
            ></input>
            <a
              className='postButton'
              style={{color:'lightblue', fontWeight:'500'}}
              type="submit"
              onChange={handleChange}
              onClick={() => {
                createComment(token, post.id, text);
                setCreatedComment();
              }}
            >
             &nbsp; Post
            </a>
          </Card.Body>
        </Card>
      </CardGroup>
    </Col>
   </Row>
  </Container>
  

 </Fragment>
 
  );
};

export default Post;

