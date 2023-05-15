import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NsiModalWindow from "../NsiModalWindow/NsiModalWindow";
import ConfirmModalWindow from "../ConfirmModalWindow/ConfirmModalWindow";

import { ProgressBar } from "react-loader-spinner";
import { optionsLegislation } from "../NsiModalWindow/NsiModalWindowSettings";

import {
  MAIN_URL,
  PORT,
  API_GET_LEGISLATION_INFO,
  API_DOWNLOAD_LEGISLATION_FILE,
} from "../../../constants/constants";

import styles from "./Legislation.module.css";

export default function Legislation() {
  const [data, setData] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [mode, setMode] = useState("");
  const [dataForEdit, setDataForEdit] = useState({});

  const navigate = useNavigate();

  const handleCheckboxClick = (e) => {
    setCurrentId(e.target.id !== currentId ? e.target.id : null);
  };

  const handleButtonClick = (e) => {
    switch (e.target.id) {
      case "add":
        setMode(e.target.id);
        setShowModal(true);
        break;
      case "edit":
        setMode(e.target.id);
        setDataForEdit({ ["docName"]: data.find((item) => Number(item.id) === Number(currentId)).docName });
        setShowModal(true);
        break;
      case "delete":
        setShowConfirmModal(true);
        break;
      default:
        break;
    }
  };

  const fetchData = async () => {
    const request = await fetch(MAIN_URL + PORT + API_GET_LEGISLATION_INFO);
    const response = await request.json();
    setData(response);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className={`d-flex flex-column align-items-center `}>
          <ProgressBar
            height="80"
            width="80"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass="progress-bar-wrapper"
            borderColor="#F4442E"
            barColor="#51E5FF"
          />
        </div>
      ) : (
        <>
          <h2>Законодательство</h2>
          <div className={styles.buttons_container}>
            <div
              className={styles.add_button}
              id={"add"}
              onClick={(e) => handleButtonClick(e)}>
              Добавить строку
            </div>
            <div
              className={`${styles.edit_button} ${!currentId ? styles.disabled_button : ""}`}
              id={"edit"}
              onClick={(e) => handleButtonClick(e)}>
              Редактировать строку
            </div>
            <div
              className={`${styles.close_button} ${!currentId ? styles.disabled_button : ""}`}
              id={"delete"}
              onClick={(e) => handleButtonClick(e)}>
              Удалить строку
            </div>
          </div>
          <table className={styles.primary_table}>
            <thead>
              <tr>
                <th className={styles.col_num_head}></th>
                <th className={styles.col_num_head}>№</th>
                <th className={styles.col_name_head}>Наименование документа</th>
                <th className={styles.col_doc_head}>Документ</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                return (
                  <tr>
                    <td className={styles.col_num_body}>
                      <div
                        className={`${styles.custom_checkbox} ${
                          Number(currentId) === Number(item.id) ? styles.custom_checkbox_checked : ""
                        }`}
                        id={item.id}
                        onClick={(e) => handleCheckboxClick(e)}></div>
                    </td>
                    <td className={styles.col_num_body}>{index + 1}</td>
                    <td className={styles.col_name_body}>{item.docName}</td>
                    <td className={styles.col_doc_body}>
                      <a
                        href={`${MAIN_URL}${PORT}${API_DOWNLOAD_LEGISLATION_FILE}${item.docid.docid}`}
                        // rel="noopener noreferrer"
                      >
                        <img
                          alt="doc-logo"
                          className={styles.gims_logo}
                          src="/assets/icon_doc.svg"></img>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {showModal && (
            <NsiModalWindow
              setShowModal={setShowModal}
              showModal={showModal}
              modalWindowInputs={optionsLegislation}
              fetchData={fetchData}
              mode={mode}
              dataForEdit={dataForEdit}
              id={currentId}
              setCurrentId={setCurrentId}
            />
          )}
          {showConfirmModal && (
            <ConfirmModalWindow
              setShowModal={setShowConfirmModal}
              showModal={showConfirmModal}
              fetchData={fetchData}
              id={currentId}
              setCurrentId={setCurrentId}
            />
          )}
          <div
            className={styles.add_button}
            onClick={() => navigate(-1)}>
            Назад
          </div>
        </>
      )}
    </>
  );
}
