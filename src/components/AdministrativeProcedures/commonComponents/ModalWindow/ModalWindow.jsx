import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import styles from "./ModalWindow.module.css";

function ModalWindow({ setShow, show }) {
  console.log("MODAL");
  const navigate = useNavigate();
  const pathName = window.location.pathname;
  console.log("pathName", pathName);

  const handleLinkClick = (e) => {
    switch (true) {
      case pathName.includes("reginformationchanges"):
        switch (e.target.dataset.key) {
          case "individual":
            navigate("/reginformationchanges/individual/add");
            break;
          case "entity":
            navigate("/reginformationchanges/entity/add");
            break;
          default:
            break;
        }
        break;
      case pathName.includes("smallboatsreg"):
        switch (e.target.dataset.key) {
          case "individual":
            navigate("/smallboatsreg/app/individual");
            break;
          case "entity":
            navigate("/smallboatsreg/app/entity");
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
        <Modal.Title id="contained-modal-title-vcenter">
          Выбор формы собственности
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <nav className={`d-flex`}>
          <div
            onClick={(e) => handleLinkClick(e)}
            data-key="individual"
            // to="/reginformationchanges/individual/add"
          >
            Физическое лицо
          </div>
          <a
            onClick={(e) => handleLinkClick(e)}
            data-key="entity"
            // to="/reginformationchanges/entity/add"
          >
            Юридическое лицо
          </a>
        </nav>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setShow(false)}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalWindow;