import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
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

import {
  addNewAccidentData,
  findBoatInfoByRegNum,
  clearAccidentData,
  getAccidentInfoById,
} from "../../../redux/TransportAccidentsReportReducer/actionsTransportAccidentsReport";

import styles from "./TransportAccidentForm.module.css";

export default function TransportAccidentForm() {
  const location = useLocation();
  const { mode } = location.state;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [transportAccidentFormSettings, setTransportAccidentFormSettings] = useState({});

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

  const newAccidentData = useSelector((state) => {
    const { TransportAccidentsReportReducer } = state;
    return TransportAccidentsReportReducer.newAccidentData;
  });

  const handleValue = (e) => {
    if (e) {
      switch (true) {
        case Object.keys(e).includes("target"):
          // updateNewData(e.target.id, e.currentTarget.value);
          dispatch(addNewAccidentData({ [`${e.target.id}`]: e.target.value }));
          break;
        case Object.keys(e).includes("key"):
          // updateNewData(e.key, e.value);
          dispatch(addNewAccidentData({ [`${e.key}`]: e.value }));
          break;
        default:
          break;
      }
      // if (saveKey) handleErrors();
    }
  };

  const handleButtonClick = (e) => {
    if (e) {
      switch (e.target.id) {
        case "search":
          if (newAccidentData.boatRegNum !== "") {
            dispatch(findBoatInfoByRegNum(newAccidentData.boatRegNum));
          }
          break;
        case "close":
          dispatch(clearAccidentData());
          navigate("/transportaccidents");
        // dispatch(getDataBoatsRegBySearchParams(searchParamsFromStateBoatsReg));
        default:
          break;
      }
    }
  };

  useEffect(() => {
    (async () => {
      const typesBoat = await setOptionsTypesBoat();
      const kindsBoat = await setOptionsVidBoat();
      // const materialsBodyBoat = await setOptionsBodyBoat();
      // const saCategory = await setOptionsSaCategory();
      setTransportAccidentFormSettings(setOptionsForBoat(typesBoat, kindsBoat, window.location.pathname));
    })();
    if (mode === "view") {
      const pathArray = window.location.pathname.split("/");
      const id = pathArray[pathArray.length - 1];
      dispatch(getAccidentInfoById(id));
    }
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
                      onChange={(e) => handleValue(e)}
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
                if (item.key === "boatRegNum") {
                  return (
                    <Form.Group className={`${styles[`box-${item.key}`]} ${styles.form_group_flex_reg_num}`}>
                      <div className={`${styles[`box-${item.key}`]} ${styles.form_group_flex}`}>
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
                          onChange={(e) => handleValue(e)}
                        />
                      </div>

                      <div
                        className={styles.search_button}
                        id={"search"}
                        onClick={(e) => handleButtonClick(e)}>
                        Найти
                      </div>
                    </Form.Group>
                  );
                } else {
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
                        onChange={(e) => handleValue(e)}
                      />
                    </Form.Group>
                  );
                }
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
                    onChange={(e) => handleValue(e)}
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
                    onChange={(e) => handleValue(e)}
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
              className={styles.save_button}
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
          onClick={(e) => handleButtonClick(e)}>
          Закрыть
        </div>
      </div>
    </>
  );
}
