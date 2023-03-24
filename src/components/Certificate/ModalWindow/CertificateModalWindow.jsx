import React, { useEffect, useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addNewSpecialMark, addNewConfMark } from '../../../redux/certificateReducer/actionsCertificate';

export default function CertificateModalWindow({
  licenseIdModal,
  showModal,
  setShowModal,
  modalWindowInputs,
  dataForEdit,
  setDataForEdit,
  type,
  setType
}) {
  const dispatch = useDispatch();

  const usersLib = useSelector((state) => {
    const { dictionaryReducer } = state;
    return dictionaryReducer.usersLibrary;
  });

  const [newMark, setNewMark] = useState(
    type === "edit"
    ? structuredClone(dataForEdit)
    : { userid: usersLib[0] }
  );


  // useEffect(() => {
  // }, []);

  const handleChange = (e) => {
    switch (modalWindowInputs.keyTable) {
      case 'lossControl':
        newMark[e.currentTarget.dataset.id] = e.currentTarget.value;
        newMark.recdate = Date.now();
        newMark.confiscation = {};
        newMark.confiscation.code = 1;
        newMark.confiscation.name = 'Лишение';
        newMark.confiscation.note = '';
        setNewMark(newMark);
        break;
      case 'certificateWithdrawal':
        if (e.currentTarget.dataset.id !== 'name') {
          newMark[e.currentTarget.dataset.id] = e.currentTarget.value;
          newMark.recdate = Date.now();
          newMark.confDateEnd = '2020-12-12'; //Тестовое значение, уточнить необходимость ввода данных
          newMark.confDocNum = '-'; //Тестовое значение, уточнить необходимость ввода данных
          newMark.confiscation = {};
          newMark.confiscation.code = 2;
          newMark.confiscation.name = 'Изъятие';
          newMark.confiscation.note = '';
        } else {
          newMark.userid = usersLib.find((item) => item.userid == e.target.value);
        }
        setNewMark(newMark);
        break;
      case 'boatDrivingLicenseSpecmarksList':
        newMark.markDate = `${new Date().toISOString().slice(0, 10)} ${new Date()
          .toISOString()
          .slice(11, 23)}`;
        newMark[e.currentTarget.dataset.id] = e.currentTarget.value;
        setNewMark(structuredClone(newMark));
        break;
      default:
      break;
    }

    setNewMark(structuredClone(newMark));
  };

  const handleSave = () => {
    switch (modalWindowInputs.keyTable) {
      case 'lossControl':
      dispatch(addNewConfMark(newMark, licenseIdModal));
      break;
      case 'certificateWithdrawal':
      dispatch(addNewConfMark(newMark, licenseIdModal));
      break;
      case 'boatDrivingLicenseSpecmarksList':
      newMark.markDate = `${new Date().toISOString().slice(0, 10)} ${new Date()
        .toISOString()
        .slice(11, 23)}`;
      newMark.licenseId = licenseIdModal;
      setNewMark(structuredClone(newMark));
      if (newMark.mark !== '') {
        dispatch(addNewSpecialMark(newMark));
      }
      break;
      default:
      setShowModal(false);
      setNewMark({});
      break;
    }
    setShowModal(false);
    setNewMark({});
    };

  return (
  <Modal
    show={showModal}
    onHide={() => {
    setShowModal(false);
    setNewMark({});
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
      if (item.key === 'name') {
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
      }
      if (
        item.key !== 'markDate' &&
        item.key !== 'userPositions' &&
        (item.key === 'confDateEnd' || item.key === 'confDate')
      ) {
        return (
        <Form.Group className="mb-3">
          <Form.Label>{item.value}</Form.Label>
          <Form.Control
          data-id={item.key}
          type="date"
          onChange={(e) => {
            handleChange(e);
          }}
          />
        </Form.Group>
        );
      }
      if (item.key === 'mark') {
        return (
        <Form.Group className="mb-3">
          <Form.Label>{item.value}</Form.Label>
          <Form.Control
          data-id={item.key}
          type="text"
          value={!!newMark.mark ? newMark.mark  : ""}
          onChange={(e) => {
            handleChange(e);
          }}
          />
        </Form.Group>
        );
      }
      if (item.key !== 'markDate' && item.key !== 'userPositions') {
        return (
        <Form.Group className="mb-3">
          <Form.Label>{item.value}</Form.Label>
          <Form.Control
          data-id={item.key}
          type="text"
          onChange={(e) => {
            handleChange(e);
          }}
          />
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
        console.log("newMark", newMark)
        setType(null);
        setShowModal(false);
        setDataForEdit(null);
        setNewMark({});
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
