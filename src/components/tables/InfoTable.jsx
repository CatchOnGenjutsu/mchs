import React from "react";
import styles from "../../styles/InfoTable.module.css";
import {
	primaryTableLines,
	sizeTableColumns,
	toTableColumns,
	userTableColumns,
} from "./infoTablesColumns";

export default function InfoTable() {
	return (
		<div className={styles["info-container"]}>
			<table className={styles["primary-table"]}>
				<caption className={styles["primary-caption"]}>
					Информация об объекте:
				</caption>
				<tbody>
					{primaryTableLines.map((item) => {
						return (
							<tr>
								<td className={styles["line-name"]}>
									{item.value}
								</td>
								<td className={styles["line-value"]}>
									{item.id}
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
							return <th id={item.id}>{item.value}</th>;
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
					Информация о прохождении технического
					освидетельствования:
				</caption>
				<thead>
					<tr>
						{toTableColumns.map((item) => {
							return (
								<th
									className={styles["to-th"]}
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
							return (
								<td className={styles["to-th"]}>{item.id}</td>
							);
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
							return <th id={item.id}>{item.value}</th>;
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