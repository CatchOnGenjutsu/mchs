import { useSelector } from "react-redux";
import styles from "./TableAppBoatReg.module.css";
import { useState } from "react";
import AppBoatRegModal from "../AppBoatRegModal/AppBoatRegModal";

export default function TableAppBoatReg({ tableOptions,dataEngines }) {
  const [showModal, setShowModal] = useState(false);
  const [modalWindowInputs, setModalWindowInputs] = useState(null);

  let data;
  const boatCardAppEngList = useSelector((state) => {
    const { boatRegReducer } = state;
    return boatRegReducer.boatCardAppEngList;
  });
  switch (tableOptions.keyTable) {
    case "boatCardAppEngDtoList":
      data = boatCardAppEngList;
      console.log(data)
      break;

    default:
      break;
  }

  const handleAddNotes = (e) => {
    e.preventDefault()
    setModalWindowInputs(tableOptions);
    // setType("save");
    setShowModal(true);
  };

  return (
    <div
      className={styles.table_content}
      key={tableOptions.keytable}>
      <h3 className={styles.text_secondary}>
        Сведения о представителе заинтересованного лица
      </h3>
      <table className={`table table-bordered border-secondary bg-white`}>
        <thead>
          <tr>
            {tableOptions.nameColumn.map((item) => {
              return <th id={item.key}>{item.value}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((elem) => {
            return (
              <tr>
                {tableOptions.nameColumn.map((item) => {
                  return <td>{elem[`${item.key}`]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <button
        className={`${styles.add__buttons} btn btn-primary`}
        id={tableOptions.keyTable}
        onClick={(e) => handleAddNotes(e)}>
        +
      </button>
      {showModal && (
        <AppBoatRegModal
          setShowModal={setShowModal}
          showModal={showModal}
          modalWindowInputs={tableOptions}
        />
      )}
    </div>
  );
}
