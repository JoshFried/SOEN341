import React, { Fragment, useState, useEffect } from "react";
import { Card, Row, Col, Container} from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../App.css";
import Figure from "react-bootstrap/Figure";
import CardGroup from "react-bootstrap/CardGroup";
import likePost from "../../actions/Like";
import { createComment } from "..//../actions/Comment";
import PostComment from "./PostComment";
import { useAuth } from "../../context/auth";
import { useComment } from "../../context/comment";
import { getUsername } from "../../modules/UserService";

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
  const username = post.account.username;
  const url = `/${username}`;

  function Capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  useEffect(() => {
      if(comments.length <= 1){
        document.getElementById('styleViewComments'+ dynamicId).style.display =  'none';
        console.log(comments.length);
      }
      else{
        document.getElementById('styleViewComments'+ dynamicId).style.display =  'inline';
        console.log(comments.length);
      }
  });

  useEffect(() => {
    setLiked(post.all_likes.filter(e => e.username === user).length > 0);
  }, [setLiked]);

  useEffect(() => {
    setComments(post.post_comments);
  });

  const handleChange = event => {
    setText({ ...text, [event.target.name]: event.target.value });
  };

  

  const dynamicId = "id-" + Date.now();
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
          <Card.Header style={{fontWeight:'bold'}}> 
          <Link to={url} style={{fontWeight:"bold", color:'black'}}> {Capitalize(post.account.username)} </Link> 
          </Card.Header>
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
          <Card.Body>
            <Card.Text style={{fontWeight:'500'}}>{post.account.username + ": " + post.caption}</Card.Text> 
            <div id="module" style={{width:'100%'}}>
              <p className="collapse" id={dynamicId} aria-expanded="false" style={{width:'100%'}}>
              {comments.map(item => (  
                         <PostComment comment={item} postID={post.id}></PostComment>
                      ))}
              </p>
              <div id='show'>
              <a role="button" id={"styleViewComments"+ dynamicId} className="collapsed" data-toggle="collapse" href={'#' + dynamicId} aria-expanded="false" aria-controls="collapseComments"></a>
              </div>
            </div>
            <hr></hr>
            <input
              id={'postText'+dynamicId}
              style={{width:'90%', border:'none', fontStyle: "italic"}}
              type="textArea"
              rows="34"
              onChange={handleChange}
              placeholder="Add a comment..."
              name="text"
            ></input>
            <a
              id='postButton'
              style={{color:'#2C7FFC', fontWeight:'500'}}
              type="submit"
              onChange={handleChange}
              onClick={() => {        
                createComment(token, post.id, text);
                setCreatedComment();
                document.getElementById('postText'+dynamicId).value = '';
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

