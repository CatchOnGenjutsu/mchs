import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { addNewStatementData } from "../../../../redux/statementReducer/actionsStatement";

import { MAIN_URL, PORT, API_ADD_STATEMENT_FILE_DOWNLOAD } from "../../../../constants/constants";

import styles from "./AppFooter.module.css";

export default function AppFooter({ handleFile }) {
  const [newInfo, setNewInfo] = useState({
    appDate: new Date().toLocaleDateString().split(".").reverse().join("-"),
  });
  const dispatch = useDispatch();
  const newStatement = useSelector((state) => {
    const { statementReducer } = state;
    return statementReducer.newStatement;
  });
  const handleChange = (e) => {
    switch (true) {
      case e.target.id === "file":
        if (e.target.files[0]) {
          handleFile(e.target.files[0]);
          // dispatch(addNewStatementData({ [`${e.target.id}`]: e.target.files[0] }));
        }
        break;
      default:
        dispatch(addNewStatementData({ [`${e.target.id}`]: e.target.value }));
        break;
    }
    newInfo[`${e.target.id}`] = e.target.value;
    setNewInfo(structuredClone(newInfo));
  };

  return (
    <>
      <Form.Group className={styles.header}>
        <Form.Label>Файл заявления</Form.Label>
        <Form.Control
          // data-id={item.key}
          id="file"
          type="file"
          // isInvalid={!!errors[item.key]}
          accept=".doc,.docx,.pdf"
          onChange={(e) => {
            handleChange(e);
          }}
        />
        {/* <Form.Control.Feedback type={"invalid"}>
            {errors[item.key]}
          </Form.Control.Feedback> */}
      </Form.Group>
      {newStatement.fileType && (
        <a
          href={`${MAIN_URL}${PORT}${API_ADD_STATEMENT_FILE_DOWNLOAD}${
            newStatement[newStatement.fileType].docname
          }`}>
          {newStatement[newStatement.fileType].docname}
        </a>
      )}
      <Form.Group className={styles.header}>
        <Form.Label>Количество листов:</Form.Label>
        <Form.Control
          id="appSheetCnt"
          defaultValue={""}
          type="text"
          onChange={(e) => {
            handleChange(e);
          }}
        />
      </Form.Group>
      <Form.Group className={styles.header}>
        <Form.Label>Должностное лицо:</Form.Label>
        <Form.Control
          id="inspector"
          value={1}
          type="text"
          onChange={(e) => {
            handleChange(e);
          }}
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
