import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form } from "react-bootstrap";
import InfoRepresentPerson from "../commonComponents/InfoRepresentPerson/InfoRepresentPerson";
import InformationAboutIndividual from "../commonComponents/InformationAboutIndividual/InformationAboutIndividual";
import InformationAboutBoat from "../commonComponents/InformationAboutBoat/InformationAboutBoat";
import TableAppBoatReg from "../commonComponents/TablesAppBoatReg/TableAppBoatReg";
import AppFooter from "../commonComponents/AppFooter/AppFooter";

import { addNewStatementData } from "../../../redux/statementReducer/actionsStatement";
import { boatCardAppEngDtoList, boatCardAppSmDtoList } from "./tableOptions";

import styles from "./AppBoatReg.module.css";
import { useLocation } from "react-router-dom";

export default function AppBoatReg() {
  const location = useLocation();
  const { type } = location.state;
  const dispatch = useDispatch();

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

  const handleSave = (e) => {
    const newEngData = boatCardAppEngList.map((item) => {
      delete item.innerId;
      return item;
    });
    dispatch(addNewStatementData({ ["boatCardAppEngList"]: newEngData }));
    console.log("newStatement", newStatement);
  };
  useEffect(() => {
    type === "individual"
      ? dispatch(addNewStatementData({ ["personType"]: 1 }))
      : dispatch(addNewStatementData({ ["personType"]: 2 }));
  }, []);
  return (
    <>
      <h2>Заявление</h2>
      <p className={styles.sub_text}>
        о государственной регистрации и классификации маломерных судов, за
        исключением гребных лодок, байдарок и надувных судов грузоподъемностью
        менее 225 килограммов
      </p>
      <div className={styles.content}>
        {/* <Form.Group className={styles.header}>
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
        </Form.Group> */}
        <InformationAboutIndividual />
        <InfoRepresentPerson />
        <InformationAboutBoat />
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
          onClick={(e) => handleSave(e)}>
          Зарегистрировать
        </Button>
        <Button variant="danger">Отказать</Button>
      </div>
    </>
  );
}
