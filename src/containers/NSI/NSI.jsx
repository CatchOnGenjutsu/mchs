import React from "react";
import { NavLink } from "react-router-dom";
import { NSIsettings } from "./NSIsettings";

import styles from "./NSI.module.css";

export default function NSI() {
  return (
    <>
      <h2>Нормативно-справочная информация</h2>
      <div className={styles.content}>
        {NSIsettings.map((item) => {
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
