import { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Select from "react-select";
import {
  addNewEngineCheck,
  addNewSpecMarkApp,
  addNewDealApp
} from "../../../../redux/statementReducer/actionsStatement";

export default function AppBoatRegModal({
  setShowModal,
  showModal,
  modalWindowInputs,
  dataForCheck,
}) {
  const [newData, setNewData] = useState({});
  const [errors, setErrors] = useState({});
  const [saveKey, setSaveKey] = useState(false);

  const dispatch = useDispatch();

  const errorsFields = modalWindowInputs.nameColumn
      .filter((item)=>item.neededInModal)
    .map((item) => Object.values(item))
    .map((elem) => elem[1]);
console.log(errorsFields)
  const handleChange = (e) => {
    // if (!!e.target) {
    newData[e.target.dataset.id] = e.currentTarget.value;
    // } else {
    //   newData[e.key] = e.value;
    // }
    if (saveKey) handleErrors();
  };

  const handleErrors = () => {
    let newErrors = {};
    // switch (modalWindowInputs.keyTable) {
    //   case "certificateWithdrawal":
    //     errorsFields.forEach((elem) => {
    //       if (!newData[elem] || newData[elem] === "") {
    //         if (elem !== "name" && elem !== "userPositions") {
    //           newErrors[elem] = "Заполните поле"
    //         }
    //       }
    //     })
    //     break;
    //   default:
    //     errorsFields.forEach((elem) => {
    //       if (!newData[elem] || newData[elem] === "") {
    //         newErrors[elem] = "Заполните поле"
    //       }
    //     })
    //     break;
    // }
    errorsFields.forEach((elem) => {
      if (!newData[elem] || newData[elem] === "") {
        if (elem !== "asmLock") {
          newErrors[elem] = "Заполните поле";
        }
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

  const handleSave = () => {
    if (!handleErrors()) {
      switch (modalWindowInputs.keyTable) {
        case "boatCardAppEngDtoList":
          if (
            dataForCheck.findIndex((item) => item.engvin === newData.engvin) < 0
          ) {
            dispatch(addNewEngineCheck(newData.engvin, newData));
          }
          break;
        case "boatCardAppSmDtoList":
          dispatch(addNewSpecMarkApp(newData));
          break;
        case "boatCardAppDealsDtoList":
          dispatch( addNewDealApp(newData));
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

  useEffect(() => {
    switch (modalWindowInputs.keyTable) {
      case "boatCardAppEngDtoList":
        setNewData({ engtype: 1 });
        break;
      case "boatCardAppSmDtoList":
        setNewData({ asmLock: true });
        const input = document.querySelector("#locked");
        input.toggleAttribute("checked");
      default:
        break;
    }
  }, []);

  return (
    <Modal
      show={showModal}
      onHide={() => {
        setShowModal(false);
        setNewData({});
        console.log("newData", newData);
      }}
      size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{modalWindowInputs.caption}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {modalWindowInputs.nameColumn.map((item) => {
            if (item.neededInModal) {
              switch (item.type) {
                case "select":
                  return (
                    <Form.Group className="mb-3">
                      <Form.Label>{item.value}</Form.Label>
                      <Form.Select
                        data-id={item.key}
                        type="select"
                        isInvalid={!!errors[item.key]}
                        onChange={(e) => {
                          handleChange(e);
                        }}>
                        {item.selectOptions.map((elem) => (
                          <option
                            data-id={item.key}
                            value={elem.value}>
                            {elem.label}
                          </option>
                        ))}
                      </Form.Select>
                      {/* <Select
                  // ${styles.search_select}
                  classNamePrefix="select"
                  placeholder="Выберите..."
                  data-id={item.key}
                  onChange={(e) => handleChange(e)}
                  // defaultValue={item.selectOption[0]}
                  aria-invalid=''
                  // {
                  //   errors[item.key] !== undefined ? "true" : "false"
                  // }
                  isSearchable={false}
                  name={item.key}
                  options={item.selectOptions}
                /> */}
                    </Form.Group>
                  );
                case "date":
                  return (
                    <Form.Group className="mb-3">
                      <Form.Label>{item.value}</Form.Label>
                      <Form.Control
                        data-id={item.key}
                        type="date"
                        isInvalid={!!errors[item.key]}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                      <Form.Control.Feedback type={"invalid"}>
                        {errors[item.key]}
                      </Form.Control.Feedback>
                    </Form.Group>
                  );
                case "checkbox":
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
                        value={""}
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
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                      <Form.Control.Feedback type={"invalid"}>
                        {errors[item.key]}
                      </Form.Control.Feedback>
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
            console.log("newData", newData);
            // setType(null);
            setShowModal(false);
            // setDataForEdit(null);
            // setNewData({});
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
