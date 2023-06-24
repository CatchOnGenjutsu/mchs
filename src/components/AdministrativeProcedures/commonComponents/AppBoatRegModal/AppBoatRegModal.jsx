import { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { MAIN_URL, PORT, API_CHECK_ENGINES_MODIF } from "../../../../constants/constants";
import {
  addNewEngineCheck,
  addNewSpecMarkApp,
  addNewDealApp,
} from "../../../../redux/statementReducer/actionsStatement";
import {
  addNewCulprit,
  addNewInjured,
} from "../../../../redux/TransportAccidentsReportReducer/actionsTransportAccidentsReport";

export default function AppBoatRegModal({
  updateData,
  setShowModal,
  showModal,
  modalWindowInputs,
  dataForCheck,
  mainData,
}) {
  const [newData, setNewData] = useState({});
  const [errors, setErrors] = useState({});
  const [saveKey, setSaveKey] = useState(false);
  const [textCheckEngine, setTextCheckEngine] = useState(null);

  const dispatch = useDispatch();

  const errorsFields = modalWindowInputs.nameColumn
    .filter((item) => item.neededInModal)
    .map((item) => Object.values(item))
    .map((elem) => elem[1])
    .filter((elem) => elem !== "asmLock" && elem !== "msmLock");

  const resultCheck = async () => {
    const responseEngine = await fetch(
      MAIN_URL +
        PORT +
        API_CHECK_ENGINES_MODIF +
        newData.engvin +
        "/" +
        newData.engtype +
        "/" +
        newData.engProdYear,
      { method: "POST" },
    );
    if (responseEngine.ok) {
      if (!JSON.parse(await responseEngine.text())) {
        setTextCheckEngine("Данный двигатель установлен на другой лодке");
      } else {
        updateData(modalWindowInputs.keyTable, newData);
        setShowModal(false);
        setNewData({});
      }
    } else {
      setTextCheckEngine("Ошибка на сервере");
    }
  };
  const countEnginesMaxPower = () => {
    const count = dataForCheck.reduce((acc, current) => {
      if (!current.dateRegEnd) {
        return acc + parseFloat(current.engpwr);
      }
      return acc;
    }, 0);
    return count;
  };
  const countEnginesCheck = () => {
    const count = dataForCheck.reduce((acc, current) => {
      if (!current.dateRegEnd) {
        return acc + 1;
      }
      return acc;
    }, 0);

    return count;
  };

  const handleChange = (e) => {
    if (e.target.dataset.id === "asmLock" || e.target.dataset.id === "msmLock") {
      newData[e.target.dataset.id] = Boolean(e.currentTarget.value);
    } else {
      newData[e.target.dataset.id] = e.currentTarget.value;
    }
    // console.log(e.target.dataset.id);
    if (saveKey) handleErrors();
  };

  const handleErrors = () => {
    let newErrors = {};
    errorsFields.forEach((elem) => {
      if (elem !== "asmLock" || elem !== "msmLock") {
        if (!newData[elem] || newData[elem] === "") {
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
      switch (true) {
        case window.location.pathname.includes("reginformationchanges"):
          switch (modalWindowInputs.keyTable) {
            case "enginesList":
              if (
                dataForCheck.find(
                  (item) =>
                    item.engvin === newData.engvin &&
                    item.engtype === (newData.engtype === "1" ? "Бензиновый" : "Электрический") &&
                    item.engProdYear === newData.engProdYear,
                )
              ) {
                setTextCheckEngine("Двигатель установлен на данном судне");
                break;
              }
              if (!(mainData.engineNum >= countEnginesCheck() + 1)) {
                setTextCheckEngine("Превышает допустимое количество двигателей");
                break;
              }
              if (!(mainData.engpwrmax > countEnginesMaxPower() + parseFloat(newData.engpwr))) {
                setTextCheckEngine("Превышает допустимую предельную мощность двигателей");
                break;
              }

              resultCheck();
              break;
            default:
              updateData(modalWindowInputs.keyTable, newData);
              setShowModal(false);
          }
          break;
        default:
          switch (modalWindowInputs.keyTable) {
            case "boatCardAppEngDtoList":
              if (dataForCheck.findIndex((item) => item.engvin === newData.engvin) < 0) {
                dispatch(addNewEngineCheck(newData.engvin, newData));
              }
              break;
            case "boatCardAppSmDtoList":
              dispatch(addNewSpecMarkApp(newData));
              break;
            case "boatCardAppDealsDtoList":
              dispatch(addNewDealApp(newData));
              break;
            case "culpritsList":
              dispatch(addNewCulprit(newData));
              break;
            case "injuredsList":
              dispatch(addNewInjured(newData));
              break;
            default:
              setShowModal(false);
              setNewData({});
              break;
          }
          setShowModal(false);
          setNewData({});
          break;
      }
    } else {
      setSaveKey(true);
    }
  };

  useEffect(() => {
    let input = null;
    switch (modalWindowInputs.keyTable) {
      case "boatCardAppEngDtoList":
        setNewData({ engtype: 1 });
        break;
      case "boatCardAppSmDtoList":
        setNewData({ asmLock: true });
        input = document.querySelector("#locked");
        input.toggleAttribute("checked");
        break;
      case "enginesList":
        setNewData({ engtype: 1 });
        break;
      case "boatCardSpecmarksList":
        setNewData({ msmLock: true });
        input = document.querySelector("#locked");
        input.toggleAttribute("checked");
        break;
      case "culpritsList":
        setNewData({ drunk: 1 });
        break;
      case "injuredsList":
        setNewData({ drunk: 1 });
        break;
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
                      <Form.Control.Feedback type={"invalid"}>{errors[item.key]}</Form.Control.Feedback>
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
                      <Form.Control.Feedback type={"invalid"}>{errors[item.key]}</Form.Control.Feedback>
                    </Form.Group>
                  );
              }
            }
          })}
          <Form.Label className={`text-danger`}>{textCheckEngine ? textCheckEngine : ""}</Form.Label>
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
