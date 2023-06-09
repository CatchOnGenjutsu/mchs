import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import Select from "react-select";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import styles from "./InspectorWorkStat.module.css";

export default function InspectorWorkStat() {
  const [requestData, setRequestData] = useState({});
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState({});
  const [saveKey, setSaveKey] = useState(false);
  const [dataRangeError, setDataRangeError] = useState("");
  const date1Ref = useRef();
  const date2Ref = useRef();
  const inspectorRef = useRef();

  const usersLib = useSelector((state) => {
    const { dictionaryReducer } = state;
    return dictionaryReducer.usersLibrary;
  });
  const userLibValid = usersLib.map((item) => {
    return { value: item.userid, label: item.name, key: "inspector" };
  });

  const errorsFields = ["date1", "date2", "inspector"];

  const handleValue = (e) => {
    if (e) {
      e.target
        ? setRequestData(Object.assign(requestData, { [e.target.id]: e.target.value }))
        : setRequestData(Object.assign(requestData, { [e.key]: e.value }));
      if (saveKey) handleErrors();
      if (saveKey) handleDataRange();
    }
  };

  const handleErrors = () => {
    let newErrors = {};
    errorsFields.forEach((elem) => {
      if (!requestData[elem] || requestData[elem] === "") {
        newErrors[elem] = "Заполните поле";
      }
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return true;
    } else {
      setErrors({});
      return false;
    }
  };

  const handleDataRange = () => {
    if (!!requestData.date1 && !!requestData.date2) {
      switch (true) {
        case Math.floor((new Date(requestData.date2) - new Date(requestData.date1)) / (1000 * 60 * 60 * 24)) >
          365:
          setDataRangeError("Максимальный промежуток запрашиваемого отчёта находится в пределах 1 года.");
          return true;
        case Math.floor((new Date(requestData.date2) - new Date(requestData.date1)) / (1000 * 60 * 60 * 24)) <
          0:
          setDataRangeError(
            'Дата, установленная в "Период отчета по" не может быть меньше даты, установленной в "Период отчета с".',
          );
          return true;
        default:
          setDataRangeError("");
          return false;
      }
    }
  };

  function setRef(key) {
    switch (key) {
      case "date1":
        return date1Ref;
      case "date2":
        return date2Ref;
      case "inspector":
        return inspectorRef;
      default:
        return null;
    }
  }

  const handleSearchData = async () => {
    setData([]);
    if (!handleErrors() && !handleDataRange()) {
      const request = await fetch(
        "http://10.0.1.30:8082/repinspector/1?" +
          new URLSearchParams({
            ["date1"]: requestData.date1,
            ["date2"]: requestData.date2,
            ["inspector"]: requestData.inspector,
          }),
      );
      if (request.status !== 200) {
      } else {
        const response = await request.json();
        setData([...response]);
      }
    } else {
      setSaveKey(true);
    }
  };

  const handleClearData = () => {
    setData([]);
    date1Ref.current.value = "";
    date2Ref.current.value = "";
    inspectorRef.current.clearValue();
    setRequestData(structuredClone({}));
    setDataRangeError("");
    setErrors({});
    setSaveKey(false);
  };

  return (
    <>
      <h2>Статистика работы инспектора</h2>
      <Form className={styles.form_inputs}>
        {!!dataRangeError && <div className={styles.range_block}>{dataRangeError}</div>}
        <div className={styles.area_inputs}>
          <Form.Group className={styles.input_element}>
            <Form.Label className={styles.label_text}>
              Период отчета с <span className={styles.red_dot}>*</span>
            </Form.Label>
            <Form.Control
              ref={setRef("date1")}
              onChange={(e) => handleValue(e)}
              id={"date1"}
              className={`mb-2`}
              type="date"
              isInvalid={!!errors.date1}
              value={requestData.date1}
            />
            <Form.Control.Feedback
              className={styles.feedback}
              type={"invalid"}>
              {errors.date1}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className={styles.input_element}>
            <Form.Label className={styles.label_text}>
              Период отчета по <span className={styles.red_dot}>*</span>
            </Form.Label>
            <Form.Control
              ref={setRef("date2")}
              onChange={(e) => handleValue(e)}
              id={"date2"}
              className={`mb-2`}
              type="date"
              isInvalid={!!errors.date2}
              value={requestData.date2}
            />
            <Form.Control.Feedback
              className={styles.feedback}
              type={"invalid"}>
              {errors.date2}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className={styles.input_element}>
            <Form.Label className={styles.label_text}>
              Инспектор
              <span className={styles.red_dot}>*</span>
            </Form.Label>
            <Select
              ref={setRef("inspector")}
              className={`basic-single mb-2 ${styles.search_select} ${
                !!errors.inspector ? styles.red_border : null
              }`}
              classNamePrefix="select"
              onChange={(e) => handleValue(e)}
              isSearchable={true}
              name="inspector"
              value={userLibValid.find((item) => item.value === requestData.inspector)}
              placeholder="Выберите"
              options={userLibValid}
            />
            {!!errors.inspector && <div className={styles.custom_feedback}>{errors.inspector}</div>}

            <Form.Control.Feedback type={"invalid"}>{errors.inspector}</Form.Control.Feedback>
          </Form.Group>
        </div>
        <div className={styles.buttons_block}>
          <Button
            onClick={(e) => handleSearchData(e)}
            className={styles.button_element}
            variant="primary">
            Создать
          </Button>
          <Button
            onClick={() => handleClearData()}
            className={styles.button_element}
            variant="outline-primary">
            Очистить
          </Button>
        </div>
      </Form>
      {data.length !== 0 && (
        <table>
          <caption>Отчет по работе инспектора</caption>
          <thead>
            <tr>
              <th>Параметр</th>
              <th>Значение</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              return (
                <tr>
                  <td>{item.parameter}</td>
                  <td>{item.value !== null ? item.value : "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}
