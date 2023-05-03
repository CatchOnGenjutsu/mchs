import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
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

export default function InfoRepresentPerson() {
  const selectRayonRef = useRef();
  const selectGorodRef = useRef();
  const dispatch = useDispatch();

  const halfControls =
    "agentSurname agentName agentMidname agentDocDepartment agentPersNum agentDoverennost";

  const handleValue = async (e) => {
    if (e) {
      switch (true) {
        case Object.keys(e).includes("target"):
          dispatch(addNewStatementData({ [`${e.target.id}`]: e.target.value }));
          break;
        case Object.keys(e).includes("key"):
          console.log(e.key);
          switch (e.key) {
            case "agentOblId":
              selectRayonRef.current.clearValue();
              selectGorodRef.current.clearValue();
              await setOptionsRayonForOblast(e.value);
              break;
            case "agentRayonId":
              await setOptionsGorodForRayon(e.value);
              break;
            default:
              break;
          }
          dispatch(addNewStatementData({ [`${e.key}`]: e.value }));
          break;
        default:
          break;
      }
    }
  };

  const setRef = (item) => {
    switch (item.key) {
      case "agentRayonId":
        return selectRayonRef;
      case "agentGorodId":
        return selectGorodRef;
      default:
        return null;
    }
  };
  return (
    <>
      <h3 className={styles.text_secondary}>
        Сведения о представителе заинтересованного лица
      </h3>
      <div className={styles.grids_container}>
        <div className={styles.container_summary}>
          {Object.values(optionInfoRepresentPersonSummary).map((item) => {
            switch (item.type) {
              case "select":
                return (
                  <Form.Group
                    className={`${styles[`box-${item.key}`]} ${styles.form_group_flex}`}>
                    <Form.Label
                      className={`${styles.form_label} ${
                        !halfControls.includes(item.key)
                          ? styles.half_label
                          : styles.wide_label
                      }`}>
                      {item.value}
                    </Form.Label>
                    <Select
                      className={`${
                        !halfControls.includes(item.key)
                          ? styles.half_controls
                          : styles.wide_controls
                      }`}
                      // ${styles.search_select}
                      classNamePrefix="select"
                      placeholder="Выберите..."
                      data-id={item.key}
                      onChange={(e) => handleValue(e)}
                      // defaultValue={item.selectOption[0]}
                      isSearchable={false}
                      name={item.key}
                      options={item.selectOption}
                    />
                  </Form.Group>
                );
              default:
                return (
                  <Form.Group
                    className={`${styles[`box-${item.key}`]} ${styles.form_group_flex}`}>
                    <Form.Label
                      className={`${styles.form_label} ${
                        !halfControls.includes(item.key)
                          ? styles.half_label
                          : styles.wide_label
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
                      type={item.type}
                      // value={(form)&&form[el.key]||''}
                      onBlur={(e) => handleValue(e)}
                    />
                    {/* <Form.Control.Feedback type={"invalid"}>
                    {errors[el.key]}
                  </Form.Control.Feedback> */}
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
                  <Form.Group
                    className={`${styles[`box-${item.key}`]} ${styles.form_group_flex}`}>
                    <Form.Label className={styles.form_label}>{item.value}</Form.Label>
                    <Select
                      ref={setRef(item)}
                      isDisabled={item.disabled}
                      className={`${
                        !halfControls.includes(item.key)
                          ? styles.half_controls
                          : styles.wide_controls
                      }`}
                      onChange={(e) => handleValue(e)}
                      classNamePrefix="select"
                      placeholder="Выберите..."
                      id={item.key}
                      isSearchable={item.isSearchable}
                      name={item.key}
                      options={item.selectOption}
                      defaultValue={item.defaultValue}
                    />
                  </Form.Group>
                );
              default:
                return (
                  <Form.Group
                    className={`${styles[`box-${item.key}`]} ${styles.form_group_flex}`}>
                    <Form.Label
                      className={`${styles.form_label} ${
                        !halfControls.includes(item.key)
                          ? styles.half_label
                          : styles.wide_label
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
                      readOnly={item.readOnly}
                      defaultValue={item.defaultValue}
                      // isInvalid={!!errors[el.key]}
                      type={item.type}
                      // value={(form)&&form[el.key]||''}
                      onBlur={(e) => handleValue(e)}
                    />
                    {/* <Form.Control.Feedback type={"invalid"}>
                    {errors[el.key]}
                  </Form.Control.Feedback> */}
                  </Form.Group>
                );
            }
          })}
        </div>
      </div>
      <Form.Group
        className={`${styles[`box-${agentDoverennost.key}`]} ${
          styles.powerOfAttorney_group_flex
        }`}>
        <Form.Label
          className={`${styles.form_label} ${
            !halfControls.includes(agentDoverennost.key)
              ? styles.half_label
              : styles.wide_label
          }`}>
          {agentDoverennost.value}
        </Form.Label>
        <Form.Control
          // className={
          //   !halfControls.includes(item.key)
          //     ? styles.half_controls
          //     : styles.wide_controls
          // }
          id={agentDoverennost.key}
          // isInvalid={!!errors[el.key]}
          type={agentDoverennost.type}
          // value={(form)&&form[el.key]||''}
          onBlur={(e) => handleValue(e)}
        />
        {/* <Form.Control.Feedback type={"invalid"}>
                    {errors[el.key]}
                  </Form.Control.Feedback> */}
      </Form.Group>
    </>
  );
}
