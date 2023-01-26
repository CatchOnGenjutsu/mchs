import React, { useMemo } from "react";
import { useTable, useSortBy, usePagination } from "react-table";

import { COLUMNS } from "./TablesColumns";

import styles from "./SearchTable.module.css";
import { Link } from "react-router-dom";

export default function SmallBoatsTable(props) {
	const columns = useMemo(() => COLUMNS, []);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		nextPage,
		previousPage,
		canNextPage,
		canPreviousPage,
		pageOptions,
		state,
		// rows,
		prepareRow,
	} = useTable(
		{
			columns,
			data: props.dataFromState,
		},
		useSortBy,
		usePagination
	);

	const { pageIndex } = state;

	return (
		// <>
		// 	{props.dataFromState !== undefined ? (

		<div className={styles["content-container"]}>
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
					{page.map((row) => {
						prepareRow(row);
						return (
							<tr
								className={styles["tr-td"]}
								{...row.getRowProps()}>
								{row.cells.map((cell) => {
									return (
										<td
											className={styles["td-table"]}
											{...cell.getCellProps()}>
											<Link
												className={styles["table-links"]}
												to="/boatinfo">
												<div>{cell.render("Cell")}</div>
											</Link>
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
			<div>
				<span>
					{" "}
					Страница:{" "}
					<strong>
						{" "}
						{pageIndex + 1} из {pageOptions.length}
					</strong>{" "}
				</span>
				<button
					onClick={() => previousPage()}
					disabled={!canPreviousPage}
					type="button"
					className={`${styles["pagination-buttons"]} btn btn-primary`}>
					Предыдущая
				</button>

				<button
					onClick={() => nextPage()}
					disabled={!canNextPage}
					type="button"
					className={`btn btn-primary`}>
					Следующая
				</button>
			</div>
		</div>

		// )
		// 	: null}
		// </>
	);
}
