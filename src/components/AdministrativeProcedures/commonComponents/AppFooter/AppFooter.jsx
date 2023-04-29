import { useState } from "react";
import styles from "./AppFooter.module.css";
import { Form } from "react-bootstrap";

export default function AppFooter() {
  const [newInfo, setNewInfo] = useState({
    appDate: new Date().toLocaleDateString().split(".").reverse().join("-"),
  });

  const handleChange = (e) => {
    newInfo[`${e.target.id}`] = e.target.value;
    setNewInfo(structuredClone(newInfo));
  };
  return (
    <>
      <Form.Group className={styles.header}>
        <Form.Label>Файл заявления</Form.Label>
        <Form.Control
          // data-id={item.key}
          id="inputFile"
          type="file"
          // isInvalid={!!errors[item.key]}
          accept=".doc,.docx,.pdf"
          // onChange={(e) => {
          //   handleChange(e);
          // }}
        />
        {/* <Form.Control.Feedback type={"invalid"}>
            {errors[item.key]}
          </Form.Control.Feedback> */}
      </Form.Group>
       <Form.Group className={styles.header}>
            <Form.Label>Количество листов:</Form.Label>
            <Form.Control
                id="appSheetCnt"
                defaultValue={''}
                type="text"
            />
       </Form.Group>
      <Form.Group className={styles.header}>
        <Form.Label>Должностное лицо:</Form.Label>
        <Form.Control
          id="inspector"
          value={1}
          type="text"
        />
      </Form.Group>
      <Form.Group className={styles.header}>
        <Form.Label>Дата подачи заявления:</Form.Label>
        <Form.Control
          id="appDate"
          value={newInfo.appDate}
          type="date"
          onChange={(e) => handleChange(e)}
        />
      </Form.Group>
    </>
  );
}
