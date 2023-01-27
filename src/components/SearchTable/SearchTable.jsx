import React, { useMemo } from "react";
import { useTable, useSortBy, usePagination } from "react-table";

import { useDispatch } from "react-redux";
import { getBoatCardInfo } from "../../redux/actions";

import styles from "./SearchTable.module.css";
import { useEffect } from "react";

export default function SmallBoatsTable(props) {
	const dispatch = useDispatch();

	const columns = useMemo(() => props.columns, []);

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
		allColumns,
	} = useTable(
		{
			columns,
			data: props.dataFromState,
		},
		useSortBy,
		usePagination
	);

	const { pageIndex } = state;

	const handleTableClick = (e) => {
		props.setBoatId(e.target.dataset.id);
		dispatch(getBoatCardInfo(e.target.dataset.id));
	};
	const handleSetBoatId = (e) => {
		console.log("id >>>", e.target.dataset.id);
		props.setBoatId(e.target.dataset.id);
	};

	useEffect(() => {
		const input = document.querySelector("#hide-input");

		if (input.checked) {
			input.click();
		}
	}, []);

	return (
		// <>
		// 	{props.dataFromState !== undefined ? (
		<>
			<div className={styles["hide-input"]}>
				{allColumns.map((column) => {
					if (column.id === "cardid") {
						return (
							<div key={column.id}>
								<label>
									<input
										type="checkbox"
										checked={false}
										id="hide-input"
										{...column.getToggleHiddenProps()}
									/>
									{column.Header}
								</label>
							</div>
						);
					}
				})}
			</div>

			<div className={styles["content-container"]}>
				<table
					className={styles.table}
					{...getTableProps()}>
					<caption className={styles.caption}>Результаты поиска:</caption>
					<thead>
						{headerGroups.map((headerGroup) => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<th
										className={styles["th-table"]}
										{...column.getHeaderProps(column.getSortByToggleProps())}>
										{column.render("Header")}
										<span>
											{column.isSorted
												? column.isSortedDesc
													? " ▼"
													: " ▲"
												: "  "}
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
									onClick={(e) => {
										handleTableClick(e);
									}}
									className={styles["tr-td"]}
									{...row.getRowProps()}>
									{row.cells.map((cell) => {
										return (
											<td
												className={styles["td-table"]}
												{...cell.getCellProps()}>
												<div
													data-id={row.values.cardid}
													onClick={(e) => {
														handleSetBoatId(e);
													}}>
													{cell.render("Cell")}
												</div>
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
		</>
	);
}
