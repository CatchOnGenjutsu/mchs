import React, { useEffect, useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addNewBoatInfo, editBoatInfo } from '../../../redux/actions';

export default function BoatInfoModalWindow({
  boatIdModal,
  showModal,
  setShowModal,
  modalWindowInputs,
  dataForEdit,
  setDataForEdit,
  type,
  setType,
}) {
  const boatInfoFromState = useSelector((state) => {
    const { smallBoatsReducer } = state;
    return smallBoatsReducer.boatInfo;
  });

  const [newData, setNewData] = useState(
    type === 'edit' || modalWindowInputs.keyTable === "boatArrestsTableColumns" ? structuredClone(dataForEdit) : {}
  );
  const [file, setFile] = useState();

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
        break;
      case 'removeBoatArrestsTableColumns':
        newData[e.currentTarget.dataset.id] = e.currentTarget.value;
      case 'boatArrestsTableColumns':
        newData[e.currentTarget.dataset.id] = e.currentTarget.value;
        newData.isActiv = true;
        newData.cardid = boatIdModal;
        // setNewData(newData)
      case 'documentsTableColumns':
        if(e.target.files[0]) {
          setFile(e.target.files[0])
        }
      default:
        break;
    }
    setNewData(structuredClone(newData));
    // setRemoveArrestData(Object.assign(removeArrestData, newData))
  };

  const handleSave = () => {
    console.log('Payload >!>!', newData);
    switch (modalWindowInputs.keyTable) {
      case 'dealsHistoryTableColumns':
      switch (type) {
        case 'edit':
          console.log('edit');
          dispatch(editBoatInfo(newData, boatIdModal, 'dealsHistoryTableColumns'));
          break;
        case 'save':
          console.log('save');
          dispatch(addNewBoatInfo(newData, boatIdModal, 'dealsHistoryTableColumns'));
          break;
        default:
          break;
      }
      break;
      case 'specialMarksTableColumns':
        switch (type) {
          case 'edit':
            console.log('edit');
            dispatch(editBoatInfo(newData, boatIdModal, 'specialMarksTableColumns'));
            break;
          case 'save':
            console.log('save');
            dispatch(addNewBoatInfo(newData, boatIdModal, 'specialMarksTableColumns'));
            break;
          default:
            break;
        }
        break;
      case 'removeBoatArrestsTableColumns':
        console.log('edit');
        newData.isActiv = false;
        setNewData(newData);
        setNewData(structuredClone(newData));
        dispatch(editBoatInfo(newData, boatIdModal, 'boatArrestsTableColumns'));
        break;
      case "boatArrestsTableColumns":
        console.log('save');
        dispatch(addNewBoatInfo(newData, boatIdModal, 'boatArrestsTableColumns'));
        break;
      case "documentsTableColumns":
        console.log('save docs');
        // const form = document.querySelector("#form")
        const formData = new FormData()
        // const input = document.querySelector("#inputFile")
        formData.append("file", file)
        // console.log("formData >!>!", formData)
        dispatch(addNewBoatInfo(formData, boatIdModal, 'documentsTableColumns'));
        break;
      default:
        setShowModal(false);
        setNewData({});
        break;
    }
    setShowModal(false);
    setNewData({});
  };

  useEffect(() => {
  if (newData.bsmLock !== undefined) {
    const lockSelector = newData.bsmLock ? '#locked' : '#unlocked';
    const input = document.querySelector(lockSelector);
    input.toggleAttribute('checked');
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
                value={newData[`${item.key}`]}
                onChange={(e) => {
                handleChange(e);
                }}
              />
              </Form.Group>
            );
            case 'file':
            return (
              // <Form.Group className="mb-3">
                 <>
              {/* <Form.Label>{item.value}</Form.Label> */}
              <Form.Control
                data-id={item.key}
                id="inputFile"
                type="file"
                accept="image/*"
                // value={newData[`${item.key}`]}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              </>
              // </Form.Group>
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
                value={newData[`${item.key}`]}
                onChange={(e) => {
                handleChange(e);
                }}
              />
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
