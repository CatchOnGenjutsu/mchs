import React from 'react';
import { useSelector } from 'react-redux';

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
	const boatInfoFromState = useSelector((state) => {
		const { smallBoatsReducer } = state;
		return smallBoatsReducer.boatInfo;
	});
	// const tableInfo = [sizeTableColumnsObj]

	console.log('boatInfoFromState >>>', boatInfoFromState);

	return (
		<div className={props.hidden === '' ? styles.hidden : ''}>
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
			<table className={`${styles['secondary-table']}`}>
				<caption className={styles['secondary-caption']}>
					Информация о совершаемых в отношении судна сделок:
				</caption>
				<thead>
					<tr>
						{dealsHistoryTableColumns.map((item) => {
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
						{dealsHistoryTableColumns.map((item) => {
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
			<table className={`${styles['secondary-table']}`}>
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
			</table>
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
			{/*{tableInfo.map((el)=> createTable(el))}*/}
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
