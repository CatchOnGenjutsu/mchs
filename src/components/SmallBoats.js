import React from "react";
import Header from "./Header.js";
import Sidebar from "./Sidebar.js";
import SearchBlock from "./SearchBlock.js";
import styles from "../styles/SmallBoats.module.css"

export default function SmallBoats() {
  const inputsHeaders = [
    {
      key: "firstname",
      value: "Имя"
    },
    {
      key: "secondname",
      value: "Фамилия"
    },
    {
      key: "lastname",
      value: "Отчество"
    },
    {
      key: "govnumber",
      value: "Гос. номер",
      description: "В формате 1111 XX-1"
    }
  ]
  return (
    <>
      <Header showButton={true} />
      <div className={styles["page-block"]}>
        <Sidebar />
        <div className={styles["content-block"]}>
          <h2>База данных маломерных судов</h2>
          <SearchBlock inputsHeaders={inputsHeaders} />
        </div>

      </div>

    </>

  )
}

