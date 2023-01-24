import React, { useMemo } from "react";
import { useTable } from "react-table";
import { COLUMNS } from "./smallBoatsColumns";

export const SmallBoatsTable = () => {
	const columns = useMemo(() => COLUMNS, []);
	const data = useMemo(() => [], []);
	const tableInstance = useTable({
		columns,
		data,
	});

	const {
		getTableProps,
		// getTableBodyProps,
		headerGroups,
		// rows,
		// prepareRow,
	} = tableInstance;

	return (
		<table {...getTableProps}>
			<thead>
				{headerGroups.map((headerGroup) => (
					<tr
						{...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column) => (
							<th {...column.getHeaderProps()}>
								{column.render("Header")}
							</th>
						))}
					</tr>
				))}
				<tr>
					<th></th>
				</tr>
			</thead>
			{/* <tbody {...getTableBodyProps}>
				<tr>
					<td></td>
				</tr>
			</tbody> */}
		</table>
	);
};
