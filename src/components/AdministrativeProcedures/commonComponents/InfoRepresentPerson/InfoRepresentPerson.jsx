import { useState } from "react";
import {
  optionInfoRepresentPersonSummary,
  optionInfoRepresentPersonAddress,
  powerOfAttorney,
} from "./optionInfoRepresentPerson";
import {
  setOptionsRayonForOblast,
  setOptionsGorodForRayon,
} from "./optionInfoRepresentPerson";
import { Form, Button, Modal } from "react-bootstrap";
import Select from "react-select";

import styles from "./InfoRepresentPerson.module.css";

export default function InfoRepresentPerson() {
  const [rayonDisabled, setRayonDisabled] = useState(true);
  const [gorodDisabled, setGorodDisabled] = useState(true);
  const halfControls =
    "agentSurname agentName agentMidname agentDocDepartment agentPersNum powerOfAttorney";

  const handleValue = (e) => {
    console.log("e.target", !!e.target);
    console.log("e.key", e.key);
    if (!!e.key) {
      switch (e.key) {
        case "rayon":
          setOptionsGorodForRayon(e.value);
          setGorodDisabled(false);
          break;
        case "agentObl":
          setOptionsRayonForOblast(e.value);
          setRayonDisabled(false);
          break;

        default:
          break;
      }
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
              case "text":
                return (
                  <Form.Group
                    className={`${styles[`box-${item.key}`]} ${
                      styles.form_group_flex
                    }`}>
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
                      // onChange={(e)=>{
                      //     form[e.currentTarget.id]=e.currentTarget.value
                      //     setForm(structuredClone(form))
                      // }}
                    />
                    {/* <Form.Control.Feedback type={"invalid"}>
                    {errors[el.key]}
                  </Form.Control.Feedback> */}
                  </Form.Group>
                );
              case "select":
                return (
                  <Form.Group
                    className={`${styles[`box-${item.key}`]} ${
                      styles.form_group_flex
                    }`}>
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
              case "date":
                return (
                  <Form.Group
                    className={`${styles[`box-${item.key}`]} ${
                      styles.form_group_flex
                    }`}>
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
                      // onChange={(e)=>{
                      //     form[e.currentTarget.id]=e.currentTarget.value
                      //     setForm(structuredClone(form))
                      // }}
                    />
                    {/* <Form.Control.Feedback type={"invalid"}>
                    {errors[el.key]}
                  </Form.Control.Feedback> */}
                  </Form.Group>
                );
              default:
                break;
            }
          })}
        </div>
        <div className={styles.container_address}>
          {Object.values(optionInfoRepresentPersonAddress).map((item) => {
            switch (item.type) {
              case "text":
                return (
                  <Form.Group
                    className={`${styles[`box-${item.key}`]} ${
                      styles.form_group_flex
                    }`}>
                    <Form.Label
                      className={`${styles.form_label} ${
                        !halfControls.includes(item.key)
                          ? styles.half_label
                          : styles.wide_label
                      }`}>
                      {item.value}
                    </Form.Label>
                    {item.key === "agentCountry" ? (
                      <Form.Control
                        // className={
                        //   !halfControls.includes(item.key)
                        //     ? styles.half_controls
                        //     : styles.wide_controls
                        // }
                        id={item.key}
                        value="Республика Беларусь"
                        readOnly
                        // isInvalid={!!errors[el.key]}
                        type={item.type}
                        // value={(form)&&form[el.key]||''}
                        // onChange={(e)=>{
                        //     form[e.currentTarget.id]=e.currentTarget.value
                        //     setForm(structuredClone(form))
                        // }}
                      />
                    ) : (
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
                        // onChange={(e)=>{
                        //     form[e.currentTarget.id]=e.currentTarget.value
                        //     setForm(structuredClone(form))
                        // }}
                      />
                    )}
                    {/* <Form.Control.Feedback type={"invalid"}>
                    {errors[el.key]}
                  </Form.Control.Feedback> */}
                  </Form.Group>
                );
              case "select":
                return (
                  <Form.Group
                    className={`${styles[`box-${item.key}`]} ${
                      styles.form_group_flex
                    }`}>
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
                    {/* <Form.Select
                      // className={
                      //   !halfControls.includes(item.key)
                      //     ? styles.half_controls
                      //     : styles.wide_controls
                      // }
                      data-id={item.key}
                      onChange={(e) => handleValue(e)}>
                      {item.selectOption.map((el) => (
                        <option value={el.id}>{el.value}</option>
                      ))}
                    </Form.Select> */}
                  </Form.Group>
                );
              case "customSelect":
                let isDisabled;
                let name;
                switch (item.key) {
                  case "agentRayonId":
                    isDisabled = rayonDisabled;
                    name = "rayon";
                    break;
                  case "agentGorodId":
                    isDisabled = gorodDisabled;
                    name = "gorod";
                    break;
                  default:
                    break;
                }
                return (
                  <Form.Group
                    className={`${styles[`box-${item.key}`]} ${
                      styles.form_group_flex
                    }`}>
                    <Form.Label className={styles.form_label}>
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
                      isDisabled={isDisabled}
                      isSearchable={true}
                      name={name}
                      options={item.selectOption}
                    />
                  </Form.Group>
                );
              case "date":
                return (
                  <Form.Group
                    className={`${styles[`box-${item.key}`]} ${
                      styles.form_group_flex
                    }`}>
                    <Form.Label className={styles.form_label}>
                      {item.value}
                    </Form.Label>
                    <Form.Control
                      className={
                        !halfControls.includes(item.key)
                          ? styles.half_controls
                          : styles.wide_controls
                      }
                      id={item.key}
                      // isInvalid={!!errors[el.key]}
                      type={item.type}
                      // value={(form)&&form[el.key]||''}
                      // onChange={(e)=>{
                      //     form[e.currentTarget.id]=e.currentTarget.value
                      //     setForm(structuredClone(form))
                      // }}
                    />
                    {/* <Form.Control.Feedback type={"invalid"}>
                    {errors[el.key]}
                  </Form.Control.Feedback> */}
                  </Form.Group>
                );
              default:
                break;
            }
          })}
        </div>
      </div>
      <Form.Group
        className={`${styles[`box-${powerOfAttorney.key}`]} ${
          styles.powerOfAttorney_group_flex
        }`}>
        <Form.Label
          className={`${styles.form_label} ${
            !halfControls.includes(powerOfAttorney.key)
              ? styles.half_label
              : styles.wide_label
          }`}>
          {powerOfAttorney.value}
        </Form.Label>
        <Form.Control
          // className={
          //   !halfControls.includes(item.key)
          //     ? styles.half_controls
          //     : styles.wide_controls
          // }
          id={powerOfAttorney.key}
          // isInvalid={!!errors[el.key]}
          type={powerOfAttorney.type}
          // value={(form)&&form[el.key]||''}
          // onChange={(e)=>{
          //     form[e.currentTarget.id]=e.currentTarget.value
          //     setForm(structuredClone(form))
          // }}
        />
        {/* <Form.Control.Feedback type={"invalid"}>
                    {errors[el.key]}
                  </Form.Control.Feedback> */}
      </Form.Group>
    </>
  );
}
