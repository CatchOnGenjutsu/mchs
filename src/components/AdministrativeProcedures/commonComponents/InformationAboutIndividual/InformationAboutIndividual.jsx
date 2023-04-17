import React from "react";
import { Form } from "react-bootstrap";
import styles from "./InformationAboutIndividual.module.css";
import {
  fieldPassportOptions,
  fieldAddressOptions,
} from "./optionsForInformationAboutIndividual";
import Select from "react-select";

function InformationAboutIndividual(props) {
  return (
    <>
      <h3>Сведения о заинтересованном лице</h3>
      <div className={styles["container-information"]}>
        <div className={styles["passport-information"]}>
          {Object.values(fieldPassportOptions).map((option) => {
            if (option.type === "text" || option.type === "date") {
              return (
                <Form.Group
                  controlId={`${option.key}`}
                  className={`${styles["common"]} ${
                    styles[`box-${option.key}`]
                  }`}>
                  <Form.Label>{option.value}</Form.Label>
                  <Form.Control type={option.type} />
                </Form.Group>
              );
            } else if ((option.type = "select")) {
              return (
                <Form.Group className={`${styles["common"]} box-${option.key}`}>
                  <Form.Label>{option.value}</Form.Label>
                  <Form.Select>
                    {option.options.map((el) => (
                      <option value={el.id}>{el.value}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              );
            }
          })}
        </div>
        <div className={styles["address-information"]}>
          {Object.values(fieldAddressOptions).map((option) => {
            if (option.type === "text") {
              return (
                <Form.Group
                  controlId={`${option.key}`}
                  className={`${styles["common"]} ${
                    styles[`box-${option.key}`]
                  }`}>
                  <Form.Label>{option.value}</Form.Label>
                  <Form.Control type={option.type} />
                </Form.Group>
              );
            } else if ((option.type = "selectSearch")) {
              return (
                <div className={`d-flex ${styles["common"]}`}>
                  <Form.Label>{option.value}</Form.Label>
                  <Select
                    className={`${styles["selectSearch"]}`}
                    classNamePrefix="select"
                    data-id={option.key}
                    isSearchable={true}
                    name={option.key}
                  />
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
}

export default InformationAboutIndividual;
