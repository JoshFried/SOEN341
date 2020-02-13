import React from "react";

const UserProfile = props => {
  return (
    <div className="card">
      {/*Profile Picture*/}
      <img
        className="profilePic"
        src="./img/codeblooded.jpg"
        alt="ProfilePicture"
      />
      {/*username*/}
      <h1 className="username">username</h1>
      {/*followers*/}
      <h2 className="followers">followers</h2>
      <h2 className="followersNumber">878</h2>
      {/*following*/}
      <h2 className="following">following</h2>
      <h2 className="followingNumber">345</h2>
      {/*following*/}
      <img className="posts" src="./img/post1.png" alt="Posts" />
    </div>
  );
};

export default UserProfile;
