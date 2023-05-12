import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ProgressBar } from "react-loader-spinner";

import styles from "./ClassificationBoats.module.css";
import { MAIN_URL, PORT, API_GET_CLASSIFICATION_BOATS } from "../../../constants/constants";

export default function ClassificationBoats() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const handleCloseButton = () => {
    navigate(-1);
  };

  useEffect(() => {
    async function fetchData() {
      const request = await fetch(MAIN_URL + PORT + API_GET_CLASSIFICATION_BOATS);
      const response = await request.json();
      setData(response);
      setIsLoading(false);
    }
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
          <h2>Классификатор маломерных судов</h2>
          <table className={styles.primary_table}>
            <caption className={styles.primary_caption}>Типы маломерных судов</caption>
            <thead>
              <tr>
                <th className={styles.line_name}>Наименование</th>{" "}
                <th className={styles.line_value}>Описание</th>
              </tr>
            </thead>
            <tbody>
              {data.boatTypes.map((item) => {
                return (
                  <tr>
                    <td className={styles.line_name}>{item.btname}</td>
                    <td className={styles.line_value}>{item.btnote}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <table className={styles.primary_table}>
            <caption className={styles.primary_caption}>Виды маломерных судов</caption>
            <thead>
              <tr>
                <th className={styles.line_name}>Наименование</th>{" "}
                <th className={styles.line_value}>Описание</th>
              </tr>
            </thead>
            <tbody>
              {data.boatVids.map((item) => {
                return (
                  <tr>
                    <td className={styles.line_name}>{item.name}</td>
                    <td className={styles.line_value}></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <table className={styles.primary_table}>
            <caption className={styles.primary_caption}>Категория сложности района плавания</caption>
            <thead>
              <tr>
                <th className={styles.line_name}>Наименование</th>{" "}
                <th className={styles.line_value}>Описание</th>
              </tr>
            </thead>
            <tbody>
              {data.saCategories.map((item) => {
                return (
                  <tr>
                    <td className={styles.line_name}>{item.sacName}</td>
                    <td className={styles.line_value}>{item.sacNote}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div
            className={styles.back_button}
            onClick={() => handleCloseButton()}>
            Закрыть
          </div>
        </>
      )}
    </>
  );
}
