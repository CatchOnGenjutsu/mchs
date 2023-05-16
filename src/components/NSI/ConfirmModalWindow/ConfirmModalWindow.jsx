import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import {
  MAIN_URL,
  PORT,
  API_DELETE_LEGISLATION_INFO,
  API_DELETE_FORMS_INFO,
  API_DELETE_PAID_PROC_INFO,
  API_DELETE_REQUISITES_CHAPTER,
  API_DELETE_REQUISITES_LINE,
  API_DELETE_ADMIN_PROC,
} from "../../../constants/constants";

import styles from "./ConfirmModalWindow.module.css";

export default function ConfirmModalWindow({ setShowModal, showModal, fetchData, id, setCurrentId, type }) {
  const mainText =
    type === "chapter"
      ? "Вы действительно хотите удалить раздел?"
      : "Вы действительно хотите удалить строку?";
  const [showErrorText, setShowErrorText] = useState(false);

  const errorText = "Произошла ошибка, пожалуйста, повторите попытку";

  const handleButtonClick = async () => {
    let request;
    switch (true) {
      case window.location.pathname.includes("legislation"):
        request = await fetch(MAIN_URL + PORT + API_DELETE_LEGISLATION_INFO + id, { method: "POST" });
        break;
      case window.location.pathname.includes("forms"):
        request = await fetch(MAIN_URL + PORT + API_DELETE_FORMS_INFO + id, { method: "POST" });
        break;
      case window.location.pathname.includes("paidproc"):
        request = await fetch(MAIN_URL + PORT + API_DELETE_PAID_PROC_INFO + id, { method: "POST" });
        break;
      case window.location.pathname.includes("requisites"):
        if (type === "chapter") {
          request = await fetch(MAIN_URL + PORT + API_DELETE_REQUISITES_CHAPTER + id, { method: "POST" });
        } else {
          request = await fetch(MAIN_URL + PORT + API_DELETE_REQUISITES_LINE + id, { method: "POST" });
        }
        break;
      case window.location.pathname.includes("adminproc"):
        request = await fetch(MAIN_URL + PORT + API_DELETE_ADMIN_PROC + id, { method: "POST" });
        break;
      default:
        break;
    }
    if (request.status === 200) {
      setShowModal(false);
      fetchData();
      setCurrentId(null);
    } else {
      setShowErrorText(true);
    }
  };

  return (
    <Modal
      show={showModal}
      onHide={() => {
        setShowModal(false);
      }}
      size="sm">
      <Modal.Header closeButton>
        <Modal.Title>{mainText}</Modal.Title>
      </Modal.Header>
      {showErrorText && (
        <Modal.Body>
          <div className={styles.red}>{errorText}</div>
        </Modal.Body>
      )}
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            setShowModal(false);
          }}>
          Отмена
        </Button>
        <Button
          variant="primary"
          onClick={handleButtonClick}>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
