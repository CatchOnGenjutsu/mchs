import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../styles/SearchBlock.css"


export default function SearchBlock(props) {
  return (
    <>
      <Form className="form-inputs">
        <div className="area-inputs">
          {props.inputsHeaders.map((item) => {
            return (
              <Form.Group key={item.key} className="input-element" controlId="formBasicEmail">
                <Form.Label className="label-text">{item.value}</Form.Label>
                <Form.Control className="entry-field" type="text" />
                {item.description !== undefined ?
                  <Form.Text className="description-text">
                    {item.description}
                  </Form.Text> : null
                }
              </Form.Group>
            )
          })}
        </div>
        <div className="buttons-block">
          <Button className="button-element" variant="primary" type="submit">
            Найти &#128269;
          </Button>
          <Button className="button-element" variant="primary" type="submit">
            Очистить
          </Button>
        </div>
      </Form>
    </>
  )
}