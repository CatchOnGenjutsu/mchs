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
          switch (true) {
            case path.includes("/shipsticket/decisioncard"):
              setHeaderText("Выдача судового билета успешно отклонена");
              break;
            case path.includes("smallboatsreg/decisioncard"):
              setHeaderText("Заявление на регистрацию судна отклонено");
              break;
            default:
              break;
          }
          break;
        case "Refuse":
          switch (true) {
            case path.includes("dupshipsticket/decisioncard"):
              setHeaderText("Заявление на выдачу дубликата отклонено");
              break;
            case path.includes("reginformationchanges/decisioncard"):
              setHeaderText("Заявление на изменения данных отклонено");
              break;
            default:
              break;
          }
          break;
        case "register":
          setHeaderText("Внесение изменений успешно выполнено");
          break;
        default:
          switch (true) {
            case path.includes("/shipsticket/decisioncard"):
              setMessageText("Номер судового билета");
              setHeaderText("Судовой билет успешно выдан");
              break;
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
            case path.includes("reginformationchanges"):
              setHeaderText("Заявление успешно зарегистрировано");
              setMessageText("Регистрационный номер");
              break;
            case path.includes("reginformationchanges"):
              setHeaderText("Заявление успешно зарегистрировано");
              setMessageText("Регистрационный номер");
              break;
            case path.includes("provisioninformation"):
              setHeaderText("Заявление успешно зарегистрировано");
              setMessageText("Регистрационный номер");
              break;
            default:
              break;
          }
          break;
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

  const handleClose = (e) => {
    if (result === "success") {
      handleCloseApp(e);
    } else {
      setShow(false);
    }
  };
  return (
    <Modal
      show={show}
      onHide={(e) => handleClose(e)}
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
        <Button onClick={(e) => handleClose(e)}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  );
}
