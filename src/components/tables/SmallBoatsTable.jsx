import React, { useMemo } from "react";
import { useTable, useSortBy } from "react-table";

import { COLUMNS } from "./smallBoatsColumns";

import styles from "../../styles/SearchTable.module.css";

export default function SmallBoatsTable(props) {
	const columns = useMemo(() => COLUMNS, []);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = useTable(
		{
			columns,
			data: props.dataFromState,
		},
		useSortBy
	);

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
								{...column.getHeaderProps(
									column.getSortByToggleProps()
								)}>
								{column.render("Header")}
								<span>
									{column.isSorted
										? column.isSortedDesc
											? " ▼"
											: " ▲"
										: ""}
								</span>
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
