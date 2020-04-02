import React, { useState, useEffect } from "react";
import { Button, Modal, ModalTitle } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useModal } from "../context/modal";
import { useAuth } from "../context/auth";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { updateProfilePic } from "../modules/UserService";

const UploadModal = ({ type, user }) => {
  const { showPicModal } = useModal();
  const { setShowPicModal } = useModal();
  const { authTokens } = useAuth();
  const [content, setContent] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => {
    setContent(e.target.value);
  };

  const handleImageChange = e => {};

  const handleSubmit = e => {
    e.preventDefault();
    const fileField = document.querySelector('input[type="file"]');

    let data = new FormData();
    data.append("profile_picture", fileField.files[0]);

    setShowPicModal();
    updateProfilePic(authTokens, data);

    if (submitted) {
      return <Redirect to="/profile"></Redirect>;
    }
  };
  return (
    <div>
      <Modal size="lg" show={showPicModal}>
        <Modal.Header>
          <Modal.Title>{type}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form
              onSubmit={handleSubmit}
              style={{
                width: "100%",
                maxWidth: "330px",
                padding: "15px",
                margin: "auto",
                border: "1px solid grey",
                borderRadius: "10px",
                marginTop: "100px",
                boxShadow: " 5px 5px 5px 0px #888888"
              }}
            >
              <h1
                className="h3 mb-3 font-weight-normal"
                style={{ textAlign: "center" }}
              >
                Upload a photo
              </h1>

              <div className="input-group">
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="myInput"
                    aria-describedby="myInput"
                    accept="image/png, image/jpeg"
                    onChange={handleImageChange}
                    required
                  />
                  <label className="custom-file-label" htmlFor="myInput">
                    Choose file
                  </label>
                </div>
                <div className="input-group-append"></div>
              </div>
              <br></br>
              <input
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              />
            </form>
            <br></br>
          </div>
          <Button
            variant="danger"
            onClick={() => {
              setShowPicModal();
            }}
          >
            Close
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UploadModal;
