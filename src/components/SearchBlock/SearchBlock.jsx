import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
	setSearchParams,
	getDataBoatsBySearchParams,
	getDataCerticatesBySearchParams,
	getDataBasesBuildingBySearchParams
} from "../../redux/actions";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "./SearchBlock.module.css";
import {certificateReducer} from "../../redux/reducers/certificateReducer";

export default function SearchBlock(props) {
	const dispatch = useDispatch();


	const searchParamsFromStateBoat = useSelector((state) => {
		const { smallBoatsReducer } = state;
		return smallBoatsReducer.searchParams;
	});

	const searchParamsFromStateCertificate = useSelector((state) => {
		const {   certificateReducer } = state;
		return certificateReducer.searchParams;
	});

	const searchParamsFromStateBasesBuilding = useSelector(state => {
		const {basesBuildingReducer} = state;
		return basesBuildingReducer.searchParams
	})

	const handleSearchData = (e) => {
		e.preventDefault();
		console.log(e.target.baseURI)
		switch (true) {
			case e.target.baseURI.includes('certificates'):{
				dispatch(getDataCerticatesBySearchParams(searchParamsFromStateCertificate));
				break;			}
			case e.target.baseURI.includes('smallboats'):{

				dispatch(getDataBoatsBySearchParams(searchParamsFromStateBoat));
				break;
			}
			case e.target.baseURI.includes('basesbuilding'):{
				dispatch(getDataBasesBuildingBySearchParams(searchParamsFromStateBasesBuilding))
				break;
			}
			default: ;
		}
	};

	const handleValue = (e) => {
		dispatch(setSearchParams(e.target.dataset.id, e.target.value,e.target.baseURI));
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
								{item.type==='select'&&(
									<Form.Select  className={`mb-2`}
												  data-id={item.key}
												  onChange={(e) => handleValue(e)}
									>
									{item.selectOption.map(el=>(<option>{el}</option>))}
								</Form.Select>
								)}
								{item.type==='text'&&(
									<Form.Control
										data-id={item.key}
										onChange={(e) => handleValue(e)}
										className={styles["entry-field"]}
										type="text"
									/>
								)}
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
