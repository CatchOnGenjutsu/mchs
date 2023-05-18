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
  API_ADD_PAID_PROC_INFO,
  API_EDIT_PAID_PROC_INFO,
  API_ADD_REQUISITES_CHAPTER,
  API_EDIT_REQUISITES_CHAPTER,
  API_ADD_REQUISITES_LINE,
  API_EDIT_REQUISITES_LINE,
  API_ADD_ADMIN_PROC,
  API_EDIT_ADMIN_PROC,
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
  setDataForEdit,
  id,
  setCurrentId,
  type,
}) {
  const [newData, setNewData] = useState(Object.entries(dataForEdit).length > 0 ? dataForEdit : {});
  const [errors, setErrors] = useState({});
  const [showErrorText, setShowErrorText] = useState(false);
  const [saveKey, setSaveKey] = useState(false);
  const [file, setFile] = useState(null);
  const [errorsFields, setErrorsFields] = useState([]);
  const [mainText, setMainText] = useState("");
  // mode === "add" && type === "chapter" ? "Добавить раздел" : "Добавить строку"

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
      if (index >= 0) errorsFields.splice(index, 1);
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
                formData.append("infLegislation", JSON.stringify(newData));
                request = await fetch(MAIN_URL + PORT + API_ADD_LEGISLATION_INFO, {
                  method: "POST",
                  body: formData,
                });
                break;
              case window.location.pathname.includes("forms"):
                formData.append("infForms", JSON.stringify(newData));
                request = await fetch(MAIN_URL + PORT + API_ADD_FORMS_INFO, {
                  method: "POST",
                  body: formData,
                });
                break;
              case window.location.pathname.includes("paidproc"):
                request = await fetch(MAIN_URL + PORT + API_ADD_PAID_PROC_INFO, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(newData),
                });
                break;
              case window.location.pathname.includes("requisites"):
                if (type === "chapter") {
                  request = await fetch(MAIN_URL + PORT + API_ADD_REQUISITES_CHAPTER, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newData),
                  });
                  break;
                } else {
                  request = await fetch(MAIN_URL + PORT + API_ADD_REQUISITES_LINE + id, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newData),
                  });
                  break;
                }
              case window.location.pathname.includes("adminproc"):
                request = await fetch(MAIN_URL + PORT + API_ADD_ADMIN_PROC, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(newData),
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
              case window.location.pathname.includes("paidproc"):
                request = await fetch(MAIN_URL + PORT + API_EDIT_PAID_PROC_INFO + id, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(newData),
                });
                break;
              case window.location.pathname.includes("requisites"):
                if (type === "chapter") {
                  request = await fetch(MAIN_URL + PORT + API_EDIT_REQUISITES_CHAPTER + id, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newData),
                  });
                  break;
                } else {
                  // delete newData[id];
                  request = await fetch(MAIN_URL + PORT + API_EDIT_REQUISITES_LINE + id, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newData),
                  });
                  break;
                }
              case window.location.pathname.includes("adminproc"):
                request = await fetch(MAIN_URL + PORT + API_EDIT_ADMIN_PROC + id, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(newData),
                });
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
    if (mode === "add") {
      if (type === "chapter") {
        setMainText("Добавить раздел");
      } else {
        setMainText("Добавить строку");
      }
    } else {
      if (type === "chapter") {
        setMainText("Редактировать раздел");
      } else {
        setMainText("Редактировать строку");
      }
    }
  }, []);

  return (
    <Modal
      show={showModal}
      onHide={() => {
        setShowModal(false);
        setDataForEdit({});
        setNewData({});
      }}
      size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{mainText}</Modal.Title>
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
                case "textarea":
                  return (
                    <Form.Group className="mb-3">
                      <Form.Label>{item.value}</Form.Label>
                      <Form.Control
                        id={item.key}
                        type="text"
                        as="textarea"
                        rows={item.key === "name" ? 3 : 8}
                        isInvalid={!!errors[item.key]}
                        value={newData[item.key]}
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
            setDataForEdit({});
            setShowModal(false);
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
