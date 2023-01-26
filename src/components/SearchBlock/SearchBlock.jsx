import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "./SearchBlock.module.css";

export default function SearchBlock(props) {
	return (
		<>
			<Form className={styles["form-inputs"]}>
				<div className={styles["area-inputs"]}>
					{props.inputsHeaders.map((item) => {
						return (
							<Form.Group
								key={item.key}
								className={styles["input-element"]}
								controlId="formBasicEmail">
								<Form.Label className={styles["label-text"]}>
									{item.value}
								</Form.Label>
								<Form.Control
									className={styles["entry-field"]}
									type="text"
								/>
								{item.description !== undefined ? (
									<Form.Text
										className={styles["description-text"]}>
										{item.description}
									</Form.Text>
								) : null}
							</Form.Group>
						);
					})}
				</div>
				<div className={styles["buttons-block"]}>
					<Button
						className={styles["button-element"]}
						variant="primary"
						type="submit">
						Найти &#128269;
					</Button>
					<Button
						className={styles["button-element"]}
						variant="primary"
						type="submit">
						Очистить
					</Button>
				</div>
			</Form>
		</>
	);
}
