import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { MAIN_URL, PORT, API_DELETE_LEGISLATION_INFO } from "../../../constants/constants";

import styles from "./ConfirmModalWindow.module.css";

export default function ConfirmModalWindow({ setShowModal, showModal, fetchData, id, setCurrentId }) {
  const [showErrorText, setShowErrorText] = useState(false);

  const errorText = "Произошла ошибка, пожалуйста, повторите попытку";

  const handleButtonClick = async () => {
    const request = await fetch(MAIN_URL + PORT + API_DELETE_LEGISLATION_INFO + id, { method: "POST" });
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
        <Modal.Title>Вы действительно хотите удалить строку?</Modal.Title>
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
