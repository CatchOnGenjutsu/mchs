import React, { useMemo } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { useDispatch } from "react-redux";
import { getBoatCardInfo, getLicenseById } from "../../redux/actions";
import styles from "./SearchTable.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function SearchTable(props) {
	const licenseInfoFromState = useSelector((state) => {
		const { certificateReducer } = state;
		return certificateReducer.licenseInfo;
	});

	const dispatch = useDispatch();
	const navigate = useNavigate();

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
		e.stopPropagation();
		const id = e.currentTarget.dataset.id;
		switch (true) {
			case e.target.baseURI.includes("certificates"): {
				dispatch(getLicenseById(id));
				navigate(`./licenseId/${id}`);
				break;
			}
			case e.target.baseURI.includes("smallboats"): {
				dispatch(getBoatCardInfo(id));
				navigate(`./boatId/${id}`);
				break;
			}
			case e.target.baseURI.includes("basesbuilding"): {
				props.setBuildingId(id);
			}
			default:
		}
	};

	return (
		<>
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
											{column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : "  "}
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
									data-id={row.original.id}
									onClick={(e) => {
										handleTableClick(e);
									}}
									className={`${styles["tr-td"]}`}
									{...row.getRowProps()}>
									{row.cells.map((cell) => {
										return (
											<td
												// onClickCapture={(e) => {
												// 	handleSetId(e);
												// }}
												className={styles["td-table"]}
												{...cell.getCellProps()}>
												<div>{cell.render("Cell")}</div>
											</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
				{props.dataFromState.length > 0 && pageOptions.length > 1 ? (
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
				) : null}
			</div>
		</>
	);
}
