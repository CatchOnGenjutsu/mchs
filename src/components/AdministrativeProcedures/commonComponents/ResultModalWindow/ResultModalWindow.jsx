import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

import styles from "./ResultModalWindow.module.css";

export default function ResultModalWindow({ show, setShow, result, appId, handleCloseApp }) {
  const [headerText, setHeaderText] = useState("");
  const [messageText, setMessageText] = useState("");
  const path = window.location.pathname;

  useEffect(() => {
    if (result === "success") {
      if (appId === "Denied") {
        setHeaderText("Заявление на регистрацию судна отклонено");
      } else {
        switch (true) {
          case path.includes("decisioncard"):
            setHeaderText("Судно успешно зарегистрировано");
            break;
          default:
            setHeaderText("Заявление успешно зарегистрировано");
            break;
        }
        setMessageText("Регистрационный номер");
      }
    } else {
      switch (true) {
        case path.includes("decisioncard"):
          setHeaderText("Произошла ошибка");
          setMessageText("Повторите попытку");
          break;
        default:
          setHeaderText("Произошла ошибка");
          setMessageText("Проверьте введённые данные и повторите попытку");
          break;
      }
    }
  }, []);

  const handleClose = () => {
    if (result === "success") {
      handleCloseApp();
    } else {
      setShow(false);
    }
  };
  return (
    <Modal
      show={show}
      onHide={() => handleClose()}
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{headerText}</Modal.Title>
      </Modal.Header>

      {!!messageText && (
        <Modal.Body>
          <div>{messageText}</div>
          <div className={styles.app_id}>{appId}</div>
        </Modal.Body>
      )}

      <Modal.Footer>
        <Button onClick={() => handleClose()}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  );
}
