import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const PostComment = ({ comment }) => {
  console.log(comment);
  const username = comment.account.username;
  return (
    <div>
      <Card>
        <p>
          <Link to="/">{comment.account.username} </Link>
          {comment.text}
        </p>
      </Card>
    </div>
  );
};

export default PostComment;
