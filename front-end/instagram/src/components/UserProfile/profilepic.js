import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Figure from "react-bootstrap/Figure";
import FigureImage from "react-bootstrap/FigureImage";
const ProfilePic = props => {
  return (
    <Figure>
      <FigureImage
        style={{borderRadius:'50%', width:'170px', height:'170px', marginLeft:'60px', marginTop:'40px'}}
        className="profilePic"
        src="./img/kobe.jpg"
       
        alt="ProfilePicture"
      />
    </Figure>
  );
};

export default ProfilePic;
