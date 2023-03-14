import React, { useEffect, useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addNewBoatInfo, editBoatInfo } from '../../../redux/actions';

export default function BoatInfoModalWindow({
	boatIdModal,
	showModal,
	setShowModal,
	modalWindowInputs,
	dataForEdit,
	setDataForEdit,
	type,
	setType,
}) {
	const boatInfoFromState = useSelector((state) => {
		const { smallBoatsReducer } = state;
		return smallBoatsReducer.boatInfo;
	});

	const [newData, setNewMark] = useState(
		type === 'edit' ? structuredClone(dataForEdit) : {}
	);

	const dispatch = useDispatch();

	const handleChange = (e) => {
		switch (modalWindowInputs.keyTable) {
			case 'dealsHistoryTableColumns':
				newData[e.currentTarget.dataset.id] = e.currentTarget.value;
				newData.recdate = Date.now();
				newData.ownerType = boatInfoFromState.ownerType;
				newData.ownerName =
					boatInfoFromState.ownerType.ptcode === 1
						? `${boatInfoFromState.ownerSurname} ${boatInfoFromState.ownerName} ${boatInfoFromState.ownerMidname}`
						: boatInfoFromState.leName;
				setNewMark(newData);
				break;
			case 'specialMarksTableColumns':
				// case 'bsmLock':
				switch (e.currentTarget.dataset.id) {
					case 'bsmLock':
						newData[e.currentTarget.dataset.id] = Boolean(e.currentTarget.value);
						break;
					default:
						newData[e.currentTarget.dataset.id] = e.currentTarget.value;
						break;
				}
				break;
			default:
				break;
		}

		setNewMark(structuredClone(newData));
	};

	const handleSave = () => {
		console.log('Payload >!>!', newData);
		switch (modalWindowInputs.keyTable) {
			case 'dealsHistoryTableColumns':
				switch (type) {
					case 'edit':
						console.log('edit');
						dispatch(editBoatInfo(newData, boatIdModal, 'dealsHistoryTableColumns'));
						break;
					case 'save':
						console.log('save');
						dispatch(addNewBoatInfo(newData, boatIdModal, 'dealsHistoryTableColumns'));
						break;
					default:
						break;
				}
				break;
			case 'specialMarksTableColumns':
				switch (type) {
					case 'edit':
						console.log('edit');
						dispatch(editBoatInfo(newData, boatIdModal, 'specialMarksTableColumns'));
						break;
					case 'save':
						console.log('save');
						dispatch(addNewBoatInfo(newData, boatIdModal, 'specialMarksTableColumns'));
						break;
					default:
						break;
				}
				break;
			default:
				setShowModal(false);
				setNewMark({});
				break;
		}
		setShowModal(false);
		setNewMark({});
	};

	useEffect(() => {
		// console.log('newData.bsmLock >>>!!', newData.bsmLock);
		let input = undefined;
		switch (newData.bsmLock) {
			case true:
				input = document.querySelector('#locked');
				break;
			case false:
				input = document.querySelector('#unlocked');
				break;
		}
		input.toggleAttribute('checked');
	}, []);

	return (
		<Modal
			show={showModal}
			onHide={() => {
				setShowModal(false);
				setNewMark({});
				setDataForEdit({});
			}}
			size="lg">
			<Modal.Header closeButton>
				<Modal.Title>{modalWindowInputs.caption}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					{modalWindowInputs.nameColumn.map((item) => {
						// if (item.type === 'select') {
						// 	return (
						// 		<Form.Group className="mb-3">
						// 			<Form.Label>{item.value}</Form.Label>
						// 			<Form.Select
						// 				data-id={item.key}
						// 				type="select"
						// 				// onChange={(e) => {
						// 				// 	handleChange(e);
						// 				// }}
						// 			>
						// 				{usersLib.map((elem) => (
						// 					<option
						// 						data-id={item.key}
						// 						value={elem.userid}>
						// 						{elem.name}
						// 					</option>
						// 				))}
						// 			</Form.Select>
						// 		</Form.Group>
						// 	);
						// }
						if (item.type === 'date') {
							return (
								<Form.Group className="mb-3">
									<Form.Label>{item.value}</Form.Label>
									<Form.Control
										data-id={item.key}
										type="date"
										value={newData[`${item.key}`]}
										onChange={(e) => {
											handleChange(e);
										}}
									/>
								</Form.Group>
							);
						}
						if (item.type === 'checkbox') {
							return (
								<Form.Group className="mb-3">
									<Form.Label>{item.value}</Form.Label>
									<Form.Check
										name={item.value}
										data-id={item.key}
										id="locked"
										type="radio"
										label="Да"
										value={1}
										onChange={(e) => {
											handleChange(e);
										}}
									/>
									<Form.Check
										name={item.value}
										data-id={item.key}
										id="unlocked"
										type="radio"
										label="Нет"
										value={''}
										onChange={(e) => {
											handleChange(e);
										}}
									/>
								</Form.Group>
							);
						}

						if (item.type !== 'date') {
							return (
								<Form.Group className="mb-3">
									<Form.Label>{item.value}</Form.Label>
									<Form.Control
										data-id={item.key}
										type="text"
										value={newData[`${item.key}`]}
										onChange={(e) => {
											handleChange(e);
										}}
									/>
								</Form.Group>
							);
						}
					})}
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant="secondary"
					onClick={() => {
						console.log(dataForEdit);
						setShowModal(false);
						setDataForEdit({});
						setNewMark({});
						setType(null);
					}}>
					Закрыть
				</Button>
				<Button
					variant="primary"
					onClick={handleSave}>
					Сохранить
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
