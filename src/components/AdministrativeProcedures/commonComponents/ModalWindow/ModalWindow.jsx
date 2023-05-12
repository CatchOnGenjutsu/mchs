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
              state: { type: "individual", mode: "create" },
            });
            break;
          case "entity":
            navigate("/smallboatsreg/app/entity", {
              state: { type: "entity", mode: "create" },
            });
            break;
          default:
            break;
        }
        break;
      case pathName.includes("reginformationchanges"):
        switch (e.target.dataset.key) {
          case "individual":
            navigate("/reginformationchanges/individual/add", { state: { idBoadCard } });
            break;
          case "entity":
            navigate("/reginformationchanges/entity/add", { state: { idBoadCard } });
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
        <Modal.Title id="contained-modal-title-vcenter">Выбор формы собственности</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <nav className={`d-flex`}>
          <div
            onClick={(e) => handleLinkClick(e)}
            data-key="individual"
          >
            Физическое лицо
          </div>
          <a
            onClick={(e) => handleLinkClick(e)}
            data-key="entity"
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
