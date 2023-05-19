import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  optionInfoRepresentPersonSummary,
  optionInfoRepresentPersonAddress,
  agentDoverennost,
  setOptionsRayonForOblast,
  setOptionsGorodForRayon,
} from "./optionInfoRepresentPerson";
import { addNewStatementData } from "../../../../redux/statementReducer/actionsStatement";
import { Form } from "react-bootstrap";
import Select from "react-select";

import styles from "./InfoRepresentPerson.module.css";
import { addDataForDuplicate } from "../../../../redux/DuplicateShipsTicketReducer/actionsDuplicateShipsTicket";

export default function InfoRepresentPerson({ inputData, mode, updateNewData }) {
  const selectRayonRef = useRef();
  const selectGorodRef = useRef();
  const selectOblRef = useRef();
  const selectDocTypeRef = useRef();
  const dispatch = useDispatch();

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
  const halfControls = "agentSurname agentName agentMidname agentDocDepartment agentPersNum agentDoverennost";

  const handleValue = async (e) => {
    if (e) {
      switch (true) {
        case Object.keys(e).includes("target"):
          if (!window.location.pathname.includes("reginformationchanges")) {
            switch (true) {
              case window.location.pathname.includes("smallboatsreg"):
                dispatch(addNewStatementData({ [`${e.target.id}`]: e.target.value }));
                break;
              case window.location.pathname.includes("dupshipsticket"):
                dispatch(addDataForDuplicate({ [`${e.target.id}`]: e.target.value }));
                break;
              default:
                break;
            }
          } else {
            updateNewData(e.target.id, e.currentTarget.value);
          }
          break;
        case Object.keys(e).includes("key"):
          switch (e.key) {
            case "agentOblId":
              selectRayonRef.current.clearValue();
              selectGorodRef.current.clearValue();
              if (window.location.pathname.includes("reginformationchanges")) {
                updateNewData("agentGorodId", null);
                updateNewData("agentRayonId", null);
              } else {
                switch (true) {
                  case window.location.pathname.includes("smallboatsreg"):
                    dispatch(addNewStatementData({ [`agentRayonId`]: null }));
                    dispatch(addNewStatementData({ [`agentGorodId`]: null }));
                    break;
                  case window.location.pathname.includes("dupshipsticket"):
                    dispatch(addDataForDuplicate({ [`agentRayonId`]: null }));
                    dispatch(addDataForDuplicate({ [`agentGorodId`]: null }));
                    break;
                  default:
                    break;
                }
              }
              await setOptionsRayonForOblast(e.value);
              break;
            case "agentRayonId":
              if (window.location.pathname.includes("reginformationchanges")) {
                updateNewData("agentGorodId", null);
              } else {
                switch (true) {
                  case window.location.pathname.includes("smallboatsreg"):
                    dispatch(addNewStatementData({ [`agentGorodId`]: null }));
                    break;
                  case window.location.pathname.includes("dupshipsticket"):
                    dispatch(addDataForDuplicate({ [`agentGorodId`]: null }));
                    break;
                  default:
                    break;
                }
              }
              await setOptionsGorodForRayon(e.value);
              break;
            default:
              break;
          }
          if (window.location.pathname.includes("reginformationchanges")) {
            updateNewData(e.key, e.value);
          }
          if (!window.location.pathname.includes("reginformationchanges")) {
            switch (true) {
              case window.location.pathname.includes("smallboatsreg"):
                dispatch(addNewStatementData({ [`${e.key}`]: e.value }));
                break;
              case window.location.pathname.includes("dupshipsticket"):
                dispatch(addDataForDuplicate({ [`${e.key}`]: e.value }));
                break;
              default:
                break;
            }
          }
          break;
        default:
          break;
      }
    }
  };

  const setRef = (item) => {
    switch (item.key) {
      case "agentOblId":
        return selectOblRef;
      case "agentRayonId":
        return selectRayonRef;
      case "agentGorodId":
        return selectGorodRef;
      case "agentDocType":
        return selectDocTypeRef;
      default:
        return null;
    }
  };
  useEffect(() => {
    setRerender(!rerender);
    selectOblRef.current.clearValue();
    selectRayonRef.current.clearValue();
    selectGorodRef.current.clearValue();
    selectDocTypeRef.current.clearValue();
  }, [inputData]);
  return (
    <>
      <h3 className={styles.text_secondary}>Сведения о представителе заинтересованного лица</h3>
      <div className={styles.grids_container}>
        <div className={styles.container_summary}>
          {Object.values(optionInfoRepresentPersonSummary).map((item) => {
            switch (item.type) {
              case "select":
                return (
                  <Form.Group className={`${styles[`box-${item.key}`]} ${styles.form_group_flex}`}>
                    <Form.Label
                      className={`${styles.form_label} ${
                        !halfControls.includes(item.key) ? styles.half_label : styles.wide_label
                      }`}>
                      {item.value}
                    </Form.Label>
                    <Select
                      className={`${
                        !halfControls.includes(item.key) ? styles.half_controls : styles.wide_controls
                      }`}
                      ref={setRef(item)}
                      // ${styles.search_select}
                      classNamePrefix="select"
                      placeholder="Выберите..."
                      data-id={item.key}
                      onChange={(e) => handleValue(e)}
                      value={item.selectOption.find((item) => item.value === data[item.key])}
                      isDisabled={mode === "view" ? true : false}
                      isSearchable={false}
                      name={item.key}
                      options={item.selectOption}
                    />
                  </Form.Group>
                );
              default:
                return (
                  <Form.Group className={`${styles[`box-${item.key}`]} ${styles.form_group_flex}`}>
                    <Form.Label
                      className={`${styles.form_label} ${
                        !halfControls.includes(item.key) ? styles.half_label : styles.wide_label
                      }`}>
                      {item.value}
                    </Form.Label>
                    <Form.Control
                      // className={
                      //   !halfControls.includes(item.key)
                      //     ? styles.half_controls
                      //     : styles.wide_controls
                      // }
                      id={item.key}
                      // isInvalid={!!errors[el.key]}
                      readOnly={item.readOnly || mode === "view"}
                      disabled={mode === "view" ? true : false}
                      type={item.type}
                      value={data[item.key]}
                      onChange={(e) => handleValue(e)}
                    />
                  </Form.Group>
                );
            }
          })}
        </div>
        <div className={styles.container_address}>
          {Object.values(optionInfoRepresentPersonAddress).map((item) => {
            switch (item.type) {
              case "select":
                return (
                  <Form.Group className={`${styles[`box-${item.key}`]} ${styles.form_group_flex}`}>
                    <Form.Label className={styles.form_label}>{item.value}</Form.Label>
                    <Select
                      ref={setRef(item)}
                      className={`${
                        !halfControls.includes(item.key) ? styles.half_controls : styles.wide_controls
                      }`}
                      onChange={(e) => handleValue(e)}
                      classNamePrefix="select"
                      placeholder="Выберите"
                      id={item.key}
                      value={item.selectOption.find((item) => item.value === data[item.key])}
                      isDisabled={item.disabled || mode === "view" ? true : false}
                      isSearchable={item.isSearchable}
                      name={item.key}
                      options={item.selectOption}
                      defaultValue={item.defaultValue}
                    />
                  </Form.Group>
                );
              default:
                return (
                  <Form.Group className={`${styles[`box-${item.key}`]} ${styles.form_group_flex}`}>
                    <Form.Label
                      className={`${styles.form_label} ${
                        !halfControls.includes(item.key) ? styles.half_label : styles.wide_label
                      }`}>
                      {item.value}
                    </Form.Label>
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
                      value={data[item.key]}
                      onChange={(e) => handleValue(e)}
                    />
                  </Form.Group>
                );
            }
          })}
        </div>
      </div>
      <Form.Group className={`${styles[`box-${agentDoverennost.key}`]} ${styles.powerOfAttorney_group_flex}`}>
        <Form.Label
          className={`${styles.form_label} ${
            !halfControls.includes(agentDoverennost.key) ? styles.half_label : styles.wide_label
          }`}>
          {agentDoverennost.value}
        </Form.Label>
        <Form.Control
          id={agentDoverennost.key}
          // isInvalid={!!errors[el.key]}
          type={agentDoverennost.type}
          readOnly={agentDoverennost.readOnly || mode === "view"}
          disabled={mode === "view" ? true : false}
          // isInvalid={!!errors[el.key]}
          value={data[agentDoverennost.key]}
          onChange={(e) => handleValue(e)}
        />
      </Form.Group>
    </>
  );
}
