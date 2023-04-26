import React, { useState } from "react";
import { useSelector } from "react-redux";
import InfoRepresentPerson from "../commonComponents/InfoRepresentPerson/InfoRepresentPerson";
import InformationAboutIndividual from "../commonComponents/InformationAboutIndividual/InformationAboutIndividual";
import TableAppBoatReg from "../commonComponents/TablesAppBoatReg/TableAppBoatReg";
import AppFooter from "../commonComponents/AppFooter/AppFooter";
import { Button, Form } from "react-bootstrap";
import { boatCardAppEngDtoList, boatCardAppSmDtoList } from "./tableOptions";

import styles from "./AppBoatReg.module.css";
import { useLocation } from "react-router-dom";

export default function AppBoatReg() {
  const location = useLocation();
  const { type } = location.state;
  // console.log()

  const [newApp, setNewApp] = useState({
    operDate: new Date().toLocaleDateString().split(".").reverse().join("-"),
    personType: type === "individual" ? 1 : 2,
  });

  const appRegData = useSelector((state) => {
    const { smallBoatsRegReducer } = state;
    return smallBoatsRegReducer.appRegData;
  });
  const boatCardAppEngList = useSelector((state) => {
    const { statementReducer } = state;
    return statementReducer.boatCardAppEngList;
  });
  const newStatement = useSelector((state) => {
    const { statementReducer } = state;
    return statementReducer.newStatement;
  });

  const handleChange = (e) => {
    newApp[`${e.target.id}`] = e.target.value;
    setNewApp(structuredClone(newApp));
  };
  return (
    <>
      <h2>Заявление</h2>
      <p className={styles.sub_text}>
        о государственной регистрации и классификации маломерных судов, за
        исключением гребных лодок, байдарок и надувных судов грузоподъемностью
        менее 225 килограммов
      </p>
      <div className={styles.content}>
        <Form.Group className={styles.header}>
          <Form.Label>Субъект хозяйствования:</Form.Label>
          <Form.Control
            value={
              type === "individual" ? "Физическое лицо" : "Юридическое лицо"
            }
            type="text"
            readOnly={true}
            disabled={true}
          />
        </Form.Group>
        <Form.Group className={styles.header}>
          <Form.Label>Номер судового билета:</Form.Label>
          <Form.Control
            id="tiketNum"
            value={newApp.tiketNum}
            type="text"
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>
        <Form.Group className={styles.header}>
          <Form.Label>Дата выдачи судового билета:</Form.Label>
          <Form.Control
            id="operDate"
            value={newApp.operDate}
            type="date"
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>
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
        <AppFooter />
      </div>
      <div className={styles.buttons_container}>
        <Button
          variant="primary"
          className=""
          onClick={() => {
            console.log("newStatement", newStatement);
          }}>
          Зарегистрировать
        </Button>
        <Button variant="danger">Отказать</Button>
      </div>
    </>
  );
}
