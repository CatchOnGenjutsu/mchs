import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "./ModalWindow.module.css";

function ModalWindow({ setShow, show, idBoadCard }) {
  const navigate = useNavigate();
  const pathName = window.location.pathname;
  const dispatch = useDispatch();

  const handleLinkClick = (e) => {
    switch (true) {
      case pathName.includes("smallboatsreg"):
        switch (e.target.dataset.key) {
          case "individual":
            navigate("/smallboatsreg/app/individual", {
              state: { type: "individual", mode: "add" },
            });
            break;
          case "entity":
            navigate("/smallboatsreg/app/entity", {
              state: { type: "entity", mode: "add" },
            });
            break;
          default:
            break;
        }
        break;
      case pathName.includes("provisioninformation"):
        let idTypeStatement = null;
        switch (e.target.dataset.key) {
          case "individual":
            idTypeStatement = 1;
            navigate("/provisioninformation/individual/add", {
              state: { idTypeStatement },
            });
            break;
          case "entity":
            idTypeStatement = 2;
            navigate("/provisioninformation/entity/add", {
              state: { idTypeStatement },
            });
            break;
          default:
            break;
        }
        break;
      case pathName.includes("transportaccidents"):
        switch (e.target.dataset.key) {
          case "individual":
            navigate("./add/individual", {
              state: { type: "individual", mode: "add" },
            });
            break;
          case "entity":
            navigate("./add/entity", {
              state: { type: "entity", mode: "add" },
            });
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  };

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Выбор вида заявителя</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <nav className={`d-flex`}>
          <div
            className={styles.buttons}
            onClick={(e) => handleLinkClick(e)}
            data-key="individual">
            Физическое лицо
          </div>
          <div
            className={styles.buttons}
            onClick={(e) => handleLinkClick(e)}
            data-key="entity">
            Юридическое лицо
          </div>
        </nav>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setShow(false)}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalWindow;
