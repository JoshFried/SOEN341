import React from "react";

const Posts = ({ posts }) => {
  return (
    <div>
      <p style={{fontWeight: "bold"}} className="posts"> {posts} Posts</p>
    </div>
  );
};

export default Posts;
