import { useSelector } from "react-redux";
import { Form } from "react-bootstrap";

import { fieldBoatOptionsDuplicate } from "./optionsInfoAboutBoatDuplicate";

import styles from "./InfoAboutBoatDuplicate.module.css";

export default function InfoAboutBoatDuplicate() {
  const newAppDupl = useSelector((state) => {
    const { DuplicateShipsTicketReducer } = state;
    return DuplicateShipsTicketReducer.newAppDupl;
  });
  const newAppTechExam = useSelector((state) => {
    const { TechnicalExaminationReducer } = state;
    return TechnicalExaminationReducer.newAppTechExam;
  });

  const data = window.location.pathname.includes("techexamination")
    ? { ...newAppTechExam }
    : { ...newAppDupl };

  return (
    <div>
      <h3 className={styles.text_secondary}>Сведения о маломерном судне</h3>
      <div className={styles["container-information"]}>
        <div className={styles["boat-information"]}>
          {Object.values(data).length > 0 &&
            Object.values(fieldBoatOptionsDuplicate).map((item) => {
              return (
                <Form.Group
                  controlId={`${item.key}`}
                  className={`${styles["common"]} ${styles[`box-${item.key}`]}`}>
                  <Form.Label>{item.value}</Form.Label>
                  <Form.Control
                    type={item.type}
                    readOnly={item.readOnly}
                    disabled={item.disabled}
                    value={
                      item.key === "operDate" ? data[item.key].split("-").reverse().join(".") : data[item.key]
                    }
                  />
                </Form.Group>
              );
            })}
        </div>
      </div>
    </div>
  );
}

//  InfoAboutBoatDuplicate;
