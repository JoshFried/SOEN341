import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import CardGroup from "react-bootstrap/CardGroup";
import { Link } from "react-router-dom";
import { followAccount } from "../../../actions/Follow";
import { useAuth } from "../../../context/auth";
import { useModal } from "../../../context/modal";

const User = ({ username, following }) => {
  const url = `/${username}`;
  const { authTokens } = useAuth();
  const [isFollowing, setFollowing] = useState(following);
  const { setShowModal } = useModal();
  return (
    <div>
      <CardGroup>
        <Card>
          <Link
            to={url}
            style={{ fontWeight: "bold", color: "black" }}
            onClick={setShowModal}
          >
            {username}
          </Link>
          <Button
            type="submit"
            onClick={() => {
              followAccount(JSON.parse(authTokens), username);
              setFollowing(!isFollowing);
            }}
          >
            {isFollowing && "Unfollow"}
            {!isFollowing && "Follow"}
          </Button>
        </Card>
      </CardGroup>
    </div>
  );
};

export default User;
