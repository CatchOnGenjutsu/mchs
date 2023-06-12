import React from 'react';
import styles from "../../../InspectorWorkStat/InspectorWorkStat.module.css";
import Form from "react-bootstrap/Form";

function SearchBlock({fields}) {
    return (
        <>
            <Form className={styles.form_inputs}>
                {fields.map((field)=>{
                    return (
                        <Form.Group className={styles.input_element}>
                            <Form.Label className={styles.label_text}>
                                {field.label}
                            </Form.Label>
                            <Form.Control
                                className={`mb-2`}
                            />
                        </Form.Group>
                    )
                })}
            </Form>
        </>
    );
}

export default SearchBlock;