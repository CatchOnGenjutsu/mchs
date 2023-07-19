import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";

import { sidebarSettings } from "./sidebarSettings";
import { clearNewStatement } from "../../../redux/statementReducer/actionsStatement";

import { v4 as uuidv4 } from "uuid";

import styles from "./Sidebar.module.css";

import {
  Sidebar as SidebarCustom,
  sidebarClasses,
  Menu,
  MenuItem,
  SubMenu,
  menuClasses,
} from "react-pro-sidebar";

export default function Sidebar() {
  const [isLogin, setIsLogin] = useState("");

  useEffect(() => {
    window.location.href.includes("login") ? setIsLogin("login") : setIsLogin("");
  }, [window.location.pathname]);

  const themeSetting = {
    menu: {
      menuContent: "rgb(57, 68, 77)",
      icon: "#59d0ff",
      hover: {
        backgroundColor: "rgb(161, 170, 187)",
        color: "rgb(0, 0, 0)",
      },
    },
  };
  const menuItemStyles = {
    SubMenuExpandIcon: {
      color: "white",
      "&:hover": {
        color: "rgb(0, 0, 0)",
      },
    },
    subMenuContent: ({ level }) => ({
      backgroundColor: level === 0 ? themeSetting.menu.menuContent : "transparent",
    }),
    button: {
      "&:hover": {
        backgroundColor: themeSetting.menu.hover.backgroundColor,
        color: themeSetting.menu.hover.color,
      },
      [`&.active`]: {
        backgroundColor: "rgb(0, 0, 0)",
        color: "white",
      },
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  };
  return (
    <SidebarCustom
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          position: "fixed",
          top: "10vh",
          height: "90vh",
          width: "max-content",
          paddingTop: "1vh",
          color: "white",
          userSelect: "none",
        },
      }}
      backgroundColor="rgba(72, 86, 97, 255)"
      hidden={isLogin === "login" ? true : false}>
      <Menu menuItemStyles={menuItemStyles}>
        {Object.values(sidebarSettings).map((item) => {
          if (item.listModal.length > 0) {
            return (
              <SubMenu label={item.title}>
                {item.listModal.map((elem) => {
                  return (
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? `${styles.sidebar_navlink} ${styles.colored}`
                          : `${styles.sidebar_navlink} `
                      }
                      to={`/${elem.id}`}>
                      <MenuItem>{elem.title}</MenuItem>
                    </NavLink>
                  );
                })}
              </SubMenu>
            );
          } else {
            return (
              <NavLink
                className={({ isActive }) =>
                  isActive ? `${styles.sidebar_navlink} ${styles.colored}` : `${styles.sidebar_navlink} `
                }
                to={`/${item.id}`}>
                <MenuItem className={styles.sidebar_menuitem}>{item.title}</MenuItem>
              </NavLink>
            );
          }
        })}
      </Menu>
    </SidebarCustom>
  );
}
