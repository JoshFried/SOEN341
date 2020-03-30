import React, { useState, useEffect } from "react";
import { Card, Button, InputGroup, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { getUsername } from "../../modules/UserService";
import { deleteComment, editComment } from "../../modules/actions/Comment";
import { useComment } from "../../context/comment";
import "../../App.css";

const PostComment = ({ comment, postID }) => {
  const [authUsername, setAuthUsername] = useState("");
  const { authTokens } = useAuth();
  const [isAuthor, setIsAuthor] = useState(false);
  const { setCreatedComment } = useComment();
  const [isEditting, setEditting] = useState(false);
  const [editID, setEditID] = useState(0);
  const [text, setText] = useState({ text: "" });

  const id = comment.id;
  const username = comment.account.username;
  const url = `/${username}`;
  const handleChange = event => {
    setText({ ...text, [event.target.name]: event.target.value });
  };
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
        <div
          style={{
            width: "84.2%",
            fontSize: "14px",
            padding: "0",
            marginLeft: "2px"
          }}
        >
          <Link to={url} style={{ fontWeight: "bold", color: "black" }}>
            {username}{" "}
          </Link>
          {comment.text}
        </div>{" "}
        {isAuthor && (
          <div>
            {!isEditting && (
              <div>
                <a
                  style={{ fontWeight: "500", fontSize: "13px" }}
                  className="btn btn-sm"
                  type="submit"
                  onClick={() => {
                    deleteComment(authTokens, comment.id, postID);
                    setCreatedComment();
                  }}
                >
                  <span id="deleteButton">delete</span>
                </a>
                <a
                  style={{ fontWeight: "500", fontSize: "13px" }}
                  className="btn btn-sm"
                  type="submit"
                  onClick={() => {
                    setEditting(true);
                    setEditID(comment.id);
                  }}
                >
                  <span id="editButton">edit</span>
                </a>
              </div>
            )}
            {isEditting && (
              <div>
                <input
                  style={{
                    width: "90%",
                    border: "none",
                    fontStyle: "italic"
                  }}
                  type="textArea"
                  rows="34"
                  onChange={handleChange}
                  placeholder="Add a comment..."
                  name="text"
                  defaultValue={comment.text}
                ></input>
                <button
                  type="submit"
                  onClick={() => {
                    setEditting(false);
                    editComment(authTokens, comment.id, text, postID);
                    setCreatedComment();
                  }}
                ></button>
              </div>
            )}
          </div>
        )}
      </InputGroup>
    </div>
  );
};

export default PostComment;
