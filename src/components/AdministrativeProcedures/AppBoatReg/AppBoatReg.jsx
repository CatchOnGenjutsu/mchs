import React from "react";
import { useSelector } from "react-redux";
import InfoRepresentPerson from "../commonComponents/InfoRepresentPerson/InfoRepresentPerson";
import InformationAboutIndividual from "../commonComponents/InformationAboutIndividual/InformationAboutIndividual";
import { boatCardAppEngDtoList, boatCardAppSmDtoList } from "./tableOptions";
import TableAppBoatReg from "../commonComponents/TablesAppBoatReg/TableAppBoatReg";

import styles from "./AppBoatReg.module.css";

export default function AppBoatReg() {
  const appRegData = useSelector((state) => {
    const { smallBoatsRegReducer } = state;
    return smallBoatsRegReducer.appRegData;
  });
  const boatCardAppEngList = useSelector((state) => {
    const { boatRegReducer } = state;
    return boatRegReducer.boatCardAppEngList;
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
      <InformationAboutIndividual />
      <InfoRepresentPerson />
      <TableAppBoatReg
        tableOptions={boatCardAppEngDtoList}
        // data={boatCardAppEngList}
      />
      <TableAppBoatReg
        tableOptions={boatCardAppSmDtoList}
        // data={boatCardAppEngList}
      />
    </div>
  );
}
