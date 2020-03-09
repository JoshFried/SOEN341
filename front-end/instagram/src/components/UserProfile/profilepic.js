import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Figure from "react-bootstrap/Figure";
import FigureImage from "react-bootstrap/FigureImage";

const ProfilePic = ({ profilePicture }) => {
  const url = "http://127.0.0.1:8000" + profilePicture;
  return (
    <Figure>
      <FigureImage
        style={{
          borderRadius: "50%",
          width: "170px",
          height: "170px",
          marginLeft: "100px",
          objectFit: 'cover'
        }}
        className="profilePic"
        src={url}
        roundedCircle
        alt="ProfilePicture"
      />
    </Figure>
  );
};

export default ProfilePic;
