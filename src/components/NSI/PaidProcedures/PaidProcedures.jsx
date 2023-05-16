import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NsiModalWindow from "../NsiModalWindow/NsiModalWindow";
import ConfirmModalWindow from "../ConfirmModalWindow/ConfirmModalWindow";

import { ProgressBar } from "react-loader-spinner";
import { optionsPaidProc } from "../NsiModalWindow/NsiModalWindowSettings";

import { MAIN_URL, PORT, API_GET_PAID_PROC_INFO } from "../../../constants/constants";

import styles from "./PaidProcedures.module.css";

export default function PaidProcedures() {
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
        switch (true) {
          case window.location.pathname.includes("legislation") || window.location.pathname.includes("forms"):
            setDataForEdit({
              ["docName"]: data.find((item) => Number(item.id) === Number(currentId)).docName,
            });
            break;
          case window.location.pathname.includes("paidproc"):
            setDataForEdit(data.find((item) => Number(item.id) === Number(currentId)));
            break;
          default:
            break;
        }
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
    const request = await fetch(MAIN_URL + PORT + API_GET_PAID_PROC_INFO);
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
          <h2>Платные услуги</h2>
          <div className={styles.caption_text}>
            Перечень платных услуг, оказываемых ГИМС и перечисляемых на счет BY06AKBB36329524001190000000
            государственного учреждения "Государственная инспекция по маломерным судам" ЦБУ 524 ОАО "АСБ
            Беларусбанк", МФО AKBBBY2X, УНП 100048748
          </div>
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
                <th className={styles.col_check_head}></th>
                <th className={styles.col_name_head}>Наименование услуги</th>
                <th className={styles.col_number_head}>Номер кода</th>
                <th className={styles.col_sum_head}>Стоимость</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                return (
                  <tr>
                    <td className={styles.col_check_body}>
                      <div
                        className={`${styles.custom_checkbox} ${
                          Number(currentId) === Number(item.id) ? styles.custom_checkbox_checked : ""
                        }`}
                        id={item.id}
                        onClick={(e) => handleCheckboxClick(e)}></div>
                    </td>
                    <td className={styles.col_name_body}>{item.name}</td>
                    <td className={styles.col_number_body}>{item.codeNumber}</td>
                    <td className={styles.col_sum_body}>{item.sum}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {showModal && (
            <NsiModalWindow
              setShowModal={setShowModal}
              showModal={showModal}
              modalWindowInputs={optionsPaidProc}
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
