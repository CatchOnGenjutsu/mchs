import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import styles from "./informationAboutEntity.module.css";
import { fieldLEInformOptions, fieldAddressOptions, setOptions } from "./optionsInformationAboutEntity";
import Select from "react-select";
import { addNewStatementData } from "../../../../redux/statementReducer/actionsStatement";

function InformationAboutEntity({ inputData, updateNewData, saveKey, handleErrors, errors, mode }) {
  const selectGorodRef = useRef();
  const selectRayonRef = useRef();
  const selectOblRef = useRef();
  const dispatch = useDispatch();
  const [options, setoptions] = useState({
    infoEntity: fieldLEInformOptions,
    address: fieldAddressOptions,
  });

  const newStatement = useSelector((state) => {
    const { statementReducer } = state;
    return statementReducer.newStatement;
  });
  const newAppDupl = useSelector((state) => {
    const { DuplicateShipsTicketReducer } = state;
    return DuplicateShipsTicketReducer.newAppDupl;
  });
  const [rerender, setRerender] = useState(false);
  const data = !!inputData
      ? { ...inputData }
      : window.location.pathname.includes("dupshipsticket")
          ? { ...newAppDupl }
          : { ...newStatement };
  async function handleChangeSelectSearch(event) {
    if (event) {
      switch (true) {
        case Object.keys(event).includes("target"):
          updateNewData(event.target.id, event.currentTarget.value);
          dispatch(addNewStatementData({ [`${event.target.id}`]: event.target.value }));
          break;
        case Object.keys(event).includes("key"):
          setoptions({
            infoEntity: fieldLEInformOptions,
            address: await setOptions(event.value, event.key),
          });
          switch (event.key) {
            case "rayonId": {
              selectGorodRef.current.clearValue();
              break;
            }
            case "oblId": {
              selectRayonRef.current.clearValue();
              selectGorodRef.current.clearValue();
              break;
            }
            default:
              break;
          }
          updateNewData(event.key, event.value);
          dispatch(addNewStatementData({ [`${event.key}`]: event.value }));
          break;
        default:
          break;
      }
      if (saveKey) handleErrors();
    }
  }

  function setRef(option) {
    switch (option.key) {
      case "gorodId":
        return selectGorodRef;
      case "rayonId":
        return selectRayonRef;
      default:
        return null;
    }
  }
  return (
    <>
      <h3>Сведения о заинтересованном лице</h3>
      <div className={styles["container-information"]}>
        <div className={styles["infoEntity-information"]}>
          {Object.values(options.infoEntity).map((option) => {
            if (option.type === "text" || option.type === "date") {
              return (
                <Form.Group
                  controlId={`${option.key}`}
                  className={`${styles["common"]} ${styles[`box-${option.key}`]}`}>
                  <Form.Label>
                    {option.value}
                    {option.required && mode !== "view" && <span className={styles.red_dot}>*</span>}
                  </Form.Label>
                  <Form.Control
                    onChange={(e) => handleChangeSelectSearch(e)}
                    type={option.type}
                    defaultValue={option.defaultValue}
                    value={data[option.key]}
                    readOnly={option.readOnly || mode === "view"}
                    disabled={mode === "view" ? true : false}
                    isInvalid={mode !== "view" && !!errors[option.key]}
                  />
                </Form.Group>
              );
            } else if (option.type === "selectSearch") {
              return (
                <Form.Group className={`${styles["common"]} box-${option.key}`}>
                  <Form.Label>
                    {option.value}
                    {option.required && mode !== "view" && <span className={styles.red_dot}>*</span>}
                  </Form.Label>
                  <Select
                    onChange={(e) => handleChangeSelectSearch(e)}
                    defaultValue={data[option.key]}
                    value={option.options.find((item) => item.value === data[option.key])}
                    className={`${styles["selectSearch"]} ${
                      mode !== "view" && !!errors[option.key] ? styles.red_border : null
                    }`}
                    classNamePrefix="select"
                    placeholder="Выберите"
                    id={option.key}
                    isDisabled={mode === "view" ? true : false}
                    isSearchable={option.isSearchable}
                    name={option.key}
                    options={option.options}
                  />
                </Form.Group>
              );
            }
          })}
        </div>
        <div className={styles["address-information"]}>
          {Object.values(options.address).map((option) => {
            if (option.type === "text") {
              return (
                <Form.Group
                  controlId={`${option.key}`}
                  className={`${styles["common"]} ${styles[`box-${option.key}`]}`}>
                  <Form.Label>
                    {option.value}
                    {option.required && mode !== "view" && <span className={styles.red_dot}>*</span>}
                  </Form.Label>
                  <Form.Control
                    onChange={(e) => handleChangeSelectSearch(e)}
                    type={option.type}
                    // defaultValue={option.defaultValue}
                    value={data[option.key]}
                    readOnly={option.readOnly || mode === "view"}
                    disabled={mode === "view" ? true : false}
                    isInvalid={mode !== "view" && !!errors[option.key]}
                  />
                </Form.Group>
              );
            } else if (option.type === "selectSearch") {
              return (
                <div className={`d-flex ${styles["common"]}`}>
                  <Form.Label>
                    {option.value}
                    {option.required && mode !== "view" && <span className={styles.red_dot}>*</span>}
                  </Form.Label>
                  <Select
                    ref={setRef(option)}
                    className={`${styles["selectSearch"]} ${
                      mode !== "view" && !!errors[option.key] ? styles.red_border : null
                    }`}
                    onChange={(e) => handleChangeSelectSearch(e)}
                    classNamePrefix="select"
                    id={option.key}
                    value={option.options.find((item) => item.value === data[option.key])}
                    placeholder="Выберите"
                    isDisabled={option.disabled || mode === "view" ? true : false}
                    isSearchable={option.isSearchable}
                    name={option.key}
                    options={option.options}
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

export default InformationAboutEntity;
