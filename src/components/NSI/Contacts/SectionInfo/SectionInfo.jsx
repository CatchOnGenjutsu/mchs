import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ProgressBar } from "react-loader-spinner";

import { MAIN_URL, PORT, API_GET_SECTION_INFO } from "../../../../constants/constants";

import styles from "./SectionInfo.module.css";

export default function SectionInfo() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const location = useLocation();
  const { sctName } = location.state;

  const fetchData = async () => {
    const path = window.location.pathname.split("/");
    const id = path[path.length - 1];
    const request = await fetch(MAIN_URL + PORT + API_GET_SECTION_INFO + id);
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
          <h2>{sctName}</h2>
          <table className={styles.primary_table}>
            <thead>
              <tr>
                <th className={styles.col_other}>Должность</th>
                <th className={styles.col_other}>ФИО</th>
                <th className={styles.col_tel}>Телефон</th>
                <th className={styles.col_other}>Приемный день</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => {
                return (
                  <tr>
                    <td>{item.userPositions.posName}</td>
                    <td>{item.name}</td>
                    <td>{item.phone}</td>
                    <td>{item.note}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
