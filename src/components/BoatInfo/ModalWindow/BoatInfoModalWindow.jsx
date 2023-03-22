import React, { useEffect, useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addNewBoatInfo, editBoatInfo } from '../../../redux/smallBoatsReducer/actionsSmallBoats';

import styles from './BoatInfoModalWindow.module.css';


export default function BoatInfoModalWindow({
  boatIdModal,
  showModal,
  setShowModal,
  modalWindowInputs,
  dataForEdit,
  setDataForEdit,
  type,
  setType,
  fileType
}) {
  const boatInfoFromState = useSelector((state) => {
    const { smallBoatsReducer } = state;
    return smallBoatsReducer.boatInfo;
  });

  const [newData, setNewData] = useState(
    type === 'edit' || modalWindowInputs.keyTable === "boatArrestsTableColumns" ? structuredClone(dataForEdit) : {}
  );
  const [file, setFile] = useState();
  const [errors, setErrors]= useState({})
  const [saveKey, setSaveKey] = useState(false)

  const errorsFields = modalWindowInputs.nameColumn.map(item => Object.values(item)).map(elem => elem[2]);

  // const [removeArrestData, setRemoveArrestData] = useState(
  //   modalWindowInputs.keyTable === "removeBoatArrestsTableColumns" ? structuredClone(dataForEdit) : {}
  // )


  const dispatch = useDispatch();

  const handleChange = (e) => {
    switch (modalWindowInputs.keyTable) {
      case 'dealsHistoryTableColumns':
        newData[e.currentTarget.dataset.id] = e.currentTarget.value;
        newData.recdate = Date.now();
        newData.ownerType = boatInfoFromState.ownerType;
        newData.ownerName =
          boatInfoFromState.ownerType.ptcode === 1
          ? `${boatInfoFromState.ownerSurname} ${boatInfoFromState.ownerName} ${boatInfoFromState.ownerMidname}`
          : boatInfoFromState.leName;
        setNewData(newData);
        if(saveKey) handleErrors();
        break;
      case 'specialMarksTableColumns':
        switch (e.currentTarget.dataset.id) {
          case 'bsmLock':
            newData[e.currentTarget.dataset.id] = Boolean(e.currentTarget.value);
          break;
          default:
            newData[e.currentTarget.dataset.id] = e.currentTarget.value;
          break;
        }
        if(saveKey) handleErrors();
        break;
      case 'removeBoatArrestsTableColumns':
        newData[e.currentTarget.dataset.id] = e.currentTarget.value;
        if(saveKey) handleErrors();
        break;
      case 'boatArrestsTableColumns':
        newData[e.currentTarget.dataset.id] = e.currentTarget.value;
        newData.isActiv = true;
        newData.cardid = boatIdModal;
        if(saveKey) handleErrors();
        break;
      case 'documentsTableColumns':
        if(e.target.files[0]) {
          setFile(e.target.files[0]);
          handleErrors(true);
        } else {
          setFile(null);
          handleErrors(false);
        }
        // if(saveKey) handleErrors();
      default:
        break;
    }
    setNewData(structuredClone(newData));
    // setRemoveArrestData(Object.assign(removeArrestData, newData))
  };

  const handleSave = () => {
    if (!handleErrors()){
      switch (modalWindowInputs.keyTable) {
        case 'dealsHistoryTableColumns':
        switch (type) {
          case 'edit':
            dispatch(editBoatInfo(newData, boatIdModal, 'dealsHistoryTableColumns'));
            break;
          case 'save':
            dispatch(addNewBoatInfo(newData, boatIdModal, 'dealsHistoryTableColumns'));
            break;
          default:
            break;
        }
        break;
        case 'specialMarksTableColumns':
          switch (type) {
            case 'edit':
              dispatch(editBoatInfo(newData, boatIdModal, 'specialMarksTableColumns'));
              break;
            case 'save':
              dispatch(addNewBoatInfo(newData, boatIdModal, 'specialMarksTableColumns'));
              break;
            default:
              break;
          }
          break;
        case 'removeBoatArrestsTableColumns':
          newData.isActiv = false;
          setNewData(newData);
          setNewData(structuredClone(newData));
          dispatch(editBoatInfo(newData, boatIdModal, 'boatArrestsTableColumns'));
          break;
        case "boatArrestsTableColumns":
          dispatch(addNewBoatInfo(newData, boatIdModal, 'boatArrestsTableColumns'));
          break;
        case "documentsTableColumns":
          const formData = new FormData()
          formData.append("file", file);
          switch (fileType) {
            case "file":
              dispatch(addNewBoatInfo(formData, boatIdModal, 'documentsTableColumns', false));
              break;
            case "signature":
              dispatch(addNewBoatInfo(formData, boatIdModal, 'documentsTableColumns', true));
              break;
            default:
              break;
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
      setSaveKey(true)
    }
  };

  const handleErrors = (docKey) => {
    let newErrors = {}
    switch (modalWindowInputs.keyTable) {
      case "documentsTableColumns":
        if (docKey) {
          newErrors = {}
        } else {
          errorsFields.forEach((elem) => {
            if (elem !== "docdate" && elem !== "docname") {
              if (!file) {
                newErrors[elem] = "Заполните поле"
              }
            }
          })
        }
        break;
      case "specialMarksTableColumns":
        errorsFields.forEach((elem) => {
          if (!newData[elem] || newData[elem] === "") {
            if (elem !== "bsmLock") {
              newErrors[elem] = "Заполните поле"
            }
          }
        })
        break;
      default:
        errorsFields.forEach((elem) => {
          if (!newData[elem] || newData[elem] === "") {
            newErrors[elem] = "Заполните поле"
          }
        })
        break;
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return true
    } else {
      setErrors({})
      return false
    }
  }

  useEffect(() => {
    if (modalWindowInputs.keyTable === "specialMarksTableColumns") {
      if (type === "edit" && newData.bsmLock !== undefined) {
        const lockSelector = newData.bsmLock ? '#locked' : '#unlocked';
        const input = document.querySelector(lockSelector);
        input.toggleAttribute('checked');
      } else {
        newData.bsmLock = true
        const input = document.querySelector("#locked");
        input.toggleAttribute('checked');
      }
    }
  }, []);

  return (
  <Modal
    show={showModal}
    onHide={() => {
    setShowModal(false);
    setNewData({});
    setDataForEdit({});
    }}
    size="lg">
    <Modal.Header closeButton>
    <Modal.Title>{modalWindowInputs.caption}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Form id="form">
      {modalWindowInputs.nameColumn.map((item) => {
        if (item.key !== "isActiv" && item.key !== "docdate" && item.key !== "docname"){
          switch (item.type) {
            case 'date':
            return (
              <Form.Group className="mb-3">
                <Form.Label>{item.value}</Form.Label>
                <Form.Control
                  data-id={item.key}
                  type="date"
                  isInvalid={!!errors[item.key]}
                  value={newData[`${item.key}`]}
                  onChange={(e) => {
                  handleChange(e);
                  }}
                />
                <Form.Control.Feedback type={'invalid'}>{errors[item.key]}</Form.Control.Feedback>
              </Form.Group>
            );
            case 'file':
              return (
                <Form.Group className="mb-3">
                  <Form.Label>{item.value}</Form.Label>
                  <Form.Control
                    data-id={item.key}
                    id="inputFile"
                    type="file"
                    isInvalid={!!errors[item.key]}
                    accept="*"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  <Form.Control.Feedback type={'invalid'}>{errors[item.key]}</Form.Control.Feedback>
                </Form.Group>
              );
            case 'checkbox':
              return (
                <Form.Group className="mb-3">
                  <Form.Label>{item.value}</Form.Label>
                  <Form.Check
                    name={item.value}
                    data-id={item.key}
                    id="locked"
                    type="radio"
                    label="Да"
                    // checked={newData.bsmLock === undefined ? true : false}
                    value={1}
                    onChange={(e) => {
                    handleChange(e);
                    }}
                  />
                  <Form.Check
                    name={item.value}
                    data-id={item.key}
                    id="unlocked"
                    type="radio"
                    label="Нет"
                    value={''}
                    onChange={(e) => {
                    handleChange(e);
                    }}
                  />
                </Form.Group>
              );
            default:
            return (
              <Form.Group className="mb-3">
                <Form.Label>{item.value}</Form.Label>
                <Form.Control
                  data-id={item.key}
                  type="text"
                  isInvalid={!!errors[item.key]}
                  value={newData[`${item.key}`]}
                  onChange={(e) => {
                  handleChange(e);
                  }}
                />
                <Form.Control.Feedback type={'invalid'}>{errors[item.key]}</Form.Control.Feedback>
              </Form.Group>
            );
          }
        }
        
      })}
    </Form>
    </Modal.Body>
    <Modal.Footer>
    <Button
      variant="secondary"
      onClick={() => {
        setShowModal(false);
        setDataForEdit({});
        setNewData({});
        setType(null);
        handleErrors()
      }}>
      Закрыть
    </Button>
    <Button
      variant="primary"
      onClick={(e)=>handleSave(e)}>
      Сохранить
    </Button>
    </Modal.Footer>
  </Modal>
  );
}
