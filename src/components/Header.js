import React from "react";
import "../styles/Header.css"


function Header(props) {
  return (
    <div className="header-bg">
      <div className="left-header-block">
        <img alt="main-logo" className="main-logo" src="../assets/main_logo.png"></img>
        <img alt="gims-logo" className="gims-logo" src="../assets/gims-logo.png"></img>
        <div className="titles-container">
          <h1 className="page-title">МИНИСТЕРСТВО ПО ЧРЕЗВЫЧАЙНЫМ СИТУАЦИЯМ РЕСПУБЛИКИ БЕЛАРУСЬ</h1>
          <h2 className="page-title-secondary">Государственная инспекция по маломерным судам</h2>
        </div>
      </div>
      {props.showButton === true ? <button type="button" className="logout btn btn-primary">ВЫХОД</button> : null}

    </div>
  )

}

export default Header;