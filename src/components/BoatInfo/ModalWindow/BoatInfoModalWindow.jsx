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
}) {
	const boatInfoFromState = useSelector((state) => {
		const { smallBoatsReducer } = state;
		return smallBoatsReducer.boatInfo;
	});

	const [newMark, setNewMark] = useState(
		modalWindowInputs.keyTable === 'dealsHistoryTableColumns' ? dataForEdit : {}
	);

	const dispatch = useDispatch();

	useEffect(() => {
		console.log('newMark >>>!!', newMark);
	}, []);

	const handleChange = (e) => {
		switch (modalWindowInputs.keyTable) {
			case 'dealsHistoryTableColumns':
				newMark[e.currentTarget.dataset.id] = e.currentTarget.value;
				newMark.recdate = Date.now();
				newMark.ownerType = boatInfoFromState.ownerType;
				newMark.ownerName =
					boatInfoFromState.ownerType.ptcode === 1
						? `${boatInfoFromState.ownerSurname} ${boatInfoFromState.ownerName} ${boatInfoFromState.ownerMidname}`
						: boatInfoFromState.leName;
				setNewMark(newMark);
				break;
			case 'specialMarksTableColumns':
				// newMark.bsmLock = false;
				switch (e.currentTarget.dataset.id) {
					// case 'bsmLock':
					// 	if (e.currentTarget.value === 'on') {
					// 		newMark[e.currentTarget.dataset.id] = e.currentTarget.value;
					// 	} else {
					// 		newMark[e.currentTarget.dataset.id] = e.currentTarget.value;
					// 	}
					// 	break;
					default:
						newMark[e.currentTarget.dataset.id] = e.currentTarget.value;
						newMark.cardId = boatIdModal;
						// Тестовое значение, поменять при добавлении логики логирования и введения разделения на пользователей
						newMark.editor = 2;
						// Тестовое значение, поменять при добавлении логики логирования и введения разделения на пользователей
						break;
				}
				// newMark.recdate = Date.now();
				// newMark.ownerType = boatInfoFromState.ownerType;
				// newMark.ownerName =
				// 	boatInfoFromState.ownerType.ptcode === 1
				// 		? `${boatInfoFromState.ownerSurname} ${boatInfoFromState.ownerName} ${boatInfoFromState.ownerMidname}`
				// 		: boatInfoFromState.leName;
				setNewMark(newMark);
				break;
			default:
				break;
		}

		setNewMark(structuredClone(newMark));
		// console.log('newMark >>>>', newMark);
	};

	const handleSave = () => {
		switch (modalWindowInputs.keyTable) {
			case 'dealsHistoryTableColumns':
				switch (type) {
					case 'edit':
						console.log('edit');
						console.log('dataForEdit', Object.keys(dataForEdit).length);
						dispatch(editBoatInfo(newMark, boatIdModal, 'dealsHistoryTableColumns'));
						break;
					case 'save':
						console.log('save');
						dispatch(addNewBoatInfo(newMark, boatIdModal, 'dealsHistoryTableColumns'));
						break;
					default:
						break;
				}
				break;
			case 'specialMarksTableColumns':
				if (dataForEdit) {
					dispatch(editBoatInfo(newMark, boatIdModal, 'specialMarksTableColumns'));
				} else {
					dispatch(addNewBoatInfo(newMark, boatIdModal, 'specialMarksTableColumns'));
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
										value={newMark[`${item.key}`]}
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
									<Form.Check type="checkbox">
										<Form.Check.Input
											data-id={item.key}
											type="checkbox"
											onChange={(e) => {
												handleChange(e);
											}}
										/>
										<Form.Check.Label>{item.value}</Form.Check.Label>
									</Form.Check>
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
										value={newMark[`${item.key}`]}
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
						console.log(newMark);
						setShowModal(false);
						setDataForEdit({});
						setNewMark({});
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
