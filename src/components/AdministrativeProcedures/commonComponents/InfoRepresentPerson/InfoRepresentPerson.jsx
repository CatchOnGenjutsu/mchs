import { optionInfoRepresentPerson } from "./optionInfoRepresentPerson";
import { Form, Button, Modal } from "react-bootstrap";

import styles from "./InfoRepresentPerson.module.css";

export function InfoRepresentPerson() {
  const halfControls =
    "agentDocType agentSerialOfPassport agentNumberOfPassport agentDocDate";
  return (
    <>
      <h3 className={styles.text_secondary}>
        Сведения о представителе заинтересованного лица
      </h3>
      <div className={styles.grids_container}>
        <div className={styles.container}>
          {Object.values(optionInfoRepresentPerson).map((item) => {
            switch (item.type) {
              case "text":
                return (
                  <Form.Group
                    className={`${styles[`box-${item.key}`]} ${
                      styles.form_group_flex
                    }`}>
                    <Form.Label>{item.value}</Form.Label>
                    <Form.Control
                      className={
                        halfControls.includes(item.key)
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
              case "select":
                return (
                  <Form.Group
                    className={`${styles[`box-${item.key}`]} ${
                      styles.form_group_flex
                    }`}>
                    <Form.Label>{item.value}</Form.Label>
                    <Form.Select
                      className={
                        halfControls.includes(item.key)
                          ? styles.half_controls
                          : styles.wide_controls
                      }
                      data-id={item.key}
                      // onChange={(e) => handleValue(e)}
                    >
                      {item.selectOption.map((el) => (
                        <option value={el.id}>{el.value}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                );
              case "date":
                return (
                  <Form.Group
                    className={`${styles[`box-${item.key}`]} ${
                      styles.form_group_flex
                    }`}>
                    <Form.Label>{item.value}</Form.Label>
                    <Form.Control
                      className={
                        halfControls.includes(item.key)
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
        <div className={styles.container}>
          {Object.values(optionInfoRepresentPerson).map((item) => {
            switch (item.type) {
              case "text":
                return (
                  <Form.Group
                    className={`${styles[`box-${item.key}`]} ${
                      styles.form_group_flex
                    }`}>
                    <Form.Label>{item.value}</Form.Label>
                    <Form.Control
                      className={
                        halfControls.includes(item.key)
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
              case "select":
                return (
                  <Form.Group
                    className={`${styles[`box-${item.key}`]} ${
                      styles.form_group_flex
                    }`}>
                    <Form.Label>{item.value}</Form.Label>
                    <Form.Select
                      className={
                        halfControls.includes(item.key)
                          ? styles.half_controls
                          : styles.wide_controls
                      }
                      data-id={item.key}
                      // onChange={(e) => handleValue(e)}
                    >
                      {item.selectOption.map((el) => (
                        <option value={el.id}>{el.value}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                );
              case "date":
                return (
                  <Form.Group
                    className={`${styles[`box-${item.key}`]} ${
                      styles.form_group_flex
                    }`}>
                    <Form.Label>{item.value}</Form.Label>
                    <Form.Control
                      className={
                        halfControls.includes(item.key)
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
    </>
  );
}
