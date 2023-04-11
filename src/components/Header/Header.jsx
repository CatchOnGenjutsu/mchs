import React, { useEffect, useState } from 'react';
import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';

function Header(props) {
  const [isLogin, setIsLogin]= useState("");
  const handleExit = (e) => {
    e.preventDefault();
    
  }
  useEffect(() => {
    window.location.href.includes("login") ? setIsLogin("login") : setIsLogin("")
  }, [window.location.href]);
  return (
  <div className={styles.header_bg}>
    <div className={styles.left_header_block}>
    <img
      alt="main-logo"
      className={styles.main_logo}
      src="/assets/main_logo.png"></img>
    <img
      alt="gims-logo"
      className={styles.gims_logo}
      src="/assets/gims-logo.png"></img>
    <div className={styles.titles_container}>
      <h1 className={styles.page_title}>
      МИНИСТЕРСТВО ПО ЧРЕЗВЫЧАЙНЫМ СИТУАЦИЯМ РЕСПУБЛИКИ БЕЛАРУСЬ
      </h1>
      <h2 className={styles.page_title_secondary}>
      Государственная инспекция по маломерным судам
      </h2>
    </div>
    </div>

    {!isLogin &&<NavLink
      className={styles['exit-button']}
      to={'/login'}
      >
      <button
        onClick={() => window.location.pathname = "http://localhost:3005/login" }
        type="button"
        className={`${styles.logout} btn btn-primary`}>
        ВЫХОД
      </button>
    </NavLink>}

  </div>
  );
}

export default Header;
