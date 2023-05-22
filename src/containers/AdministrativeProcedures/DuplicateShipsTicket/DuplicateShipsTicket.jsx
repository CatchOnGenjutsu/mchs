import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import SearchBlock from "../../../components/SearchBlock/SearchBlock";
import SearchTable from "../../../components/SearchTable/SearchTable";
import ToolBlock from "../../../components/AdministrativeProcedures/commonComponents/ToolBlock/ToolBlock";

import {
  inputsHeadersDuplicateShipsTicket,
  setOptionsForInputsATE,
} from "../../../components/SearchBlock/inputsHeaders";

import { SMALLBOATS_ADMIN_COLUMNS } from "../../../components/SearchTable/TablesColumns";

export default function DuplicateShipsTicket() {
  const [statementId, setStatementId] = useState(null);
  const [appStatusId, setAppStatusId] = useState(null);

  const dataOptionsForSelectATE = useSelector((state) => {
    const { dictionaryReducer } = state;
    return dictionaryReducer.ateLibrary;
  });

  const dataOptionsForSelectATEValidated = [];
  dataOptionsForSelectATE.forEach((item) => {
    dataOptionsForSelectATEValidated.push({
      value: item.sctId,
      label: item.sctName,
      key: "section",
    });
  });
  setOptionsForInputsATE(dataOptionsForSelectATEValidated, document.location.pathname.slice(1));

  const dataStateDupShipsTicket = useSelector((state) => {
    const { DuplicateShipsTicketReducer } = state;
    return DuplicateShipsTicketReducer.data;
  });

  const handleStatementId = (value) => {
    setStatementId(value);
  };
  const handleAppStatusId = (value) => {
    setAppStatusId(value);
  };

  // useEffect(() => {

  // }, []);

  return (
    <>
      <h2>Выдача дубликата судового билета</h2>
      <SearchBlock inputsHeaders={Object.values(inputsHeadersDuplicateShipsTicket)} />
      <ToolBlock
        addBtnDis={true}
        id={statementId}
        appStatusId={appStatusId}
      />
      <SearchTable
        setId={handleStatementId}
        setStatusId={handleAppStatusId}
        headerColumns={SMALLBOATS_ADMIN_COLUMNS}
        dataFromState={dataStateDupShipsTicket}
      />
    </>
  );
}
