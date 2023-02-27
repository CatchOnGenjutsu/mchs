import React from "react";
import styles from "./ModalWindow.module.css";
import Form from "react-bootstrap/Form";

export default function ModalWindowCertificates(props) {
	console.log("props for modal", props);
	return (
		<div>
			{/* <Form.Group
				key={item.key}
				// className={styles["input-element"]}
				controlId="formBasicEmail">
				<Form.Label className={styles["label-text"]}>{item.value}</Form.Label>
				<Form.Control
					data-id={item.key}
					// onChange={(e) => handleValue(e)}
					className={styles["entry-field"]}
					type="text"
				/>
				{item.description !== undefined ? (
					<Form.Text className={styles["description-text"]}>{item.description}</Form.Text>
				) : null}
			</Form.Group> */}
		</div>
	);
}
