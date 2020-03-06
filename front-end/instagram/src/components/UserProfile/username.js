import React from "react";

const Username = ({ username }) => {
  return <p style={{fontWeight:'400', fontSize:'25px'}} className="username">@{username}</p>;
};

export default Username;
