import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Figure from "react-bootstrap/Figure";
import FigureImage from "react-bootstrap/FigureImage";
const ProfilePic = props => {
  return (
    <Figure>
      <FigureImage
        style={{borderRadius:'50%', width:'200px', height:'200px'}}
        className="profilePic"
        src="./img/kobe.jpg"
        roundedCircle
        alt="ProfilePicture"
      />
    </Figure>
  );
};

export default ProfilePic;
