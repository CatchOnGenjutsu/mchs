import React from "react";
import { useSelector } from "react-redux";

import {
	primaryTableLines,
	sizeTableColumns,
	toTableColumns,
	userTableColumns,
} from "./infoTablesColumns";

import styles from "./BoatInfo.module.css";

export default function BoatInfo(props) {
	const boatInfoFromState = useSelector((state) => {
		const { smallBoatsReducer } = state;
		return smallBoatsReducer.boatInfo;
	});

	console.log("boatInfoFromState >>>", boatInfoFromState);

	return (
		<div className={props.hidden === "" ? styles.hidden : ""}>
			<table className={styles["primary-table"]}>
				<caption className={styles["primary-caption"]}>
					Информация об объекте:
				</caption>
				<tbody>
					{primaryTableLines.map((item) => {
						return (
							<tr>
								<td className={styles["line-name"]}>{item.value}</td>
								<td className={styles["line-value"]}>
									{Object.keys(boatInfoFromState).length !== 0
										? boatInfoFromState[`${item.id}`] !== undefined &&
										  boatInfoFromState[`${item.id}`] !== null
											? item.key === ""
												? boatInfoFromState[`${item.id}`]
												: boatInfoFromState[`${item.id}`][`${item.key}`]
											: "—"
										: null}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<table className={styles["secondary-table"]}>
				<caption className={styles["secondary-caption"]}>
					Размерения судна:
				</caption>
				<thead>
					<tr>
						{sizeTableColumns.map((item) => {
							return (
								<th
									className={styles["proportions-table-th"]}
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
							return <td>{item.id}</td>;
						})}
					</tr>
				</tbody>
			</table>
			<table className={styles["secondary-table"]}>
				<caption className={styles["secondary-caption"]}>
					Информация о прохождении технического освидетельствования:
				</caption>
				<thead>
					<tr>
						{toTableColumns.map((item) => {
							return (
								<th
									className={`${styles["to-th"]} ${styles["to-info-table-th"]}`}
									id={item.id}>
									{item.value}
								</th>
							);
						})}
					</tr>
				</thead>
				<tbody>
					<tr>
						{toTableColumns.map((item) => {
							return <td className={styles["to-th"]}>{item.id}</td>;
						})}
					</tr>
				</tbody>
			</table>
			<table className={`${styles["secondary-table"]} mb-5`}>
				<caption className={styles["secondary-caption"]}>
					Сведения о собственнике:
				</caption>
				<thead>
					<tr>
						{userTableColumns.map((item) => {
							return (
								<th
									className={styles["owner-table-th"]}
									id={item.id}>
									{item.value}
								</th>
							);
						})}
					</tr>
				</thead>
				<tbody>
					<tr>
						{userTableColumns.map((item) => {
							return <td>{item.id}</td>;
						})}
					</tr>
				</tbody>
			</table>
		</div>
	);
}
