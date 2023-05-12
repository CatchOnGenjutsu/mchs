import { Button, Modal } from "react-bootstrap";

import styles from "./ResultModalWindow.module.css";

export default function ResultModalWindow({ show, setShow, result, appId, handleCloseApp }) {
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
      // size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {result === "success" ? "Заявление успешно зарегистрировано" : "Произошла ошибка"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          {result === "success" ? "Регистрационный номер" : "Проверьте введённые данные и повторите попытку"}
        </div>
        <div className={styles.app_id}>{appId}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => handleClose()}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  );
}
