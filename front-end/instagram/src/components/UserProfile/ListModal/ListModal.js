import React, { useState, useEffect } from "react";
import { Button, Modal, ModalTitle } from "react-bootstrap";
import User from "./User";
import { Link } from "react-router-dom";
import { useModal } from "../../../context/modal";

const ProfileModal = ({ data, type, user }) => {
  const { showModal } = useModal();
  const { setShowModal } = useModal();

  const url = `/${user.username}`;
  const goBack = () => {
    return (
      <Link to={url} style={{ fontWeight: "bold", color: "black" }}></Link>
    );
  };
  console.log(data);
  return (
    <div>
      <Modal size="lg" show={showModal}>
        <Modal.Header>
          <Modal.Title>{type}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {user.allFollowing && (
            <div>
              {data.map(item => (
                <User
                  username={item.username}
                  following={
                    user.allFollowing.filter(
                      e =>
                        JSON.stringify(e.username) ===
                        JSON.stringify(item.username)
                    ).length > 0
                  }
                ></User>
              ))}
            </div>
          )}
          <Button
            variant="danger"
            onClick={() => {
              setShowModal();
            }}
          >
            Close
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProfileModal;
