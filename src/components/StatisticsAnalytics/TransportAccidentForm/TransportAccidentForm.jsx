import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Form } from "react-bootstrap";
import Select from "react-select";

import TableAppBoatReg from "../../AdministrativeProcedures/commonComponents/TablesAppBoatReg/TableAppBoatReg";

import {
  TransportAccidentFormSettingsIndividual,
  TransportAccidentFormSettingsEntity,
  culpritsListOptions,
  injuredsListOptions,
  TransportAccidentFormSettingsFooter,
  setOptionsForInputsATE,
  setOptionsForInputsUsers,
  setOptionsForBoat,
} from "./TransportAccidentFormSettings";

import {
  setOptionsTypesBoat,
  setOptionsVidBoat,
  setOptionsBodyBoat,
  setReadOptionForInputs,
  setOptionsSaCategory,
} from "../../AdministrativeProcedures/commonComponents/utilities";

import styles from "./TransportAccidentForm.module.css";

export default function TransportAccidentForm() {
  const location = useLocation();
  const { mode } = location.state;

  const [transportAccidentFormSettings, setTransportAccidentFormSettings] = useState(
    window.location.pathname.includes("individual")
      ? TransportAccidentFormSettingsIndividual
      : TransportAccidentFormSettingsEntity,
  );
  const dataOptionsForSelectATE = useSelector((state) => {
    const { dictionaryReducer } = state;
    return dictionaryReducer.ateLibrary;
  });

  const dataOptionsForSelectATEValidated = [];
  dataOptionsForSelectATE.forEach((item) => {
    dataOptionsForSelectATEValidated.push({
      value: item.sctId,
      label: item.sctName,
      key: "section",
    });
  });

  setOptionsForInputsATE(dataOptionsForSelectATEValidated, window.location.pathname);

  const usersLib = useSelector((state) => {
    const { dictionaryReducer } = state;
    return dictionaryReducer.usersLibrary;
  });

  setOptionsForInputsUsers(usersLib, window.location.pathname);

  useEffect(() => {
    (async () => {
      const typesBoat = await setOptionsTypesBoat();
      const kindsBoat = await setOptionsVidBoat();
      // const materialsBodyBoat = await setOptionsBodyBoat();
      // const saCategory = await setOptionsSaCategory();
      setOptionsForBoat(typesBoat, kindsBoat, window.location.pathname);
    })();
  }, []);
  return (
    <>
      <h2>Добавить РК аварийного случая</h2>
      <div
        className={
          window.location.pathname.includes("individual")
            ? styles.grid_container_individual
            : styles.grid_container_entity
        }>
        {Object.values(transportAccidentFormSettings).length !== 0 &&
          Object.values(transportAccidentFormSettings).map((item) => {
            switch (item.type) {
              case "select":
                return (
                  <Form.Group
                    className={`${styles[`box-${item.key}`]} ${
                      styles[`form_group_flex_${item.flexDirection}`]
                    }`}>
                    <Form.Label className={styles.form_label}>{item.value}</Form.Label>
                    <Select
                      // ref={setRef(item)}
                      className={styles.input_element}
                      // onChange={(e) => handleValue(e)}
                      classNamePrefix="select"
                      placeholder="Выберите"
                      id={item.key}
                      // value={item.selectOption.find((item) => item.value === data[item.key])}
                      isDisabled={item.disabled || mode === "view" ? true : false}
                      isSearchable={item.isSearchable}
                      name={item.key}
                      options={item.options}
                      defaultValue={item.defaultValue}
                    />
                  </Form.Group>
                );
              default:
                return (
                  <Form.Group className={`${styles[`box-${item.key}`]} ${styles.form_group_flex}`}>
                    <Form.Label className={`${styles.form_label}`}>{item.value}</Form.Label>
                    <Form.Control
                      // className={
                      //   !halfControls.includes(item.key)
                      //     ? styles.half_controls
                      //     : styles.wide_controls
                      // }
                      id={item.key}
                      defaultValue={item.defaultValue}
                      readOnly={item.readOnly || mode === "view"}
                      disabled={mode === "view" ? true : false}
                      type={item.type}
                      // value={data[item.key]}
                      // onChange={(e) => handleValue(e)}
                    />
                  </Form.Group>
                );
            }
          })}
      </div>
      <TableAppBoatReg
        typeTable={"culpritsList"}
        tableOptions={culpritsListOptions}
        mode={mode}
        // data={boatCardAppEngList}
      />
      <TableAppBoatReg
        typeTable={"injuredsList"}
        tableOptions={injuredsListOptions}
        mode={mode}
        // data={boatCardAppEngList}
      />
      <div className={styles.grid_container_footer}>
        {Object.values(TransportAccidentFormSettingsFooter).map((item) => {
          switch (item.type) {
            case "select":
              return (
                <Form.Group
                  className={`${styles[`box-${item.key}`]} ${
                    styles[`form_group_flex_${item.flexDirection}`]
                  }`}>
                  <Form.Label className={styles.form_label}>{item.value}</Form.Label>
                  <Select
                    // ref={setRef(item)}
                    className={styles.input_element}
                    // onChange={(e) => handleValue(e)}
                    classNamePrefix="select"
                    placeholder="Выберите"
                    id={item.key}
                    // value={item.selectOption.find((item) => item.value === data[item.key])}
                    isDisabled={item.disabled || mode === "view" ? true : false}
                    isSearchable={item.isSearchable}
                    name={item.key}
                    options={item.options}
                    defaultValue={item.defaultValue}
                  />
                </Form.Group>
              );
            default:
              return (
                <Form.Group className={`${styles[`box-${item.key}`]} ${styles.form_group_flex}`}>
                  <Form.Label className={`${styles.form_label}`}>{item.value}</Form.Label>
                  <Form.Control
                    // className={
                    //   !halfControls.includes(item.key)
                    //     ? styles.half_controls
                    //     : styles.wide_controls
                    // }
                    id={item.key}
                    defaultValue={item.defaultValue}
                    readOnly={item.readOnly || mode === "view"}
                    disabled={mode === "view" ? true : false}
                    type={item.type}
                    // value={data[item.key]}
                    // onChange={(e) => handleValue(e)}
                  />
                </Form.Group>
              );
          }
        })}
      </div>
      <div className={styles.buttons_container}>
        {mode === "add" && (
          <>
            <div
              className={styles.add_button}
              id={"add"}
              // onClick={(e) => handleButtonClick(e)}
            >
              Сохранить
            </div>
            <div
              className={styles.add_button}
              id={"add"}
              // onClick={(e) => handleButtonClick(e)}
            >
              Сформировать дело
            </div>
          </>
        )}
        <div
          className={styles.close_button}
          id={"close"}
          // onClick={(e) => handleButtonClick(e)}
        >
          Закрыть
        </div>
      </div>
    </>
  );
}
