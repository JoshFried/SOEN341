import React, { useState, useEffect } from "react";
import { Card, Button , InputGroup, FormControl} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { getUsername } from "../../modules/UserService";
import { deleteComment } from "../../actions/Comment";
import { useComment } from "../../context/comment";

const PostComment = ({ comment, postID }) => {
  const [authUsername, setAuthUsername] = useState("");
  const { authTokens } = useAuth();
  const [isAuthor, setIsAuthor] = useState(false);
  const { setCreatedComment } = useComment();

  const id = comment.id;
  const username = comment.account.username;
  const url = `/${username}`;

  useEffect(() => {
    getUsername(authTokens).then(
      name => {
        setAuthUsername(name);
      },
      [comment]
    );

    setIsAuthor(authUsername === username);
  }, [authUsername]);

  return (
    <div>
      <InputGroup>
        <div style={{width:'85%', fontSize:'14px', padding:'0', margin:'0'}}>
          <Link to={url} style={{fontWeight:"bold", color:'black'}}>{username} </Link>
         {comment.text}  
        </div>{" "}
        {isAuthor && (
          <a
            style={{fontWeight:"500", fontSize:'13px'}}
            className="btn btn-sm"
            type="submit"
            onClick={() => {
              deleteComment(authTokens, comment.id, postID);
              setCreatedComment();
            }}
          >
            delete
          </a>
        )}  
      </InputGroup>
    </div>
  );
};

export default PostComment;


