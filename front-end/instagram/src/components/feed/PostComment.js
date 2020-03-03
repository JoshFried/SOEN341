import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { getUsername } from "../../modules/UserService";
import { deleteComment } from "../../actions/Comment";

const PostComment = ({ comment, postID }) => {
  const [authUsername, setAuthUsername] = useState("");
  const { authTokens } = useAuth();
  const [isAuthor, setIsAuthor] = useState(false);

  const id = comment.id;
  const username = comment.account.username;
  const url = `/${username}`;

  console.log(comment);

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
      <Card>
        <p>
          <Link to={url}>{username} </Link>
          {comment.text}
        </p>{" "}
        {isAuthor && (
          <Button
            variant="danger"
            type="submit"
            onClick={() => {
              deleteComment(authTokens, comment.id, postID);
            }}
          >
            Delete
          </Button>
        )}
      </Card>
    </div>
  );
};

export default PostComment;
