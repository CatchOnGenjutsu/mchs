import React, { useState } from "react";
import { useSelector } from "react-redux";

import Select from "react-select";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import styles from "./InspectorWorkStat.module.css";

export default function InspectorWorkStat() {
  const [data, setData] = useState({});
  const usersLib = useSelector((state) => {
    const { dictionaryReducer } = state;
    return dictionaryReducer.usersLibrary;
  });
  const userLibValid = usersLib.map((item) => {
    return { value: item.userid, label: item.name, key: "user" };
  });

  const handleValue = (e) => {
    e.target
      ? setData(Object.assign(data, { [e.target.id]: e.target.value }))
      : setData(Object.assign(data, { [e.key]: e.value }));
  };

  const handleSearchData = () => {
    console.log(data);
  };
  console.log(userLibValid);
  return (
    <>
      <h2>Статистика работы инспектора</h2>
      <Form className={styles.form_inputs}>
        <div className={styles.area_inputs}>
          <Form.Group className={styles.input_element}>
            <Form.Label className={styles.label_text}>
              Период отчета с <span className={styles.red_dot}>*</span>
            </Form.Label>
            <Form.Control
              onChange={(e) => handleValue(e)}
              id={"dataS"}
              className={`mb-2`}
              type="date"
            />
          </Form.Group>
          <Form.Group className={styles.input_element}>
            <Form.Label className={styles.label_text}>
              Период отчета по <span className={styles.red_dot}>*</span>
            </Form.Label>
            <Form.Control
              onChange={(e) => handleValue(e)}
              id={"dataPo"}
              className={`mb-2`}
              type="date"
            />
          </Form.Group>
          <Form.Group className={styles.input_element}>
            <Form.Label className={styles.label_text}>
              Инспектор
              {/* <span className={styles.red_dot}>*</span> */}
            </Form.Label>
            <Select
              className={`basic-single mb-2 ${styles.search_select}`}
              classNamePrefix="select"
              // data-id={item.key}
              onChange={(e) => handleValue(e)}
              // defaultValue={item.selectOption[0]}
              isSearchable={true}
              name="user"
              options={usersLib.map((item) => {
                return { value: item.userid, label: item.name, key: "user" };
              })}
            />
          </Form.Group>
        </div>
        <div className={styles.buttons_block}>
          <Button
            onClick={(e) => handleSearchData(e)}
            className={styles.button_element}
            variant="primary">
            Найти &#128269;
          </Button>
          <Button
            className={styles.button_element}
            variant="primary"
            type="submit">
            Очистить
          </Button>
        </div>
      </Form>
    </>
  );
}
