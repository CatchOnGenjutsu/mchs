import React, { useEffect, useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addNewSpecialMark, addNewConfMark } from '../../../redux/actions';

export default function CertificateModalWindow({
	licenseIdModal,
	showModal,
	setShowModal,
	modalWindowInputs,
	dataForEdit,
	setDataForEdit,
}) {
	const usersLib = useSelector((state) => {
		const { dictionaryReducer } = state;
		return dictionaryReducer.usersLibrary;
	});

	const [newMark, setNewMark] = useState(
		modalWindowInputs.keyTable === 'boatDrivingLicenseSpecmarksList'
			? dataForEdit
			: { userid: usersLib[0] }
	);

	const dispatch = useDispatch();

	useEffect(() => {
		console.log('modalWindowInputs >>>!!', modalWindowInputs);
		console.log('dataForEdit >>>!!', dataForEdit);
		console.log('newMark >>>!!', newMark);
	}, []);

	const handleSave = () => {
		switch (modalWindowInputs.keyTable) {
			case 'lossControl':
				dispatch(addNewConfMark(newMark, licenseIdModal));
				break;
			case 'certificateWithdrawal':
				dispatch(addNewConfMark(newMark, licenseIdModal));
				break;
			case 'boatDrivingLicenseSpecmarksList':
				newMark.markDate = `${new Date().toISOString().slice(0, 10)} ${new Date()
					.toISOString()
					.slice(11, 23)}`;
				newMark.licenseId = licenseIdModal;
				setNewMark(structuredClone(newMark));
				if (newMark.mark !== '') {
					console.log('Mark for edit >>>', newMark);
					dispatch(addNewSpecialMark(newMark));
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

	const handleChange = (e) => {
		switch (modalWindowInputs.keyTable) {
			case 'lossControl':
				newMark[e.currentTarget.dataset.id] = e.currentTarget.value;
				newMark.recdate = Date.now();
				newMark.confiscation = {};
				newMark.confiscation.code = 1;
				newMark.confiscation.name = 'Лишение';
				newMark.confiscation.note = '';
				setNewMark(newMark);
				break;
			case 'certificateWithdrawal':
				if (e.currentTarget.dataset.id !== 'name') {
					newMark[e.currentTarget.dataset.id] = e.currentTarget.value;
					newMark.recdate = Date.now();
					newMark.confDateEnd = '2020-12-12'; //Тестовое значение, уточнить необходимость ввода данных
					newMark.confDocNum = '-'; //Тестовое значение, уточнить необходимость ввода данных
					newMark.confiscation = {};
					newMark.confiscation.code = 2;
					newMark.confiscation.name = 'Изъятие';
					newMark.confiscation.note = '';
				} else {
					newMark.userid = usersLib.find((item) => item.userid == e.target.value);
				}

				setNewMark(newMark);
				break;
			case 'boatDrivingLicenseSpecmarksList':
				newMark.markDate = `${new Date().toISOString().slice(0, 10)} ${new Date()
					.toISOString()
					.slice(11, 23)}`;
				newMark[e.currentTarget.dataset.id] = e.currentTarget.value;
				setNewMark(structuredClone(newMark));
				break;
			default:
				break;
		}

		setNewMark(structuredClone(newMark));
		console.log('newMark >>>>', newMark);
	};

	return (
		<Modal
			show={showModal}
			onHide={() => {
				setShowModal(false);
				setNewMark({});
			}}
			size="lg">
			<Modal.Header closeButton>
				<Modal.Title>
					{modalWindowInputs.caption}
					{/* {options[type]} */}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					{modalWindowInputs.nameColumn.map((item) => {
						if (item[0] === 'name') {
							return (
								<Form.Group className="mb-3">
									<Form.Label>{item[1]}</Form.Label>
									<Form.Select
										data-id={item[0]}
										type="select"
										onChange={(e) => {
											handleChange(e);
										}}>
										{usersLib.map((elem) => (
											<option
												data-id={item[0]}
												value={elem.userid}>
												{elem.name}
											</option>
										))}
									</Form.Select>
								</Form.Group>
							);
						}
						if (
							item[0] !== 'markDate' &&
							item[0] !== 'userPositions' &&
							(item[0] === 'confDateEnd' || item[0] === 'confDate')
						) {
							return (
								<Form.Group className="mb-3">
									<Form.Label>{item[1]}</Form.Label>
									<Form.Control
										data-id={item[0]}
										type="date"
										onChange={(e) => {
											handleChange(e);
										}}
									/>
								</Form.Group>
							);
						}
						if (item[0] === 'mark') {
							return (
								<Form.Group className="mb-3">
									<Form.Label>{item[1]}</Form.Label>
									<Form.Control
										data-id={item[0]}
										type="text"
										value={newMark.mark}
										onChange={(e) => {
											handleChange(e);
										}}
									/>
								</Form.Group>
							);
						}
						if (item[0] !== 'markDate' && item[0] !== 'userPositions') {
							return (
								<Form.Group className="mb-3">
									<Form.Label>{item[1]}</Form.Label>
									<Form.Control
										data-id={item[0]}
										type="text"
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
						setDataForEdit(null);
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
