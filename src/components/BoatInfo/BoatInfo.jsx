import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BoatInfoModalWindow from './ModalWindow/BoatInfoModalWindow';
import { getBoatCardInfo, clearBoatCardInfo } from '../../redux/actions';
import { v4 as uuidv4 } from 'uuid';

import {
	primaryTableLines,
	sizeTableColumns,
	toTableColumns,
	userTableColumns,
	engineTableColumns,
	ownersHistoryTableColumns,
	dealsHistoryTableColumns,
	imposedArrestsTableColumns,
	liftedArrestsTableColumns,
	noteShipBookTableColumns,
	enterNoteShipBookTableColumns,
	specialMarksTableColumns,
	documentsTableColumns,
} from './infoTablesColumns';

import styles from './BoatInfo.module.css';

export default function BoatInfo(props) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [editMode, setEditMode] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [modalWindowInputs, setModalWindowInputs] = useState({});
	const [dataForEdit, setDataForEdit] = useState({});

	const boatInfoFromState = useSelector((state) => {
		const { smallBoatsReducer } = state;
		return smallBoatsReducer.boatInfo;
	});

	const handleEditMode = () => {
		setEditMode(!editMode);
	};

	const handleCloseButton = () => {
		if (editMode) {
			setEditMode(!editMode);
		} else {
			dispatch(clearBoatCardInfo());
			navigate(-1);
		}
	};

	const handleAddNotes = (e) => {
		switch (e.target.id) {
			case 'dealsHistoryTableColumns':
				setModalWindowInputs(dealsHistoryTableColumns);
				break;
			default:
				break;
		}
		setShowModal(true);
	};

	const handleEditNotes = (e) => {
		const data = boatInfoFromState.boatDeals.find((item) => item.dealId == e.target.id);
		data.docDate = new Date(data.docDate).toISOString().split('T')[0];
		setModalWindowInputs(dealsHistoryTableColumns);
		setDataForEdit(data);
		setShowModal(true);
	};

	const handleCheckboxClick = (e) => {
		e.preventDefault();
	};

	useEffect(() => {
		const pathArray = window.location.pathname.split('/');
		const id = pathArray[pathArray.length - 1];
		if (
			window.performance
				.getEntriesByType('navigation')
				.map((nav) => nav.type)
				.includes('reload')
		) {
			// dispatch(
			// 	getDataCerticatesBySearchParams(
			// 		JSON.parse(sessionStorage.getItem('searchParams'))
			// 	)
			// );
			dispatch(getBoatCardInfo(id));
		}
	}, []);
	// const tableInfo = [sizeTableColumnsObj]

	return (
		<div className={styles.info__container}>
			<table className={styles['primary-table']}>
				<caption className={styles['primary-caption']}>Информация об объекте:</caption>
				<tbody>
					{primaryTableLines.map((item) => {
						return (
							<tr>
								<td className={styles['line-name']}>{item.value}</td>
								<td className={styles['line-value']}>
									{Object.keys(boatInfoFromState).length !== 0
										? boatInfoFromState[`${item.id}`] !== undefined &&
										  boatInfoFromState[`${item.id}`] !== null
											? item.key === ''
												? boatInfoFromState[`${item.id}`]
												: boatInfoFromState[`${item.id}`][`${item.key}`]
											: '—'
										: null}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<table className={styles['secondary-table']}>
				<caption className={styles['secondary-caption']}>Размерения судна:</caption>
				<thead>
					<tr>
						{sizeTableColumns.map((item) => {
							return (
								<th
									className={styles['proportions-table-th']}
									id={item.id}>
									{item.value}
								</th>
							);
						})}
					</tr>
				</thead>
				<tbody>
					<tr>
						{sizeTableColumns.map((item) => {
							return (
								<td>
									{Object.keys(boatInfoFromState).length !== 0
										? boatInfoFromState[`${item.id}`] !== undefined &&
										  boatInfoFromState[`${item.id}`] !== null
											? item.key === ''
												? boatInfoFromState[`${item.id}`]
												: boatInfoFromState[`${item.id}`][`${item.key}`]
											: '—'
										: null}
								</td>
							);
						})}
					</tr>
				</tbody>
			</table>
			<table className={styles['secondary-table']}>
				<caption className={styles['secondary-caption']}>
					Информация о прохождении технического освидетельствования:
				</caption>
				<thead>
					<tr>
						{toTableColumns.map((item) => {
							return (
								<th
									className={`${styles['to-th']} ${styles['to-info-table-th']}`}
									id={item.id}>
									{item.value}
								</th>
							);
						})}
					</tr>
				</thead>
				<tbody>
					{boatInfoFromState.boatToDtoList !== undefined
						? boatInfoFromState.boatToDtoList.map((elem) => {
								return (
									<tr>
										{toTableColumns.map((item) => {
											return typeof elem[`${item.id}`] === 'boolean' ? (
												elem[`${item.id}`] === true ? (
													<td className={styles['to-th']}>Годное</td>
												) : (
													<td className={styles['to-th']}>Негодное</td>
												)
											) : (
												<td className={styles['to-th']}>{elem[`${item.id}`]}</td>
											);
										})}
									</tr>
								);
						  })
						: null}
				</tbody>
			</table>
			<table className={`${styles['secondary-table']}`}>
				<caption className={styles['secondary-caption']}>
					Сведения о собственнике:
				</caption>
				<thead>
					<tr>
						{userTableColumns.map((item) => {
							return (
								<th
									className={styles['owner-table-th']}
									id={item.key}>
									{item.value}
								</th>
							);
						})}
					</tr>
				</thead>
				<tbody>
					<tr>
						{userTableColumns.map((item) => {
							return (
								<td>
									{Object.keys(boatInfoFromState).length !== 0
										? boatInfoFromState[`${item.id}`] !== undefined &&
										  boatInfoFromState[`${item.id}`] !== null
											? item.key === 'fio'
												? `${boatInfoFromState[`${item.id}`]['personSurname']} ${
														boatInfoFromState[`${item.id}`]['personName']
												  } ${boatInfoFromState[`${item.id}`]['personMidname']}`
												: boatInfoFromState[`${item.id}`][`${item.key}`]
											: '—'
										: null}
								</td>
							);
						})}
					</tr>
				</tbody>
			</table>
			<table className={`${styles['secondary-table']}`}>
				<caption className={styles['secondary-caption']}>Двигатели:</caption>
				<thead>
					<tr>
						{engineTableColumns.map((item) => {
							return (
								<th
									className={styles['engine-table-th']}
									id={item.key}>
									{item.value}
								</th>
							);
						})}
					</tr>
				</thead>
				<tbody>
					{boatInfoFromState.enginesList !== undefined
						? boatInfoFromState.enginesList.map((elem) => {
								return (
									<tr>
										{engineTableColumns.map((item) => {
											return (
												<td className={styles['engine-table-th']}>
													{elem[`${item.key}`]}
												</td>
											);
										})}
									</tr>
								);
						  })
						: null}
				</tbody>
			</table>
			<table className={`${styles['secondary-table']}`}>
				<caption className={styles['secondary-caption']}>
					Хронология владельцев судна:
				</caption>
				<thead>
					<tr>
						{ownersHistoryTableColumns.map((item) => {
							return (
								<th
									className={styles['owners-history-table-th']}
									id={item.key}>
									{item.value}
								</th>
							);
						})}
					</tr>
				</thead>
				<tbody>
					<tr>
						{ownersHistoryTableColumns.map((item) => {
							return (
								<td>
									{Object.keys(boatInfoFromState).length !== 0
										? boatInfoFromState[`${item.id}`] !== undefined &&
										  boatInfoFromState[`${item.id}`] !== null
											? item.key === 'fio'
												? `${boatInfoFromState[`${item.id}`]['personSurname']} ${
														boatInfoFromState[`${item.id}`]['personName']
												  } ${boatInfoFromState[`${item.id}`]['personMidname']}`
												: boatInfoFromState[`${item.id}`][`${item.key}`]
											: '—'
										: null}
								</td>
							);
						})}
					</tr>
				</tbody>
			</table>
			<div>
				<table className={`${styles['secondary-table']}`}>
					<caption className={styles['secondary-caption']}>
						{dealsHistoryTableColumns.caption}
					</caption>
					<thead>
						<tr>
							{dealsHistoryTableColumns.nameColumn.map((item) => {
								if (item.key !== 'docNum' && item.key !== 'docDate')
									if (item.key !== 'docName') {
										return (
											<th
												className={styles.deals_history_table_th}
												id={item.key}>
												{item.value}
											</th>
										);
									} else {
										return (
											<th
												className={styles.deals_history_table_th}
												id={item.key}>
												Наименование, номер и дата документа
											</th>
										);
									}
							})}
							<th
								key={uuidv4()}
								className={`${editMode ? '' : styles.edit__mode} ${
									styles.edit__column
								}`}></th>
						</tr>
					</thead>
					<tbody>
						{boatInfoFromState.boatDeals !== undefined
							? boatInfoFromState.boatDeals.map((elem) => {
									return (
										<tr>
											{dealsHistoryTableColumns.nameColumn.map((item) => {
												if (item.key !== 'docNum' && item.key !== 'docDate')
													if (item.key !== 'docName') {
														return <td>{elem[`${item.key}`]}</td>;
													} else {
														return (
															<td>
																{elem[`${item.key}`]}, {elem[`docNum`]} от{' '}
																{new Date(elem[`docDate`]).toLocaleDateString()}
															</td>
														);
													}
											})}
											<td
												className={`${editMode ? '' : styles.edit__mode} ${
													styles.edit__column
												}`}
												key={uuidv4()}>
												<button
													className={`${styles.edit__buttons} btn btn-primary ${
														editMode ? '' : styles.edit__mode
													}`}
													id={elem.dealId}
													onClick={(e) => handleEditNotes(e)}>
													&#9998;
												</button>
											</td>
										</tr>
									);
							  })
							: null}
					</tbody>
				</table>

				<button
					className={`${styles.add__buttons} btn btn-primary ${
						editMode ? '' : styles.edit__mode
					}`}
					id={dealsHistoryTableColumns.keyTable}
					onClick={(e) => handleAddNotes(e)}>
					+
				</button>
			</div>

			<table className={`${styles['secondary-table']}`}>
				<caption className={styles['secondary-caption']}>Налагаемые аресты:</caption>
				<thead>
					<tr>
						{imposedArrestsTableColumns.map((item) => {
							return (
								<th
									className={styles['owners-history-table-th']}
									id={item.key}>
									{item.value}
								</th>
							);
						})}
					</tr>
				</thead>
				<tbody>
					<tr>
						{imposedArrestsTableColumns.map((item) => {
							return (
								<td>
									{Object.keys(boatInfoFromState).length !== 0
										? boatInfoFromState[`${item.id}`] !== undefined &&
										  boatInfoFromState[`${item.id}`] !== null
											? boatInfoFromState[`${item.id}`][`${item.key}`]
											: '—'
										: null}
								</td>
							);
						})}
					</tr>
				</tbody>
			</table>
			<table className={`${styles['secondary-table']}`}>
				<caption className={styles['secondary-caption']}>
					Информация о снятии арестов:
				</caption>
				<thead>
					<tr>
						{liftedArrestsTableColumns.map((item) => {
							return (
								<th
									className={styles['owners-history-table-th']}
									id={item.key}>
									{item.value}
								</th>
							);
						})}
					</tr>
				</thead>
				<tbody>
					<tr>
						{liftedArrestsTableColumns.map((item) => {
							return (
								<td>
									{Object.keys(boatInfoFromState).length !== 0
										? boatInfoFromState[`${item.id}`] !== undefined &&
										  boatInfoFromState[`${item.id}`] !== null
											? boatInfoFromState[`${item.id}`][`${item.key}`]
											: '—'
										: null}
								</td>
							);
						})}
					</tr>
				</tbody>
			</table>
			<table className={`${styles['secondary-table']}`}>
				<caption className={styles['secondary-caption']}>
					Отметки о внесении изменений в судовую книгу:
				</caption>
				<thead>
					<tr>
						{noteShipBookTableColumns.map((item) => {
							return (
								<th
									className={styles['owners-history-table-th']}
									id={item.key}>
									{item.value}
								</th>
							);
						})}
					</tr>
				</thead>
				<tbody>
					<tr>
						{noteShipBookTableColumns.map((item) => {
							return (
								<td>
									{Object.keys(boatInfoFromState).length !== 0
										? boatInfoFromState[`${item.id}`] !== undefined &&
										  boatInfoFromState[`${item.id}`] !== null
											? boatInfoFromState[`${item.id}`][`${item.key}`]
											: '—'
										: null}
								</td>
							);
						})}
					</tr>
				</tbody>
			</table>
			<table className={`${styles['secondary-table']}`}>
				<caption className={styles['secondary-caption']}>
					Отметки о внесении в судовую книгу / исключении из судовой книги судна:
				</caption>
				<thead>
					<tr>
						{enterNoteShipBookTableColumns.map((item) => {
							return (
								<th
									className={styles['owners-history-table-th']}
									id={item.key}>
									{item.value}
								</th>
							);
						})}
					</tr>
				</thead>
				<tbody>
					<tr>
						{enterNoteShipBookTableColumns.map((item) => {
							return (
								<td>
									{Object.keys(boatInfoFromState).length !== 0
										? boatInfoFromState[`${item.id}`] !== undefined &&
										  boatInfoFromState[`${item.id}`] !== null
											? boatInfoFromState[`${item.id}`][`${item.key}`]
											: '—'
										: null}
								</td>
							);
						})}
					</tr>
				</tbody>
			</table>
			<div>
				<table className={`${styles['secondary-table']}`}>
					<caption className={styles['secondary-caption']}>
						{specialMarksTableColumns.caption}
					</caption>
					<thead>
						<tr>
							{specialMarksTableColumns.nameColumn.map((item) => {
								return (
									<th
										className={styles.deals_history_table_th}
										id={item.key}>
										{item.value}
									</th>
								);
							})}
							<th
								key={uuidv4()}
								className={`${editMode ? '' : styles.edit__mode} ${
									styles.edit__column
								}`}></th>
						</tr>
					</thead>
					<tbody>
						{boatInfoFromState.specMarks !== undefined
							? boatInfoFromState.specMarks.map((elem) => {
									return (
										<tr>
											{specialMarksTableColumns.nameColumn.map((item) => {
												switch (item.type) {
													case 'checkbox':
														return (
															<td>
																{elem.bsmLock ? (
																	<input
																		type="checkbox"
																		className={styles.checkbox}
																		id={elem.bsmId}
																		checked
																		// disabled
																	/>
																) : (
																	<input
																		type="checkbox"
																		className={styles.checkbox}
																		id={elem.bsmId}
																		disabled
																	/>
																)}
															</td>
														);
													default:
														return <td>{elem[`${item.key}`]}</td>;
												}
											})}
											<td
												className={`${editMode ? '' : styles.edit__mode} ${
													styles.edit__column
												}`}
												key={uuidv4()}>
												<button
													className={`${styles.edit__buttons} btn btn-primary ${
														editMode ? '' : styles.edit__mode
													}`}
													// id={elem.dealId}
													onClick={(e) => handleEditNotes(e)}>
													&#9998;
												</button>
											</td>
										</tr>
									);
							  })
							: null}
					</tbody>
				</table>

				<button
					className={`${styles.add__buttons} btn btn-primary ${
						editMode ? '' : styles.edit__mode
					}`}
					id={specialMarksTableColumns.keyTable}
					onClick={(e) => handleAddNotes(e)}>
					+
				</button>
			</div>
			{/* <table className={`${styles['secondary-table']}`}>
				<caption className={styles['secondary-caption']}>Особые отметки:</caption>
				<thead>
					<tr>
						{specialMarksTableColumns.map((item) => {
							return (
								<th
									className={styles['owners-history-table-th']}
									id={item.key}>
									{item.value}
								</th>
							);
						})}
					</tr>
				</thead>
				<tbody>
					<tr>
						{specialMarksTableColumns.map((item) => {
							return (
								<td>
									{Object.keys(boatInfoFromState).length !== 0
										? boatInfoFromState[`${item.id}`] !== undefined &&
										  boatInfoFromState[`${item.id}`] !== null
											? boatInfoFromState[`${item.id}`][`${item.key}`]
											: '—'
										: null}
								</td>
							);
						})}
					</tr>
				</tbody>
			</table> */}
			<table className={`${styles['secondary-table']}`}>
				<caption className={styles['secondary-caption']}>Документы:</caption>
				<thead>
					<tr>
						{documentsTableColumns.map((item) => {
							return (
								<th
									className={styles['owners-history-table-th']}
									id={item.key}>
									{item.value}
								</th>
							);
						})}
					</tr>
				</thead>
				<tbody>
					<tr>
						{documentsTableColumns.map((item) => {
							return (
								<td>
									{Object.keys(boatInfoFromState).length !== 0
										? boatInfoFromState[`${item.id}`] !== undefined &&
										  boatInfoFromState[`${item.id}`] !== null
											? boatInfoFromState[`${item.id}`][`${item.key}`]
											: '—'
										: null}
								</td>
							);
						})}
					</tr>
				</tbody>
			</table>
			<div className="d-flex justify-content-around mt-5">
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
			{/*{tableInfo.map((el)=> createTable(el))}*/}
			{showModal && (
				<BoatInfoModalWindow
					boatIdModal={boatInfoFromState.cardid}
					showModal={showModal}
					setShowModal={setShowModal}
					modalWindowInputs={modalWindowInputs}
					dataForEdit={dataForEdit}
					setDataForEdit={setDataForEdit}
				/>
			)}
		</div>
	);
}

// function createTable(table) {
//     console.log(Object.keys(table))
//     return (
//         <table className={`${styles["secondary-table"]}`}>
//             <caption className={styles["secondary-caption"]}>
//                 {table.caption}
//             </caption>
//             <tbody>
//             <tr>
//                 {Object.keys(table).slice(1).map((el)=><th className={styles["line-name"]}>{typeof table[el]==='object'?table[el].value:table[el]}</th>)}
//             </tr>
//             <tr></tr>
//             </tbody>
//         </table>
//     )
//
// }
