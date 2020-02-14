import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Figure from "react-bootstrap/Figure";
import FigureImage from "react-bootstrap/FigureImage";
const ProfilePic = props => {
  return (
    <Figure>
      <FigureImage
        width={171}
        height={180}
        className="profilePic"
        src="./img/kobe.jpg"
        roundedCircle
        alt="ProfilePicture"
      />
    </Figure>
  );
};

export default ProfilePic;
