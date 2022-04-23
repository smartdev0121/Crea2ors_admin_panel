import React, { useState } from "react";
import Modal from "react-modal";
import { hideModal } from "../../../store/modal/actions";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { HowToReg, Mood } from "@mui/icons-material";
import MColorButtonView from "../../MInput/MColorButtonView";
import "./ConfirmEmailModal.scss";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgb(64 64 64 / 73%)",
  },
};

const ConfirmEmailModal = () => {
  const dispatch = useDispatch();

  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    dispatch(hideModal());
  };
  return (
    <Modal
      isOpen={true}
      style={customStyles}
      closeTimeoutMS={200}
      contentLabel="Modal"
      onRequestClose={closeModal}
      overlayClassName="overlay"
      className="confirm-modal pulse"
    >
      <HowToReg
        fontSize="large"
        sx={{
          backgroundColor: "#da4bfd",
          borderRadius: "50%",
          padding: "5px",
          color: "white",
        }}
      />
      <h2 className="title">Please confirm your registration </h2>
      <Button className="close" onClick={closeModal}>
        X
      </Button>

      <p>
        In a few moments you will receive an email with a confirmation link for
        you to complete your registration. Please click on the link within in an
        hour.
      </p>
      <MColorButtonView className="got" onClick={closeModal}>
        Got It!
      </MColorButtonView>
    </Modal>
  );
};

export default ConfirmEmailModal;
