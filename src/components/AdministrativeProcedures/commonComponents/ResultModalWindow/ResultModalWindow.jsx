import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

import styles from "./ResultModalWindow.module.css";

export default function ResultModalWindow({ show, setShow, result, appId, handleCloseApp }) {
  const [headerText, setHeaderText] = useState("");
  const [messageText, setMessageText] = useState("");
  const path = window.location.pathname;

  useEffect(() => {
    if (result === "success") {
      switch (appId) {
        case "Denied":
          setHeaderText("Заявление на регистрацию судна отклонено");
          break;
        case "Refuse" :
          switch (true) {
            case path.includes("dupshipsticket/decisioncard"):
              setHeaderText("Заявление на выдачу дубликата отклонено");
              break;
            case path.includes("reginformationchanges/decisioncard"):
              setHeaderText("Заявление на изменения данных отклонено");
              break;
            default:break;
          }

          break;
        default:
          switch (true) {
            case path.includes("dupshipsticket/decisioncard"):
              setMessageText("Номер дубликата");
              setHeaderText("Дубликат судового билета успешно выдан");
              break;
            case path.includes("smallboatsreg/decisioncard"):
              setHeaderText("Судно успешно зарегистрировано");
              setMessageText("Регистрационный номер");
              break;
            case path.includes("smallboatsreg"):
              setHeaderText("Заявление успешно зарегистрировано");
              setMessageText("Регистрационный номер");
              break;
            case path.includes("dupshipsticket"):
              setHeaderText("Заявление успешно зарегистрировано");
              setMessageText("Регистрационный номер");
              break;
            default:
              break;
          }
          break;
      }
      // if (appId === "Denied") {
      //   setHeaderText("Заявление на регистрацию судна отклонено");
      // } else if (appId === "Refuse") {
      //   setHeaderText("Заявление на выдачу дубликата отклонено");
      // } else {
      //   switch (true) {
      //     case path.includes("dupshipsticket/decisioncard"):
      //       setMessageText("Номер дубликата");
      //       setHeaderText("Дубликат судового билета успешно выдан");
      //       break;
      //     case path.includes("smallboatsreg/decisioncard"):
      //       setHeaderText("Судно успешно зарегистрировано");
      //       setMessageText("Регистрационный номер");
      //       break;
      //     case path.includes("smallboatsreg"):
      //       setHeaderText("Заявление успешно зарегистрировано");
      //       setMessageText("Регистрационный номер");
      //       break;
      //     case path.includes("dupshipsticket"):
      //       setHeaderText("Заявление успешно зарегистрировано");
      //       setMessageText("Регистрационный номер");
      //       break;
      //     default:
      //       break;
      //   }
      // }
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
        <Modal.Title
          className={styles.modal_title}
          id="contained-modal-title-vcenter">
          {headerText}
        </Modal.Title>
      </Modal.Header>

      {!!messageText && (
        <Modal.Body>
          <div className="text-center">{messageText}</div>
          <div className={styles.app_id}>{appId}</div>
        </Modal.Body>
      )}

      <Modal.Footer>
        <Button onClick={() => handleClose()}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  );
}
