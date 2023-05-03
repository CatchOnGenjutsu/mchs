import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import Select from "react-select";

import { addNewStatementData } from "../../../../redux/statementReducer/actionsStatement";
import {
  setOptionsTypesBoat,
  setOptionsVidBoat,
  setOptionsBodyBoat,
  setReadOptionForInputs
} from "../utilities";

import styles from "./informationAboutBoat.module.css";
import {
  fieldBoatOptions,
  setOptionsForBoat,
} from "./optionsForInformationAboutBoat";

function InformationAboutBoat({fieldStatus}) {
  const [options, setOptions] = useState(fieldBoatOptions);
  const dispatch = useDispatch();

  const handleValue = async (e) => {
    if (e) {
      switch (true) {
        case Object.keys(e).includes("target"):
          dispatch(addNewStatementData({ [`${e.target.id}`]: e.target.value }));
          break;
        case Object.keys(e).includes("key"):
          dispatch(addNewStatementData({ [`${e.key}`]: e.value }));
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    (async () => {
      setReadOptionForInputs(fieldBoatOptions,fieldStatus)
      const typesBoat = await setOptionsTypesBoat();
      const kindsBoat = await setOptionsVidBoat();
      const materialsBodyBoat = await setOptionsBodyBoat();
      setOptions({
        ...setOptionsForBoat(typesBoat, kindsBoat, materialsBodyBoat),
      });
    })();
  }, []);
  return (
    <div >
      <h3>Сведения о маломерном судне</h3>
      <div className={styles["container-information"] }>
        <div className={styles["boat-information"]}>
          {Object.values(options).map((option) => {
            if (option.type === "text" || option.type === "date") {
              return (
                <Form.Group
                  controlId={`${option.key}`}
                  className={`${styles["common"]} ${
                    styles[`box-${option.key}`]
                  }`}>
                  <Form.Label>{option.value}</Form.Label>
                  <Form.Control
                    onBlur={(e) => handleValue(e)}
                    disabled = {option.disabled}
                    type={option.type}
                    defaultValue={option.defaultValue}
                    readOnly={option.readOnly}
                  />
                </Form.Group>
              );
            } else if (option.type === "selectSearch") {
              return (
                <Form.Group
                  className={`${styles["common"]} ${
                    styles[`box-${option.key}`]
                  }`}>
                  <Form.Label>{option.value}</Form.Label>
                  <Select
                    onChange={(e) => handleValue(e)}
                    isDisabled={option.disabled}
                    defaultValue={option.defaultValue}
                    className={`${styles["selectSearch"]}`}
                    classNamePrefix="select"
                    placeholder="Выберите"
                    id={option.key}
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
