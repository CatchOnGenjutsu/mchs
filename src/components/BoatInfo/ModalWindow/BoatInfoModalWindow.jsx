import React, { useEffect, useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addNewBoatDeal, editBoatDeal } from '../../../redux/actions';

export default function BoatInfoModalWindow({
	boatIdModal,
	showModal,
	setShowModal,
	modalWindowInputs,
	dataForEdit,
	setDataForEdit,
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
		console.log('modalWindowInputs >>>!!', modalWindowInputs);
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
			default:
				break;
		}

		setNewMark(structuredClone(newMark));
		// console.log('newMark >>>>', newMark);
	};

	const handleSave = () => {
		switch (modalWindowInputs.keyTable) {
			case 'dealsHistoryTableColumns':
				if (dataForEdit) {
					dispatch(editBoatDeal(newMark, boatIdModal));
				} else {
					dispatch(addNewBoatDeal(newMark, boatIdModal));
				}
				break;
			// case 'certificateWithdrawal':
			// 	dispatch(addNewConfMark(newMark, licenseIdModal));
			// 	break;
			// case 'boatDrivingLicenseSpecmarksList':
			// 	newMark.markDate = `${new Date().toISOString().slice(0, 10)} ${new Date()
			// 		.toISOString()
			// 		.slice(11, 23)}`;
			// 	newMark.licenseId = licenseIdModal;
			// 	setNewMark(structuredClone(newMark));
			// 	if (newMark.mark !== '') {
			// 		console.log('Mark for edit >>>', newMark);
			// 		dispatch(addNewSpecialMark(newMark));
			// 	}
			// 	break;
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
