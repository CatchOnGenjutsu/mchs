import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SearchBlock from "../../../components/GeneralComponents/SearchBlock/SearchBlock";
import SearchTable from "../../../components/GeneralComponents/SearchTable/SearchTable";

import { clearBoatCardInfo } from "../../../redux/smallBoatsReducer/actionsSmallBoats.js";
import { SMALLBOATS_COLUMNS } from "../../../components/GeneralComponents/SearchTable/TablesColumns";
import { inputsHeadersSmallBoats } from "../../../components/GeneralComponents/SearchBlock/inputsHeaders";

import styles from "./SmallBoats.module.css";

export default function SmallBoats() {
  const dispatch = useDispatch();

  const [boatId, setBoatId] = useState("");

  const handleClearBoatInfo = () => {
    dispatch(clearBoatCardInfo());
  };

  const dataFromState = useSelector((state) => {
    const { smallBoatsReducer } = state;
    return smallBoatsReducer.data.map((el) => {
      if (el.cardid) {
        el.id = el.cardid;
        delete el.cardid;
      }
      return el;
    });
  });

  return (
    <>
      <div className={boatId !== "" ? styles.hidden : ""}>
        <h2>База данных маломерных судов</h2>
        <SearchBlock inputsHeaders={Object.values(inputsHeadersSmallBoats)} />
        <SearchTable
          // setId={handleBoatId}
          headerColumns={SMALLBOATS_COLUMNS}
          dataFromState={dataFromState}
        />
      </div>
    </>
  );
}
