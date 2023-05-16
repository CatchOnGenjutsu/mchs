import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NsiModalWindow from "../NsiModalWindow/NsiModalWindow";
import ConfirmModalWindow from "../ConfirmModalWindow/ConfirmModalWindow";

import { ProgressBar } from "react-loader-spinner";
import { optionsAdministrativeProcedures } from "../NsiModalWindow/NsiModalWindowSettings";

import { MAIN_URL, PORT, API_GET_ADMIN_PROC } from "../../../constants/constants";

import styles from "./AdministrativeProcedures.module.css";

export default function AdministrativeProcedures() {
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
        setDataForEdit(data.find((item) => Number(item.code) === Number(currentId)));
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
    const request = await fetch(MAIN_URL + PORT + API_GET_ADMIN_PROC);
    const response = await request.json();
    console.log(response);
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
          <h2>Административные процедуры</h2>
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
                <th className={styles.col_main_head}>Наименование административной процедуры</th>
                <th className={styles.col_main_head}>
                  Документы и (или) сведения, представляемые заинтресованным лицом для осуществления АП
                </th>
                <th className={styles.col_main_head}>
                  Вид и размер платы, взимаемой при осуществлении административной процедуры
                </th>
                <th className={styles.col_main_head}>Максимальный срок осуществления процедуры</th>
                <th className={styles.col_main_head}>
                  Срок действия справки или другого документа, выдаваемого при осуществлении АП
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                return (
                  <tr>
                    <td className={styles.col_num_body}>
                      <div
                        className={`${styles.custom_checkbox} ${
                          Number(currentId) === Number(item.code) ? styles.custom_checkbox_checked : ""
                        }`}
                        id={item.code}
                        onClick={(e) => handleCheckboxClick(e)}></div>
                    </td>
                    <td className={styles.col_main_body}>{item.name}</td>
                    <td className={styles.col_main_body}>{item.docs}</td>
                    <td className={styles.col_main_body}>{item.sum}</td>
                    <td className={styles.col_main_body}>{item.time1}</td>
                    <td className={styles.col_main_body}>{item.time2}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {showModal && (
            <NsiModalWindow
              setShowModal={setShowModal}
              showModal={showModal}
              modalWindowInputs={optionsAdministrativeProcedures}
              fetchData={fetchData}
              mode={mode}
              dataForEdit={dataForEdit}
              setDataForEdit={setDataForEdit}
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
