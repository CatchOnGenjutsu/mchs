import React, { useState } from 'react';
import styles from './Certificate.module.css';
import photoImg from './testImgAfterDelete/USA.jpg';
import {
	boatDrivingLicenseSpecmarksList,
	tableLossOfControl,
	tableCertificateWithdrawal,
} from './tableOptions';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CertificateModalWindow from './ModalWindow/CertificateModalWindow';

import { useDispatch } from 'react-redux';
import { getLicenseById } from '../../redux/actions';

export default function Certificate(props) {
	const [editMode, setEditMode] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [modalWindowInputs, setModalWindowInputs] = useState(null);

	const navigate = useNavigate();

	const licenseInfoFromState = useSelector((state) => {
		const { certificateReducer } = state;
		return certificateReducer.licenseInfo;
	});

	const specMarkFromState = useSelector((state) => {
		const { certificateReducer } = state;
		return certificateReducer.licenseSpecmarksList;
	});

	const licenseConfFromState = useSelector((state) => {
		const { certificateReducer } = state;
		return certificateReducer.licenseConfList;
	});

	const handleEditMode = () => {
		console.log('specMarkFromState>>>>', specMarkFromState);
		console.log('licenseConfFromState>>>>', licenseConfFromState);
		setEditMode(!editMode);
	};

	const handleCloseButton = () => {
		if (editMode) {
			setEditMode(!editMode);
		} else {
			navigate(-1);
		}
	};

	const handleAddNotes = (e) => {
		console.log(e.target.id);
		switch (e.target.id) {
			case 'lossControl':
				setModalWindowInputs(tableLossOfControl);
				break;
			case 'certificateWithdrawal':
				setModalWindowInputs(tableCertificateWithdrawal);
				break;
			case 'boatDrivingLicenseSpecmarksList':
				setModalWindowInputs(boatDrivingLicenseSpecmarksList);
				break;
			default:
				break;
		}
		setShowModal(true);
	};

	return (
		<div className={styles.wrapper}>
			<h2>Удостоверение №{licenseInfoFromState.licenseNum}</h2>
			<div className={`${styles.main__data__container}`}>
				<div className={styles.photo__container}>
					<img
						src={photoImg}
						className="img-fluid"
						alt="main Photo"
					/>
				</div>
				<div className={styles.fio__info}>
					<h3>Основные данные</h3>
					<div className={styles.block__data__container}>
						<div className={styles.data}>
							<p>Фамилия</p>
							<span>{licenseInfoFromState.surname || '-'}</span>
						</div>
						<div className={styles.data}>
							<p>Имя</p>
							<span>{licenseInfoFromState.name || '-'}</span>
						</div>
						<div className={styles.data}>
							<p>Отчество</p>
							<span>{licenseInfoFromState.midname || '-'}</span>
						</div>
						<div className={`${styles.data} flex-wrap`}>
							<div className={styles.data}>
								<p>Дата рождения</p>
								<span>{licenseInfoFromState.birthDate || '-'}</span>
							</div>

							<div className={styles.data}>
								<p>Место рождения</p>
								<span>{licenseInfoFromState.birthPlace || '-'}</span>
							</div>
						</div>
						<div className={styles.data}>
							<p>Гражданство</p>
							<span>{licenseInfoFromState.residence || '-'}</span>
						</div>
					</div>
				</div>
			</div>
			<div className={`${styles.passport__address__container}`}>
				<div className={`${styles.address__container}`}>
					<h3>Адрес места регистрации</h3>
					<div className={styles.block__data__container}>
						<div className={`${styles.data} flex-wrap`}>
							<div className={`d-flex`}>
								<p>Страна</p>
								<span>Республика Беларусь</span>
							</div>
							<div className={`d-flex`}>
								<p>Район</p>
								<span>{licenseInfoFromState.rayonId || '-'}</span>
							</div>
						</div>
						<div className={`${styles.data} flex-wrap`}>
							<div className={`d-flex`}>
								<p>Область</p>
								<span>{licenseInfoFromState.oblId || '-'}</span>
							</div>
							<div className={`d-flex`}>
								<p>Город</p>
								<span>{licenseInfoFromState.gorodId || '-'}</span>
							</div>
						</div>
						<div className={styles.data}>
							<p>Улица</p>
							<span>{licenseInfoFromState.ulica || '-'}</span>
						</div>
						<div className={`${styles.data} flex-wrap`}>
							<div className={`d-flex`}>
								<p>Дом</p>
								<span>{licenseInfoFromState.dom || '-'}</span>
							</div>
							<div className={`${styles.data} flex-wrap`}>
								<div className={`d-flex`}>
									<p>Корпус</p>
									<span>{licenseInfoFromState.korpus || '-'}</span>
								</div>
								<div className={`d-flex`}>
									<p>Квартира</p>
									<span>{licenseInfoFromState.kv || '-'}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className={`${styles.passport__container}`}>
					<h3>Паспортные данные</h3>
					<div className={styles.block__data__container}>
						<div className={`${styles.data} flex-wrap`}>
							<div className={styles.data__property}>
								<p>Документ</p>
								<span>{licenseInfoFromState.docType || '-'}</span>
							</div>
							<div className={styles.data__property}>
								<p>Номер</p>
								<span>{licenseInfoFromState.docNum || '-'}</span>
							</div>
						</div>
						<div className={`${styles.data} flex-wrap`}>
							<div className={styles.data__property}>
								<p>Серия</p>
								<span>{licenseInfoFromState.docSeries || '-'}</span>
							</div>

							<div className={styles.data__property}>
								<p>Дата выд.</p>
								<span>{licenseInfoFromState.docDateIssue || '-'}</span>
							</div>
						</div>
						<div className={`${styles.data}  flex-wrap`}>
							<p>Кем выдан</p>
							<span>{licenseInfoFromState.docDepartment || '-'}</span>
						</div>
						<div className={`${styles.data}  flex-wrap`}>
							<p style={{ minWidth: '13em' }}>Идентификационный номер</p>
							<span>{licenseInfoFromState.persNum || '-'}</span>
						</div>
					</div>
				</div>
			</div>
			<div className={`${styles.certificate__container}`}>
				<h3>Удостоверение</h3>
				<div className={styles.block__data__container}>
					<div className={`${styles.data} flex-wrap`}>
						<p>Номер удостоверения</p>
						<span>{licenseInfoFromState.licenseNum || '-'}</span>
					</div>
					<div className={`${styles.data} flex-wrap`}>
						<div className={styles.data__property}>
							<p>Тип удостоверения</p>
							<span>{licenseInfoFromState.licenseType || '-'}</span>
						</div>
						<div className={styles.data__property}>
							<p>Дата выдачи</p>
							<span>{licenseInfoFromState.licenseDate || '-'}</span>
						</div>
					</div>
					<div className={`${styles.data} flex-wrap`}>
						<div className={styles.data__property}>
							<p>Действительно для</p>
							<span>{licenseInfoFromState.validFor || '-'}</span>
						</div>
						<div className={styles.data__property}>
							<p>Действительно до</p>
							<span>{licenseInfoFromState.licenseDateEnd || '-'}</span>
						</div>
					</div>
					<div className={`${styles.data}  flex-wrap`}>
						<p>Выдано</p>
						<span>{licenseInfoFromState.licenseDocDepartment || '-'}</span>
					</div>
				</div>
			</div>
			<div className={styles.guide__marks__container}>
				<h3>Отметки</h3>
				<div className={styles.block__data__container}>
					<div key={tableLossOfControl.keyTable}>
						<h6 className="text-secondary">{tableLossOfControl.caption}</h6>
						<table className="table table-bordered border-secondary bg-white">
							<thead>
								<tr>
									{tableLossOfControl.nameColumn.map((item) => (
										<th
											key={item[0]}
											scope="col"
											className={
												'confOrg confDocNum userPositions name mark'.includes(item[0])
													? 'col-4 text-center'
													: 'col-2 text-center'
											}>
											{item[1]}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{licenseConfFromState.map((item) => {
									if (item.confiscation['code'] === 1) {
										return (
											<tr key={item.id}>
												{tableLossOfControl.nameColumn.map((elem) => {
													if (elem[0] === 'confDocNum') {
														return (
															<td key={item.id}>
																{`${item['confDate']} ${item[`${elem[0]}`]}`}
															</td>
														);
													}
													return <td key={item.id}>{item[`${elem[0]}`]}</td>;
												})}
											</tr>
										);
									}
								})}
							</tbody>
						</table>
						<button
							className={`${styles.add__buttons} btn btn-primary ${
								editMode ? '' : styles.edit__mode
							}`}
							id={tableLossOfControl.keyTable}
							onClick={(e) => handleAddNotes(e)}>
							+
						</button>
					</div>
					<div key={tableCertificateWithdrawal.keyTable}>
						<h6 className="text-secondary">{tableCertificateWithdrawal.caption}</h6>
						<table className="table table-bordered border-secondary bg-white">
							<thead>
								<tr>
									{tableCertificateWithdrawal.nameColumn.map((item) => (
										<th
											key={item[0]}
											scope="col"
											className={
												'confOrg confDocNum userPositions name mark'.includes(item[0])
													? 'col-4 text-center'
													: 'col-2 text-center'
											}>
											{item[1]}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{licenseConfFromState.map((item) => {
									if (item.confiscation['code'] === 2) {
										return (
											<tr key={item.id}>
												{tableCertificateWithdrawal.nameColumn.map((elem) => {
													switch (elem[0]) {
														case 'userPositions':
															return (
																<td key={item.id}>
																	{item.userid[`${elem[0]}`]['posName']}
																</td>
															);
														case 'name':
															return <td key={item.id}>{item.userid['name']}</td>;
														default:
															return <td key={item.id}>{item[`${elem[0]}`]}</td>;
													}
												})}
											</tr>
										);
									}
								})}
							</tbody>
						</table>
						<button
							className={`${styles.add__buttons} btn btn-primary ${
								editMode ? '' : styles.edit__mode
							}`}
							id={tableCertificateWithdrawal.keyTable}
							onClick={(e) => handleAddNotes(e)}>
							+
						</button>
					</div>
					<div key={boatDrivingLicenseSpecmarksList.keyTable}>
						<h6 className="text-secondary">{boatDrivingLicenseSpecmarksList.caption}</h6>
						<table className="table table-bordered border-secondary bg-white">
							<thead>
								<tr>
									{boatDrivingLicenseSpecmarksList.nameColumn.map((item) => (
										<th
											key={item[0]}
											scope="col"
											className={
												'organ number position fio mark'.includes(item[0])
													? 'col-4 text-center'
													: 'col-2 text-center'
											}>
											{item[1]}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{specMarkFromState.map((item) => {
									return (
										<tr key={item.id}>
											{boatDrivingLicenseSpecmarksList.nameColumn.map((elem) => {
												return <td key={item.id}>{item[`${elem[0]}`]}</td>;
											})}
										</tr>
									);
								})}
							</tbody>
						</table>
						<button
							className={`${styles.add__buttons} btn btn-primary ${
								editMode ? '' : styles.edit__mode
							}`}
							id={boatDrivingLicenseSpecmarksList.keyTable}
							onClick={(e) => handleAddNotes(e)}>
							+
						</button>
					</div>
				</div>
			</div>
			<div className="d-flex justify-content-around mt-5">
				<button className={`btn btn-secondary  ${editMode ? styles.edit__mode : ''}`}>
					Экспорт в файл
				</button>
				<button
					className={`btn btn-primary ${editMode ? styles.edit__mode : ''}`}
					onClick={() => handleEditMode()}>
					Редактировать
				</button>
				<button
					className="btn btn-danger"
					onClick={() => handleCloseButton()}>
					Закрыть
				</button>
			</div>
			{showModal && (
				<CertificateModalWindow
					setShowModal={setShowModal}
					showModal={showModal}
					modalWindowInputs={modalWindowInputs}
				/>
			)}
		</div>
	);
}
