import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SearchBlock from "../../../components/GeneralComponents/SearchBlock/SearchBlock";
import SearchTable from "../../../components/GeneralComponents/SearchTable/SearchTable";
import ToolBlock from "../../../components/AdministrativeProcedures/commonComponents/ToolBlock/ToolBlock";

import {
  inputsHeadersDuplicateShipsTicket,
  setOptionsForInputsATE,
} from "../../../components/GeneralComponents/SearchBlock/inputsHeaders";
import { getDataDupShipsTicketBySearchParams } from "../../../redux/DuplicateShipsTicketReducer/actionsDuplicateShipsTicket";

import { SMALLBOATS_ADMIN_COLUMNS } from "../../../components/GeneralComponents/SearchTable/TablesColumns";

export default function DuplicateShipsTicket() {
  const [statementId, setStatementId] = useState(null);
  const [appStatusId, setAppStatusId] = useState(null);
  const dispatch = useDispatch();

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

  const stateDupShipsTicket = useSelector((state) => {
    const { DuplicateShipsTicketReducer } = state;
    return DuplicateShipsTicketReducer;
  });

  const handleStatementId = (value) => {
    setStatementId(value);
  };
  const handleAppStatusId = (value) => {
    setAppStatusId(value);
  };

  useEffect(() => {
    dispatch(getDataDupShipsTicketBySearchParams(stateDupShipsTicket.searchParams));
  }, []);

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
