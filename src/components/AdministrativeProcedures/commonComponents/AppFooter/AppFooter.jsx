import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { addNewStatementData } from "../../../../redux/statementReducer/actionsStatement";

import {
  MAIN_URL,
  PORT,
  API_ADD_STATEMENT_FILE_DOWNLOAD,
  API_DOWNLOAD_FILE_MODIF,
} from "../../../../constants/constants";

import styles from "./AppFooter.module.css";

export default function AppFooter({ inputData, mode, updateNewData, handleFile }) {
  const [newInfo, setNewInfo] = useState({
    appDate: new Date().toLocaleDateString().split(".").reverse().join("-"),
  });
  const dispatch = useDispatch();
  const newStatement = useSelector((state) => {
    const { statementReducer } = state;
    return statementReducer.newStatement;
  });
  const newAppDupl = useSelector((state) => {
    const { DuplicateShipsTicketReducer } = state;
    return DuplicateShipsTicketReducer.newAppDupl;
  });
  const data = !!inputData
    ? { ...inputData }
    : window.location.pathname.includes("dupshipsticket")
    ? { ...newAppDupl }
    : { ...newStatement };

  const handleChange = (e) => {
    switch (true) {
      case e.target.id === "file":
        if (e.target.files[0]) {
          // console.log(e.target.files);
          handleFile(e.target.files[0]);
          // dispatch(addNewStatementData({ [`${e.target.id}`]: e.target.files[0] }));
        }
        break;
      default:
        if (!window.location.pathname.includes("reginformationchanges")) {
          if (window.location.pathname.includes("dupshipsticket")) {
            updateNewData(e.target.id, e.currentTarget.value);
          } else {
            dispatch(addNewStatementData({ [`${e.target.id}`]: e.target.value }));
          }
        } else {
          updateNewData(e.target.id, e.currentTarget.value);
        }
        break;
    }
    newInfo[`${e.target.id}`] = e.target.value;
    setNewInfo(structuredClone(newInfo));
  };

  return (
    <div className={styles.content_container}>
      {mode !== "view" && (
        <Form.Group className={styles.header}>
          <Form.Label>Файл заявления</Form.Label>
          <Form.Control
            id="file"
            type="file"
            // multiple={true}
            // isInvalid={!!errors[item.key]}
            accept=".doc,.docx,.pdf"
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </Form.Group>
      )}
      {data.fileType && (
        <div className={styles.file_area}>
          <p className="me-2">Файл заявления:</p>
          <a href={`${MAIN_URL}${PORT}${API_ADD_STATEMENT_FILE_DOWNLOAD}${data[data.fileType].docid}`}>
            {data[data.fileType].docname}
          </a>
        </div>
      )}
      {data.fileId && (
        <div className={styles.file_area}>
          <p className="me-2">Файл заявления:</p>
          <a href={`${MAIN_URL}${PORT}${API_DOWNLOAD_FILE_MODIF}${data.fileId}`}>{data.fileName}</a>
        </div>
      )}
      <Form.Group className={styles.header}>
        <Form.Label>Количество листов:</Form.Label>
        <Form.Control
          id="appSheetCnt"
          value={data.appSheetCnt}
          type="text"
          readOnly={mode === "view"}
          disabled={mode === "view" ? true : false}
          onChange={(e) => {
            handleChange(e);
          }}
        />
      </Form.Group>
      <Form.Group className={styles.header}>
        <Form.Label>Должностное лицо:</Form.Label>
        <Form.Control
          id="inspector"
          value={data.inspector}
          type="text"
          readOnly={mode === "view"}
          disabled={mode === "view" ? true : false}
          onChange={(e) => {
            handleChange(e);
          }}
        />
      </Form.Group>
      <Form.Group className={styles.header}>
        <Form.Label>Дата подачи заявления:</Form.Label>
        <Form.Control
          id="appDate"
          value={data.appDate}
          type="date"
          readOnly={mode === "view"}
          disabled={mode === "view" ? true : false}
          onChange={(e) => handleChange(e)}
        />
      </Form.Group>
    </div>
  );
}
