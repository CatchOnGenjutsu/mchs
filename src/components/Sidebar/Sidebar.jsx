import React, { useState, useEffect } from 'react';
import styles from './Sidebar.module.css';
import { NavLink } from 'react-router-dom';
import { sidebarSettings } from './sidebarSettings';
import { v4 as uuidv4 } from 'uuid';


export default function Sidebar() {
  const [sidebarListArray, setSidebarListArray] = useState(sidebarSettings);
  const [isLogin, setIsLogin]= useState("")


  const showDropdownMenu = (e) => {
  setSidebarListArray(
    sidebarListArray.map((item) => {
      if (item[1] === e.currentTarget.dataset.title && item[2] !== undefined) {
        item[2].isHidden = !item[2].isHidden;
      } else if (
        e.currentTarget.dataset.title === 'undefined' &&
        item[2] !== undefined
      ) {
        item[2].isHidden = true;
      }
      return item;
    })
  );
  };

  const handleSubmenuColorChange = (e) => {
  setSidebarListArray(
    sidebarListArray.map((item) => {
      item[2].listModal.map((elem) => {
        if (elem.id === e.target.dataset.id) {
        elem.colored = true;
        } else if (e.target.dataset.id === 'undefined') {
        elem.colored = false;
        } else {
        elem.colored = false;
        }
        return elem;
      });
      return item;
    })
  );
  };
  useEffect(() => {
    window.location.href.includes("login") ? setIsLogin("login") : setIsLogin("")
    console.log("window.location.href", window.location.href)
  })
  if (!isLogin) {
    return (  
      <div className={styles['sidebar-container']}>
        <ul className={styles['sidebar-list']}>
        {sidebarListArray.map((item) => (
          <>
            <li
              onClick={showDropdownMenu}
              className={styles['sidebar-list-item']}
              data-title={item[1]}
              key={uuidv4()}>
                {item[0]}
              {item[2].listModal.length !== 0 ? (
                <img
                  alt="arrow icon"
                  className={!item[2].isHidden ? styles['rotated-image'] : ''}
                  src="/assets/icon-down-arrow.png"></img>
              ) : null}
            </li>
            {item[2] !== undefined ? (
              <ul
                className={styles['sidebar-list-modal']}
                onClick={handleSubmenuColorChange}
                hidden={item[2].isHidden}>
                  {item[2] !== undefined
                    ? item[2].listModal.map((elem) => (
                      <NavLink
                        className={({ isActive }) =>
                          isActive
                          ? `${styles['sidebar-list-item-modal']} ${styles['colored']}`
                          : `${styles['sidebar-list-item-modal']} `
                        }
                        to={`/${elem.id}`}
                        key={uuidv4()}
                        data-id={elem.id}>
                      {elem.title}
                      </NavLink>
                    ))
                  : null}
              </ul>
            ) : null}
          </>
        ))}
        </ul>
      </div>
    );
  }
}
