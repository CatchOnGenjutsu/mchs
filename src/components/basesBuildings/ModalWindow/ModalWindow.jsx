import React, { useEffect, useState } from 'react';
import styles from './ModalWindow.module.css';
import { Form, Button, Modal } from 'react-bootstrap';
import { optionsForModalWindow } from './constansForModalWindow';
import { useDispatch, useSelector } from 'react-redux';
import { addDataBasesBuildings, editDataBasesBuildings } from '../../../redux/actions';
function ModalWindow({ setShow, show, type, buildingId }) {
	const options = {
		add: 'Добавить новую базу',
		edit: 'Редактировать запись',
		delete: 'Удалить запись',
	};
	const dispatch = useDispatch();
	const dataFromStateBases = useSelector((state) => {
		const { basesBuildingReducer } = state;
		return basesBuildingReducer.data;
	});
	const [selectValue, setSelectValue] = useState(null);
	const [optionsInput, setOptionsInput] = useState([]);
	const [building, setBuilding] = useState(() => {
		if (dataFromStateBases.length && type === 'edit') {
			return structuredClone(dataFromStateBases.find((el) => el.parkId == buildingId));
		} else {
			return { ownerType: '1' };
		}
	});
	useEffect(() => {
		const element = document.querySelector('#typeOwnership');
		element && setSelectValue(element.value);
		selectValue == optionsForModalWindow.optionsForSelect[0].id
			? setOptionsInput(optionsForModalWindow.optionsForInputIndividual)
			: setOptionsInput(optionsForModalWindow.optionsForInputLegalEntity);
	});

	const handleValue = (event) => {
		setSelectValue(event.target.value);
		building['ownerType'] = event.target.value;
		setBuilding(building);
		selectValue == optionsForModalWindow.optionsForSelect[0].id
			? setOptionsInput(optionsForModalWindow.optionsForInputIndividual)
			: setOptionsInput(optionsForModalWindow.optionsForInputLegalEntity);
	};
	const handleClose = (event) => {
		let buttonType;
		if (event) {
			buttonType = event.target.dataset.type;
		}
		switch (true) {
			case buttonType === 'save' && type === 'add': {
				dispatch(addDataBasesBuildings(building));
				break;
			}
			case buttonType === 'save' && type === 'edit': {
				dispatch(editDataBasesBuildings(building));
				break;
			}
		}
		setShow(false);
	};

	return (
		<Modal
			show={show}
			onHide={handleClose}
			size="lg">
			<Modal.Header closeButton>
				<Modal.Title>{options[type]}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form className={`d-flex flex-wrap justify-content-between`}>
					<Form.Group className=" mr-auto ">
						<Form.Label>Форма собственности</Form.Label>
						<Form.Select
							onChange={(e) => handleValue(e)}
							id={`typeOwnership`}
							value={building ? building['ownerType'] : 1}>
							{optionsForModalWindow.optionsForSelect.map((el) => (
								<option value={el.id}>{el.value}</option>
							))}
						</Form.Select>
					</Form.Group>
					{optionsInput.map((el) => (
						<Form.Group className="mb-3">
							<Form.Label>{el.label}</Form.Label>
							<Form.Control
								data-id={el.key}
								type="text"
								value={(building && building[el.key]) || ''}
								onChange={(e) => {
									building[e.currentTarget.dataset.id] = e.currentTarget.value;
									setBuilding(structuredClone(building));
								}}
							/>
						</Form.Group>
					))}
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant="secondary"
					data-type={`close`}
					onClick={handleClose}>
					Закрыть
				</Button>
				<Button
					variant="primary"
					data-type={`save`}
					onClick={handleClose}>
					Сохранить
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ModalWindow;
