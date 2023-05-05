import React, { useMemo, useState, useEffect } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { useDispatch, useSelector } from "react-redux";
import { getBoatCardInfo } from "../../redux/smallBoatsReducer/actionsSmallBoats";
import { setSortState } from "../../redux/actions";
import { getLicenseById } from "../../redux/certificateReducer/actionsCertificate";
import { getBoatRegInfo } from "../../redux/SmallBoatsRegReducer/actionsSmallBoatsReg";
import styles from "./SearchTable.module.css";
import { useNavigate } from "react-router-dom";

export default function SearchTable({ setId, headerColumns, dataFromState }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sortState = useSelector((state) => {
    const { tableReducer } = state;
    return tableReducer.sortState;
  });
  const [paginationState, setPaginationState] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [selectedRow, setSelectedRow] = useState(null);
  const columns = useMemo(() => headerColumns, [headerColumns]);
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
    state: { pageIndex, pageSize, sortBy },
    prepareRow,
  } = useTable(
    {
      columns,
      data: dataFromState,
      initialState: { ...paginationState, sortBy: sortState },
    },
    useSortBy,
    usePagination,
  );

  useEffect(() => {
    dispatch(setSortState(sortBy));
  }, [sortBy]);

  useEffect(() => {
    setPaginationState({ pageIndex, pageSize });
  }, [pageIndex, pageSize]);

  const handleTableClick = (e) => {
    e.stopPropagation();
    const id = e.currentTarget.dataset.id;
    switch (true) {
      case e.target.baseURI.includes("smallboatsreg"): {
        setId(id);
        break;
      }
      case e.target.baseURI.includes("certificates"): {
        dispatch(getLicenseById(id));
        navigate(`./licenseId/${id}`);
        break;
      }
      case e.target.baseURI.includes("smallboats"): {
        navigate(`./boatId/${id}`);
        break;
      }
      case e.target.baseURI.includes("basesbuilding"): {
        setId(id);
        break;
      }
      case e.target.baseURI.includes("reginformationchanges"): {
        setId(id);
        break;
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
                    <span>{column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : "  "}</span>
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
                    setSelectedRow(row.id);
                    handleTableClick(e);
                  }}
                  className={`${selectedRow === row.id.toString() ? styles["selected"] : ""} ${
                    styles["tr-td"]
                  }`}
                  {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        // onClickCapture={(e) => {
                        //   handleSetId(e);
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
        {dataFromState.length > 0 && pageOptions.length > 1 ? (
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

export const MemoSearchTable = React.memo(SearchTable);
