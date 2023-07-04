import React, { useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { addNewSpecialMark, addNewConfMark } from "../../../../redux/certificateReducer/actionsCertificate";

export default function CertificateModalWindow({
  licenseIdModal,
  showModal,
  setShowModal,
  modalWindowInputs,
  dataForEdit,
  setDataForEdit,
  type,
  setType,
}) {
  const dispatch = useDispatch();

  const usersLib = useSelector((state) => {
    const { dictionaryReducer } = state;
    return dictionaryReducer.usersLibrary;
  });

  const [newData, setNewData] = useState(
    type === "edit" ? structuredClone(dataForEdit) : { userid: usersLib[0] },
  );
  const [errors, setErrors] = useState({});
  const [saveKey, setSaveKey] = useState(false);

  const errorsFields = modalWindowInputs.nameColumn.map((item) => Object.values(item)).map((elem) => elem[2]);

  // useEffect(() => {
  // }, []);

  const handleChange = (e) => {
    switch (modalWindowInputs.keyTable) {
      case "lossControl":
        if (e.target.dataset.id === "confDuration") {
          newData[e.currentTarget.dataset.id] = Number(e.currentTarget.value);
        } else {
          newData[e.currentTarget.dataset.id] = e.currentTarget.value;
        }
        newData.recdate = Date.now();
        newData.confiscation = {};
        newData.confiscation.code = 1;
        newData.confiscation.name = "Лишение";
        newData.confiscation.note = "";
        if (newData.confDuration && newData.confDate) {
          let newEndDate = new Date(newData.confDate);
          newEndDate.setFullYear(newEndDate.getFullYear() + Number(newData.confDuration));
          newEndDate.setDate(newEndDate.getDate() - 1);
          newData.confDateEnd = newEndDate.toLocaleDateString().split(".").reverse().join("-");
        }
        setNewData(newData);
        if (saveKey) handleErrors();
        break;
      case "certificateWithdrawal":
        if (e.currentTarget.dataset.id !== "name") {
          newData[e.currentTarget.dataset.id] = e.currentTarget.value;
          newData.recdate = Date.now();
          newData.confDateEnd = "2020-12-12"; //Тестовое значение, уточнить необходимость ввода данных
          newData.confDocNum = "-"; //Тестовое значение, уточнить необходимость ввода данных
          newData.confiscation = {};
          newData.confiscation.code = 2;
          newData.confiscation.name = "Изъятие";
          newData.confiscation.note = "";
        } else {
          newData.userid = usersLib.find((item) => item.userid == e.target.value);
        }
        setNewData(newData);
        if (saveKey) handleErrors();
        break;
      case "boatDrivingLicenseSpecmarksList":
        newData.markDate = `${new Date().toISOString().slice(0, 10)} ${new Date()
          .toISOString()
          .slice(11, 23)}`;
        newData[e.currentTarget.dataset.id] = e.currentTarget.value;
        setNewData(structuredClone(newData));
        if (saveKey) handleErrors();
        break;
      default:
        break;
    }
    setNewData(structuredClone(newData));
  };

  const handleSave = () => {
    if (!handleErrors()) {
      switch (modalWindowInputs.keyTable) {
        case "lossControl":
          dispatch(addNewConfMark(newData, licenseIdModal));
          break;
        case "certificateWithdrawal":
          dispatch(addNewConfMark(newData, licenseIdModal));
          break;
        case "boatDrivingLicenseSpecmarksList":
          newData.markDate = `${new Date().toISOString().slice(0, 10)} ${new Date()
            .toISOString()
            .slice(11, 23)}`;
          newData.licenseId = licenseIdModal;
          setNewData(structuredClone(newData));
          if (newData.mark !== "") {
            dispatch(addNewSpecialMark(newData));
          }
          break;
        default:
          setShowModal(false);
          setNewData({});
          break;
      }
      setShowModal(false);
      setNewData({});
    } else {
      setSaveKey(true);
    }
  };

  const handleErrors = () => {
    let newErrors = {};
    switch (modalWindowInputs.keyTable) {
      case "certificateWithdrawal":
        errorsFields.forEach((elem) => {
          if (!newData[elem] || newData[elem] === "") {
            if (elem !== "name" && elem !== "userPositions") {
              newErrors[elem] = "Заполните поле";
            }
          }
        });
        break;
      default:
        errorsFields.forEach((elem) => {
          if (!newData[elem] || newData[elem] === "") {
            newErrors[elem] = "Заполните поле";
          }
        });
        break;
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return true;
    } else {
      setErrors({});
      return false;
    }
  };

  return (
    <Modal
      show={showModal}
      onHide={() => {
        setShowModal(false);
        setNewData({});
      }}
      size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {modalWindowInputs.caption}
          {/* {options[type]} */}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {modalWindowInputs.nameColumn.map((item) => {
            switch (item.key) {
              case "name":
                return (
                  <Form.Group className="mb-3">
                    <Form.Label>{item.value}</Form.Label>
                    <Form.Select
                      data-id={item.key}
                      type="select"
                      onChange={(e) => {
                        handleChange(e);
                      }}>
                      {usersLib.map((elem) => (
                        <option
                          data-id={item.key}
                          value={elem.userid}>
                          {elem.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                );
              case "mark":
                return (
                  <Form.Group className="mb-3">
                    <Form.Label>{item.value}</Form.Label>
                    <Form.Control
                      data-id={item.key}
                      type="text"
                      isInvalid={!!errors[item.key]}
                      value={!!newData.mark ? newData.mark : ""}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                    <Form.Control.Feedback type={"invalid"}>{errors[item.key]}</Form.Control.Feedback>
                  </Form.Group>
                );
              case "confDate":
                return (
                  <Form.Group className="mb-3">
                    <Form.Label>{item.value}</Form.Label>
                    <Form.Control
                      isInvalid={!!errors[item.key]}
                      data-id={item.key}
                      type="date"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                    <Form.Control.Feedback type={"invalid"}>{errors[item.key]}</Form.Control.Feedback>
                  </Form.Group>
                );
              case "confDuration":
                return (
                  <Form.Group className="mb-3">
                    <Form.Label>{item.value}</Form.Label>
                    <Form.Control
                      data-id={item.key}
                      type="number"
                      isInvalid={!!errors[item.key]}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                    <Form.Control.Feedback type={"invalid"}>{errors[item.key]}</Form.Control.Feedback>
                  </Form.Group>
                );

              case "userPositions":
                break;
              case "markDate":
                break;
              case "confDateEnd":
                break;
              default:
                return (
                  <Form.Group className="mb-3">
                    <Form.Label>{item.value}</Form.Label>
                    <Form.Control
                      data-id={item.key}
                      type="text"
                      isInvalid={!!errors[item.key]}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                    <Form.Control.Feedback type={"invalid"}>{errors[item.key]}</Form.Control.Feedback>
                  </Form.Group>
                );
            }
          })}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            handleErrors();
            setType(null);
            setShowModal(false);
            setDataForEdit(null);
            setNewData({});
          }}>
          Закрыть
        </Button>
        <Button
          variant="primary"
          onClick={handleSave}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
