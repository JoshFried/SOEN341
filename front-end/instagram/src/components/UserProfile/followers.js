import React from "react";

const Followers = ({ followers }) => {
  console.log(followers);
  return (
    <div>
      <p className="followers">Followers: {followers}</p>
    </div>
  );
};

export default Followers;
