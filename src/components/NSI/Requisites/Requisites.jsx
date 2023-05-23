import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NsiModalWindow from "../NsiModalWindow/NsiModalWindow";
import ConfirmModalWindow from "../ConfirmModalWindow/ConfirmModalWindow";

import { ProgressBar } from "react-loader-spinner";
import { optionsRequisitesChapter, optionsRequisitesLine } from "../NsiModalWindow/NsiModalWindowSettings";

import { MAIN_URL, PORT, API_GET_REQUISITES_INFO } from "../../../constants/constants";

import styles from "./Requisites.module.css";

export default function Requisites() {
  const [data, setData] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [mode, setMode] = useState("");
  const [dataForEdit, setDataForEdit] = useState({});
  const [options, setOptions] = useState([]);
  const [type, setType] = useState([]);

  const navigate = useNavigate();

  const handleCheckboxClick = (e) => {
    setCurrentId(e.target.id !== currentId ? e.target.id : null);
  };

  const handleButtonClick = (e) => {
    switch (e.target.id) {
      case "add":
        setMode(e.target.id);
        setOptions(optionsRequisitesChapter);
        setShowModal(true);
        setType("chapter");
        setDataForEdit({});
        break;
      case "edit":
        setMode(e.target.id);
        setOptions(optionsRequisitesChapter);
        setType("chapter");
        switch (true) {
          case window.location.pathname.includes("legislation") || window.location.pathname.includes("forms"):
            setDataForEdit({
              ["docName"]: data.find((item) => Number(item.id) === Number(currentId)).docName,
            });
            break;
          case window.location.pathname.includes("paidproc"):
            setDataForEdit(data.find((item) => Number(item.id) === Number(currentId)));
            break;
          case window.location.pathname.includes("requisites"):
            setDataForEdit(data.find((item) => Number(item.infPaymentApId) === Number(currentId)));
            break;
          default:
            break;
        }
        setShowModal(true);
        break;
      case "delete":
        setType("chapter");
        setShowConfirmModal(true);
        break;
      default:
        break;
    }
  };

  const handleLineButtonClick = (e) => {
    switch (e.target.dataset.type) {
      case "add":
        setMode(e.target.dataset.type);
        setOptions(optionsRequisitesLine);
        setCurrentId(e.target.id);
        setDataForEdit({});
        setShowModal(true);
        setType("line");
        break;
      case "edit":
        setMode(e.target.dataset.type);
        setOptions(optionsRequisitesLine);
        setCurrentId(e.target.id);
        setType("line");
        setDataForEdit(
          data
            .find((item) => Number(item.infPaymentApId) === Number(e.target.dataset.chapterid))
            .infPaymentApDetList.find((elem) => Number(elem.id) === Number(e.target.id)),
        );
        setShowModal(true);
        break;
      case "delete":
        setCurrentId(e.target.id);
        setType("line");
        setShowConfirmModal(true);
        break;
      default:
        break;
    }
  };

  const fetchData = async () => {
    const request = await fetch(MAIN_URL + PORT + API_GET_REQUISITES_INFO);
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
          <h2>Реквизиты для оплаты административных процедур и услуг оказываемых ГИМС</h2>
          <div className={styles.caption_text}>
            Оплату рекомендуется осуществлять посредвом Автоматизированной Информационной Системы Единого
            Расчетного и Информационного Пространства{" "}
            <a
              href="https://raschet.by/main.aspx?guid=1001"
              target="_blank"
              rel="noreferrer noopener">
              (АИС ЕРИП)
            </a>
            <p className={styles.caption_secondary_text}>
              В каталоге сиcтемы "Расчет" услуги “Название организации” находятся в разделе:<br></br>
              Прочие платежи - Товары, работы и услуги - г. Минск - ГИМС - (выбор услуги из списка)
            </p>
          </div>
          <div className={styles.buttons_container}>
            <div
              className={styles.add_button}
              id={"add"}
              onClick={(e) => handleButtonClick(e)}>
              Добавить раздел
            </div>
            <div
              className={`${styles.edit_button} ${!currentId ? styles.disabled_button : ""}`}
              id={"edit"}
              onClick={(e) => handleButtonClick(e)}>
              Редактировать раздел
            </div>
            <div
              className={`${styles.close_button} ${!currentId ? styles.disabled_button : ""}`}
              id={"delete"}
              onClick={(e) => handleButtonClick(e)}>
              Удалить раздел
            </div>
          </div>
          <table className={styles.primary_table}>
            <thead>
              <tr>
                <th
                  colSpan={1}
                  className={styles.col_check_head}></th>
                <th
                  colSpan={1}
                  className={styles.col_name_head}>
                  Наименование административной процедуры
                </th>
                <th
                  colSpan={1}
                  className={styles.col_number_head}>
                  Номер кода
                </th>
                <th
                  colSpan={2}
                  className={styles.col_sum_head}>
                  Стоимость
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => {
                return (
                  <>
                    <tr>
                      <td
                        colSpan={1}
                        className={`${styles.col_check_body} ${styles.col_check_body_first}`}>
                        <div
                          className={`${styles.custom_checkbox} ${
                            Number(currentId) === Number(item.infPaymentApId)
                              ? styles.custom_checkbox_checked
                              : ""
                          }`}
                          id={item.infPaymentApId}
                          onClick={(e) => handleCheckboxClick(e)}></div>
                      </td>
                      <th colSpan={2}>{item.apName}</th>
                      <th colSpan={2}>
                        <div
                          id={item.infPaymentApId}
                          data-type={"add"}
                          onClick={(e) => handleLineButtonClick(e)}
                          className={styles.add_line_btn_container}>
                          <div className={styles.plus_icon}></div> Добавить строку
                        </div>
                      </th>
                    </tr>
                    {item.infPaymentApDetList.map((elem, index, array) => {
                      return (
                        <tr>
                          <td
                            colSpan={1}
                            className={`${styles.col_check_body} ${
                              index !== array.length - 1
                                ? styles.col_check_body_middle
                                : styles.col_check_body_last
                            }`}></td>
                          <td
                            colSpan={1}
                            className={`${styles.col_name_body} ${styles.main_cols}`}>
                            {elem.detName}
                          </td>
                          <td
                            colSpan={1}
                            className={styles.col_number_body}>
                            {elem.codeNumber}
                          </td>
                          <td
                            colSpan={1}
                            className={styles.col_sum_body}>
                            {elem.sum}
                          </td>
                          <td
                            colSpan={1}
                            className={styles.col_btn_body}>
                            <div className={styles.line_btn_container}>
                              <button
                                className={`${styles.edit_buttons} btn btn-primary`}
                                onClick={(e) => handleLineButtonClick(e)}
                                data-type={"edit"}
                                data-chapterid={item.infPaymentApId}
                                id={elem.id}>
                                &#9998;
                              </button>
                              <button
                                className={`${styles.delete_buttons} btn btn-danger `}
                                onClick={(e) => handleLineButtonClick(e)}
                                data-type={"delete"}
                                id={elem.id}>
                                &#10006;
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                );
              })}
            </tbody>
          </table>
          {showModal && (
            <NsiModalWindow
              setShowModal={setShowModal}
              showModal={showModal}
              modalWindowInputs={options}
              fetchData={fetchData}
              mode={mode}
              dataForEdit={dataForEdit}
              setDataForEdit={setDataForEdit}
              id={currentId}
              setCurrentId={setCurrentId}
              type={type}
            />
          )}
          {showConfirmModal && (
            <ConfirmModalWindow
              setShowModal={setShowConfirmModal}
              showModal={showConfirmModal}
              fetchData={fetchData}
              id={currentId}
              setCurrentId={setCurrentId}
              type={type}
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
