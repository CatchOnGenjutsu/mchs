import React, { useEffect } from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

function Header(props) {
  useEffect(() => {}, []);
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
    {props.showButton === true ? (
    <Link
      className={styles['exit-button']}
      to={'/login'}>
      <button
      type="button"
      className={`${styles.logout} btn btn-primary`}>
      ВЫХОД
      </button>
    </Link>
    ) : null}
  </div>
  );
}

export default Header;
