import { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  MAIN_URL,
  PORT,
  API_ADD_LEGISLATION_INFO,
  API_EDIT_LEGISLATION_INFO,
  API_ADD_FORMS_INFO,
  API_EDIT_FORMS_INFO,
} from "../../../constants/constants";
// import {
//   addNewEngineCheck,
//   addNewSpecMarkApp,
//   addNewDealApp,
// } from "../../../../redux/statementReducer/actionsStatement";\
import styles from "./NsiModalWindow.module.css";

export default function NsiModalWindow({
  setShowModal,
  showModal,
  modalWindowInputs,
  fetchData,
  mode,
  dataForEdit,
  id,
  setCurrentId,
}) {
  const [newData, setNewData] = useState(Object.entries(dataForEdit).length > 0 ? dataForEdit : {});
  const [errors, setErrors] = useState({});
  const [showErrorText, setShowErrorText] = useState(false);
  const [saveKey, setSaveKey] = useState(false);
  const [file, setFile] = useState(null);
  const [errorsFields, setErrorsFields] = useState([]);

  const errorText = "Произошла ошибка, пожалуйста, повторите попытку";

  const dispatch = useDispatch();

  const handleChange = (e) => {
    switch (e.target.id) {
      case "file":
        if (e.target.files[0]) {
          setFile(e.target.files[0]);
          const index = errorsFields.findIndex((item) => item === "file");
          if (index) errorsFields.splice(index, 1);
        }
        break;
      default:
        newData[e.target.id] = e.currentTarget.value;
        setNewData(structuredClone(newData));
        break;
    }
    if (saveKey) handleErrors();
  };

  const handleErrors = () => {
    if (mode === "edit") {
      const index = errorsFields.findIndex((item) => item === "file");
      if (index) errorsFields.splice(index, 1);
    }
    let newErrors = {};
    errorsFields.forEach((elem) => {
      if (!newData[elem] || newData[elem] === "") {
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

  const handleSave = async () => {
    if (!handleErrors()) {
      switch (mode) {
        case "add":
          {
            const formData = new FormData();
            let request;
            formData.append("file", file);
            switch (true) {
              case window.location.pathname.includes("legislation"):
                console.log("tut1");
                formData.append("infLegislation", JSON.stringify(newData));
                request = await fetch(MAIN_URL + PORT + API_ADD_LEGISLATION_INFO, {
                  method: "POST",
                  body: formData,
                });
                break;
              case window.location.pathname.includes("forms"):
                console.log("tut2");
                formData.append("infForms", JSON.stringify(newData));
                request = await fetch(MAIN_URL + PORT + API_ADD_FORMS_INFO, {
                  method: "POST",
                  body: formData,
                });
                break;
              default:
                break;
            }
            if (request.status === 200) {
              const response = await request.text();
              setShowModal(false);
              fetchData();
              setCurrentId(null);
            } else {
              setShowErrorText(true);
            }
          }
          break;
        case "edit":
          {
            const formData = new FormData();
            formData.append("file", file);
            let request;
            switch (true) {
              case window.location.pathname.includes("legislation"):
                formData.append("infLegislation", JSON.stringify(newData));
                request = await fetch(MAIN_URL + PORT + API_EDIT_LEGISLATION_INFO + id, {
                  method: "POST",
                  body: formData,
                });
                break;
              case window.location.pathname.includes("forms"):
                formData.append("infForms", JSON.stringify(newData));
                request = await fetch(MAIN_URL + PORT + API_EDIT_FORMS_INFO + id, {
                  method: "POST",
                  body: formData,
                });
                break;
              default:
                break;
            }
            if (request.status === 200) {
              const response = await request.text();
              setShowModal(false);
              fetchData();
              setCurrentId(null);
            } else {
              setShowErrorText(true);
            }
          }
          break;
        default:
          break;
      }
    } else {
      setSaveKey(true);
    }
  };

  useEffect(() => {
    setErrorsFields(
      modalWindowInputs
        .filter((item) => item.neededInModal)
        .map((item) => Object.values(item))
        .map((elem) => elem[1]),
    );
    console.log(window.location.pathname);
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
        <Modal.Title>{mode === "add" ? "Добавить строку" : "Редактировать строку"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showErrorText && <div className={styles.red}>Произошла ошибка, пожалуйста, повторите попытку</div>}
        <Form>
          {modalWindowInputs.map((item) => {
            if (item.neededInModal) {
              switch (item.type) {
                case "file":
                  return (
                    <Form.Group className="mb-3">
                      <Form.Label>{item.value}</Form.Label>
                      <Form.Control
                        id={item.key}
                        type="file"
                        isInvalid={!!errors[item.key]}
                        accept=".doc, .docx, .pdf"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                      <Form.Control.Feedback type={"invalid"}>{errors[item.key]}</Form.Control.Feedback>
                    </Form.Group>
                  );
                default:
                  return (
                    <Form.Group className="mb-3">
                      <Form.Label>{item.value}</Form.Label>
                      <Form.Control
                        id={item.key}
                        type="text"
                        isInvalid={!!errors[item.key]}
                        value={newData[item.key]}
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
