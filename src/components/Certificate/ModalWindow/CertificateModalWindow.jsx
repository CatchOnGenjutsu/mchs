import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

export default function CertificateModalWindow({
	showModal,
	setShowModal,
	modalWindowInputs,
}) {
	return (
		<Modal
			show={showModal}
			// onHide={handleClose}
			size="lg">
			<Modal.Header closeButton>
				<Modal.Title>
					{modalWindowInputs.caption}
					{/* {options[type]} */}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					{modalWindowInputs.nameColumn.map((item) => (
						<Form.Group className="mb-3">
							<Form.Label>{item[1]}</Form.Label>
							<Form.Control
								data-id={item[0]}
								type="text"
								// value={type === 'edit' && building ? building[el.key] : ''}
								// onChange={(e) => {
								// 	// data[e.currentTarget.dataset.id]=e.currentTarget.value
								// 	//     setBuilding(structuredClone(data))
								// }}
							/>
						</Form.Group>
					))}
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant="secondary"
					onClick={() => {
						setShowModal(false);
					}}>
					Закрыть
				</Button>
				<Button
					variant="primary"
					// onClick={handleClose}
				>
					Сохранить
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
