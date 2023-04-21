import React, { useState, useEffect } from "react";
import styles from "./informationAboutBoat.module.css";
import {
  fieldBoatOptions,
  setOptionsForBoat,
} from "./optionsForInformationAboutBoat";
import { Form } from "react-bootstrap";
import Select from "react-select";
import {
  setOptionsTypesBoat,
  setOptionsVidBoat,
  setOptionsBodyBoat,
} from "../utilities";

function InfromationAboutBoat() {
  const [options, setOptions] = useState(fieldBoatOptions);
  useEffect(() => {
    (async () => {
      const typesBoat = await setOptionsTypesBoat();
      const kindsBoat = await setOptionsVidBoat();
      const materialsBodyBoat = await setOptionsBodyBoat();
      setOptions({
        ...setOptionsForBoat(typesBoat, kindsBoat, materialsBodyBoat),
      });
    })();
  }, []);
  return (
    <>
      <h3>Сведения о маломерном судне</h3>
      <div className={styles["container-information"]}>
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
    </>
  );
}

export default InfromationAboutBoat;
