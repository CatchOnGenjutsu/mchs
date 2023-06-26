import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BoatInfoModalWindow from "./ModalWindow/BoatInfoModalWindow";
import {
  getBoatCardInfo,
  clearBoatCardInfo,
  deleteBoatInfo,
} from "../../redux/smallBoatsReducer/actionsSmallBoats";
import { v4 as uuidv4 } from "uuid";

import {
  primaryTableLines,
  sizeTableColumns,
  toTableColumns,
  userTableColumns,
  engineTableColumns,
  ownersHistoryTableColumns,
  dealsHistoryTableColumns,
  boatArrestsTableColumns,
  removeBoatArrestsTableColumns,
  noteShipBookTableColumns,
  enterNoteShipBookTableColumns,
  specialMarksTableColumns,
  documentsTableColumns,
} from "./infoTablesColumns";

import { MAIN_URL, PORT, API_ADD_BOAT_INFO_DOCS_DOWNLOAD } from "../../constants/constants";

import styles from "./BoatInfo.module.css";

export default function BoatInfo(props) {
  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalWindowInputs, setModalWindowInputs] = useState({});
  const [dataForEdit, setDataForEdit] = useState({});
  const [type, setType] = useState(null);
  const [fileType, setFileType] = useState(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const boatInfoFromState = useSelector((state) => {
    const { smallBoatsReducer } = state;
    return smallBoatsReducer.boatInfo;
  });
  const signName = useSelector((state) => {
    const { smallBoatsReducer } = state;
    return smallBoatsReducer.signName;
  });

  const handleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleCloseButton = () => {
    if (editMode) {
      setEditMode(!editMode);
    } else {
      dispatch(clearBoatCardInfo());
      navigate(-1);
    }
  };

  const handleAddNewData = (e) => {
    switch (e.target.id) {
      case "dealsHistoryTableColumns":
        setModalWindowInputs(dealsHistoryTableColumns);
        break;
      case "specialMarksTableColumns":
        setModalWindowInputs(specialMarksTableColumns);
        break;
      case "boatArrestsTableColumns":
        setModalWindowInputs(boatArrestsTableColumns);
        const fields = [
          ...boatArrestsTableColumns.nameColumn.map((item) => Object.values(item)).map((elem) => elem[2]),
          ...removeBoatArrestsTableColumns.nameColumn
            .map((item) => Object.values(item))
            .map((elem) => elem[2]),
        ];
        let data = {};
        fields.forEach((item) => (data[item] = null));
        data.isActiv = null;
        setDataForEdit(data);
        break;
      case "documentsTableColumns":
        switch (e.target.dataset.doctype) {
          case "signature":
            setFileType("signature");
            setModalWindowInputs(documentsTableColumns);
            break;
          case "file":
            setFileType("file");
            setModalWindowInputs(documentsTableColumns);
            break;
        }
        break;
      default:
        break;
    }
    setType("save");
    setShowModal(true);
  };

  const handleEditNotes = (e) => {
    let data = null;
    switch (e.target.dataset.tabletype) {
      case "dealsHistoryTableColumns":
        data = boatInfoFromState.boatDeals.find((item) => item.dealId == e.target.id);
        data.docDate = new Date(data.docDate).toISOString().split("T")[0];
        setType("edit");
        setModalWindowInputs(dealsHistoryTableColumns);
        setDataForEdit(data);
        setShowModal(true);
        break;
      case "specialMarksTableColumns":
        data = boatInfoFromState.specMarks.find((item) => item.bsmId == e.target.id);
        setType("edit");
        setModalWindowInputs(specialMarksTableColumns);
        setDataForEdit(data);
        setShowModal(true);
        break;
      case "boatArrestsTableColumns":
        data = boatInfoFromState.boatArrests.find((item) => item.arrId === Number(e.target.id));
        setModalWindowInputs(removeBoatArrestsTableColumns);
        setType("edit");
        setDataForEdit(data);
        setShowModal(true);
        break;
      case "documentsTableColumns":
        switch (e.target.dataset.doctype) {
          case "signature":
            dispatch(deleteBoatInfo(boatInfoFromState.cardid, true, signName, "documentsTableColumns"));
            break;
          case "file":
            dispatch(
              deleteBoatInfo(
                boatInfoFromState.cardid,
                false,
                e.target.dataset.docname,
                "documentsTableColumns",
              ),
            );
            break;
          default:
            break;
        }
      default:
        break;
    }
  };

  useEffect(() => {
    const pathArray = window.location.pathname.split("/");
    const id = pathArray[pathArray.length - 1];
    // if (
    //   window.performance
    //   .getEntriesByType('navigation')
    //   .map((nav) => nav.type)
    //   .includes('reload')
    // ) {
    // dispatch(
    //   getDataCerticatesBySearchParams(
    //   JSON.parse(sessionStorage.getItem('searchParams'))
    //   )
    // );
    dispatch(getBoatCardInfo(id));
    // }
  }, []);

  return (
    <div className={styles.info__container}>
      <table className={styles["primary-table"]}>
        <caption className={styles["primary-caption"]}>Информация об объекте:</caption>
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
      <table className={`${styles["secondary-table"]}`}>
        <caption className={styles["secondary-caption"]}>Сведения о собственнике:</caption>
        <thead>
          <tr>
            {userTableColumns.map((item) => {
              return (
                <th
                  className={styles["owner-table-th"]}
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
                      ? item.key === "fio"
                        ? `${boatInfoFromState["ownerSurname"]} ${boatInfoFromState["ownerName"]} ${boatInfoFromState["ownerMidname"]}`
                        : item.id === "ownerDocType"
                        ? `${boatInfoFromState[`ownerDocType`]["dtname"]} ${boatInfoFromState[`ownerDocNum`]}`
                        : item.key === ""
                        ? boatInfoFromState[`${item.id}`]
                        : boatInfoFromState[`${item.id}`][`${item.key}`]
                      : "—"
                    : null}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
      <table className={styles["secondary-table"]}>
        <caption className={styles["secondary-caption"]}>Размерения судна:</caption>
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
              return (
                <td>
                  {Object.keys(boatInfoFromState).length !== 0
                    ? boatInfoFromState[`${item.id}`] !== undefined &&
                      boatInfoFromState[`${item.id}`] !== null
                      ? item.key === ""
                        ? boatInfoFromState[`${item.id}`]
                        : boatInfoFromState[`${item.id}`][`${item.key}`]
                      : "—"
                    : null}
                </td>
              );
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
          {boatInfoFromState.boatToDtoList !== undefined
            ? boatInfoFromState.boatToDtoList.map((elem) => {
                return (
                  <tr>
                    {toTableColumns.map((item) => {
                      return typeof elem[`${item.id}`] === "boolean" ? (
                        elem[`${item.id}`] === true ? (
                          <td className={styles["to-th"]}>Годное</td>
                        ) : (
                          <td className={styles["to-th"]}>Негодное</td>
                        )
                      ) : !!elem[`${item.id}`] ? (
                        item.id === "toDate" ? (
                          <td className={styles["to-th"]}>
                            {new Date(elem[`${item.id}`].slice(0, 10)).toLocaleDateString()}
                          </td>
                        ) : (
                          <td className={styles["to-th"]}>{elem[`${item.id}`]}</td>
                        )
                      ) : (
                        <td className={styles["to-th"]}>—</td>
                      );
                    })}
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>

      <table className={`${styles["secondary-table"]}`}>
        <caption className={styles["secondary-caption"]}>Двигатели:</caption>
        <thead>
          <tr>
            {engineTableColumns.map((item) => {
              return (
                <th
                  className={styles["engine-table-th"]}
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
                      if (item.id === "engpwrmax") {
                        return (
                          <td className={styles["engine-table-th"]}>{boatInfoFromState["engpwrmax"]}</td>
                        );
                      } else {
                        if ((item.key === "dateReg" || item.key === "dateRegEnd") && !!elem[`${item.key}`]) {
                          return (
                            <td className={styles["engine-table-th"]}>
                              {new Date(elem[`${item.key}`]).toLocaleDateString()}
                            </td>
                          );
                        } else {
                          return <td className={styles["engine-table-th"]}>{elem[`${item.key}`]}</td>;
                        }
                      }
                    })}
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
      <table className={`${styles["secondary-table"]}`}>
        <caption className={styles["secondary-caption"]}>Хронология владельцев судна:</caption>
        <thead>
          <tr>
            {ownersHistoryTableColumns.map((item) => {
              return (
                <th
                  className={styles["owners-history-table-th"]}
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
                      ? item.key === "fio"
                        ? `${boatInfoFromState[`${item.id}`]["personSurname"]} ${
                            boatInfoFromState[`${item.id}`]["personName"]
                          } ${boatInfoFromState[`${item.id}`]["personMidname"]}`
                        : boatInfoFromState[`${item.id}`][`${item.key}`]
                      : "—"
                    : null}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
      <div>
        <table className={`${styles["secondary-table"]}`}>
          <caption className={styles["secondary-caption"]}>{dealsHistoryTableColumns.caption}</caption>
          <thead>
            <tr>
              {dealsHistoryTableColumns.nameColumn.map((item) => {
                // if (item.key !== "docNum")
                //   if (item.key === "docName" || item.key === "note") {
                return (
                  <th
                    className={styles.deals_history_table_th}
                    id={item.key}>
                    {item.value}
                  </th>
                );
                // } else {
                //   return (
                //     <th
                //       className={styles.deals_history_table_th}
                //       id={item.key}>
                //       Номер и дата документа
                //     </th>
                //   );
                // }
              })}
              <th
                key={uuidv4()}
                className={`${editMode ? "" : styles.edit__mode} ${styles.edit__column}`}></th>
            </tr>
          </thead>
          <tbody>
            {boatInfoFromState.boatDeals !== undefined
              ? boatInfoFromState.boatDeals.map((elem) => {
                  return (
                    <tr>
                      {dealsHistoryTableColumns.nameColumn.map((item) => {
                        if (item.key === "docDate") {
                          return <td>{new Date(elem[`recdate`]).toLocaleDateString() || "—"}</td>;
                        } else return <td>{elem[`${item.key}`]}</td>;
                      })}
                      <td
                        className={`${editMode ? "" : styles.edit__mode} ${styles.edit__column}`}
                        key={uuidv4()}>
                        <button
                          className={`${styles.edit__buttons} btn btn-primary ${
                            editMode ? "" : styles.edit__mode
                          }`}
                          data-tabletype={dealsHistoryTableColumns.keyTable}
                          id={elem.dealId}
                          onClick={(e) => handleEditNotes(e)}>
                          &#9998;
                        </button>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>

        <button
          className={`${styles.add__buttons} btn btn-primary ${editMode ? "" : styles.edit__mode}`}
          id={dealsHistoryTableColumns.keyTable}
          onClick={(e) => handleAddNewData(e)}>
          +
        </button>
      </div>

      <div>
        <table className={`${styles["secondary-table"]}`}>
          <caption className={styles["secondary-caption"]}>{boatArrestsTableColumns.caption}</caption>
          <thead>
            <tr>
              {boatArrestsTableColumns.nameColumn.map((item) => {
                switch (item.key) {
                  case "onDocName":
                    return (
                      <th
                        className={styles.deals_history_table_th}
                        id={item.key}>
                        Наименование, номер и дата документа
                      </th>
                    );
                  case "onDocDate":
                    break;
                  default:
                    return (
                      <th
                        className={styles.arrests_table_th}
                        id={item.key}>
                        {item.value}
                      </th>
                    );
                }
              })}
              <th
                key={uuidv4()}
                className={`${editMode ? "" : styles.edit__mode} ${styles.edit__column}`}></th>
            </tr>
          </thead>
          <tbody>
            {boatInfoFromState.boatArrests !== undefined
              ? boatInfoFromState.boatArrests.map((elem) => {
                  return (
                    <>
                      {!elem.isActiv ? (
                        <>
                          <tr>
                            {removeBoatArrestsTableColumns.nameColumn.map((item) => {
                              switch (item.key) {
                                case "offDocName":
                                  return (
                                    <td>
                                      {elem[`offDocName`]} от{" "}
                                      {new Date(elem[`offDocDate`]).toLocaleDateString()}
                                    </td>
                                  );
                                case "offDocDate":
                                  break;
                                case "isActiv":
                                  if (elem[`isActiv`]) {
                                    return <td>Наложен</td>;
                                  } else {
                                    return <td>Снят</td>;
                                  }
                                case "offDate":
                                  return <td>{new Date(elem[`${item.key}`]).toLocaleDateString()}</td>;
                                default:
                                  return <td>{elem[`${item.key}`]}</td>;
                              }
                            })}
                            <td
                              className={`${editMode ? "" : styles.edit__mode} ${styles.edit__column}`}
                              key={uuidv4()}></td>
                          </tr>
                          <tr>
                            {boatArrestsTableColumns.nameColumn.map((item) => {
                              switch (item.key) {
                                case "onDocName":
                                  return (
                                    <td>
                                      {elem[`${item.key}`]} от{" "}
                                      {new Date(elem[`onDocDate`]).toLocaleDateString()}
                                    </td>
                                  );
                                case "onDocDate":
                                  break;
                                case "isActiv":
                                  if (elem[`offDate`] !== null) {
                                    return <td>Наложен</td>;
                                  } else {
                                    return <td>Снят</td>;
                                  }
                                case "onDate":
                                  return <td>{new Date(elem[`${item.key}`]).toLocaleDateString()}</td>;
                                default:
                                  return <td>{elem[`${item.key}`]}</td>;
                              }
                            })}
                            <td
                              className={`${editMode ? "" : styles.edit__mode} ${styles.edit__column}`}
                              key={uuidv4()}></td>
                          </tr>
                        </>
                      ) : (
                        <tr className={styles.red_text}>
                          {boatArrestsTableColumns.nameColumn.map((item) => {
                            switch (item.key) {
                              case "onDocName":
                                return (
                                  <td>
                                    {elem[`${item.key}`]} от{" "}
                                    {new Date(elem[`onDocDate`]).toLocaleDateString()}
                                  </td>
                                );
                              case "onDocDate":
                                break;
                              case "isActiv":
                                return <td>Наложен</td>;
                              case "onDate":
                                return <td>{new Date(elem[`${item.key}`]).toLocaleDateString()}</td>;
                              default:
                                return <td>{elem[`${item.key}`]}</td>;
                            }
                          })}
                          <td
                            className={`${editMode ? "" : styles.edit__mode} ${styles.edit__column}`}
                            key={uuidv4()}>
                            <button
                              className={`${styles.edit__buttons} btn btn-primary ${
                                editMode ? "" : styles.edit__mode
                              }`}
                              data-tabletype={boatArrestsTableColumns.keyTable}
                              id={elem.arrId}
                              onClick={(e) => handleEditNotes(e)}>
                              &#9998;
                            </button>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })
              : null}
          </tbody>
        </table>

        <button
          className={`${styles.add__buttons} btn btn-primary ${editMode ? "" : styles.edit__mode}`}
          id={boatArrestsTableColumns.keyTable}
          onClick={(e) => handleAddNewData(e)}>
          +
        </button>
      </div>
      <table className={`${styles["secondary-table"]}`}>
        <caption className={styles["secondary-caption"]}>
          Отметки о внесении изменений в судовую книгу:
        </caption>
        <thead>
          <tr>
            {noteShipBookTableColumns.map((item) => {
              return (
                <th
                  className={styles["note-ship-book-table-columns-th"]}
                  id={item.key}>
                  {item.value}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
        {boatInfoFromState.boatActions && boatInfoFromState.boatActions.map(el=>{
          return(
              <tr>
                {noteShipBookTableColumns.map((item) => {
                  return (
                      <td>
                        {el[`${item.key}`]?el[`${item.key}`] : "—"}
                      </td>
                  );
                })}
              </tr>
          )
        })}
        </tbody>
      </table>
      <table className={`${styles["secondary-table"]}`}>
        <caption className={styles["secondary-caption"]}>
          Отметки о внесении судна в судовую книгу / исключении судна из судовой книги:
        </caption>
        <thead>
          <tr>
            {enterNoteShipBookTableColumns.map((item) => {
              return (
                <th
                  className={styles["owners-history-table-th"]}
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
                      ? item.id === "cardDate"
                        ? new Date(boatInfoFromState[`${item.id}`].slice(0, 10)).toLocaleDateString()
                        : boatInfoFromState[`${item.id}`]
                      : "—"
                    : null}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
      <div>
        <table className={`${styles["secondary-table"]}`}>
          <caption className={styles["secondary-caption"]}>{specialMarksTableColumns.caption}</caption>
          <thead>
            <tr>
              {specialMarksTableColumns.nameColumn.map((item) => {
                return (
                  <th
                    className={styles.deals_history_table_th}
                    id={item.key}>
                    {item.value}
                  </th>
                );
              })}
              <th
                key={uuidv4()}
                className={`${editMode ? "" : styles.edit__mode} ${styles.edit__column}`}></th>
            </tr>
          </thead>
          <tbody>
            {boatInfoFromState.specMarks !== undefined
              ? boatInfoFromState.specMarks.map((elem) => {
                  return (
                    <tr>
                      {specialMarksTableColumns.nameColumn.map((item) => {
                        switch (item.type) {
                          case "checkbox":
                            return (
                              <td>
                                <input
                                  type="checkbox"
                                  className={styles.checkbox}
                                  id={elem.bsmId}
                                  checked={elem.bsmLock}
                                  disabled
                                />
                              </td>
                            );
                          default:
                            if (item.key === "specialMarks") {
                              return <td>elem[`${item.key}`]</td>;
                            }
                            if (elem.bsmLock) {
                              if (item.key === "bsmDate") {
                                return (
                                  <td className={styles.red_text}>
                                    {new Date(elem[`${item.key}`]).toLocaleDateString()}
                                  </td>
                                );
                              } else {
                                return <td className={styles.red_text}>{elem[`${item.key}`]}</td>;
                              }
                            } else {
                              if (item.key === "bsmDate") {
                                return <td>{new Date(elem[`${item.key}`]).toLocaleDateString()}</td>;
                              } else {
                                return <td>{elem[`${item.key}`]}</td>;
                              }
                            }
                        }
                      })}
                      <td
                        className={`${editMode ? "" : styles.edit__mode} ${styles.edit__column}`}
                        key={uuidv4()}>
                        <button
                          className={`${styles.edit__buttons} btn btn-primary ${
                            editMode ? "" : styles.edit__mode
                          }`}
                          data-tabletype={specialMarksTableColumns.keyTable}
                          id={elem.bsmId}
                          onClick={(e) => handleEditNotes(e)}>
                          &#9998;
                        </button>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>

        <button
          className={`${styles.add__buttons} btn btn-primary ${editMode ? "" : styles.edit__mode}`}
          id={specialMarksTableColumns.keyTable}
          onClick={(e) => handleAddNewData(e)}>
          +
        </button>
      </div>

      <div className={styles.documents__container}>
        <div className={styles.doc__table__container}>
          <table className={styles.doc__table}>
            <caption className={styles["secondary-caption"]}>{documentsTableColumns.caption}</caption>
            <thead>
              <tr>
                {documentsTableColumns.nameColumn.map((item) => {
                  if (item.key !== "docfile") {
                    if (item.key === "docdate") {
                      return (
                        <th
                          className={`${styles.deals_history_table_th} ${styles.docs_table_date_th}`}
                          id={item.key}>
                          {item.value}
                        </th>
                      );
                    } else {
                      return (
                        <th
                          className={styles.deals_history_table_th}
                          id={item.key}>
                          {item.value}
                        </th>
                      );
                    }
                  }
                })}
                <th
                  key={uuidv4()}
                  className={`${editMode ? "" : styles.edit__mode} ${styles.edit__column}`}></th>
              </tr>
            </thead>
            <tbody>
              {boatInfoFromState.documentsDtos !== undefined
                ? boatInfoFromState.documentsDtos.map((elem) => {
                    if (elem.docnote !== "signature") {
                      return (
                        <tr>
                          {documentsTableColumns.nameColumn.map((item) => {
                            if (item.key !== "docfile") {
                              if (item.type !== "date") {
                                return (
                                  <td>
                                    <a
                                      href={`${MAIN_URL}${PORT}${API_ADD_BOAT_INFO_DOCS_DOWNLOAD}${encodeURI(
                                        elem.docname,
                                      )}?cardid=${boatInfoFromState.cardid}&signature=false`}>
                                      {elem[`${item.key}`]}
                                    </a>
                                  </td>
                                );
                              } else {
                                return <td>{new Date(elem[`${item.key}`]).toLocaleDateString()}</td>;
                              }
                            }
                          })}
                          <td
                            className={`${editMode ? "" : styles.edit__mode} ${styles.edit__column}`}
                            key={uuidv4()}>
                            <button
                              className={`${styles.delete__buttons} btn btn-danger ${
                                editMode ? "" : styles.edit__mode
                              }`}
                              data-tabletype={documentsTableColumns.keyTable}
                              data-docname={elem.docname}
                              data-doctype="file"
                              id={elem.docid}
                              onClick={(e) => handleEditNotes(e)}>
                              &#10006;
                            </button>
                          </td>
                        </tr>
                      );
                    }
                  })
                : null}
            </tbody>
          </table>
          <button
            className={`${styles.add__buttons} btn btn-primary ${editMode ? "" : styles.edit__mode}`}
            data-doctype="file"
            id={documentsTableColumns.keyTable}
            onClick={(e) => handleAddNewData(e)}>
            +
          </button>
        </div>
        {/* <div className={styles.sign__table__container}> */}
        <table className={styles.sign__table}>
          {/* styles.sign__container  */}
          <thead>
            <tr>
              <th>
                Подпись собственника, арендатора, лизингополучателя (их представителя), подтверждающая
                получение судового билета
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {signName && (
                  <img
                    className={styles.sign__image}
                    src={`http://10.0.1.30:8080/boats/file/download/${signName}?cardid=${boatInfoFromState.cardid}&signature=true`}
                    alt="Подпись"
                  />
                )}
              </td>
            </tr>
          </tbody>
        </table>
        {/* <div className={styles.sign__buttons_container}>
          <button
            className={`${styles.add__buttons} btn btn-primary ${
            editMode ? '' : styles.edit__mode
            }`}
            id={documentsTableColumns.keyTable}
            data-doctype="signature"
            onClick={(e) => handleAddNewData(e)}>
            +
          </button>
          {signName && 
          <button
            className={`${styles.add__buttons} btn btn-danger ${
            editMode ? '' : styles.edit__mode
            }`}
            data-tabletype={documentsTableColumns.keyTable}
            data-doctype="signature"
            id={documentsTableColumns.keyTable}
            onClick={(e) => handleEditNotes(e)}>
            &#10006;
          </button>}
        </div> */}

        {/* </div> */}
      </div>

      <div className="d-flex justify-content-around mt-5">
        <button
          className={`btn btn-primary ${editMode ? styles.edit__mode : ""}`}
          onClick={() => handleEditMode()}>
          Редактировать
        </button>
        <button
          className="btn btn-danger"
          onClick={() => handleCloseButton()}>
          Закрыть
        </button>
      </div>
      {/*{tableInfo.map((el)=> createTable(el))}*/}
      {showModal && (
        <BoatInfoModalWindow
          boatIdModal={boatInfoFromState.cardid}
          showModal={showModal}
          setShowModal={setShowModal}
          modalWindowInputs={modalWindowInputs}
          dataForEdit={dataForEdit}
          setDataForEdit={setDataForEdit}
          type={type}
          setType={setType}
          fileType={fileType}
        />
      )}
    </div>
  );
}
