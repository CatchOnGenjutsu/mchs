import React from 'react';
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./ModalWindow.module.css"

function ModalWindow({ setShow, show }) {
  console.log('MODAL')
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Выбор формы собственности
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <nav className={`d-flex`}>
          <Link to="/reginformationchanges/individual/add">Физическое лицо</Link>
          <Link to="/reginformationchanges/entity/add">Юридическое лицо</Link>
        </nav>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setShow(false)}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalWindow;