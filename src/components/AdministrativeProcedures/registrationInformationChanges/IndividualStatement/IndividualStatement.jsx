import React from "react";
import { Form } from "react-bootstrap";
import styles from "./IndividualStatement.module.css";
import { optionSelectChangeType } from "./optionsForIndividualStatement";
import InformationAboutIndividual from "../../commonComponents/InformationAboutIndividual/InformationAboutIndividual";

function IndividualStatement(props) {
  return (
    <div className="d-flex flex-column align-items-center">
      <h2>Заявление для физ.лиц</h2>
      <p>
        о государственной регистрации изменений сведений, подлежащих внесению в
        судовую книгу для маломерного судна, за исключением гребных лодок,
        байдарок и надувных судов грузоподъемностью менее 225 килограммов
      </p>
      <div className={styles["form-container"]}>
        <Form>
          <Form.Group className={styles["header"]}>
            <Form.Label>Регистрационный номер маломерного судна:</Form.Label>
            <Form.Control
              type="text"
              readOnly={true}
              disabled={true}
            />
          </Form.Group>
          <Form.Group className={styles["header"]}>
            <Form.Label>Субъект хозяйствования:</Form.Label>
            <Form.Control
              type="text"
              readOnly={true}
              disabled={true}
            />
          </Form.Group>
          <Form.Group className={styles["header"]}>
            <Form.Label>Субъект хозяйствования:</Form.Label>
            <Form.Select>
              {optionSelectChangeType.map((el) => (
                <option value={el.id}>{el.value}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className={styles["header"]}>
            <Form.Label>Номер судового билета:</Form.Label>
            <Form.Control
              type="text"
              readOnly={true}
              disabled={true}
            />
          </Form.Group>
          <Form.Group className={styles["header"]}>
            <Form.Label>Дата выдачи судового билета:</Form.Label>
            <Form.Control
              type="text"
              readOnly={true}
              disabled={true}
            />
          </Form.Group>
          <InformationAboutIndividual />
        </Form>
      </div>
    </div>
  );
}

export default IndividualStatement;
