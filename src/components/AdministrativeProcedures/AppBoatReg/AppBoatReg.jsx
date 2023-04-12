import React from "react";
import { useSelector } from "react-redux";
import { InfoRepresentPerson } from "../commonComponents/InfoRepresentPerson/InfoRepresentPerson";

import styles from "./AppBoatReg.module.css";

export default function AppBoatReg() {
  const appRegData = useSelector((state) => {
    const { smallBoatsRegReducer } = state;
    return smallBoatsRegReducer.appRegData;
  });
  console.log("appRegData", appRegData);
  return (
    <div className={styles.content}>
      <h2>Заявление</h2>
      <p className={styles.sub_text}>
        о государственной регистрации и классификации маломерных судов, за
        исключением гребных лодок, байдарок и надувных судов грузоподъемностью
        менее 225 килограммов
      </p>
      <InfoRepresentPerson />
    </div>
  );
}
