import { useDispatch, useSelector } from "react-redux";
import styles from "./TableAppBoatReg.module.css";
import { useState, useEffect } from "react";
import AppBoatRegModal from "../AppBoatRegModal/AppBoatRegModal";
import { deleteNewNote } from "../../../../redux/statementReducer/actionsStatement";

export default function TableAppBoatReg({ updateData, tableOptions, dataForTable, typeTable, mode }) {
  const [showModal, setShowModal] = useState(false);
  const [modalWindowInputs, setModalWindowInputs] = useState(null);
  const dispatch = useDispatch();

  const dataReg = useSelector((state) => {
    const { statementReducer } = state;
    return statementReducer[typeTable];
  });
  const dataDecis = useSelector((state) => {
    const { DuplicateShipsTicketReducer } = state;
    return DuplicateShipsTicketReducer.appDecisionData[typeTable];
  });

  // console.log(typeTable);
  // const appDecisionData = useSelector((state) => {
  //   const { DuplicateShipsTicketReducer } = state;
  //   return DuplicateShipsTicketReducer.appDecisionData;
  // });

  const data = !!dataForTable
    ? dataForTable
    : window.location.pathname.includes("smallboatsreg")
    ? { ...dataReg }
    : { ...dataDecis };

  const handleAddNotes = (e) => {
    e.preventDefault();
    setModalWindowInputs(tableOptions);
    // setType("save");
    setShowModal(true);
  };
  const removeEngine = (e) => {
    e.preventDefault();
    updateData(tableOptions.keyTable, e.target.id, "removeEngine");
  };
  const handleDeleteNote = (e) => {
    e.preventDefault();
    if (!window.location.pathname.includes("reginformationchanges")) {
      let noteForDelete;
      switch (tableOptions.keyTable) {
        case "boatCardAppEngDtoList":
          noteForDelete = {
            id: e.target.id,
            type: "boatCardAppEngDtoList",
          };
          break;
        case "boatCardAppSmDtoList":
          noteForDelete = {
            id: e.target.id,
            type: "boatCardAppSmDtoList",
          };
          break;
        case "boatCardAppDealsDtoList":
          noteForDelete = {
            id: e.target.id,
            type: "boatCardAppDealsDtoList",
          };
          break;
        default:
          break;
      }
      dispatch(deleteNewNote(noteForDelete));
    } else {
      updateData(tableOptions.keyTable, e.target.id, "delete");
    }
  };
  return (
    <div
      className={styles.table_content}
      key={tableOptions.keytable}>
      <h3 className={styles.text_secondary}>{tableOptions.caption}</h3>
      <table className={`table table-bordered border-secondary bg-white`}>
        <thead>
          <tr>
            {tableOptions.nameColumn.map((item) => {
              return <th id={item.key}>{item.value}</th>;
            })}
            {data.length > 0 && mode !== "view" && <th className={styles.edit__column}></th>}
          </tr>
        </thead>
        <tbody>
          {data.map((elem) => {
            return (
              <tr>
                {tableOptions.nameColumn.map((item) => {
                  switch (item.type) {
                    case "checkbox":
                      return (
                        <td>
                          <input
                            type="checkbox"
                            className={styles.checkbox}
                            checked={elem.asmLock || elem.msmLock}
                            disabled
                          />
                        </td>
                      );
                    case "date":
                      return <td>{elem[`${item.key}`].split("-").reverse().join(".")}</td>;
                    default:
                      if (item.key === "engtype") {
                        return <td>{elem[`${item.key}`] === 1 ? "Бензиновый" : "Электрический"}</td>;
                      } else if (
                        item.key === "dateRegEnd" &&
                        mode !== "view" &&
                        Boolean(elem["dateReg"]) &&
                        !Boolean(elem[`${item.key}`])
                      ) {
                        return (
                          <td>
                            <button
                              className={`${styles["button_remove_engine"]} `}
                              id={elem.engid}
                              onClick={(e) => removeEngine(e)}>
                              снять
                            </button>
                          </td>
                        );
                      } else {
                        return <td>{elem[`${item.key}`]}</td>;
                      }
                  }
                })}
                {data.length > 0 && mode !== "view" && (
                  <td className={styles.edit__column}>
                    {elem.hasOwnProperty("innerId") ? (
                      <button
                        className={`${styles.delete__buttons} btn btn-danger`}
                        // data-tabletype={documentsTableColumns.keyTable}
                        // data-docname={elem.docname}
                        // data-doctype="file"
                        id={elem.innerId}
                        onClick={(e) => handleDeleteNote(e)}>
                        &#10006;
                      </button>
                    ) : (
                      ""
                    )}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      {mode !== "view" && (
        <button
          className={`${styles.add__buttons} btn btn-primary`}
          id={tableOptions.keyTable}
          onClick={(e) => handleAddNotes(e)}>
          +
        </button>
      )}
      {showModal && (
        <AppBoatRegModal
          setShowModal={setShowModal}
          showModal={showModal}
          modalWindowInputs={tableOptions}
          dataForCheck={data}
          updateData={updateData}
        />
      )}
    </div>
  );
}
