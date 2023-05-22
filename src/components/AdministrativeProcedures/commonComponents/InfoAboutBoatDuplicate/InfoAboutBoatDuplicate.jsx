import { useSelector } from "react-redux";
import { Form } from "react-bootstrap";

import { fieldBoatOptionsDuplicate } from "./optionsInfoAboutBoatDuplicate";

import styles from "./InfoAboutBoatDuplicate.module.css";

export default function InfoAboutBoatDuplicate() {
  const newAppDupl = useSelector((state) => {
    const { DuplicateShipsTicketReducer } = state;
    return DuplicateShipsTicketReducer.newAppDupl;
  });

  return (
    <div>
      <h3>Сведения о маломерном судне</h3>
      <div className={styles["container-information"]}>
        <div className={styles["boat-information"]}>
          {Object.values(newAppDupl).length > 0 &&
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
                      item.key === "operDate"
                        ? newAppDupl[item.key].split("-").reverse().join(".")
                        : newAppDupl[item.key]
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
