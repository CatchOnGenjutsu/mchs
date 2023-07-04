import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import { sidebarSettings } from "./sidebarSettings";
import { clearNewStatement } from "../../../redux/statementReducer/actionsStatement";

import { v4 as uuidv4 } from "uuid";

import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const [sidebarListArray, setSidebarListArray] = useState(sidebarSettings);
  const [isLogin, setIsLogin] = useState("");
  const dispatch = useDispatch();

  const showDropdownMenu = (e) => {
    setSidebarListArray(
      Object.values(sidebarListArray).map((item) => {
        if (item.id === e.currentTarget.dataset.title && item.listModal !== undefined) {
          item.isHidden = !item.isHidden;
        } else if (e.currentTarget.dataset.title === "undefined" && item.listModal !== undefined) {
          item.isHidden = true;
        }
        return item;
      }),
    );
  };

  const handleMenuItemClick = () => {
    dispatch(clearNewStatement());
    setSidebarListArray(
      Object.values(sidebarListArray).map((item) => {
        const index = item.listModal.findIndex((elem) => elem.id === window.location.pathname.split("/")[1]);
        if (index >= 0) {
          item.isHidden = false;
        } else {
          item.isHidden = true;
        }
        return item;
      }),
    );
  };

  useEffect(() => {
    window.location.href.includes("login") ? setIsLogin("login") : setIsLogin("");
    setSidebarListArray(
      Object.values(sidebarListArray).map((item) => {
        const index = item.listModal.findIndex((elem) => elem.id === window.location.pathname.split("/")[1]);
        if (index >= 0) {
          item.isHidden = false;
        } else {
          item.isHidden = true;
        }
        return item;
      }),
    );
  }, [window.location.pathname]);
  if (!isLogin) {
    return (
      <div className={styles["sidebar-container"]}>
        <ul className={styles["sidebar-list"]}>
          {Object.values(sidebarListArray).map((item) => (
            <>
              {item.listModal.length !== 0 ? (
                <>
                  <li
                    onClick={showDropdownMenu}
                    className={styles["sidebar-list-item"]}
                    data-title={item.id}
                    key={uuidv4()}>
                    {item.title}
                    {item.listModal.length !== 0 && (
                      <img
                        alt="arrow icon"
                        className={!item.isHidden ? styles["rotated-image"] : ""}
                        src="/assets/icon-down-arrow.png"></img>
                    )}
                  </li>
                  <ul
                    key={uuidv4()}
                    className={`${styles["sidebar-list-modal"]} ${item.isHidden ? styles["hide"] : ""}`}>
                    {item.listModal !== undefined
                      ? item.listModal.map((elem) => (
                          <NavLink
                            onClick={() => handleMenuItemClick()}
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
                </>
              ) : (
                <NavLink
                  onClick={() => handleMenuItemClick()}
                  className={({ isActive }) =>
                    isActive
                      ? `${styles["sidebar-nolist-item"]} ${styles["colored"]}`
                      : `${styles["sidebar-nolist-item"]}`
                  }
                  to={`/${item.id}`}
                  key={uuidv4()}
                  id={item.id}>
                  {item.title}
                </NavLink>
              )}
            </>
          ))}
        </ul>
      </div>
    );
  }
}
