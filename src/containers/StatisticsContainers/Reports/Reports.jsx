import React from "react";
import { NavLink } from "react-router-dom";
import { ReportsSettings } from "./ReportsSettings";

import styles from "./Reports.module.css";

export default function Reports() {
  return (
    <>
      <h2>Отчёты</h2>
      <div className={styles.content}>
        {ReportsSettings.map((item) => {
          return (
            <div
              className={`${styles[`box-${item.id}`]} ${styles.link_container}`}
              id={item.id}>
              <NavLink
                className={styles.link}
                to={`./${item.id}`}>
                {item.title}
              </NavLink>
            </div>
          );
        })}
      </div>
    </>
  );
}
