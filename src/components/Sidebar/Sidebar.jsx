import React, { useState, useEffect } from "react";
import styles from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";
import { sidebarSettings } from "./sidebarSettings";
import { v4 as uuidv4 } from "uuid";

export default function Sidebar() {
  const [sidebarListArray, setSidebarListArray] = useState(sidebarSettings);
  const [isLogin, setIsLogin] = useState("");

  const showDropdownMenu = (e) => {
    setSidebarListArray(
      sidebarListArray.map((item) => {
        if (item[1] === e.currentTarget.dataset.title && item[2] !== undefined) {
          item[2].isHidden = !item[2].isHidden;
        } else if (e.currentTarget.dataset.title === "undefined" && item[2] !== undefined) {
          item[2].isHidden = true;
        }
        return item;
      }),
    );
  };

  const handleColorChange = (e) => {
    const oldElem = document.querySelector(`.${styles["colored"]}`);
    if (oldElem) oldElem.classList.remove(styles["colored"]);
    const newElem = document.querySelector(`#${e.target.id}`);
    newElem.classList.add(styles["colored"]);
  };
  useEffect(() => {
    window.location.href.includes("login") ? setIsLogin("login") : setIsLogin("");
  });
  if (!isLogin) {
    return (
      <div className={styles["sidebar-container"]}>
        <ul className={styles["sidebar-list"]}>
          {sidebarListArray.map((item) => (
            <>
              {item[2].listModal.length !== 0 ? (
                <>
                  <li
                    onClick={showDropdownMenu}
                    className={styles["sidebar-list-item"]}
                    data-title={item[1]}
                    key={uuidv4()}>
                    {item[0]}
                    {item[2].listModal.length !== 0 && (
                      <img
                        alt="arrow icon"
                        className={!item[2].isHidden ? styles["rotated-image"] : ""}
                        src="/assets/icon-down-arrow.png"></img>
                    )}
                  </li>
                  <ul
                    className={styles["sidebar-list-modal"]}
                    // onClick={handleColorChange}
                    hidden={item[2].isHidden}>
                    {item[2] !== undefined
                      ? item[2].listModal.map((elem) => (
                          <NavLink
                            className={({ isActive }) =>
                              isActive
                                ? `${styles["sidebar-list-item-modal"]} ${styles["colored"]}`
                                : `${styles["sidebar-list-item-modal"]} `
                            }
                            to={`/${elem.id}`}
                            key={uuidv4()}
                            data-id={elem.id}>
                            {elem.title}
                          </NavLink>
                        ))
                      : null}
                  </ul>
                  {/* {item[2] !== undefined ? ( */}

                  {/* ) : null} */}
                </>
              ) : (
                <li
                  onClick={handleColorChange}
                  className={styles["sidebar-list-item"]}
                  data-title={item[1]}
                  id={item[1]}
                  key={uuidv4()}>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? `${styles["sidebar-nolist-item"]} ${styles["colored"]}`
                        : `${styles["sidebar-nolist-item"]}`
                    }
                    to={`/${item[1]}`}
                    key={uuidv4()}
                    id={item[1]}>
                    {item[0]}
                  </NavLink>
                </li>
              )}
            </>
          ))}
        </ul>
      </div>
    );
  }
}
