import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ProgressBar } from "react-loader-spinner";

import { MAIN_URL, PORT, API_GET_CONTACTS_INFO } from "../../../constants/constants";

import styles from "./Contacts.module.css";

export default function Contacts() {
  const [data, setData] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const handleItemClick = (e) => {
    if (e) {
      navigate(`./${e.target.id}`, {
        state: { sctName: e.target.dataset.name },
      });
    }
  };

  const fetchData = async () => {
    const request = await fetch(MAIN_URL + PORT + API_GET_CONTACTS_INFO);
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
          <h2>Контакты</h2>
          <ul>
            {data.map((item) => {
              return (
                <li
                  onClick={(e) => handleItemClick(e)}
                  className={styles.list_item}
                  id={item.sctId}
                  data-name={item.sctName}>
                  {item.sctName}
                </li>
              );
            })}
          </ul>
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
