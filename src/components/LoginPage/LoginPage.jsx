import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const [userEmail, setUserEmail] = useState("");
  const [userPas, setUserPas] = useState("");

  const handleButtonClick = () => {
    window.location.assign("http://localhost:3005/smallboats");
  };

  const handleUserEmail = (e) => {
    setUserEmail(e.target.value);
  };

  const handleUserPas = (e) => {
    setUserPas(e.target.value);
  };

  return (
  <>
    <div className={styles["form-container"]}>
    <Form className={styles["login-form"]}>
      <Form.Group
      className="mb-3"
      controlId="formBasicEmail">
      <Form.Label className={styles["text-form"]}>
        Электронная почта
      </Form.Label>
      <Form.Control
        onChange={handleUserEmail}
        type="email"
        placeholder="Введите электронную почту"
      />
      </Form.Group>

      <Form.Group
      className="mb-3"
      controlId="formBasicPassword">
      <Form.Label className={styles["text-form"]}>
        Пароль
      </Form.Label>
      <Form.Control
        onChange={handleUserPas}
        type="password"
        placeholder="Введите пароль"
      />
      </Form.Group>
      <Button
      onClick={handleButtonClick}
      variant="light"
      className={styles["custom-button-form"]}>
      ВХОД
      </Button>
    </Form>
    </div>
  </>
  );
}
