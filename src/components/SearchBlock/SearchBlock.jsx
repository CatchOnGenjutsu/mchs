import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setSearchParams, getDataBySearchParams } from "../../redux/actions";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "./SearchBlock.module.css";

export default function SearchBlock(props) {
	const dispatch = useDispatch();

	const searchParamsFromState = useSelector((state) => {
		const { smallBoatsReducer } = state;
		return smallBoatsReducer.searchParams;
	});
	const handleSearchData = (e) => {
		e.preventDefault();
		dispatch(getDataBySearchParams(searchParamsFromState));
	};

	const handleValue = (e) => {
		dispatch(setSearchParams(e.target.dataset.id, e.target.value));
	};
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
								<Form.Label className={styles["label-text"]}>{item.value}</Form.Label>
								<Form.Control
									data-id={item.key}
									onChange={(e) => handleValue(e)}
									className={styles["entry-field"]}
									type="text"
								/>
								{item.description !== undefined ? (
									<Form.Text className={styles["description-text"]}>
										{item.description}
									</Form.Text>
								) : null}
							</Form.Group>
						);
					})}
				</div>
				<div className={styles["buttons-block"]}>
					<Button
						onClick={(e) => handleSearchData(e)}
						className={styles["button-element"]}
						variant="primary">
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
