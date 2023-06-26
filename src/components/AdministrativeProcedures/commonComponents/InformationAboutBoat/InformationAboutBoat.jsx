import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import Select from "react-select";

import { addNewStatementData } from "../../../../redux/statementReducer/actionsStatement";

import {
  setOptionsTypesBoat,
  setOptionsVidBoat,
  setOptionsBodyBoat,
  setReadOptionForInputs,
  setOptionsSaCategory,
} from "../utilities";

import styles from "./informationAboutBoat.module.css";
import { fieldBoatOptions, setOptionsForBoat } from "./optionsForInformationAboutBoat";

function InformationAboutBoat({ fieldStatus, updateNewData, saveKey, handleErrors, errors, dataBoat, mode }) {
  const [options, setOptions] = useState(fieldBoatOptions);
  const dispatch = useDispatch();
  const newStatement = useSelector((state) => {
    const { statementReducer } = state;
    return statementReducer.newStatement;
  });
  const data = !!dataBoat?dataBoat:newStatement
  const handleValue = async (e) => {
    if (e) {
      switch (true) {
        case Object.keys(e).includes("target"):
          switch (e.target.id) {
            case "engpwrmaxkwt":
              const newValue = e.currentTarget.value.replace(",", ".");
              updateNewData(e.target.id, newValue);
              dispatch(addNewStatementData({ [`${e.target.id}`]: newValue }));
              if (newValue === "") {
                updateNewData("engpwrmax", "");
                dispatch(addNewStatementData({ [`engpwrmax`]: "" }));
              } else {
                updateNewData("engpwrmax", (Number(e.currentTarget.value) * 1.3595).toFixed(2));
                dispatch(addNewStatementData({ [`engpwrmax`]: (Number(newValue) * 1.3595).toFixed(2) }));
              }
              break;
            default:
              updateNewData(e.target.id, e.currentTarget.value);
              dispatch(addNewStatementData({ [`${e.target.id}`]: e.target.value }));
              break;
          }
          break;
        case Object.keys(e).includes("key"):
          updateNewData(e.key, e.value);
          dispatch(addNewStatementData({ [`${e.key}`]: e.value }));
          break;
        default:
          break;
      }
      if (saveKey) handleErrors();
    }
  };

  useEffect(() => {
    (async () => {
      // setReadOptionForInputs(fieldBoatOptions, fieldStatus);
      const typesBoat = await setOptionsTypesBoat();
      const kindsBoat = await setOptionsVidBoat();
      const materialsBodyBoat = await setOptionsBodyBoat();
      const saCategory = await setOptionsSaCategory();
      setOptions({
        ...setOptionsForBoat(typesBoat, kindsBoat, materialsBodyBoat, saCategory),
      });
    })();
  }, []);
  return (
    <div>
      <h3>Сведения о маломерном судне</h3>
      <div className={styles["container-information"]}>
        <div className={mode === "add" ? styles["boat-information-add"] : styles["boat-information"]}>
          {Object.values(options).map((option) => {
            if (option.type === "text" || option.type === "date") {
              if (
                option.key === "engpwrmax" &&
                window.location.pathname.includes("smallboatsreg") &&
                mode === "add"
              ) {
                return (
                  <>
                    <Form.Group
                      controlId={`engpwrmaxkwt`}
                      className={`${styles["common"]} ${styles[`box-engpwrmax-kwt`]}`}>
                      <Form.Label>
                        Предельная мощность двигателей, кВт
                        {mode !== "view" && <span className={styles.red_dot}>*</span>}
                      </Form.Label>
                      <Form.Control
                        //value = {dataBoat[option.key]}
                        onChange={(e) => handleValue(e)}
                        type={option.type}
                        readOnly={option.readOnly}
                        disabled={option.disabled || mode === "view" ? true : false}
                        value={data["engpwrmaxkwt"]}
                        isInvalid={!!errors["engpwrmaxkwt"]}
                      />
                    </Form.Group>
                    <Form.Group
                      controlId={`${option.key}`}
                      className={`${styles["common"]} ${styles[`box-${option.key}`]}`}>
                      <Form.Label>
                        {option.value}
                        {option.required && mode !== "view" && <span className={styles.red_dot}>*</span>}
                      </Form.Label>
                      <Form.Control
                        //value = {dataBoat[option.key]}
                        // onChange={(e) => handleValue(e)}
                        type={option.type}
                        readOnly={true}
                        disabled={true}
                        value={data[option.key]}
                        isInvalid={
                          !!errors[option.key] ||
                          (!!option.maxlength && !!data[option.key]
                            ? data[option.key].length > option.maxlength
                            : false)
                        }
                      />
                    </Form.Group>
                  </>
                );
              } else {
                return (
                  <Form.Group
                    controlId={`${option.key}`}
                    className={`${styles["common"]} ${styles[`box-${option.key}`]}`}>
                    <Form.Label>
                      {option.value}
                      {option.required && mode !== "view" && <span className={styles.red_dot}>*</span>}
                    </Form.Label>
                    <Form.Control
                      //value = {dataBoat[option.key]}
                      onChange={(e) => handleValue(e)}
                      type={option.type}
                      defaultValue={option.defaultValue}
                      readOnly={option.readOnly}
                      disabled={option.disabled || mode === "view" ? true : false}
                      value={data[option.key]}
                      isInvalid={
                        !!errors[option.key] ||
                        (!!option.maxlength && !!data[option.key]
                          ? data[option.key].length > option.maxlength
                          : false)
                      }
                    />
                  </Form.Group>
                );
              }
            } else if (option.type === "selectSearch") {
              return (
                <Form.Group className={`${styles["common"]} ${styles[`box-${option.key}`]}`}>
                  <Form.Label>
                    {option.value}
                    {option.required && mode !== "view" && <span className={styles.red_dot}>*</span>}
                  </Form.Label>
                  <Select
                    onChange={(e) => handleValue(e)}
                    defaultValue={option.defaultValue}
                    className={`${styles["selectSearch"]} ${!!errors[option.key] ? styles.red_border : null}`}
                    classNamePrefix="select"
                    placeholder="Выберите"
                    id={option.key}
                    value={option.options.find((item) => item.value === data[option.key])}
                    isDisabled={option.disabled || mode === "view" ? true : false}
                    isSearchable={false}
                    name={option.key}
                    options={option.options}
                  />
                </Form.Group>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default InformationAboutBoat;
