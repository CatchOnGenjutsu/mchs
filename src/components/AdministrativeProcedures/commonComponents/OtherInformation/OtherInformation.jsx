import React from "react";
import { Form } from "react-bootstrap";
import styles from "./OtherInformation.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addNewStatementData } from "../../../../redux/statementReducer/actionsStatement";

export default function OtherInformation({ mode }) {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(addNewStatementData({ [`${e.target.id}`]: e.target.value }));
  };
  const newStatement = useSelector((state) => {
    const { statementReducer } = state;
    return statementReducer.newStatement;
  });
  return (
    <>
      <h3>Иные сведения</h3>
      <Form.Group>
        <Form.Control
          onChange={(e) => handleChange(e)}
          id="note"
          type="text"
          readOnly={mode === "view"}
          disabled={mode === "view" ? true : false}
          value={newStatement["note"]}
        />
        <Form.Label>
          Сведения о том, находится ли маломерное судно в хозяйственном ведении или оперативном управлении
          (если находится, то указать наименование, местонахождение, учетный номер плательщика, контактный
          номер юридического лица)
        </Form.Label>
      </Form.Group>
      <Form.Group>
        <Form.Control
          onChange={(e) => handleChange(e)}
          id="note2"
          type="text"
          readOnly={mode === "view"}
          disabled={mode === "view" ? true : false}
          value={newStatement["note2"]}
        />
        <Form.Label>
          Сведения о том, передано ли маломерное судно в аренду, лизинг (если передано, то указать фамилию,
          собственное имя, отчество (если такое имеется), идентификационный номер, серию (при наличии), номер,
          кем и когда выдан документ, удостоверяющий личность, адрес местожительства, контактный телефон —
          если арендатор, лизингополучатель - физическое лицо; наименование, местонахождение, учетный номер
          плательщика, контактны телефон — если арендатор, лизингополучатель — юридическое лицо; фамилию,
          собственное имя, отчество (если таковое имеется), идентификационный номер, серию (при наличии),
          номер, кем и когда выдан документ, удостоверяющий личность, адрес места жительства, учетный номер
          плательщика, контактный телефон — если арендатор, лизингополучатель — индивидуальный
          предприниматель)
        </Form.Label>
      </Form.Group>
    </>
  );
}
