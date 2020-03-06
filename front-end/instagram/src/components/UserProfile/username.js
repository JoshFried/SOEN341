import React from "react";

const Username = ({ username }) => {
  return <p style={{fontWeight:'bold'}} className="username">@{username}</p>;
};

export default Username;
