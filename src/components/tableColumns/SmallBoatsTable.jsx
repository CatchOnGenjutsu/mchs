import React, { useMemo } from "react";
import { useTable } from "react-table";
import { useSelector } from "react-redux";
import { COLUMNS } from "./smallBoatsColumns";
import styles from "../../styles/Table.module.css";

export default function SmallBoatsTable(props) {
	const columns = useMemo(() => COLUMNS, []);
	const tableInstance = useTable({
		columns,
		data: props.dataFromState,
	});

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = tableInstance;

	return (
		<table
			className={styles.table}
			{...getTableProps()}>
			<caption className={styles.caption}>
				Результаты поиска:
			</caption>
			<thead>
				{headerGroups.map((headerGroup) => (
					<tr {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column) => (
							<th
								className={styles["th-table"]}
								{...column.getHeaderProps()}>
								{column.render("Header")}
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody {...getTableBodyProps()}>
				{rows.map((row) => {
					prepareRow(row);
					return (
						<tr {...row.getRowProps()}>
							{row.cells.map((cell) => {
								return (
									<td
										className={styles["td-table"]}
										{...cell.getCellProps()}>
										{cell.render("Cell")}
									</td>
								);
							})}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}
